/* eslint-disable */
const fs = require('fs');

const writable = fs.createWriteStream('./data_postgre_bookings.csv');

// min inclusive, max inclusive
var getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
/*
// bookings
// INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests)
//   VALUES (1, 1, '2019-03-10 10:30:00', '2019-03-15 09:20:00', 200, 2);

for (let i = 0; i < 10000000; i++) {
  let month = pad(getRandomNumber(1, 12), 2);
  let day = pad(getRandomNumber(1, 17));
  let outDay = pad(getRandomNumber(18, 27));
  console.log(getRandomNumber(1, 100) + ',' + getRandomNumber(1, 20) + ',' + 
    '2019-' + month + '-' + day + ',' + 
    '2019-' + month + '-' + outDay + ',' + getRandomNumber(50, 500) + ',' + getRandomNumber(1, 10)); 
}
*/


function writeData(writer, callback) {
  let recordCount = 10000000; // 10M homes. we have a lot more reservations
  let i = 1;
  let remainingRv = getRandomNumber(0, 20);
  let actual = remainingRv;
  let counter = 0;
  write();
  function write() {
    let ok = true;
    do {
      let month = pad(getRandomNumber(1, 12), 2);
      let day = pad(getRandomNumber(1, 17), 2);
      let outDay = pad(getRandomNumber(18, 27), 2);
      let data = (i + ',' + getRandomNumber(1, 10000) + ',' + 
        '2019-' + month + '-' + day + ',' + 
        '2019-' + month + '-' + outDay + ',' + getRandomNumber(50, 500) + ',' + getRandomNumber(1, 10) + '\n');
      remainingRv--;
      if (remainingRv <= 0) {
        i++;
        if (i <= recordCount) {
          remainingRv = getRandomNumber(0, 20); // 0~20 reservations for a home, in theory there will be ~100M reservations
          if (remainingRv === 0) continue;
          actual += remainingRv;
        }
      }
      counter++;
      if (i > recordCount) {
        // last write
        writer.write(data, () => callback('done, everything is written, count: ' + counter + ', actual: ' + actual));
      } else {
        ok = writer.write(data);
      }
    } while(i <= recordCount && ok);
    if (i <= recordCount) {
      writer.once('drain', write);
    }
  }
}

writeData(writable, msg => console.log(msg));
