-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/GIAS3u
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Users" (
    "user_ID" int   NOT NULL,
    "user_name" varchar(50)   NOT NULL,
    "email" varchar(100)   NOT NULL,
    "password_hash" varchar(255)   NOT NULL,
    CONSTRAINT "pk_Users" PRIMARY KEY (
        "user_ID"
     ),
    CONSTRAINT "uc_Users_user_name" UNIQUE (
        "user_name"
    ),
    CONSTRAINT "uc_Users_email" UNIQUE (
        "email"
    )
);

CREATE TABLE "Expenses" (
    "expenses_ID" int   NOT NULL,
    "user_ID" int   NOT NULL,
    "amount" decimal   NOT NULL,
    "currency" varchar   NOT NULL,
    "category_ID" varchar   NOT NULL,
    "description" varchar   NOT NULL,
    "p_date" date   NOT NULL,
    "payment_method_ID" varchar   NOT NULL,
    "card_type" varchar   NOT NULL,
    CONSTRAINT "pk_Expenses" PRIMARY KEY (
        "expenses_ID"
     )
);

CREATE TABLE "Category" (
    "category_ID" varchar   NOT NULL,
    "category_name" varchar   NOT NULL,
    CONSTRAINT "pk_Category" PRIMARY KEY (
        "category_ID"
     )
);

CREATE TABLE "Payment_method" (
    "payment_method_ID" varchar   NOT NULL,
    "c_type" varchar   NOT NULL,
    "number" decimal   NOT NULL,
    "bank" varchar   NOT NULL,
    CONSTRAINT "pk_Payment_method" PRIMARY KEY (
        "payment_method_ID"
     )
);

ALTER TABLE "Expenses" ADD CONSTRAINT "fk_Expenses_user_ID" FOREIGN KEY("user_ID")
REFERENCES "Users" ("user_ID");

ALTER TABLE "Expenses" ADD CONSTRAINT "fk_Expenses_category_ID" FOREIGN KEY("category_ID")
REFERENCES "Category" ("category_ID");

ALTER TABLE "Expenses" ADD CONSTRAINT "fk_Expenses_payment_method_ID" FOREIGN KEY("payment_method_ID")
REFERENCES "Payment_method" ("payment_method_ID");

