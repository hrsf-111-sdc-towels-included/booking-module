const moment = require('moment');

// refactor to return 3 months of data

const cal = (bookings, callback) => {
  const calendar = [];

  for (let i = -3; i < 13; i += 1) {
    const first = moment().add(i, 'months').startOf('month').day();
    const numDays = moment().add(i, 'months').startOf('month').daysInMonth();
    const days = [];
    const month = [[], [], [], [], [], []];
    const bookingsArr = bookings;

    for (let j = 0; j < 42; j += 1) {
      const day = {
        val: null,
        status: null,
      };
      if (j === first) {
        day.val = moment().add(i, 'months').startOf('month');
      } else if (j > first && j < first + numDays) {
        day.val = days[j - 1].val.clone().add(1, 'days');
      }
      for (let k = 0; k < bookingsArr.length; k += 1) {
        const checkIn = moment(bookingsArr[k].check_in);
        const checkOut = moment(bookingsArr[k].check_out);
        if (day.val !== null) {
          if (day.val < moment().subtract(1, 'd')) {
            day.status = 'in past';
          } else if (day.val >= checkIn && day.val <= checkOut) {
            day.status = 'booked';
          } else if (day.status === null) {
            day.status = 'available';
          }
        }
      }
      days.push(day);
      const rowIdx = Math.floor(j / 7);
      month[rowIdx].push(day);
    }
    calendar.push(month);
  }

  if (!calendar) {
    callback('failed to create calendar');
  } else {
    callback(null, calendar);
  }
};

module.exports = {
  cal,
};
