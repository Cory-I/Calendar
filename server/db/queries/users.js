import client from "../client.js";
import bcrypt from "bcrypt";
import { createToken } from "../../jwt.js";
export const createUser = async ({ name, email, password }) => {
  const hashWord = await bcrypt.hash(password, 10);

  const SQL = `
    INSERT INTO users(name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const {
    rows: [user],
  } = await client.query(SQL, [name, email, hashWord]);

  return createToken({ id: user.id });
};
/* export const createUser = async ({ name, email, password }) => {
  const hashWord = await bcrypt.hash(password, 10);
  const SQL = `
    INSERT INTO users(name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [user],
  } = await client.query(SQL, [name, email, hashWord]);
  const token = createToken({ id: user.id });
  return token;
}; */
export const updateUser = async ({ id, name, email, password }) => {
  const hashWord = await bcrypt.hash(password, 10);
  const SQL = `
    UPDATE users
    SET name = $1, email = $2, password = $3
    WHERE id = $4
    `;
  const {
    rows: [user],
  } = await client.query(SQL, [name, email, hashWord, id]);
  return user;
};
export const authenticate = async ({ email, password }) => {
  const SQL = `
        SELECT *
        FROM users
        WHERE email = $1
        `;
  const {
    rows: [user],
  } = await client.query(SQL, [email]);
  if (!user) {
    const error = new Error("Incorrect email & or password");
    error.status = 401;
    throw error;
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    const error = new Error("Incorrect email & or password");
    error.status = 401;
    throw error;
  }
  const token = createToken({ id: user.id });
  console.log("Stored password:", user.password);
  return token;
};
export const getUserById = async (id) => {
  const SQL = `
    SELECT *
    FROM users
    WHERE id = $1
  `;

  const {
    rows: [user],
  } = await client.query(SQL, [id]);
  return user;
};
