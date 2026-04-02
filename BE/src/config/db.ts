import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()
export const pool = new Pool({
    connectionString:process.env.DB_URL,
    ssl:{ rejectUnauthorized:false},
    max: 10,
idleTimeoutMillis: 30000
});
console.log("PostgreSQL pool initialized");
pool.on("connect", () => {
    console.log("PostgreSQL connected");
  });
  
  pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL error", err);
  });