-- Insert sample data into Users table
INSERT INTO "user" ("user_ID", "user_name", "email", "password_hash")
VALUES (1, 'user1', 'user1@example.com', 'password123');

-- Insert sample data into Category table
INSERT INTO "category" ("category_ID", "category_name")
VALUES ('food', 'Food');

-- Insert sample data into Payment_method table
INSERT INTO "payment_method" ("payment_method_ID", "c_type", "number", "bank")
VALUES ('credit_card', 'Credit Card', 1234567890123456, 'Bank of America');

-- Insert sample data into Expenses table
INSERT INTO "expense" ("expense_ID", "user_ID", "amount", "currency", "category_ID", "description", "p_date", "payment_method_ID", "card_type")
VALUES (1, 1, 110.0, 'USD', 'food', 'Lunch', '2023-10-25', 'credit_card', 'Visa');



