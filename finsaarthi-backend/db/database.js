const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'finsaarthi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for reuse in other files
module.exports = pool;    
