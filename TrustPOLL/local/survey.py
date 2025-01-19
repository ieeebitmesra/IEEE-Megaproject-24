#The following code has been reducdant since the meeting with the mentor, since the data was been stored locally
import json
import os

# File to store survey data
SURVEY_FILE = "surveys.json"

def load_surveys():
    if os.path.exists(SURVEY_FILE):
        with open(SURVEY_FILE, "r") as file:
            return json.load(file)
    return {}

def save_surveys(surveys):
    with open(SURVEY_FILE, "w") as file:
        json.dump(surveys, file, indent=4)

def create_survey(question, option1, option2):
    surveys = load_surveys()  # Load existing surveys
    survey_id = len(surveys) + 1
    surveys[survey_id] = {
        "question": question,
        "options": {
            "1": option1,
            "2": option2
        },
        "responses": {
            "1": 0,
            "2": 0
        }
    }
    save_surveys(surveys)  # Save the new survey to file
    return survey_id

if __name__ == "__main__":
    # Get survey details from user input
    question = input("Enter the survey question: ")
    option1 = input("Enter option 1: ")
    option2 = input("Enter option 2: ")

    # Create the survey
    survey_id = create_survey(question, option1, option2)
    print(f"Survey created with ID: {survey_id}")
