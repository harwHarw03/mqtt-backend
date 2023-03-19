const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'mysql',
  password: '1234',
  database: 'mydatabase'
});

async function getConnection() {
  return await pool.getConnection();
}

async function connect() {
  const conn = await getConnection();
  try {
    await conn.ping();
    console.log('MySQL connection successful');
  } finally {
    conn.release();
  }
}

module.exports = { getConnection, connect };

