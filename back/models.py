from main import db
from sqlalchemy.dialects.postgresql import JSON

class User(db.Model):
    __tablename__ = 'user'
    
    user_ID = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    user_name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
    def __init__(self, first_name, last_name, user_name, email, password_hash):
        self.first_name = first_name
        self.last_name = last_name
        self.user_name = user_name
        self.email = email
        self.password_hash = password_hash
        
    def __repr__(self):
        return f'<user_ID {self.user_ID}>'
    
class Expenses(db.Model):
    __tablename__ = 'expenses'
    
    expenses_ID = db.Column(db.Integer, primary_key=True)
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
        return f'<expenses_ID {self.expenses_ID}>'
    
class Category(db.Model):
    __tablename__ = 'category'
    
    category_ID = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), unique=True, nullable=False)
    
    def __init__(self, category_name):
        self.category_name = category_name
        
    def __repr__(self):
        return f'<category_ID {self.category_ID}>'
    
class PaymentMethod(db.Model):
    __tablename__ = 'payment_method'
    
    payment_method_ID = db.Column(db.Integer, primary_key=True)
    c_type = db.Column(db.String(50), nullable=False)
    card_number = db.Column(db.String(50), nullable=False)
    bank = db.Column(db.String(50), nullable=False)
    
    def __init__(self, c_type, card_number, bank):
        self.c_type = c_type
        self.card_number = card_number
        self.bank = bank
        
    def __repr__(self):
        return f'<payment_method_ID {self.payment_method_ID}>'