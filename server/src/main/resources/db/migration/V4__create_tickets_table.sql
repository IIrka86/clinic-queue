CREATE TABLE tickets
(
    id             UUID PRIMARY KEY,
    number         INT          not null,
    doctor_id      UUID         not null REFERENCES doctors (id),
    patient_name   VARCHAR(255) not null,
    patient_phone  VARCHAR(255) not null,
    selection_type VARCHAR(255) not null,
    status         VARCHAR(255) not null,
    created_at     TIMESTAMPTZ  not null,
    called_at      TIMESTAMPTZ
);