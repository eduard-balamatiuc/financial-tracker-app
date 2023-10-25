from flask import Flask, request, jsonify, render_template
from functools import wraps
from back import app
from back.models.Users import Users
from back.models.Expenses import Expenses
from back.models.Category import Category
from back.models import db
import jwt
import datetime


# Your routes and application configuration here
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = Users.query.filter_by(user_ID=data['user_ID']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json()
    existing_user = Users.query.filter_by(user_name=data['user_name']).first()

    if existing_user:
        return jsonify({'message': 'Username already exists!'}), 400

    new_user = Users(
        first_name=data['first_name'],
        last_name=data['last_name'],
        user_name=data['user_name'],
        email=data['email']
    )
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201


@app.route('/login', methods=['GET', 'POST'])
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


@app.route('/transaction', methods=['GET'])
def show_all_transaction():
    trans_list = []

    # Assuming you want to retrieve transactions from the database
    expenses = Expenses.query.all()

    for expense in expenses:
        trans_list.append({
            "id": expense.expenses_ID,
            "p_date": expense.p_date.strftime("%m/%d/%Y"),
            "method": "cash",  # Implement method in db
            "category_ID": expense.category_ID,
            "description": expense.description,
            "amount": float(expense.amount),
            "currency": "$",  # Implement currency in db
            "type": False
        })

    return jsonify(trans_list)


@app.route('/category', methods=['GET'])
def SpendingDoughnutChart():
    spending_list = []

    category = Category.query.all()

    for spendings in category:
        spending_list.append({
            "category": spendings.category_name,
            "amount": "?"
        })

    return jsonify(spending_list)


if __name__ == '__main__':
    app.run(debug=True)

