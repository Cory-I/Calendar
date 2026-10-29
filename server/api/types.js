import express from "express";
import { getTypes } from "../db/queries/types.js";

const typesRouter = express.Router();

typesRouter.get("/", async (req, res, next) => {
  try {
    const types = await getTypes();
    res.send(types);
  } catch (error) {
    next(error);
  }
});

export default typesRouter;
