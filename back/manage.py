from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from your_app import app, db  # Replace 'your_app' with your actual Flask app instance

migrate = Migrate(app, db)
manager = Manager(app)

# Add the Flask-Migrate commands to the manager
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
