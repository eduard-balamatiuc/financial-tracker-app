from flask import Blueprint, jsonify, request
from back.models.Expenses import Expenses
from back import db
from back.routes.user_routes import token_required

expenses_route = Blueprint("expenses_route", __name__)


@expenses_route.route("/transaction", methods=["GET"])
@token_required
def show_all_transaction(current_user):
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

@expenses_route.route("/addtransaction", methods=["POST", "GET"])
def add_transaction():
    try:
        data = request.json  # Assuming the data is sent in JSON format

        # Extract data from the request JSON
        expenses_ID = data.get("expenses_ID")
        user_ID = data.get("user_ID")
        amount = data.get("amount")
        currency = data.get("currency")
        category_ID = data.get("category_ID")
        description = data.get("description")
        p_date = data.get("p_date")
        payment_method_ID = data.get("payment_method_ID")
        card_type = data.get("card_type")

        # Create a new Expenses instance
        new_transaction = Expenses(
               expenses_ID=expenses_ID,
               user_ID=user_ID,
               amount=amount,
               currency=currency,
               category_ID=category_ID,
               description=description,
               p_date=p_date,
               payment_method_ID=payment_method_ID,
               card_type=card_type

        )

        # Add the new transaction to the database
        db.session.add(new_transaction)
        db.session.commit()

        return jsonify({"message": "Transaction added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500