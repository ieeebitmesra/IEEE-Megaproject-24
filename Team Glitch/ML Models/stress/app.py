from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model
model = pickle.load(open("model.pkl", "rb"))  # Replace with your model path

# Define API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from POST request
        data = request.get_json()

        # Validate input fields
        required_fields = [
            'Age', 'Gender', 'Sleep Hours', 'Exercise Hours',
            'Diet Quality', 'Social Interaction Score', 'Stress Level',
            'Work Hours', 'Screen Time', 'Financial Stress',
            'Chronic Illness', 'Family Support', 'Therapy Sessions'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"Missing field: {field}"}), 400  # HTTP 400 - Bad Request

        # Prepare features (pass raw input, let the model handle preprocessing)
        features = np.array([[
            data['Age'],
            data['Gender'],  # Pass 'Male' or 'Female' as string
            data['Sleep Hours'],
            data['Exercise Hours'],
            data['Diet Quality'],
            data['Social Interaction Score'],
            data['Stress Level'],
            data['Work Hours'],
            data['Screen Time'],
            data['Financial Stress'],
            data['Chronic Illness'],  # Pass 'Yes' or 'No' as string
            data['Family Support'],
            data['Therapy Sessions']
        ]])

        # Make predictions
        prediction = model.predict(features)

        # Return prediction as JSON
        return jsonify({'Predicted Stress Level': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # HTTP 500 - Internal Server Error


# Run Flask App
if __name__ == '__main__':  # Corrected condition
    app.run(debug=True)  # Use debug=False for production
