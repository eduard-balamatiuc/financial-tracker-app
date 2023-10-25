from flask import Blueprint

# Create a Blueprint for the routes in this directory
main_routes = Blueprint("main_routes", __name__)

# Import and register route Blueprints from other route files
from .user_routes import user_routes
main_routes.register_blueprint(user_routes)

from .category_route import category_route
main_routes.register_blueprint(category_route)

from .expenses_route import expenses_route
main_routes.register_blueprint(expenses_route)

