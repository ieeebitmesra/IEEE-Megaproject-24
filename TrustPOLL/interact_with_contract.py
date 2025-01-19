#The following code will not be used in the frontend, it has only be kept to know the development history

from algosdk import transaction
from algosdk.transaction import ApplicationNoOpTxn
from algosdk.v2client import algod
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up Algorand client
algod_token = os.getenv("TESTNET_ALGOD_TOKEN")
algod_url = os.getenv("TESTNET_ALGOD_URL")
algod_client = algod.AlgodClient(algod_token, algod_url)

# Retrieve user credentials and app ID
user_address = os.getenv("ADDRESS")
user_private_key = os.getenv("PRIVATE_KEY")
app_id = int(os.getenv("APP_ID"))

# Function to create a survey
def create_survey(question, option1, option2):
    params = algod_client.suggested_params()
    app_args = [
        question.encode(),   # Encode the question
        option1.encode(),    # Encode option 1
        option2.encode(),     # Encode option 2
    ]

    txn = ApplicationNoOpTxn(
        sender=user_address,
        sp=params,
        index=app_id,
        app_args=app_args
    )

    signed_txn = txn.sign(user_private_key)
    try:
        txid = algod_client.send_transaction(signed_txn)
    except:
        return None
        
    return txid

# Function to submit a response to the survey
def submit_response(option):
    params = algod_client.suggested_params()
    app_args = [
        b"vote",  # Corrected to explicitly use bytes
        str(option).encode()  # Ensure option is encoded and is either "1" or "2"
    ]

    txn = ApplicationNoOpTxn(
        sender=user_address,
        sp=params,
        index=app_id,
        app_args=app_args
    )

    signed_txn = txn.sign(user_private_key)
    txid = algod_client.send_transaction(signed_txn)
    return txid

# Main function to create a survey and submit a response
if __name__ == "__main__":
    # Survey creation
    #question = "What is your favorite color?"
    #option1 = "Blue"
    #option2 = "Green"
    
    #txid = create_survey(question, option1, option2)
    #print(f"Survey creation transaction ID: {txid}")

    # Response submission with option "1" (make sure it’s a string, not an integer)
    response_txid = submit_response("2")
    print(f"Response submission transaction ID: {response_txid}")
