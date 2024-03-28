-- Create Database
-- CREATE DATABASE parking;
-- ENUM TYPE
CREATE TYPE role_type AS ENUM ('admin', 'client');

-- Create Table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    phone_number TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    balance INT DEFAULT 0,
    role role_type DEFAULT 'client'
);

CREATE TABLE cars(
    id SERIAL PRIMARY KEY,
    model VARCHAR(36) NOT NULL,
    index TEXT UNIQUE NOT NULL,
    user_id INT DEFAULT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE
    SET
        NULL
);