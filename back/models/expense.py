from main import db 

class Expense(db.Model):
    __tablename__ = 'expense'
    
    expense_ID = db.Column(db.Integer, primary_key=True)
    user_ID = db.Column(db.Integer, db.ForeignKey('user.user_ID'), nullable=False)
    amount = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    category = db.Column(db.String(50), db.ForeignKey('category.category_name'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)

    def __init__(self, user_ID, amount, category, description, date):
        self.user_ID = user_ID
        self.amount = amount
        self.category = category
        self.description = description
        self.date = date
        
    def __repr__(self):
        return f'<expense_ID {self.expense_ID}>'
