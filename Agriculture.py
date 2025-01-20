import requests
import streamlit as st
import google.generativeai as genai
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Gemini API Configuration
GEMINI_API_KEY = 'AIzaSyD9NDUbjOJMIRwl0r01iJUt0TULSZb4U9k'  # Replace with your actual Gemini API key
genai.configure(api_key=GEMINI_API_KEY)

# Cities List for Dropdown
cities = [
    'Rudraprayag', 'Devprayag', 'Bijnor', 'Kannauj', 'Kanpur', 
    'Allahabad', 'Murshidabad', 'Ghazipur', 'Patna', 'Naini', 
    'Parganas', 'Bhagalpur'
]

# Coordinates for each city (latitude, longitude)
city_coordinates = {
    "Rudraprayag": (30.2833, 79.0167),
    "Devprayag": (30.1407, 78.5936),
    "Bijnor": (29.37, 78.14),
    "Kannauj": (27.0648, 79.9120),
    "Kanpur": (26.4499, 80.3319),
    "Allahabad": (25.4358, 81.8463),
    "Murshidabad": (24.0988, 88.2679),
    "Ghazipur": (25.5799, 83.5963),
    "Patna": (25.5941, 85.1376),
    "Bhagalpur": (25.271603, 87.025665),
    "Naini": (25.3871, 81.8597),
    "Parganas": (22.1848, 88.1891)  # Combined location
}
# Weatherstack API Configuration
WEATHERSTACK_API_KEY = 'ab6d41051236827b98913552b0ace13f'

