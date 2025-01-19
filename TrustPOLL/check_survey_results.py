import base64
from algosdk.v2client import algod
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Algorand client
algod_token = os.getenv("TESTNET_ALGOD_TOKEN")
algod_url = os.getenv("TESTNET_ALGOD_URL")
algod_client = algod.AlgodClient(algod_token, algod_url)

# Application ID of the deployed smart contract
app_id = int(os.getenv("APP_ID"))

def get_survey_results():
    results = algod_client.application_info(app_id)
    global_state = results['params']['global-state']
    response1 = 0
    response2 = 0
    for item in global_state:
        key = base64.b64decode(item['key']).decode('utf-8')
        if key == 'Response1':
            response1 = item['value']['uint']
        elif key == 'Response2':
            response2 = item['value']['uint']
    return {'Response1': response1, 'Response2': response2}

if __name__ == "__main__":
    survey_results = get_survey_results()
    print(f"Survey Results: {survey_results}")