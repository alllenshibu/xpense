DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TRIGGER def_cats ON "user" CASCADE;
DROP FUNCTION create_def_cats() CASCADE;

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS payment_option CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS expense CASCADE;
DROP TABLE IF EXISTS recurring_payment CASCADE;
DROP TABLE IF EXISTS friend_request CASCADE;
DROP TABLE IF EXISTS friend CASCADE;
DROP TABLE IF EXISTS split CASCADE;
DROP TABLE IF EXISTS goal CASCADE;
DROP TABLE IF EXISTS income CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    id         UUID DEFAULT uuid_generate_v4(),

    first_name VARCHAR(32)  NOT NULL,
    last_name  VARCHAR(32)  NOT NULL,
    email      VARCHAR(32)  NOT NULL,
    password   VARCHAR(256) NOT NULL,

    PRIMARY KEY (id)
);
  CREATE OR REPLACE FUNCTION create_def_cats()
      RETURNS TRIGGER AS
  $$
  BEGIN
      INSERT INTO category (user_id, name)
      VALUES (NEW.id, '(default)');

      INSERT INTO category (user_id, name)
      VALUES (NEW.id, 'Groceries');

      INSERT INTO category (user_id, name)
      VALUES (NEW.id, 'Entertainment');

      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER def_cats
      AFTER INSERT
      ON "user"
      FOR EACH ROW
  EXECUTE FUNCTION create_def_cats();



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

CREATE TABLE IF NOT EXISTS income
(
    id        UUID DEFAULT uuid_generate_v4(),

    user_id   UUID           NOT NULL,
    amount    NUMERIC(10, 2) NOT NULL,
    timestamp TIMESTAMPTZ    NOT NULL,

    PRIMARY KEY (id),
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
