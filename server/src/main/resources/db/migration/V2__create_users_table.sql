CREATE TABLE users
(
    id            UUID PRIMARY KEY,
    username      VARCHAR(255) unique not null,
    password_hash VARCHAR(255)        not null,
    role          VARCHAR(50)         not null,
    doctor_id     UUID
);