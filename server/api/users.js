import express from "express";
import { authenticate, createUser } from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  res.send("inside of GET /api/users route!");
});

/* usersRouter.post(
  "/register",
  requireBody(["name", "email", "password"]),
  async (req, res, next) => {
    try {
      const newUser = req.body;
      const token = await createUser(newUser);
      res.status(201).send(token);
    } catch (error) {
      next(error);
    }
  },
); */
usersRouter.post(
  "/register",
  requireBody(["name", "email", "password"]),
  async (req, res, next) => {
    console.log("REGISTER BODY:", req.body);

    try {
      const newUser = req.body;
      const token = await createUser(newUser);
      res.status(201).send(token);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      next(error);
    }
  },
);
/* usersRouter.post(
  "/login",
  requireBody(["email", "password"]),
  async (req, res) => {
    const userInfo = req.body;
    const token = await authenticate(userInfo);
    res.send(token);
  },
); */
usersRouter.post(
  "/login",
  requireBody(["email", "password"]),
  async (req, res) => {
    console.log("LOGIN BODY:", req.body);

    const userInfo = req.body;
    const token = await authenticate(userInfo);
    res.send(token);
  },
);

usersRouter.get("/me", getUserFromToken, requireUser, async (req, res) => {
  res.send(req.user);
});
export default usersRouter;
