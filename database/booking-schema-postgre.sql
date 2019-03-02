DROP DATABASE IF EXISTS booking_requests;

CREATE DATABASE booking_requests;

\c booking_requests;

CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  home_id integer NOT NULL,
  user_id integer NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  check_in date,
  check_out date,
  price_per_night integer NOT NULL,
  no_guests integer NOT NULL
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  login VARCHAR(100) NOT NULL
);
