CREATE TABLE doctors
(
    id             UUID PRIMARY KEY,
    first_name     VARCHAR(255) not null,
    last_name      VARCHAR(255) not null,
    specialization VARCHAR(255) not null,
    room           VARCHAR(255) not null,
    active         BOOLEAN DEFAULT FALSE
);