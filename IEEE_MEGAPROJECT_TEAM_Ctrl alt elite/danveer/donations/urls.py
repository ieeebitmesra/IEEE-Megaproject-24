from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Home page
    path('register/', views.register, name='register'),  # Registration page
    path('login/', views.login_view, name='login'),  # Login page
    path('logout/', views.custom_logout, name='logout'), #Logout page
    path('profile/', views.profile, name='profile'),  # Profile page
    path('donate/', views.donate, name='donate'),  # Donation page for Donor
    path('request-donation/', views.request_donation, name='request_donation'),  # Request donation page
    path('explore/', views.explore, name='explore'),  # Explore page
    path('chat/<int:receiver_id>/<int:item_id>/', views.chat, name='chat'), #Chat page
    path('accept_request/<int:receiver_id>/<int:item_id>/', views.accept_request, name='accept_request'), #Accept Functionality on chat page
    path('user-chats/', views.user_chats, name='user_chats'), #Donor's chats
    path('admin/', views.admin, name='admin'),  # Admin page
]