import json
import pandas as pd
import daal4py as d4p
import numpy as np
import os

def get_predictions():
    # Define the path to your JSON file
    json_file_path = os.path.join(os.path.dirname(__file__), 'sample_values.json')

    # Load the JSON data
    with open(json_file_path) as f:
        data = json.load(f)

    # Convert JSON data into DataFrame
    df = pd.DataFrame(data)

    # Use Power (V2) as the target variable (Y) and Voltage (V1) as the feature (X)
    X = np.array(df['V1']).reshape(-1, 1)  # Feature (Voltage)
    y = np.array(df['V2']).reshape(-1, 1)  # Target (Power)

    # Create and train the Linear Regression model using oneDAL
    train_algo = d4p.linear_regression_training()
    train_result = train_algo.compute(X, y)

    # Extract the trained model
    model = train_result.model

    # Predict Power using the trained model
    predict_algo = d4p.linear_regression_prediction()
    predictions = predict_algo.compute(X, model)

    # Step 1: Calculate total future consumption and cost
    cost_per_unit = 0.10  # Example cost per unit of power

    # Calculate the total predicted power consumption
    total_future_consumption = predictions.prediction.sum()

    # Calculate the total cost based on future consumption
    total_future_cost = total_future_consumption * cost_per_unit

    return total_future_consumption, total_future_cost
