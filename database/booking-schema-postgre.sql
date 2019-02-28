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

INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests) VALUES (1, 1, '2019-03-10 10:30:00', '2019-03-15 09:20:00', 200, 2);
