#The following code has been reducdant since the meeting with the mentor, since the data was been stored locally

import json
import os
import hashlib
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

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

def get_survey(survey_id):
    surveys = load_surveys()
    return surveys.get(str(survey_id), "Survey not found")

def submit_response(survey_id, option, voter_id):
    surveys = load_surveys()
    survey = surveys.get(str(survey_id))

    if survey and option in survey["responses"]:
        # Initialize the voters list if it doesn't exist
        if "voters" not in survey:
            survey["voters"] = []

        # Check if the voter has already voted
        if voter_id in survey["voters"]:
            return "You have already voted in this survey."

        # Record the vote and add voter_id to the list
        survey["responses"][option] += 1
        survey["voters"].append(voter_id)
        
        save_surveys(surveys)  # Save updated survey data
        return "Response recorded"
    else:
        return "Invalid survey ID or option"

def check_voter(survey, voter_id):
    # Check if the voter has already voted
    return voter_id in survey.get("voters", [])

if __name__ == "__main__":
    # Get and hash the private key
    private_key = os.getenv("PRIVATE_KEY")
    voter_id = hashlib.sha256(private_key.encode()).hexdigest()

    # Display survey details
    survey_id = input("Enter the survey ID: ")
    survey = get_survey(survey_id)
    
    if survey != "Survey not found":
        # Check if the user has already voted
        if not check_voter(survey, voter_id):
            print(json.dumps(survey, indent=4))  # Display survey details
            
            # Record a vote
            choice = input("Enter your choice (1 or 2): ")

            if choice in ["1", "2"]:
                # Process the vote
                print(submit_response(survey_id, choice, voter_id))
            else:
                print("Invalid choice")
            
            # Display updated survey details
            print(json.dumps(get_survey(survey_id), indent=4))
        else:
            print("You have already voted in this survey.")
    else:
        print(survey)  # Print "Survey not found"
