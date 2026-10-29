import express from "express";
import { getGroups } from "../db/queries/groups.js";

const groupsRouter = express.Router();

groupsRouter.get("/", async (req, res, next) => {
  try {
    const groups = await getGroups();
    res.send(groups);
  } catch (error) {
    next(error);
  }
});

export default groupsRouter;
