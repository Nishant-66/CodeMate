const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { getOrCreateChat } = require("../controllers/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, getOrCreateChat);

module.exports = chatRouter;
