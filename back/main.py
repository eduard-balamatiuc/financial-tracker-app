from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import jwt
import datetime
from functools import wraps
from flask_migrate import Migrate
from models import user, expense, category

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://aise:aise@123@localhost/yQuickDBD-Expanse-tracker.sql'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = user.query.filter_by(user_ID=data['user_ID']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    existing_user = user.query.filter_by(user_name=data['user_name']).first()

    if existing_user:
        return jsonify({'message': 'Username already exists!'}), 400

    new_user = user(
        first_name=data['first_name'],
        last_name=data['last_name'],
        user_name=data['user_name'],
        email=data['email']
    )
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201


@app.route('/login', methods=['POST'])
def login():
    auth = request.get_json()
    user = user.query.filter_by(user_name=auth['user_name']).first()

    if user and user.check_password(auth['password']):
        token = jwt.encode({'user_ID': user.user_ID, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                           app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token})

    return jsonify({'message': 'Invalid username or password!'}), 401


@app.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify({'message': f'Hello, {current_user.user_name}! This is a protected route.'})


# TODO method, currency in expenses if needed
@app.route('/transaction', methods=['GET'])
def show_all_transaction():
    trans_list = []

    # Assuming you want to retrieve transactions from the database
    expenses = expense.query.all()

    for expens in expenses:
        trans_list.append({
            "id": expens.expense_ID,
            "date": expens.date.strftime("%m/%d/%Y"),
            "method": "cash",  # Implement method in db
            "category": expens.category,
            "description": expens.description,
            "amount": float(expens.amount),
            "currency": "$",  # Implement currency in db
            "type": False
        })

    return jsonify(trans_list)


# TODO From where to calculate amount 1. def from expenses  2. another field in category
@app.route('/category', methods=['GET'])
def SpendingDoughnutChart():
    spending_list = []

    categ = category.query.all()

    for spendings in categ:
        spending_list.append({
            "category": spendings.category_name,
            "amount": "?"
        })

    return jsonify(spending_list)


if __name__ == '__main__':
    app.run(debug=True)

