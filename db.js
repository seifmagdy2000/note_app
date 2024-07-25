require("dotenv").config();
const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as per your application's needs
  user: process.env.user,
  host: process.env.host,
  password: process.env.password,
  database: process.env.database,
});

// Ensure that the pool will emit errors if your MySQL server kills idle connections
pool.on("error", (err) => {
  console.error("MySQL Pool Error:", err);
});

module.exports = pool;
