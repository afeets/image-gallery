from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os
from mongo_client import mongo_client


gallery = mongo_client.gallery # Database
images_collection = gallery.images # Collection

load_dotenv(dotenv_path='./.env.local')

# from other import fn_from_other_module
# fn_from_other_module()

UNSPLASH_KEY = os.environ.get('UNSPLASH_API_KEY', "")
UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
  raise EnvironmentError("Please create .env.local file and insert UNSPLASH_API_KEY")

app = Flask(__name__)
CORS(app)

# insert_test_document()

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


@app.route("/images", methods=["GET","POST"])
def images():
  if request.method == "GET":
    # Read images from DB
    images = images_collection.find({})
    return jsonify([img for img in images])
  
  if request.method == "POST":
    # Add image metadata to DB
    image = request.get_json()
    image["_id"] = image.get("id")
    result = images_collection.insert_one(image)
    inserted_id = result.inserted_id
    return {"inserted_id": inserted_id}
    

@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    if request.method == "DELETE":
      result = images_collection.delete_one({"_id": image_id})
      if not result:
        return {"error", "Image was not deleted"}, 500
      if result and not result.deleted_count:
        return {"error", "Image not found"}, 404
      return {"deleted_id": image_id}, 204
    

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5050)
