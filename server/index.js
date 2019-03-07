const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const db = require('../database/index_pg.js');
const { cal } = require('./calendarHelper');

const app = express();
const PORT = 3002;

app.use('/', expressStaticGzip(path.join(__dirname, '/../public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/bookings/:homeId', (req, res) => {
  db.getBookingsById(req.params.homeId, (err, bookings) => {
    if (err) {
      console.log('err from db');
    } else {
      cal(bookings, (error, grid) => {
        if (error) {
          console.log('no calendar');
        } else {
          res.json(grid);
        }
      });
    }
  });
});

app.get('/api/pricing/:homeId', (req, res) => {
  db.getPricingById(req.params.homeId, (err, pricing) => {
    if (err) {
      // send error
    } else {
      res.json(pricing);
    }
  });
});

app.post('/api/bookings', (req, res) => {
  const { booking } = req.body;
  console.log(booking);
  db.createBooking(booking, (err) => {
    if (err) {
      // send error
    } else {
      res.send('success');
    }
  });
});


app.route('/api/booking/:id')
  // CREATE
  .post((req, res) => {
    // addReservation
    (async function addRes() {
      try {
        await db.addReservation({ home_id: req.params.id, body: req.body });
        res.send('successfully CREATED a reservation');
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
    }());
  })

  // READ
  .get((req, res) => {
    // getAllReservation
    (async function getRes() {
      try {
        const result = await db.getAllReservations({ home_id: req.params.id });
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
    }());
  })

  // UPDATE
  .put((req, res) => {
    // updateReservation
    (async function updateRes() {
      try {
        await db.updateReservation({ home_id: req.params.id, body: req.body });
        res.send('successfully UPDATED a reservation');
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
    }());
  })

  // DELETE
  .delete((req, res) => {
    // deleteReservation
    (async function deleteRes() {
      try {
        await db.deleteReservation({ home_id: req.params.id, body: req.body });
        res.send('delete operation success');
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
    }());
  });

app.get('/api/booking/id/:booking_id(\\d+)', (req, res) => {
  // getAllReservation
  (async function getRes() {
    try {
      const result = await db.getReservation({ body: { booking_id: req.params.booking_id } });
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  }());
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
