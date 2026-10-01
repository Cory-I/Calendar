import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("BOOTSTRAP CWD:", process.cwd());

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("DATABASE_URL from env:", process.env.DATABASE_URL);

import "./index.js";
