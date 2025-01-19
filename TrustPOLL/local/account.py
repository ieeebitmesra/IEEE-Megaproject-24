#The following code will not be used in the frontend, it has only be kept to know the development history

from algosdk import account, mnemonic
from algosdk.v2client import algod
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Algorand client
algod_token = os.getenv("TESTNET_ALGOD_TOKEN")
algod_url = os.getenv("TESTNET_ALGOD_URL")
algod_client = algod.AlgodClient(algod_token, algod_url)

def generate_account():
    private_key, address = account.generate_account()
    mnemonic_phrase = mnemonic.from_private_key(private_key)
    return private_key, address, mnemonic_phrase

def get_account_balance(address):
    account_info = algod_client.account_info(address)
    return account_info.get('amount')

# Example usage
if __name__ == "__main__":
    private_key, address, mnemonic_phrase = generate_account()
    print("Private Key:", private_key)
    print("Address:", address)
    print("Mnemonic Phrase:", mnemonic_phrase)
    balance = get_account_balance(address)
    print("Account balance: {} microAlgos".format(balance))