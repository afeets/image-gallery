from flask import Flask, request
from dotenv import load_dotenv
import requests
import os

load_dotenv(dotenv_path='./.env.local')

# from other import fn_from_other_module
# fn_from_other_module()

UNSPLASH_KEY = os.environ.get('UNSPLASH_API_KEY', "")
UNSPLASH_URL = 'https://api.unsplash.com/photos/random'

if not UNSPLASH_KEY:
  raise EnvironmentError("Please create .env.local file and insert UNSPLASH_API_KEY")

app = Flask(__name__)

@app.route("/new-image")
def new_image():
  word = request.args.get("query")
  
  headers = {
    "Authorization": "Client-ID " + UNSPLASH_KEY,
    "Accept-Version": "v1" 
  }
  
  params = {
    "query": word 
  }
 
  response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
  data = response.json()
  return data


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5050, debug=True)