def get_weather_data(city):
    """Fetch weather data for a given city using Weatherstack API."""
    if city not in city_coordinates:
        raise ValueError(f"City {city} not found.")
    lat, lon = city_coordinates[city]
    
    url = "http://api.weatherstack.com/current"
    params = {
        'access_key': WEATHERSTACK_API_KEY,
        'query': f"{lat},{lon}"
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if "current" in data:
            return {
                "temperature": data['current']['temperature'],
                "humidity": data['current']['humidity']
            }
        else:
            raise ValueError("No data found for the requested location.")
    else:
        raise ValueError(f"Error fetching weather data: {response.status_code} - {response.text}")

def query_agriculture_info_gemini(city, month, year, temperature, humidity):
    """Generate agricultural analysis using Gemini API."""
    model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""Agricultural Environment Analysis for {city}
Location Context:
- City: {city}
- Month: {month}
- Year: {year}
- Current Temperature: {temperature}°C
- Current Humidity: {humidity}%

Provide a comprehensive agricultural analysis including:
1. Crop Suitability: 
   - What crops are most suitable for this location and season?
   - What specific challenges might farmers face?
2. Soil and Climate Conditions:
   - Typical soil characteristics for {city}
   - How do the current temperature and humidity impact agricultural practices?
3. Recommended Agricultural Practices:
   - Irrigation strategies
   - Pest and disease management
   - Fertilization recommendations
4. Seasonal Considerations:
   - Critical agricultural activities for {month}
   - Potential weather-related risks
5. Historical Agricultural Performance:
   - Typical crop yields
   - Common agricultural patterns in this region

Detailed Analysis:"""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating agricultural analysis: {str(e)}"

def send_email(to_email, subject, body, image_url):
    """Send email using Gmail SMTP."""
    from_email = "agrobharat78@gmail.com"
    app_password = "vzvc qfyq tdad rrgb"

    msg = MIMEMultipart('mixed')
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    html_body = f"""
    <html>
        <body>
            <h2 style="color: green;">Irrigation Recommendation Report</h2>
            <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
                <tr><th style="background-color: #f2f2f2;">Soil Moisture</th><td>{body['soil_moisture']}%</td></tr>
                <tr><th style="background-color: #f2f2f2;">Temperature</th><td>{body['temperature']}°C</td></tr>
                <tr><th style="background-color: #f2f2f2;">Humidity</th><td>{body['humidity']}%</td></tr>
                <tr><th style="background-color: #f2f2f2;">Region</th><td>{body['region']}</td></tr>
                <tr><th style="background-color: #f2f2f2;">Soil Type</th><td>{body['soil_type']}</td></tr>
                <tr><th style="background-color: #f2f2f2;">Land Area</th><td>{body['land']} acres</td></tr>
                <tr><th style="background-color: #f2f2f2;">Irrigation Type</th><td>{body['irrigation_type']}</td></tr>
                <tr><th style="background-color: #f2f2f2;">Duration</th><td>{body['duration']} hours</td></tr>
                <tr><th style="background-color: #f2f2f2;">Total Cost</th><td>{body['total_cost']} INR</td></tr>
                <tr><th style="background-color: #f2f2f2;">Cost Weighted</th><td>{body['cost_weighted']}</td></tr>
                <tr><th style="background-color: #f2f2f2;">Total Distribution</th><td>{body['total_distribution']} m³</td></tr>
                <tr><th style="background-color: #f2f2f2;">Precipitation</th><td>{body['precipitation']} mm</td></tr>
            </table>
            <h3>Generated Irrigation Recommendations</h3>
            <p>{body['recommendation']}</p>
            <img src="{image_url}" alt="Agriculture Image" style="width: 100%; max-width: 600px; border-radius: 8px;"/>
        </body>
    </html>
    """

    msg.attach(MIMEText(html_body, 'html'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, app_password)
        server.sendmail(from_email, to_email, msg.as_string())
        st.success("Email sent successfully!")
    except Exception as e:
        st.error(f"Error sending email: {e}")
    finally:
        server.quit()

def get_gemini_recommendation(input_data):
    """Generate irrigation recommendation using Gemini API."""
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""You are an agricultural expert providing precise irrigation recommendations. 
    Analyze the following agricultural parameters and generate a detailed, actionable recommendation:

    Input Data: {input_data}

    In your recommendation, include:
    1. Optimal irrigation strategy
    2. Suggested irrigation duration
    3. Water conservation tips
    4. Potential challenges and mitigation strategies

    Recommendation should be concise, clear, and specific to the given agricultural context."""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating recommendation: {e}"

import streamlit as st

def main():
    """Main Streamlit application."""
    # Custom CSS for styling with light green to light blue gradient
    st.markdown("""
    <style>
    .stApp {
        background: linear-gradient(to bottom right, #90EE90, #ADD8E6);
        color: dark green;
    }
    .main-title {
        font-size: 3em;
        color: #2C3E50;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        margin-bottom: 30px;
        font-weight: bold;
    }
    /* Enhanced Tabs Styling */
    .stTabs {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    .stTabs [data-baseweb="tab-list"] {
        background-color: rgba(255,255,255,0.5);
        border-radius: 15px;
        padding: 5px;
        display: inline-flex;
        gap: 10px;
    }
    .stTabs [data-baseweb="tab"] {
        background-color: transparent;
        color: #2C3E50;
        border-radius: 10px;
        padding: 10px 20px;
        font-weight: 600;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        min-width: 150px;
        text-align: center;
    }
    .stTabs [data-baseweb="tab"][aria-selected="true"] {
        background-color: #4CAF50;
        color: white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .stTabs [data-baseweb="tab"]:hover {
        background-color: rgba(76, 175, 80, 0.2);
        transform: scale(1.05);
    }
    .stSelectbox, .stNumberInput, .stTextInput {
        background-color: rgba(255,255,255,0.8);
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 15px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .stButton>button:hover {
        background-color: #45a049;
        transform: scale(1.05);
        box-shadow: 0 6px 8px rgba(0,0,0,0.3);
    }
    .stMarkdown {
        background-color: rgba(255,255,255,0.7);
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 15px;
        color: #2C3E50;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    </style>
    """, unsafe_allow_html=True)

    # Combined Title
    st.markdown('<h1 class="main-title">🌱 Smart Agricultural Irrigation Assistant</h1>', unsafe_allow_html=True)

    # Tabs for different sections
    tab1, tab2 = st.tabs(["Agricultural Analysis", "Irrigation Recommendation"])

    with tab1:
        # Agricultural Analysis Section
        st.markdown("### Agricultural Environment Analysis")
        
        # City and Month Selection (moved from sidebar)
        city = st.selectbox("Select City", cities)
        month = st.selectbox("Select Month", [
            "January", "February", "March", "April", "May", "June", "July", "August", 
            "September", "October", "November", "December"
        ])
        month_int = {
            "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, 
            "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
        }.get(month, 1)
        year = st.number_input("Enter Year", min_value=2010, max_value=2100, value=2024)

        # Analysis Button
        if st.button("Get Agricultural Data", key="data_button"):
            try:
                # Fetch weather data
                weather_data = get_weather_data(city)
                temperature = weather_data['temperature']
                humidity = weather_data['humidity']

                st.subheader(f"Agricultural Analysis for {city.title()}")
                
                # Display weather information
                st.markdown(f"""
                ### Weather Conditions
                - **Temperature**: {temperature}°C
                - **Humidity**: {humidity}%
                """)

                # Generate agricultural analysis using Gemini
                agri_info = query_agriculture_info_gemini(city, month, year, temperature, humidity)
                st.markdown("### Detailed Analysis")
                st.write(agri_info)

            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

    with tab2:
        # Irrigation Recommendation Section
        st.markdown("### Irrigation Recommendation System")

        # Collect user input
        st.markdown("#### Enter Irrigation Details")
        col1, col2 = st.columns(2)

        with col1:
            soil_moisture = st.number_input("Soil Moisture (%)", min_value=0.0, max_value=100.0)
            temperature = st.number_input("Temperature (°C)", min_value=-50.0, max_value=60.0)
            humidity = st.number_input("Humidity (%)", min_value=0.0, max_value=100.0)
            region = st.text_input("Region")

        with col2:
            soil_type = st.selectbox("Soil Type", options=["Loam", "Clay", "Sand"])
            land = st.number_input("Land Area (acres)", min_value=0.1, max_value=1000.0)
            irrigation_type = st.selectbox("Irrigation Type", options=["Drip", "Sprinkler"])
            duration = st.number_input("Duration (hours)", min_value=0.0, max_value=24.0)

        # Additional details in another row
        col3, col4 = st.columns(2)

        with col3:
            total_cost = st.number_input("Total Cost (INR)", min_value=0.0)
            cost_weighted = st.number_input("Cost Weighted", min_value=0.0)

        with col4:
            total_distribution = st.number_input("Total Distribution (m³)", min_value=0.0)
            precipitation = st.number_input("Precipitation (mm)", min_value=0.0)

        contact_info = st.text_input("Email Address for Recommendations")

        if st.button("Get Recommendation"):
            input_data = f"soil_moisture: {soil_moisture}, temperature: {temperature}, humidity: {humidity}, region: {region}, soil_type: {soil_type}, land: {land}, irrigation_type: {irrigation_type}, duration: {duration}, total_cost: {total_cost}, cost_weighted: {cost_weighted}, total_distribution: {total_distribution}, precipitation: {precipitation}"
            recommendation = get_gemini_recommendation(input_data)

            st.subheader("Recommendation")
            st.write(recommendation)

            if contact_info:
                body = {
                    'soil_moisture': soil_moisture,
                    'temperature': temperature,
                    'humidity': humidity,
                    'region': region,
                    'soil_type': soil_type,
                    'land': land,
                    'irrigation_type': irrigation_type,
                    'duration': duration,
                    'total_cost': total_cost,
                    'cost_weighted': cost_weighted,
                    'total_distribution': total_distribution,
                    'precipitation': precipitation,
                    'recommendation': recommendation
                }

                image_url = "https://h2oglobalnews.com/wp-content/uploads/2023/09/Sprinkler-irrigation-system-smart-water-conservation-technique-farmsio.jpg.webp2"
                send_email(contact_info, "Irrigation Recommendation", body, image_url)

if __name__ == "__main__":
    main()
