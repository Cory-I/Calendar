console.log("ALL ENV KEYS:", Object.keys(process.env));
import express from "express";
const router = express.Router();

import usersRouter from "./users.js";
import eventsRouter from "./events.js";
import typesRouter from "./types.js";
import groupsRouter from "./groups.js";

//define api routes here
router.use("/users", usersRouter);
router.use("/events", eventsRouter);
router.use("/types", typesRouter);
router.use("/groups", groupsRouter);
export default router;
