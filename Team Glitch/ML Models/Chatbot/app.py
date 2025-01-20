from flask import Flask, request, jsonify
import random
import json
import torch
from model import NeuralNet
from chatbot import bag_of_words, tokenize

# Initialize Flask app
app = Flask(__name__)

# Load chatbot data and model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('mental_health_updated.json', 'r') as f:
    intents = json.load(f)

FILE = "datta.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "peace"

# Define a route for the chatbot
@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    # Tokenize and process input
    sentence = tokenize(user_input)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X)

    # Get model prediction
    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    # Generate response
    if prob.item() > 0.75:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                response = random.choice(intent['responses'])
                return jsonify({"bot_name": bot_name, "response": response})
    else:
        return jsonify({"bot_name": bot_name, "response": "I didn't understand that. Can you rephrase?"})

# Run the app
if __name__ == '__main__':
    print("Flask app is starting...")
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
