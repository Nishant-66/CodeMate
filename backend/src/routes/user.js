const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const {
  getReceivedRequests,
  getConnections,
  getUserFeed,
} = require("../controllers/user");

userRouter.get("/user/requests/received", userAuth, getReceivedRequests);
userRouter.get("/user/connections", userAuth, getConnections);
userRouter.get("/feed", userAuth, getUserFeed);

module.exports = userRouter;
