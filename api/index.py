"""App entry point."""
"""Initialize Flask app."""
import os
from flask import Flask, jsonify
from flask_restful import Api
from flask_mail import Mail
from server import db, mail
from flask_cors import CORS
from dotenv import load_dotenv
from services import sentiment_analysis

load_dotenv()
secret_key = os.getenv('SECRET_KEY')

def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    CORS(app)

    mail = Mail(app)

    # This is the configuration for the email server.
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 465
    app.config["MAIL_USERNAME"] = os.environ.get("EMAIL_HOST_USER")
    app.config["MAIL_PASSWORD"] = os.environ.get("EMAIL_HOST_PASSWORD")
    app.config["MAIL_USE_TLS"] = False
    app.config["MAIL_USE_SSL"] = True
    app.config["CLARIFAI_PATH"] = os.environ.get("CLARIFAI_PATH")

    @app.route("/api/json")
    def hello_json():
        return jsonify({"message": f"Hello, World! {secret_key}."})
    
    @app.route("/api/sentiment")
    def sentiment():
        return sentiment_analysis()

    mail = Mail(app)

    app.config.from_object("config.Config")

    api = Api(app=app)

    from users.routes import create_authentication_routes

    create_authentication_routes(api=api)

    from entries.routes import create_entries_routes
    create_entries_routes(api=api)

    db.init_app(app)

    with app.app_context():

        db.create_all()  # Create database tables for our data models

        return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
