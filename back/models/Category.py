from back.models import db

class Category(db.Model):
    category_ID = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), unique=True, nullable=False)
