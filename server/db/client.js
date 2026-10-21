/* import pg from "pg";

const client = new pg.Client(process.env.DATABASE_URL);

export default client; */
/* import pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

export default client;
 */
import pg from "pg";

console.log("DATABASE_URL =", process.env.DATABASE_URL);
console.log("TYPE =", typeof process.env.DATABASE_URL);

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

export default client;
