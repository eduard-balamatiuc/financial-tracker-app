from main import db

class Category(db.Model):
    __tablename__ = 'category'
    
    category_ID = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), unique=True, nullable=False)
    
    def __init__(self, category_name):
        self.category_name = category_name
        
    def __repr__(self):
        return f'<category_ID {self.category_ID}>'
