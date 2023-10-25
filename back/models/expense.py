from back.models import db

class Expense(db.Model):
    __tablename__ = 'expense'
    
    expense_ID = db.Column(db.Integer, primary_key=True)
    user_ID = db.Column(db.Integer, db.ForeignKey('user.user_ID'), nullable=False)
    amount = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    category_ID = db.Column(db.String(50), db.ForeignKey('category.category_name'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    p_date = db.Column(db.Date, nullable=False)

    def __init__(self, user_ID, amount, category_ID, description, p_date):
        self.user_ID = user_ID
        self.amount = amount
        self.category_ID = category_ID
        self.description = description
        self.p_date = p_date
        
    def __repr__(self):
        return f'<expense_ID {self.expense_ID}>'