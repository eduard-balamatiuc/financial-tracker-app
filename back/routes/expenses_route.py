from flask import Blueprint, jsonify
from back.models.Expenses import Expenses

expenses_route = Blueprint("expenses_route", __name__)

@expenses_route.route("/transaction", methods=["GET"])
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
