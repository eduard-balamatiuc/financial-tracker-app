from back.models import db
import bcrypt


class Users(db.Model):
    user_ID = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        pwhash = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        self.password_hash = pwhash.decode('utf8')

    def check_password(self, plaintext_password, hashed_password):
        return bcrypt.checkpw(plaintext_password.encode('utf8'), hashed_password)
