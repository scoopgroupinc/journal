"""App entry point."""
"""Initialize Flask app."""
import os
from flask import Flask, request, jsonify
from flask_restful import Api
from flask_mail import Mail
from server import db, mail
from flask_cors import CORS
from dotenv import load_dotenv
<<<<<<< Updated upstream
from services import sentiment_analysis
from context import session_state
=======
from datetime import datetime
>>>>>>> Stashed changes

load_dotenv()
secret_key = os.getenv('SECRET_KEY')
clarifai_key=os.environ.get("CLARIFAI_PATH")

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

    mail = Mail(app)
    
    @app.route("/api/json")
    def hello_json():
        return jsonify({"message": f"Hello, World! {secret_key}."})
    
    @app.route("/api/sentiment")
    def sentiment():
        return sentiment_analysis(clarifai_key,session_state['input'])

    @app.route('/api/save_html', methods=['POST'])
    def save_html():
        # Parse HTML data from the incoming request
        data = request.json['data']  # this will be your HTML string
        now = datetime.now()

        # Format the date and time
        formatted_date_time = now.strftime("%Y-%m-%d-%H-%M-%S")
        # Define the path and name of the file
        file_path = os.path.join(os.getcwd(), f'{formatted_date_time}.html')  # saves the file in the current working directory

        # Save the HTML string to a local file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(data)

        # Send a response to the client (optional)
        return jsonify({'message': 'HTML content saved successfully!'})



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
