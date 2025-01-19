from django import forms
from .models import Customer, DonatedItem, DonationRequest, ChatMessage
from django.contrib.auth.forms import UserCreationForm
from .widgets import LocationField

class CustomerRegistrationForm(UserCreationForm):
    email = forms.EmailField()
    user_type = forms.ChoiceField(
        choices = [('donor', 'Donor'), ('beneficiary', 'Beneficiary/NGO')],
        required = True,
        widget=forms.Select(attrs={'class': 'form control'})
    )
    location = LocationField(required=True)

    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2', 'user_type', 'location']
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'password1': forms.PasswordInput(attrs={'class': 'form-control'}),
            'password2': forms.PasswordInput(attrs={'class': 'form-control'}),
        }

class DonateItemForm(forms.ModelForm):
    class Meta:
        model = DonatedItem
        fields = ['category', 'item_description', 'quantity', 'img']
        widgets = {
            'category': forms.Select(attrs={'class': 'form-control'}),
            'item_description': forms.TextInput(attrs={'class': 'form-control'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control'}),
            'img': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

class RequestDonationForm(forms.ModelForm):
    class Meta:
        model = DonationRequest
        fields = ['category', 'item_description', 'quantity', 'img']
        widgets = {
            'category': forms.Select(attrs={'class': 'form-control'}),
            'item_description': forms.TextInput(attrs={'class': 'form-control'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control'}),
            'img': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

class ChatMessageForm(forms.ModelForm):
    class Meta:
        model = ChatMessage
        fields = ['message']
        widgets = {
            'message': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }