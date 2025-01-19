#The following code will not be used in the frontend, it has only be kept to know the development history

from algosdk import transaction
from algosdk.transaction import StateSchema, ApplicationCreateTxn
from algosdk.v2client import algod
import os
from dotenv import load_dotenv
import base64

load_dotenv()

algod_token = os.getenv("TESTNET_ALGOD_TOKEN")
algod_url = os.getenv("TESTNET_ALGOD_URL")
algod_client = algod.AlgodClient(algod_token, algod_url)
address = os.getenv("ADDRESS")
creator_private_key = os.getenv("PRIVATE_KEY")

def compile_program(client, source_code):
    compile_response = client.compile(source_code)
    return base64.b64decode(compile_response['result']), compile_response['hash']

def deploy_survey_contract(question, option1, option2):
    with open("approval.teal", "r") as f:
        approval_program = f.read()

    with open("clear.teal", "r") as f:
        clear_program = f.read()

    approval_program_compiled, approval_program_hash = compile_program(algod_client, approval_program)
    clear_program_compiled, clear_program_hash = compile_program(algod_client, clear_program)

    # Set up the schema for global and local state
    global_schema = StateSchema(num_uints=2, num_byte_slices=4)
    local_schema = StateSchema(num_uints=0, num_byte_slices=0)

    # Suggested transaction parameters
    params = algod_client.suggested_params()
    
    # Pass the actual question and options as arguments
    app_args = [
        question.encode(),
        option1.encode(),
        option2.encode()
    ]

    # Create  the application creation transaction
    txn = ApplicationCreateTxn(
        sender=address,
        sp=params,
        on_complete=transaction.OnComplete.NoOpOC.real,
        approval_program=approval_program_compiled,
        clear_program=clear_program_compiled,
        global_schema=global_schema,
        local_schema=local_schema,
        app_args=app_args
    )

    # Sign and send the transaction
    signed_txn = txn.sign(creator_private_key)
    txid = algod_client.send_transaction(signed_txn)

    # Wait for confirmation
    confirmed_txn = transaction.wait_for_confirmation(algod_client, txid, 4)
    app_id = confirmed_txn['application-index']
    return app_id

def survey():
    question = "What is your favorite color?"
    option1 = "Blue"
    option2 = "Green"

    app_id = deploy_survey_contract(question, option1, option2)
    print(f"Deployed App ID: {app_id}")

if __name__ == "__main__":
    # Define the question and options at deployment
    survey()
    
