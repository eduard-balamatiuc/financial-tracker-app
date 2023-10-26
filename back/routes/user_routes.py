
from flask import Blueprint, request, jsonify
from back.models.user import User
from back import db, app
import jwt
import datetime
from flask import render_template
from flask_wtf import FlaskForm
import bcrypt
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo

# Create a Blueprint for the user routes
user_routes = Blueprint("user_routes", __name__)
salt = b'$2b$12$6HZE54Ds61FGKBTVFUFZIO'
print(salt)

class RegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    user_name = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo('confirm_password', message='Passwords must match')])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired()])

# write  a function to get the users from the user table from the db to checkt he connection
@user_routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    results = [
        {
            "user_ID": user.user_ID,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "user_name": user.user_name,
            "email": user.email,
            "password_hash": user.password_hash
        } for user in users]

    return jsonify(results)

# write a function to register a user and add them to the db
@user_routes.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    print(f'Form status: {form.validate_on_submit()}')
    print(f'the contet of the orm: {request.form}')
    if request.method == 'POST' and form.validate_on_submit():
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        user_name = request.form.get('user_name')
        email = request.form.get('email')
        password = request.form.get('password')
        password_hash = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        print(password_hash)
        user = User(first_name, last_name, user_name, email, password_hash)
        print(f'User: {user}')
        db.session.add(user)
        db.session.commit()
        return render_template('login.html')
    return render_template('register.html', form=form)

@user_routes.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        password = request.form.get('password')
        print(password)

        user = User.query.filter_by(user_name=user_name).first()
        print(user.password_hash)
        if not user:
            return jsonify({'message': 'Username does not exist!'}), 401

        print(check_password(password, user.password_hash))

        if not check_password(password, user.password_hash):
            return jsonify({'message': 'Invalid password!'}), 401

        token = jwt.encode({
            'user_ID': user.user_ID,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({'token': token})

    return render_template('login.html')



def check_password(plaintext_password, stored_password_hash, salt=salt):
    # Use the stored salt to hash the plaintext password
    hashed_password = bcrypt.hashpw(plaintext_password.encode('utf8'), bcrypt.gensalt())
    # Compare the generated hash with the stored hash
    return hashed_password == stored_password_hash


