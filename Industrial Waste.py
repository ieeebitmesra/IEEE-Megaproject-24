import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Seed for reproducibility
np.random.seed(42)

# Define industries data
industries = [
    {"name": "Chemical Plant", "location": "Kanpur", "effluents": {"Lead": 15, "Mercury": 3, "Cadmium": 5}},
    {"name": "Textile Factory", "location": "Varanasi", "effluents": {"Dyes": 20, "Acids": 10, "Heavy Metals": 7}},
    {"name": "Paper Mill", "location": "Allahabad", "effluents": {"Chlorine": 8, "Lignin": 12, "Sulfur": 10}},
    {"name": "Tannery", "location": "Kanpur", "effluents": {"Chromium": 25, "Sulfides": 18, "Ammonia": 30}},
    {"name": "Fertilizer Plant", "location": "Patna", "effluents": {"Nitrogen": 20, "Phosphates": 15, "Ammonia": 10}},
    {"name": "Steel Factory", "location": "Haridwar", "effluents": {"Iron": 25, "Carbon Residue": 18, "Heavy Metals": 12}},
    {"name": "Sugar Mill", "location": "Rishikesh", "effluents": {"Molasses": 30, "Organic Waste": 20, "Ammonia": 5}},
    {"name": "Oil Refinery", "location": "Bihar", "effluents": {"Hydrocarbons": 40, "Sulfur": 20, "Phenols": 10}},
    {"name": "Pharmaceutical Factory", "location": "Kolkata", "effluents": {"Antibiotics": 15, "Solvents": 10, "Chemicals": 25}},
    {"name": "Plastic Manufacturing", "location": "Varanasi", "effluents": {"Microplastics": 10, "Additives": 5, "Styrene": 7}},
    {"name": "Electronics Factory", "location": "Kanpur", "effluents": {"Lead": 20, "Nickel": 15, "Cadmium": 10}},
    {"name": "Automobile Plant", "location": "Patna", "effluents": {"Lubricants": 25, "Coolants": 10, "Metal Particles": 15}},
    {"name": "Food Processing Unit", "location": "Allahabad", "effluents": {"Organic Waste": 20, "Sugars": 10, "Phosphates": 5}},
    {"name": "Coal Power Plant", "location": "Haridwar", "effluents": {"Ash": 50, "Sulfur Dioxide": 25, "Nitrogen Oxides": 15}},
    {"name": "Paint Industry", "location": "Kolkata", "effluents": {"Solvents": 30, "Pigments": 20, "Heavy Metals": 10}},
    {"name": "Pharmaceutical Factory", "location": "Delhi", "effluents": {"Antibiotics": 60, "Solvents": 7, "Chemicals": 33}},
    {"name": "Oil Refinery", "location": "Rajasthan", "effluents": {"Hydrocarbons": 43, "Sulfur": 17, "Phenols": 40}},
    {"name": "Electronics Factory", "location": "Varanasi", "effluents": {"Lead": 15, "Nickel": 65, "Cadmium": 20}},
]

# Generate synthetic water quality data
n_samples = 100
data = []
for industry in industries:
    for _ in range(n_samples):
        effluent_concentrations = list(industry["effluents"].values())
        water_quality = [
            max(0, 7 - sum(effluent_concentrations) * 0.01),  # pH
            max(0, 10 - sum(effluent_concentrations) * 0.02),  # DO
            min(30, sum(effluent_concentrations) * 0.5),       # BOD
            min(100, sum(effluent_concentrations) * 2)         # TSS
        ]
        data.append({
            "Industry": industry["name"],
            "Location": industry["location"],
            **industry["effluents"],
            "pH": water_quality[0],
            "DO": water_quality[1],
            "BOD": water_quality[2],
            "TSS": water_quality[3],
        })

data_df = pd.DataFrame(data)

# Streamlit app
st.title("Industrial Effluent Water Quality and Pollution Prediction")

# Input city
city = st.text_input("Enter the city along the Ganga River belt (e.g., Kanpur, Varanasi, Allahabad, Patna, Haridwar, Rishikesh, Bihar, Kolkata): ").strip()

# Filter industries by city
filtered_industries = [ind for ind in industries if ind["location"].lower() == city.lower()]

if filtered_industries:
    st.write(f"Industries near {city}:")
    industry_names = [ind['name'] for ind in filtered_industries]
    industry_choice = st.selectbox("Select an Industry", industry_names)

    selected_industry = next(ind for ind in filtered_industries if ind['name'] == industry_choice)
    st.write(f"Effluents and their Concentrations (mg/L) for {selected_industry['name']} ({selected_industry['location']}):")
    
    effluents = selected_industry["effluents"]
    for effluent, concentration in effluents.items():
        st.write(f"  - {effluent}: {concentration} mg/L")

    # Pie chart visualization
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.pie(effluents.values(), labels=effluents.keys(), autopct="%1.1f%%", startangle=140)
    ax.set_title(f"Effluent Composition for {selected_industry['name']} ({selected_industry['location']})")
    st.pyplot(fig)
else:
    st.write(f"No industries found in {city}. Please try another city.")

# Train a predictive model
X = data_df.drop(columns=["Industry", "Location", "pH", "DO", "BOD", "TSS"])
y = data_df[["pH", "DO", "BOD", "TSS"]]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Display pollution reduction recommendations
st.subheader("Recommendations for Pollution Reduction")

recommendations = {
    "Chemical Plant": "Install advanced filtration systems to reduce heavy metal content.",
    "Textile Factory": "Adopt eco-friendly dyes and neutralize acidic discharges.",
    "Paper Mill": "Use chlorine-free bleaching processes to minimize chlorine discharge.",
    "Tannery": "Implement chromium recovery units and treat sulfides effectively.",
    "Fertilizer Plant": "Optimize nitrogen usage and control phosphate runoff.",
    "Steel Factory": "Introduce advanced slag treatment to minimize heavy metal discharge.",
    "Sugar Mill": "Adopt bio-digesters to manage organic waste efficiently.",
    "Oil Refinery": "Implement hydrocarbon recovery systems to minimize discharge.",
    "Pharmaceutical Factory": "Treat antibiotic discharges and minimize chemical solvents.",
    "Plastic Manufacturing": "Introduce plastic waste recycling and limit styrene emissions.",
    "Electronics Factory": "Recover heavy metals using advanced e-waste treatment.",
    "Automobile Plant": "Recycle lubricants and implement coolant recovery systems.",
    "Food Processing Unit": "Install anaerobic digesters to manage organic waste effectively.",
    "Coal Power Plant": "Introduce electrostatic precipitators to control ash and emissions.",
    "Paint Industry": "Adopt eco-friendly pigments and control solvent discharge."
}

for industry, recommendation in recommendations.items():
    st.write(f"{industry}: {recommendation}")
