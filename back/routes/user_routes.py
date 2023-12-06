from flask import Blueprint, request, jsonify

from back.models.Users import Users
from back import db, app
import jwt
import datetime
from flask import render_template
from flask_wtf import FlaskForm
import bcrypt
from bcrypt import checkpw, gensalt, hashpw
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo
from flask import render_template, redirect, url_for
from functools import wraps

# Create a Blueprint for the user routes
user_routes = Blueprint("user_routes", __name__)


class RegistrationForm(FlaskForm):
    user_name = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password',
                             validators=[DataRequired(), EqualTo('confirm', message='Passwords must match')])
    confirm = PasswordField('Confirm Password')


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        print(request.headers)
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = Users.query.filter_by(user_ID=data['user_ID']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


@user_routes.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm')

        if password != confirm_password:
            return jsonify({'message': 'Password and confirmation do not match'}), 400

        existing_user = Users.query.filter_by(user_name=user_name).first()

        if existing_user:
            return jsonify({'message': 'User already exists'}), 400

        # Hashing the password
        pwhash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        pwhash = pwhash.decode('utf-8')
        #print(pwhash)
        # Get the last users id and then adding one to it
        user_id = Users.query.order_by(Users.user_ID.desc()).first().user_ID + 1
        print(user_id)
        new_user = Users(user_ID=user_id, user_name=user_name, email=email, password_hash=pwhash)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully!'}), 201
    return render_template('register.html')


@user_routes.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        user_name = request.form.get('user_name')
        password = request.form.get('password')
        print(password)
        user = Users.query.filter_by(user_name=user_name).first()
        if not user:
            return jsonify({'message': 'Username does not exist!'}), 401

        print(user.password_hash)

        if not bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
            return jsonify({'message': 'Invalid password!'}), 401

        token = jwt.encode({
            'user_ID': user.user_ID,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        print(f'Token generated: {token}')

        return jsonify({'token': token.decode('utf-8')})

    return render_template('login.html')


@user_routes.route('/clean', methods=['GET', 'POST'])
def clean(current_user):
    for user in Users.query.all():
        if user.user_ID == 1:
            continue
        #db.session.delete(user)
    #db.session.commit()
    return jsonify({'message': 'Database cleaned!'}), 200


@user_routes.route('/allusers', methods=['GET'])
@token_required
def print_users(current_user):
    users = Users.query.all()
    user_list = [{'user_name': user.user_name, 'email': user.email} for user in users]

    return jsonify({'users': user_list})
