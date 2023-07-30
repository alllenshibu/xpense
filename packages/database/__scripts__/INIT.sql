DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS expense CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS split CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    id       UUID DEFAULT uuid_generate_v4(),

    username VARCHAR(32)  NOT NULL,
    password VARCHAR(256) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS expense
(
    id          UUID DEFAULT uuid_generate_v4(),

    user_id     UUID           NOT NULL,
    category_id UUID,

    title       VARCHAR(32)    NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    timestamp   TIMESTAMPTZ    NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS category
(
    id      UUID DEFAULT uuid_generate_v4(),

    user_id UUID        NOT NULL,

    name    VARCHAR(32) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS split
(
    id         UUID DEFAULT uuid_generate_v4(),

    expense_id UUID NOT NULL,
    user_id    UUID NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL CONSTRAINT percentage_check CHECK (percentage >= 0 AND percentage <= 100),

    PRIMARY KEY (id),
    FOREIGN KEY (expense_id) REFERENCES expense (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

-- INSERT INTO split (expense_id, user_id, percentage) VALUES ('02c5685c-eaef-40e5-bf12-b7d6dfe16c88','64acd7ab-fa45-46d3-a73b-05fd08745699', 100)