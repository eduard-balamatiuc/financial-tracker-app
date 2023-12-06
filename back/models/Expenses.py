from back.models import db


class Expenses(db.Model):
    expenses_ID = db.Column(db.Integer, primary_key=True)
    user_ID = db.Column(db.Integer, db.ForeignKey('user.user_ID'), nullable=False)
    amount = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    category_ID = db.Column(db.String(50), db.ForeignKey('category.category_name'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    p_date = db.Column(db.Date, nullable=False)
