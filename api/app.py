from flask import Flask, request
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import json

#load_dotenv()
#API_KEY = os.getenv('API_KEY')
#ORG = os.getenv('ORG')
#openai.api_key = API_KEY
#openai.organization = ORG

app = Flask(__name__)
CORS(app)

#OPENAI SETTINGS
messages = [{"role": "system", "content":"Sei un assistente virtuale intelligente ed amichevole"}]
completion_model='gpt-3.5-turbo'
breakPoint = "\n\n'''\n\n"

@app.route('/api/ask', methods=['POST'])
def ask():
    query = request.data.decode('utf-8')

    query_json = json.loads(query)
    query_text = query_json['data']
    query_apikey = query_json['apikey']

    openai.api_key = query_apikey

    messages.append({"role": "user", "content":query_text})

    response = openai.ChatCompletion.create(model=completion_model, messages=messages, max_tokens=200, temperature=0.5)
    response_text = response["choices"][0]["message"]["content"]

    messages.pop()

    return response_text

if __name__ == '__main__':
    app.run(debug=True)