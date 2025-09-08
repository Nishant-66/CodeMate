const mongoose = require('mongoose');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const connectionDecision = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ['interested', 'ignored'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existing = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existing) {
      return res.status(400).json({ message: "Connection Request Already Exists!!" });
    }

    const newRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await newRequest.save();

    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const connectionResponse = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status not allowed!" });
    }
    console.log(requestId);
     console.log(status);
      console.log(loggedInUser._id);

    const request = await ConnectionRequest.findOne({
      fromUserId: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    request.status = status;
    const data = await request.save();

    res.json({ message: `Connection request ${status}`, data });

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  connectionDecision,
  connectionResponse
};
