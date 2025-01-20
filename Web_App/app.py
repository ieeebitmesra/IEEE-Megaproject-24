from flask import Flask, jsonify, render_template
import sys
import os

# Add the WattSmart_Wizard directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from Software.recommend import generate_recommendations
from Machine_Learning_Models.predictions import get_predictions  # Import your prediction function

app = Flask(__name__)

@app.route('/wwsite', methods=['GET'])
def get_recommendations_and_predictions():
    auth_token = "3P3MOCTij9_YMXJC8UvHsjSM3V4S####"  # Use the actual token
    
    # Get recommendations
    recommendations = generate_recommendations(auth_token)

    # Get predictions
    try:
        total_future_consumption, total_future_cost = get_predictions()
    except Exception as e:
        total_future_consumption, total_future_cost = None, None

    # Render the results in the HTML template
    return render_template('results.html', 
                           recommendations=recommendations, 
                           total_future_consumption=total_future_consumption, 
                           total_future_cost=total_future_cost)

if __name__ == '__main__':
    app.run(debug=True)
    