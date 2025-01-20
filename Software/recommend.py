import os
import pandas as pd
import json
import requests 

def generate_recommendations(auth_token):
    # Use the direct path to the retrieved_values.json file
    json_file_path = os.path.join(os.path.dirname(__file__), 'retrieved_values.json')
    
    # Load pin values from the saved JSON file
    with open(json_file_path, 'r') as f:
        pin_values_dict = json.load(f)

    # Convert dictionary to DataFrame
    pin_values_df = pd.DataFrame(pin_values_dict)

    # Perform calculations
    total_energy = pin_values_df['V3'].sum()
    total_power = pin_values_df['V2'].sum()

    # Set baseline values
    baseline_energy = 26  # kWh
    baseline_power = 10    # kW

    # Generate recommendations
    recommendations = []

    if total_energy > baseline_energy:
        recommendations.append("Your energy consumption is higher than the average. Consider implementing energy-saving measures.")
        recommendations.append("Remember to turn off appliances when not in use to save energy.")

    if total_power > baseline_power:
        recommendations.append("Your power consumption is higher than the average. Monitor high-power appliances and consider energy-efficient alternatives.")

    # Send recommendations to Blynk
    send_recommendations_to_blynk(recommendations, auth_token)

    return recommendations

# Function to send recommendations to Blynk
def send_recommendations_to_blynk(recommendations, auth_token):
    blynk_url = f"https://blynk.cloud/external/api/sendNotification?token={auth_token}"
    for idx, recommendation in enumerate(recommendations, start=1):
        notification_message = f"Recommendation {idx}: {recommendation}"
        response = requests.get(blynk_url, params={"message": notification_message})

        if response.status_code == 200:
            print(f"Notification {idx} sent successfully to Blynk.")

if __name__ == "__main__":
    auth_token = "3P3MOCTij9_YMXJC8UvHsjSM3V4S####"
    recommendations = generate_recommendations(auth_token)

    if recommendations:
        print("Recommendations:")
        for idx, recommendation in enumerate(recommendations, start=1):
            print(f"{idx}. {recommendation}")
    else:
        print("No recommendations at this time. Keep up the good work!")
