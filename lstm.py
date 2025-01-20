import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
import os
import plotly.graph_objs as go
import plotly.express as px

# Set page configuration
st.set_page_config(
    page_title="Water Quality Forecast",
    page_icon=":droplet:",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for improved styling
st.markdown("""
<style>
    .stApp {
        background-color: #f0f2f6;
    }
    .stTitle {
        color: #2C3E50;
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 30px;
    }
    .stSubheader {
        color: #34495E;
        font-size: 1.5rem;
    }
    .stDataFrame {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .stDownloadButton {
        background-color: #3498DB;
        color: white !important;
        border-radius: 5px;
    }
</style>
""", unsafe_allow_html=True)

# Directory paths for datasets and models
DATA_DIR = r"C:\Users\Dell\Downloads\DL\DSA\Arrays\SIH1694_19975_AquaVisionAI\SIH1694_19975_AquaVisionAI\New Dataset"
MODEL_DIR = r"C:\Users\Dell\Downloads\DL\DSA\Arrays\SIH1694_19975_AquaVisionAI\SIH1694_19975_AquaVisionAI\Ganga Models"

# Parameters to include in forecasting
parameters = ['Biochemical Oxygen Demand', 'Conductivity', 'Dissolved Oxygen', 
              'Fecal Coliform', 'Fecal Streptococci', 'Temperature', 'Turbidity', 
              'Nitrate', 'pH', 'Rainfall', 'Total Coliform']

# Enhanced risk categorization function
def categorize_risk(parameter, value):
    """
    Categorize risk based on parameter and its forecasted value
    Returns: risk level (Low/Medium/High), color, and explanation
    """
    risk_thresholds = {
        'Biochemical Oxygen Demand': [
            (3, 'green', 'Good water quality'), 
            (6, 'orange', 'Moderate pollution'), 
            (6, 'red', 'High pollution risk')
        ],
        'Conductivity': [
            (200, 'green', 'Low mineral content'), 
            (500, 'orange', 'Moderate mineral content'), 
            (500, 'red', 'High mineral contamination')
        ],
        'Dissolved Oxygen': [
            (6, 'green', 'Healthy oxygen levels'), 
            (4, 'orange', 'Low oxygen, potential stress'), 
            (4, 'red', 'Critical oxygen depletion')
        ],
        'Fecal Coliform': [
            (100, 'green', 'Safe levels'), 
            (1000, 'orange', 'Moderate contamination'), 
            (1000, 'red', 'High bacterial risk')
        ],
        'Fecal Streptococci': [
            (100, 'green', 'Safe levels'), 
            (500, 'orange', 'Moderate contamination'), 
            (500, 'red', 'High bacterial risk')
        ],
        'Temperature': [
            (20, 'green', 'Optimal range'), 
            (30, 'orange', 'Elevated temperature'), 
            (30, 'red', 'Extreme temperature')
        ],
        'Turbidity': [
            (5, 'green', 'Clear water'), 
            (10, 'orange', 'Moderate cloudiness'), 
            (10, 'red', 'High turbidity')
        ],
        'Nitrate': [
            (10, 'green', 'Safe nitrate levels'), 
            (20, 'orange', 'Elevated nitrates'), 
            (20, 'red', 'High nitrate contamination')
        ],
        'pH': [
            (6.5, 'green', 'Neutral pH'), 
            (8.5, 'orange', 'Slightly alkaline'), 
            (8.5, 'red', 'Extreme pH')
        ],
        'Rainfall': [
            (50, 'green', 'Normal rainfall'), 
            (100, 'orange', 'Heavy rainfall'), 
            (100, 'red', 'Extreme rainfall')
        ],
        'Total Coliform': [
            (100, 'green', 'Safe levels'), 
            (1000, 'orange', 'Moderate contamination'), 
            (1000, 'red', 'High bacterial risk')
        ]
    }
    
    thresholds = risk_thresholds.get(parameter, [(float('inf'), 'green', 'Unknown')])
    
    for threshold, color, explanation in reversed(thresholds):
        if value > threshold:
            if color == 'green':
                return 'Low Risk', color, explanation
            elif color == 'orange':
                return 'Medium Risk', color, explanation
            else:
                return 'High Risk', color, explanation
    
    return 'Low Risk', 'green', 'Safe conditions'

# Load data and model function (remains the same as in previous version)
def load_data_and_model(location):
    data_path = os.path.join(DATA_DIR, f"{location}.csv")
    model_path = os.path.join(MODEL_DIR, f"{location}_bi_lstm_forecast_model.keras")
    
    # Load dataset
    data = pd.read_csv(data_path)
    if 'Date' in data.columns:
        data['Date'] = pd.to_datetime(data['Date'], dayfirst=True, format='%d-%m-%Y')
        data.set_index('Date', inplace=True)
    data = data[parameters]
    
    # Normalize dataset
    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data)
    
    # Load model
    model = load_model(model_path)
    
    return data, data_scaled, scaler, model

# Create sequences function (remains the same)
def create_sequences(data, time_steps=10):
    return np.array([data[-time_steps:]])

