from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/json")
def hello_json():
    return jsonify({"message": "Hello, World!"})

if __name__ == '__main__':
    app.run(debug=True)