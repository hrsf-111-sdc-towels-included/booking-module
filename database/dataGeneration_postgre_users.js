/* eslint-disable */
const fs = require('fs');

const writable = fs.createWriteStream('./data_postgre_users.csv');

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
  let recordCount = 10000; // 10000 users
  let i = 1;
  let counter = 0;
  write();
  function write() {
    let ok = true;
    do {
      let name = 'name' + i;
      let password = 'password' + i;
      let email = 'user' + i + '@whoknows.con';
      let login = 'loginname' + i;
      let data = name + ',' + password + ',' + email + ',' + login + '\n';
      i++;
      counter++;
      if (i === recordCount) {
        // last write
        writer.write(data, () => callback('done, everything is written, count: ' + counter));
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
