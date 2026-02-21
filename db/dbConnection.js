const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "EventRegistrationSystem",
  password: "12345678", // Change this to your PostgreSQL password
  port: 5432
});

module.exports = pool;