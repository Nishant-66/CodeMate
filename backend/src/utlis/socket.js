const socketIO = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const activeUsers = new Map();
const socketToUser = new Map();

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      if (!userId) return;
      if (!activeUsers.has(userId)) activeUsers.set(userId, new Set());
      activeUsers.get(userId).add(socket.id);
      socketToUser.set(socket.id, userId);
      if (targetUserId) {
        const roomId = getSecretRoomId(userId, targetUserId);
        socket.join(roomId);
      }
    });

    socket.on("sendMessage", async ({ firstName, lastName, userId, targetUserId, text }) => {
      try {
        if (!userId || !targetUserId) return;
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        const messageEntry = {
          senderId: userId,
          text,
          createdAt: new Date(),
        };

        chat.messages.push(messageEntry);
        await chat.save();

        const payload = {
          senderId: userId,
          firstName,
          lastName,
          text,
          createdAt: messageEntry.createdAt.toISOString(),
        };

        const roomId = getSecretRoomId(userId, targetUserId);
        io.to(roomId).emit("messageReceived", payload);

        const targetSockets = activeUsers.get(targetUserId);
        if (targetSockets) {
          targetSockets.forEach((sid) => {
            io.to(sid).emit("messageReceived", payload);
          });
        }

        const senderSockets = activeUsers.get(userId);
        if (senderSockets) {
          senderSockets.forEach((sid) => {
            if (sid !== socket.id) io.to(sid).emit("messageReceived", payload);
          });
        }
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      const userId = socketToUser.get(socket.id);
      if (userId) {
        const s = activeUsers.get(userId);
        if (s) {
          s.delete(socket.id);
          if (s.size === 0) activeUsers.delete(userId);
        }
        socketToUser.delete(socket.id);
      }
    });
  });
};

module.exports = initializeSocket;
