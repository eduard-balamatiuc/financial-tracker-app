from back.models import db

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