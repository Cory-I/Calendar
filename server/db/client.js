import pg from "pg";
const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost/your_db_name_here");
export default client;
