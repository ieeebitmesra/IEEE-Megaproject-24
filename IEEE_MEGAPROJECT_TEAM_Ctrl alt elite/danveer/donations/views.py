from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import CustomerRegistrationForm, DonateItemForm, RequestDonationForm, ChatMessageForm
from .models import DonatedItem, DonationRequest, Donation, ChatMessage, Customer
from django.db.models import Q
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
# Create your views here.

# Home Page
def home(request):
    return render(request, 'home.html')

# Registration Page
def register(request):
    if request.method == 'POST':
        form = CustomerRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            location_data = form.cleaned_data['location']
            geolocator = Nominatim(user_agent="danveer")
            location_str = location_data
            location = geolocator.geocode(location_str)
            if location:
                user.latitude = location.latitude
                user.longitude = location.longitude
                user.location = location.address
                user.save()
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Location not found. Please enter a valid location.')
                return redirect('register')

    else:
        form = CustomerRegistrationForm()
    return render(request, 'register.html', {'form': form})

# Login Page
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid email or password')
    return render(request, 'login.html')

#Logout functionality
def custom_logout(request):
    logout(request)
    return redirect('home')

# Profile Page
@login_required
def profile(request):
    user = request.user
    context = {
        'user': user,
    }
    return render(request, 'profile.html', context)

# Donate Page for Donors
def donate(request):
    if(request.method == 'POST'):
        form = DonateItemForm(request.POST, request.FILES)
        if form.is_valid():
            donated_item = form.save(commit=False)
            donated_item.donor = request.user
            donated_item.save()
            return redirect('home')
    else:
        form = DonateItemForm()
    return render(request, 'donate.html', {'form': form})

# Request Donation Page for NGOs
def request_donation(request):
    if(request.method == 'POST'):
        form = RequestDonationForm(request.POST, request.FILES)
        if form.is_valid():
            requested_item = form.save(commit = False)
            requested_item.beneficiary = request.user
            requested_item.save()
            return redirect('home')
    else:
        form = RequestDonationForm()
    return render(request, 'request_donation.html', {'form': form})

# Explore Page
def explore(request):
    #Need to create the context dictionary so as to be able to use the variables to be displayed from db
    user = request.user
    unclaimed_donated_items = []
    unreceived_donation_requests = [] 
    donated_items_with_distance = []
    requests_with_distance = []
    if user.is_authenticated:
        unclaimed_donated_items = DonatedItem.objects.filter(claimed=False)
        unreceived_donation_requests = DonationRequest.objects.filter(received=False)
        user_location = (user.latitude, user.longitude)

        donated_items_with_distance = []
        for item in unclaimed_donated_items:
            item_location = (item.donor.latitude, item.donor.longitude)
            distance = geodesic(user_location, item_location).kilometers
            donated_items_with_distance.append((item, distance))

        requests_with_distance = []
        for request in unreceived_donation_requests:
            request_location = (request.beneficiary.latitude, request.beneficiary.longitude)
            distance = geodesic(user_location, request_location).kilometers
            requests_with_distance.append((request, distance))

        donated_items_with_distance.sort(key=lambda x: x[1])
        requests_with_distance.sort(key=lambda x: x[1])

        unclaimed_donated_items = [item for item, _ in donated_items_with_distance]
        unreceived_donation_requests = [request for request, _ in requests_with_distance]

    pending_donations = Donation.objects.filter(pending=True).order_by('-item__date')
    resolved_donations = Donation.objects.filter(pending=False).order_by('item__date')
    
    context = {
        'unclaimed_donated_items': unclaimed_donated_items,
        'unreceived_donation_requests': unreceived_donation_requests,
        'pending_donations': pending_donations,
        'resolved_donations': resolved_donations,
        'user': user,
    }

    return render(request, 'explore.html', context)

#Chat page logic
@login_required
def chat(request, receiver_id, item_id):
    receiver = get_object_or_404(Customer, id=receiver_id)
    sender = request.user
    target = None
    card_creator = None
    action_type = None

    # Determine the target object and action type
    try:
        if DonatedItem.objects.filter(id=item_id).exists():
            target = get_object_or_404(DonatedItem, id=item_id)
            card_creator = target.donor
            action_type = 'Claim'
        elif DonationRequest.objects.filter(id=item_id).exists():
            target = get_object_or_404(DonationRequest, id=item_id)
            card_creator = target.beneficiary
            action_type = 'Pledge'
    except Exception as e:
        messages.error(request, f"Error finding target: {str(e)}")
        return redirect('profile')

    # Handle chat message submission
    if request.method == 'POST':
        form = ChatMessageForm(request.POST)
        if form.is_valid():
            chat_message = form.save(commit=False)
            chat_message.sender = sender
            chat_message.receiver = receiver
            chat_message.item_id = item_id
            chat_message.save()
            return redirect('chat', receiver_id=receiver.id, item_id=item_id)
    else:
        form = ChatMessageForm()

    # Retrieve chat messages
    messages = ChatMessage.objects.filter(
        (Q(sender=sender) & Q(receiver=receiver)) |
        (Q(sender=receiver) & Q(receiver=sender))
    ).order_by('timestamp')

    # Pass context to template
    context = {
        'form': form,
        'messages': messages,
        'receiver': receiver,
        'card_creator': card_creator,
        'action_type': action_type,
        'item': target,
    }
    return render(request, 'chat.html', context)


@login_required
def accept_request(request, receiver_id, item_id):
    receiver = get_object_or_404(Customer, id=receiver_id)
    sender = request.user
    try:
        if request.user.user_type == 'donor':
            item = get_object_or_404(DonatedItem, id=item_id, donor=sender)
            Donation.objects.create(donor=sender, beneficiary=receiver, item=item, pending=False)
            item.claimed = True
            item.save()
            item.delete()
        elif request.user.user_type == 'beneficiary':
            donation_request = get_object_or_404(DonationRequest, id=item_id, beneficiary=sender)
            item = DonatedItem.objects.create(
                category=donation_request.category,
                item_description=donation_request.item_description,
                quantity=donation_request.quantity,
                donor=receiver,
                img=donation_request.img
            )
            Donation.objects.create(donor=receiver, beneficiary=sender, item=item, pending=False)
            donation_request.received = True
            donation_request.save()
            item.claimed = True
            item.save()
            item.delete()
            donation_request.delete()
        messages.success(request, 'Request accepted successfully.')
    except Exception as e:
        messages.error(request, f"Error processing the request: {str(e)}")
        return redirect('chat', receiver_id=receiver.id, item_id=item_id)

    return redirect('chat', receiver_id=receiver.id, item_id=item_id)
        

@login_required
def user_chats(request):
    user = request.user
    sent_chats = ChatMessage.objects.filter(sender=user).values('receiver', 'item_id').distinct()
    received_chats = ChatMessage.objects.filter(receiver=user).values('sender', 'item_id').distinct()

    chat_partners = set()
    for chat in sent_chats:
        chat_partners.add((chat['receiver'], chat['item_id']))
    for chat in received_chats:
        chat_partners.add((chat['sender'], chat['item_id']))

    chat_data = []
    for partner_id, item_id in chat_partners:
        partner = Customer.objects.get(id=partner_id)
        chat_data.append({
            'partner': partner,
            'item_id': item_id
        })

    context = {
        'chat_data': chat_data,
    }
    return render(request, 'user_chats.html', context)

#admin view
def admin(request):
    return render(request, 'admint.html')