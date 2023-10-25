
from flask import Blueprint, request, jsonify
from back.models.Users import Users
from back import db, app
import jwt
import datetime
from flask import render_template
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo
from flask import render_template
# Create a Blueprint for the user routes
user_routes = Blueprint("user_routes", __name__)


class RegistrationForm(FlaskForm):
    user_name = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo('confirm', message='Passwords must match')])
    confirm = PasswordField('Confirm Password')


@user_routes.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        data = form.data
        existing_user = Users.query.filter_by(user_name=data['user_name']).first()
        if existing_user:
            return jsonify({'message': 'Username already exists!'}), 400

        new_user = Users(
            user_name=data['user_name'],
            email=data['email']
        )
        new_user.set_password(data['password'])

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully!'}), 201
    return render_template('register.html', form=form)


@user_routes.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        password = request.form.get('password')

        user = Users.query.filter_by(user_name=user_name).first()

        if not user:
            return jsonify({'message': 'Username does not exist!'}), 401

        if not user.check_password(password):
            return jsonify({'message': 'Invalid password!'}), 401

        token = jwt.encode({
            'user_ID': user.user_ID,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({'token': token})

    return render_template('login.html')
