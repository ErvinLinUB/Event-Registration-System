import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "EventRegistrationSystem",
  password: "12345678", // change to your password
  port: 5432
});

export default pool;
