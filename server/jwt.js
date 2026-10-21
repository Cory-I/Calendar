import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;
/* creates token */
export function createToken(input) {
  return jwt.sign(input, SECRET, { expiresIn: "1d" });
}
/* pulls the above input from th token */
export function checkToken(token) {
  return jwt.verify(token, SECRET);
}
