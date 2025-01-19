#The following code will not be used in the frontend, it has only be kept to know the development history

import json
import os

# File to store survey data
SURVEY_FILE = "surveys.json"

def load_surveys():
    if os.path.exists(SURVEY_FILE):
        with open(SURVEY_FILE, "r") as file:
            return json.load(file)
    return {}

def display_all_surveys():
    surveys = load_surveys()
    if not surveys:
        print("No surveys found.")
        return

    for survey_id, survey in surveys.items():
        print(f"Survey ID: {survey_id}")
        print(f"  Question: {survey['question']}")
        for option_id, option in survey['options'].items():
            print(f"    Option {option_id}: {option}")
        print()

if __name__ == "__main__":
    display_all_surveys()