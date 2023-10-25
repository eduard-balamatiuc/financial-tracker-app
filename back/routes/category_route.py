from flask import Blueprint, jsonify
from back.models.category import Category

category_route = Blueprint("category_route", __name__)

@category_route.route("/category", methods=["GET"])
def SpendingDoughnutChart():
    spending_list = []

    category = Category.query.all()

    for spendings in category:
        spending_list.append({
            "category": spendings.category_name,
            "amount": "?"
        })

    return jsonify(spending_list)