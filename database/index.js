const mysql = require('mysql');
const mysqlConfig = require('./sql-config.js');

const connection = mysql.createConnection(mysqlConfig);

const getBookingsById = function(homeId, callback) {
  // console.log('CHECKING DATABASE FOR ', homeId);
  const queryStr = 'SELECT * FROM `bookings` WHERE bookings.home_id = ?';
  connection.query(queryStr, [homeId], (err, bookings) => {
    if (err) {
      callback(err);
    } else {
      callback(null, bookings);
    }
  })
}

const getPricingById = function(homeId, callback) {
  const queryStr = 'SELECT * FROM `prices` WHERE bookings.home_id = ?';
  connection.query(queryStr, [homeId], (err, pricing) => {
    if (err) {
      callback(err);
    } else {
      callback(null, pricing);
    }
  })
}

const createBooking = function(booking, callback) {
  const queryStr = 'INSERT INTO `bookings` (home_id, user_id, check_in, check_out, price_per_night, no_guests) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(queryStr, [newStatus, stopId], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = {
  getBookingsById,
  getPricingById,
  createBooking
};
