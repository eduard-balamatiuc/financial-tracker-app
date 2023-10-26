
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
    password = PasswordField('Password', validators=[DataRequired(), EqualTo('confirm', message='Passwords must match')])
    confirm = PasswordField('Confirm Password')


@user_routes.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if request.method == 'POST':
        data = form.data
        existing_user = User.query.filter_by(user_name=data['user_name']).first()
        if existing_user is None:
            print('data:', data)
            password = data['password'].encode('utf-8')
            password_hash = User.set_password(password)
            new_user = User(
                first_name=data['first_name'],
                last_name=data['last_name'],
                user_name=data['user_name'],
                email=data['email'],
                password_hash=password_hash
            )
            print(f"this is the new user: {new_user}")
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'User registered successfully!'}), 201
        else:
            return jsonify({'message': 'User already exists'}), 400

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


