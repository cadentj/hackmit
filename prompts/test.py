import requests
import os
import openai

openai.organization = "YOUR_ORG_ID"
openai.api_key = os.getenv("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")
openai.Model.list()

url = "https://api.openai.com/v1/chat/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_OPENAI_API_KEY"  # Replace with your actual API key
}

data = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Say this is a test!"}],
    "temperature": 0.7
}

response = requests.post(url, headers=headers, json=data)

print(response.json())

