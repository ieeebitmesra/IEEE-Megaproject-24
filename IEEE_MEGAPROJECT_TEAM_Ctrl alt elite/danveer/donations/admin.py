from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Customer)
admin.site.register(DonatedItem)
admin.site.register(DonationRequest)
admin.site.register(Donation)