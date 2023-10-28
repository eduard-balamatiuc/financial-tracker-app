from flask import Flask
from back.models import db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:aisee7oh@localhost:5432/financialtracker'

# Initialize the 'db' instance with your Flask app
db.init_app(app)


