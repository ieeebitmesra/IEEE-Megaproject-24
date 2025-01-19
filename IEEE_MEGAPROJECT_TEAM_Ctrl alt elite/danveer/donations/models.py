from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
# from geopy.geocoders import Nominatim

# Utility for quantity validation
def validate_quantity(category, quantity):
    if category == 'food' and quantity is None:
        raise ValidationError('Quantity is required for food donations (in kg).')
    if category in ['medicines', 'educational', 'furniture', 'electronics', 'toys'] and quantity is None:
        raise ValidationError('Quantity is required for this category.')
    if category == 'other' and quantity is not None:
        raise ValidationError('Quantity should not be specified for "Other" category.')
    if quantity and quantity <= 0:
        raise ValidationError('Quantity must be a positive integer.')
    

# Create your models here.

class Customer(AbstractUser):
    first_name = models.TextField(max_length=100, null=False, blank=False)
    last_name = models.TextField(max_length=100, null=False, blank=False)
    email = models.EmailField(unique=True)
    user_type = models.CharField(
        max_length=11, 
        choices=[('donor', 'Donor'), ('beneficiary', 'Beneficiary/NGO')], 
        blank=False, 
        null=False, 
        verbose_name='User Role', 
        help_text='Select the role of the user (Donor or Beneficiary)'
    )
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    location = models.TextField(max_length=200, null=False, blank=True)

    def __str__(self):
        return self.username

    
class DonatedItem(models.Model):
    CATEGORY_CHOICES = [
        ('food', 'Food'), 
        ('medicines', 'Medicines'), 
        ('educational', 'Education Supplies'),
        ('furniture', 'Furniture'), 
        ('electronics', 'Electronic Devices'), 
        ('toys', 'Toys'), 
        ('other', 'Other')
    ]
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=50, blank=False, null=False)
    item_description = models.CharField(max_length=100, blank=False, null=False)
    quantity = models.PositiveIntegerField(null=True, blank=True, help_text="Enter quantity if applicable")
    donor = models.ForeignKey(
        Customer, limit_choices_to={'user_type': 'donor'},
        related_name='donated_items',
        on_delete=models.CASCADE
    )
    date = models.DateTimeField(auto_now_add=True)
    claimed = models.BooleanField(default=False)
    img = models.ImageField(default='images/default_item_img.png', blank=True)
    
    def clean(self):
        """Custom validation logic for quantity field based on category."""
        validate_quantity(self.category, self.quantity)
        
    def save(self, *args, **kwargs):
        """Ensure clean is called before saving."""
        self.clean()
        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.item_description}"

    class Meta:
        ordering = ['-date']
        
class DonationRequest(models.Model):
    CATEGORY_CHOICES = DonatedItem.CATEGORY_CHOICES  # Reuse choices
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=50, blank=False, null=False)
    item_description = models.CharField(max_length=100, blank=False, null=False)
    quantity = models.PositiveIntegerField(null=True, blank=True, help_text="Enter quantity if applicable")
    beneficiary = models.ForeignKey(Customer, limit_choices_to={'user_type': 'beneficiary'}, related_name='donations_requested', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    received = models.BooleanField(default=False)
    img = models.ImageField(default='images/default_request_img.png', blank=True, help_text='Provide a picture of organization/needy')


    def clean(self):
        """Custom validation logic for quantity field based on category."""
        validate_quantity(self.category, self.quantity)

    def save(self, *args, **kwargs):
        """Ensure clean is called before saving."""
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.item_description}"

class Donation(models.Model):
    donor = models.ForeignKey(Customer, limit_choices_to={'user_type': 'donor'}, related_name='donations_donated', on_delete=models.CASCADE)
    beneficiary = models.ForeignKey(Customer, limit_choices_to={'user_type': 'beneficiary'}, related_name='donations_received', on_delete=models.CASCADE)
    item = models.ForeignKey(DonatedItem, on_delete=models.CASCADE, null=True)
    pending = models.BooleanField(default=True)

    def __str__(self):
        return f"Donation of {self.item} from {self.donor} to {self.beneficiary}"
    
class ChatMessage(models.Model):
    sender = models.ForeignKey(Customer, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(Customer, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    item_id = models.IntegerField() #The item about which the users are talking

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver} at {self.timestamp}"