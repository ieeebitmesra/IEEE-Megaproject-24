## USE DBSCAN FROM oneDAL FOR ANAMOLY DETECTION

import json
import pandas as pd
import numpy as np
import daal4py as d4p

# Step 1: Load the JSON data
with open('sample_values.json') as f:
    data = json.load(f)

# Step 2: Convert JSON data into DataFrame
df = pd.DataFrame(data)

# Use Power (V2) and Voltage (V1) for anomaly detection
X = df[['V1', 'V2']].values

# Step 3: Apply DBSCAN using oneDAL
dbscan_algo = d4p.dbscan(minObservations=5, epsilon=0.5)  # You can adjust these hyperparameters
dbscan_result = dbscan_algo.compute(X)

# Extracting the labels (-1 is the label for noise, i.e., anomalies)
labels = dbscan_result.assignments.flatten()

# Step 4: Identify anomalies
anomalies = X[labels == -1]

# Print anomalies
print(f"Detected Anomalies:\n{anomalies}")

# Step 5: Add labels to the DataFrame for analysis
df['Anomaly'] = labels


