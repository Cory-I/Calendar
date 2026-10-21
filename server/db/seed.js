import client from "./client.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seed = async () => {
  console.log("Creating database schema...");

  const schema = await fs.readFile(path.join(__dirname, "schema.sql"), "utf8");

  await client.query(schema);

  console.log("Database schema created.");
};

export default seed;
/* import client from "./client.js";

const seed = async () => {
  console.log("add logic to create and seed tables");
};

export default seed; */
