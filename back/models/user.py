from back.models import db
import bcrypt

class User(db.Model):
    __tablename__ = 'user'

    user_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    user_name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def __init__(self, first_name, last_name, user_name, email, password_hash):
        self.first_name = first_name
        self.last_name = last_name
        self.user_name = user_name
        self.email = email
        self.password_hash = password_hash

    def __repr__(self):
        return f"<User {self.user_name}>"

    def set_password(password):
        password_hash = bcrypt.hashpw(password, bcrypt.gensalt())
        return password_hash
 