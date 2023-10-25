CREATE TABLE "users" (
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

CREATE TABLE "expenses" (
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

CREATE TABLE "category" (
    "category_ID" varchar   NOT NULL,
    "category_name" varchar   NOT NULL,
    CONSTRAINT "pk_Category" PRIMARY KEY (
        "category_ID"
     )
);

CREATE TABLE "payment_method" (
    "payment_method_ID" varchar   NOT NULL,
    "c_type" varchar   NOT NULL,
    "number" decimal   NOT NULL,
    "bank" varchar   NOT NULL,
    CONSTRAINT "pk_Payment_method" PRIMARY KEY (
        "payment_method_ID"
     )
);

ALTER TABLE "expenses" ADD CONSTRAINT "fk_Expenses_user_ID" FOREIGN KEY("user_ID")
REFERENCES "users" ("user_ID");

ALTER TABLE "expenses" ADD CONSTRAINT "fk_Expenses_category_ID" FOREIGN KEY("category_ID")
REFERENCES "category" ("category_ID");

ALTER TABLE "expenses" ADD CONSTRAINT "fk_Expenses_payment_method_ID" FOREIGN KEY("payment_method_ID")
REFERENCES "payment_method" ("payment_method_ID");