# Main Streamlit app
def main():
    st.markdown('<h1 class="stTitle">💧 Ganga Water Quality Forecast</h1>', unsafe_allow_html=True)
    
    # Sidebar for location selection
    st.sidebar.header("Forecast Settings")
    locations = ["Rudraprayag", "Devprayag", "Bhagalpur", "Bijnor", "Ghazipur", 
                 "Kannauj", "Kanpur", "Murshidabad", "Naini", 
                 "Parganas", "Patna", "Prayagraj"]
    selected_location = st.sidebar.selectbox("Select Location", locations)
    
    # Load data and model for the selected location
    data, data_scaled, scaler, model = load_data_and_model(selected_location)
    
    # Generate forecast
    time_steps = 10
    forecast_steps = 5
    X_input = create_sequences(data_scaled, time_steps=time_steps)
    forecast = model.predict(X_input)
    forecast = forecast.reshape(forecast_steps, len(parameters))
    
    # Reverse scaling
    forecast_rescaled = scaler.inverse_transform(forecast)
    
    # Create a DataFrame for forecast results
    forecast_dates = pd.date_range(start=data.index[-1] + pd.Timedelta(days=1), periods=forecast_steps, freq='D')
    forecast_df = pd.DataFrame(forecast_rescaled, columns=parameters, index=forecast_dates)
    
    # Comprehensive Risk Analysis
    # Detailed Risk Visualization
    st.markdown('<h2 class="stSubheader">📊 Parameter Risk Forecast</h2>', unsafe_allow_html=True)

    # Create a grid of risk charts
    rows = [parameters[i:i+3] for i in range(0, len(parameters), 3)]
    for row in rows:
        cols = st.columns(3)
        for i, param in enumerate(row):
            with cols[i]:
                # Create donut chart
                risk_data = risk_details[param]
                values = [
                    risk_data['risks'].count('Low Risk'),
                    risk_data['risks'].count('Medium Risk'),
                    risk_data['risks'].count('High Risk')
                ]
                fig = go.Figure(data=[go.Pie(
                    labels=['Low Risk', 'Medium Risk', 'High Risk'],
                    values=values,
                    hole=0.5,
                    textinfo='percent+label',
                    textfont=dict(size=14, color="black"),
                    marker=dict(colors=['#2ecc71', '#f39c12', '#e74c3c'])
                )])
                
                # Customize layout
                fig.update_layout(
                    title=dict(
                        text=f"{param} Risk Forecast",
                        font=dict(size=18, color="#34495E"),
                        x=0.5,
                        xanchor='center'
                    ),
                    annotations=[
                        dict(
                            text=f"<b>{risk_data['overall_risk']}</b>",
                            x=0.5, y=0.5, font=dict(size=16, color="#34495E"), showarrow=False
                        )
                    ],
                    height=350,
                    margin=dict(t=50, b=10, l=0, r=0)
                )
                
                # Add chart to the Streamlit container
                st.plotly_chart(fig, use_container_width=True)

    
    # Categorize risks for all parameters
    risk_summary = {
        'Low Risk': [],
        'Medium Risk': [],
        'High Risk': []
    }
    
    # Prepare risk details
    risk_details = {}
    for param in parameters:
        param_risks = []
        param_explanations = []
        
        for day in range(forecast_steps):
            value = forecast_df.loc[forecast_df.index[day], param]
            risk, color, explanation = categorize_risk(param, value)
            param_risks.append(risk)
            param_explanations.append(explanation)
        
        # Determine overall parameter risk
        if all(r == 'Low Risk' for r in param_risks):
            overall_risk = 'Low Risk'
        elif any(r == 'High Risk' for r in param_risks):
            overall_risk = 'High Risk'
        else:
            overall_risk = 'Medium Risk'
        
        risk_summary[overall_risk].append(param)
        risk_details[param] = {
            'risks': param_risks,
            'explanations': param_explanations,
            'overall_risk': overall_risk
        }
    
    # Display Risk Summary
    col1, col2, col3 = st.columns(3)
    with col1:
        st.success("✅ Low Risk Parameters")
        for param in risk_summary['Low Risk']:
            st.write(f"- {param}")
    
    with col2:
        st.warning("⚠️ Medium Risk Parameters")
        for param in risk_summary['Medium Risk']:
            st.write(f"- {param}")
    
    with col3:
        st.error("🚨 High Risk Parameters")
        for param in risk_summary['High Risk']:
            st.write(f"- {param}")
    
    # Detailed Risk Visualization
    st.markdown('<h2 class="stSubheader">📊 Parameter Risk Forecast</h2>', unsafe_allow_html=True)
    
    # Create a grid of risk charts
    rows = [parameters[i:i+3] for i in range(0, len(parameters), 3)]
    for row in rows:
        cols = st.columns(3)
        for i, param in enumerate(row):
            with cols[i]:
                # Create donut chart
                risk_data = risk_details[param]
                fig = go.Figure(data=[go.Pie(
                    labels=['Low Risk', 'Medium Risk', 'High Risk'],
                    values=[
                        risk_data['risks'].count('Low Risk'),
                        risk_data['risks'].count('Medium Risk'),
                        risk_data['risks'].count('High Risk')
                    ],
                    hole=.4,
                    marker_colors=['green', 'orange', 'red']
                )])
                
                # Customize layout
                fig.update_layout(
                    title=f"{param} Risk Forecast",
                    title_x=0.5,
                    annotations=[
                        dict(
                            text=risk_data['overall_risk'], 
                            x=0.5, 
                            y=0.5, 
                            font_size=16, 
                            showarrow=False
                        )
                    ],
                    height=350,
                    margin=dict(t=50, b=0, l=0, r=0)
                )
                
                st.plotly_chart(fig, use_container_width=True)
    
    # Detailed Forecast Table
    st.markdown('<h2 class="stSubheader">📝 Detailed Forecast Data</h2>', unsafe_allow_html=True)
    st.dataframe(forecast_df, use_container_width=True)
    
    # Download Button
    st.download_button(
        label="Download Forecast Data",
        data=forecast_df.to_csv(index=True),
        file_name=f"{selected_location}_water_quality_forecast.csv",
        mime="text/csv",
        key="download-forecast"
    )

# Run the app
if __name__ == "__main__":
    main()
