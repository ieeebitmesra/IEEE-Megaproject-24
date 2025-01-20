import streamlit as st
import datetime
import base64
import io
from PIL import Image, ImageDraw, ImageFont

def get_time_based_greeting():
    """Determine greeting based on current time with enhanced details."""
    current_hour = datetime.datetime.now().hour
    
    # Expanded greeting logic with more nuanced time-based styling
    if 5 <= current_hour < 12:
        return {
            "greeting": "Good Morning",
            "bg_color": "#FFF4E0",
            "accent_color": "#FFD700", 
            "text_color": "#333333",
            "icon": "☀️",
            "message": "Rise and shine! A brand new day awaits your brilliance.",
            "gradient_start": "#FFFFFF",
            "gradient_end": "#FFE5B4"
        }
    elif 12 <= current_hour < 17:
        return {
            "greeting": "Good Afternoon", 
            "bg_color": "#E6F3FF",
            "accent_color": "#87CEEB",
            "text_color": "#2C3E50", 
            "icon": "☕",
            "message": "Halfway through the day. Keep pushing forward!",
            "gradient_start": "#F0F8FF",
            "gradient_end": "#87CEEB"
        }
    elif 17 <= current_hour < 22:
        return {
            "greeting": "Good Evening",
            "bg_color": "#E6E6FA", 
            "accent_color": "#DDA0DD",
            "text_color": "#4A4A4A",
            "icon": "🌆",
            "message": "Time to unwind and reflect on your day's achievements.",
            "gradient_start": "#F0E6FF", 
            "gradient_end": "#DDA0DD"
        }
    else:
        return {
            "greeting": "Good Night", 
            "bg_color": "#191970", 
            "accent_color": "#4169E1",
            "text_color": "#FFFFFF",
            "icon": "🌙",
            "message": "Rest well. Tomorrow brings new opportunities.",
            "gradient_start": "#000080", 
            "gradient_end": "#191970"
        }

def create_custom_css():
    """Create custom CSS for improved styling and hover effects."""
    return f"""
    <style>
    .greeting-card {{
        background: linear-gradient(135deg, 
            {st.session_state.time_details['gradient_start']} 0%, 
            {st.session_state.time_details['gradient_end']} 100%);
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        padding: 30px;
        text-align: center;
        transition: all 0.3s ease;
        color: {st.session_state.time_details['text_color']};
        position: relative;
        overflow: hidden;
    }}
    
    .greeting-card:hover {{
        transform: scale(1.03);
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }}
    
    .greeting-icon {{
        font-size: 4rem;
        margin-bottom: 10px;
        animation: float 2s ease-in-out infinite;
    }}
    
    .greeting-title {{
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 10px;
        color: {st.session_state.time_details['accent_color']};
    }}
    
    .greeting-date {{
        font-size: 1.2rem;
        color: {st.session_state.time_details['text_color']};
        margin-bottom: 15px;
    }}
    
    .greeting-message {{
        font-size: 1.1rem;
        font-style: italic;
        opacity: 0.8;
        margin-top: 15px;
    }}
    
    @keyframes float {{
        0% {{ transform: translateY(0px); }}
        50% {{ transform: translateY(-10px); }}
        100% {{ transform: translateY(0px); }}
    }}
    </style>
    """

def create_greeting_card():
    """Create an enhanced, interactive greeting card using Streamlit."""
    # Retrieve time-based greeting details
    st.session_state.time_details = get_time_based_greeting()
    
    # Inject custom CSS
    st.markdown(create_custom_css(), unsafe_allow_html=True)
    
    # Create card container with enhanced styling
    st.markdown(f'''
    <div class="greeting-card">
        <div class="greeting-icon">{st.session_state.time_details['icon']}</div>
        <div class="greeting-title">{st.session_state.time_details['greeting']}</div>
        <div class="greeting-date">{datetime.datetime.now().strftime('%A, %B %d, %Y')}</div>
        <div class="greeting-message">{st.session_state.time_details['message']}</div>
    </div>
    ''', unsafe_allow_html=True)

def main():

    
    # Create the interactive greeting card
    create_greeting_card()
    
if __name__ == "__main__":
    main()
