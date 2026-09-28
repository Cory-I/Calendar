import express from "express";
const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  res.send("inside of GET /api/users route!");
});

export default usersRouter;
