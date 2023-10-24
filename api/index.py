from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
secret_key = os.getenv('SECRET_KEY')

app = Flask(__name__)
CORS(app)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/json")
def hello_json():
    return jsonify({"message": f"Hello, World! {secret_key}"})

if __name__ == '__main__':
    app.run(debug=True)