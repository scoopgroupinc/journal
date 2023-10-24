from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

# exposing mail & db to match original code...
mail = Mail()
db = SQLAlchemy()
