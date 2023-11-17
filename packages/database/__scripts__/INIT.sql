DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS payment_option CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS expense CASCADE;
DROP TABLE IF EXISTS recurring_payment CASCADE;
DROP TABLE IF EXISTS friend_request CASCADE;
DROP TABLE IF EXISTS friend CASCADE;
DROP TABLE IF EXISTS split CASCADE;
DROP TABLE IF EXISTS goal CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    id         UUID DEFAULT uuid_generate_v4(),

    first_name VARCHAR(32)  NOT NULL,
    last_name  VARCHAR(32)  NOT NULL,
    email      VARCHAR(32)  NOT NULL,
    password   VARCHAR(256) NOT NULL,

    PRIMARY KEY (id)
);
-- Create a function to add default category and payment option
CREATE OR REPLACE FUNCTION add_default_category_and_payment()
RETURNS TRIGGER AS $$
BEGIN
    -- Add default category
    INSERT INTO category (user_id, name)
    VALUES (NEW.id, '(default)');

    -- Add default payment option
    INSERT INTO payment_option (user_id, name)
    VALUES (NEW.id, '(default)');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to invoke the function on user creation
CREATE TRIGGER add_default_category_and_payment_trigger
AFTER INSERT
ON "user"
FOR EACH ROW
EXECUTE FUNCTION add_default_category_and_payment();



CREATE TABLE IF NOT EXISTS payment_option
(
    id       UUID                 DEFAULT uuid_generate_v4(),
    
    user_id  UUID        NOT NULL,
    name     VARCHAR(32) NOT NULL,
    disabled BOOLEAN     NOT NULL DEFAULT FALSE,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS category
(
    id      UUID DEFAULT uuid_generate_v4(),

    user_id UUID        NOT NULL,

    name    VARCHAR(32) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS expense
(
    id          UUID DEFAULT uuid_generate_v4(),

    user_id     UUID           NOT NULL,
    category_id UUID,
    payment_id  UUID,

    title       VARCHAR(32)    NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    timestamp   TIMESTAMPTZ    NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (category_id) REFERENCES category (id),
    FOREIGN KEY (payment_id) REFERENCES payment_option (id)
);

CREATE TABLE IF NOT EXISTS friend_request
(
    user_id   UUID NOT NULL,
    friend_id UUID NOT NULL,

    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (friend_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS friend
(
    user_id   UUID NOT NULL,
    friend_id UUID NOT NULL,

    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (friend_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS split
(
    id         UUID DEFAULT uuid_generate_v4(),

    expense_id UUID          NOT NULL,
    user_id    UUID          NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL
        CONSTRAINT percentage_check CHECK (percentage >= 0 AND percentage <= 100),

    PRIMARY KEY (id),
    FOREIGN KEY (expense_id) REFERENCES expense (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS goal
(
    id      UUID                    DEFAULT uuid_generate_v4(),

    user_id UUID           NOT NULL,

    month   INT            NOT NULL,
    year    INT            NOT NULL,
    goal    NUMERIC(10, 2) NOT NULL,
    spent   NUMERIC(10, 2) NOT NULL DEFAULT 0,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS recurring_payment
(
    id          UUID DEFAULT uuid_generate_v4(),

    user_id     UUID           NOT NULL,
    category_id UUID,

    title       VARCHAR(32)    NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    ends_on     DATE           NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

-- INSERT INTO split (expense_id, user_id, percentage) VALUES ('02c5685c-eaef-40e5-bf12-b7d6dfe16c88','64acd7ab-fa45-46d3-a73b-05fd08745699', 100)