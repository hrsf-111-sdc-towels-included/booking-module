/* eslint-disable */
const fs = require('fs');

const readable = fs.createReadStream('./data_postgre_bookings.csv');
const writable = fs.createWriteStream('./data_mongo_bookings.csv');
const stream = require('stream');

// min inclusive, max inclusive
var getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

writable.write("home_id.int32(),user_id.int32(),check_in.date_ms(yyyy-MM-dd),check_out.date_ms(yyyy-MM-dd),price_per_night.int32(),no_guests.int32(),booking_id.int32()\n");

const middleman = new stream();
let cnt = 0;
middleman.pipe = function(dest) {
  this.dest = dest;
  return dest;
};
middleman.write = function(chunk) {
  let data = chunk.toString('utf-8').replace(/\n/g, n => (`,${++cnt}\n`));
  this.dest.write(data);
  //this.dest.write(chunk + 'added by middleman');
}
middleman.end = function() {
  this.dest.end();
}

readable.pipe(middleman).pipe(writable);
