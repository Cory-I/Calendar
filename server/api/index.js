import express from "express";
const router = express.Router();

import usersRouter from "./users.js";

//define api routes here
router.use("/users", usersRouter);

export default router;
