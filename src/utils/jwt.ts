import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";
const EXPIRES = process.env.JWT_EXPIRES || "7d";

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
