const { Pool } = require('pg');

const pool = new Pool({
  host: '54.153.22.244',
  user: 'postgres',
  password: 'postgres',
  database: 'booking_requests',
  max: 30,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const addReservation = async (data) => {
  await (async function con() {
    const client = await pool.connect();
    try {
      const res = await client.query('INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests) SELECT $1, $2, $3, $4, $5, $6 WHERE NOT EXISTS (SELECT booking_id FROM bookings WHERE home_id=$7 AND (check_in, check_out) OVERLAPS ($8, $9))',
        [data.home_id, data.body.user_id, data.body.check_in, data.body.check_out,
          data.body.price_per_night, data.body.no_guests, data.home_id,
          data.body.check_in, data.body.check_out]);
      if (res.rowCount === 0) {
        // have overlapping dates. can't add. throw error
        throw new Error('cannot add overlapping booking for the home');
      }
    } finally {
      client.release();
    }
  }()).catch((e) => { throw e; });
};

const getAllReservations = async (data) => {
  const result = await (async function con() {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT b.booking_id, b.home_id, b.user_id, b.created_at, b.check_in, b.check_out, b.price_per_night, b.no_guests, u.name, u.password, u.email, u.login FROM bookings b, users u WHERE b.home_id=$1 AND u.user_id = b.user_id',
        [data.home_id]);
      return res.rows;
    } finally {
      client.release();
    }
  }()).catch((e) => { throw e; });
  return result;
};

const updateReservation = async (data) => {
  await (async function con() {
    const client = await pool.connect();
    try {
      const res = await client.query('UPDATE bookings SET check_in=$1, check_out=$2 WHERE booking_id=$3 AND NOT EXISTS (SELECT booking_id FROM bookings WHERE booking_id != $3 AND home_id=$4 AND (check_in, check_out) OVERLAPS ($5, $6))',
        [data.body.check_in, data.body.check_out, data.body.booking_id,
          data.home_id, data.body.check_in, data.body.check_out]);
      if (res.rowCount === 0) {
        // have overlapping dates. can't update. throw error
        throw new Error('cannot update overlapping booking for the home');
      }
    } finally {
      client.release();
    }
  }()).catch((e) => { throw e; });
};

const deleteReservation = async (data) => {
  await (async function con() {
    const client = await pool.connect();
    try {
      const res = await client.query('DELETE FROM bookings WHERE booking_id = $1',
        [data.body.booking_id]);
      if (res.rowCount === 0) {
        // nothing was deleted. error
        throw new Error('nothing was deleted');
      }
    } finally {
      client.release();
    }
  }()).catch((e) => { throw e; });
};

const getReservation = async (data) => {
  const result = await (async function con() {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT b.booking_id, b.home_id, b.user_id, b.created_at, b.check_in, b.check_out, b.price_per_night, b.no_guests, u.name, u.password, u.email, u.login FROM bookings b, users u WHERE b.booking_id=$1 AND u.user_id = b.user_id',
        [data.body.booking_id]);
      return res.rows;
    } finally {
      client.release();
    }
  }()).catch((e) => { throw e; });
  return result;
};

module.exports = {
  addReservation,
  getAllReservations,
  updateReservation,
  deleteReservation,
  getReservation,
};
