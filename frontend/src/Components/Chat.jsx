import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch old chat history
  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => ({
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        text: msg.text,
        senderId: msg.senderId?._id,
      }));

      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch chat history when targetUserId changes
  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  // Setup socket connection once
  useEffect(() => {
    if (!userId) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    newSocket.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text, senderId }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetUserId]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-[75vh] border border-gray-700 rounded-2xl overflow-hidden bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 text-white font-semibold text-lg">
        Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === userId;
          return (
            <div
              key={index}
              className={`flex flex-col max-w-xs sm:max-w-sm ${
                isMe ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div className="text-xs text-gray-400 mb-1">
                {msg.firstName} {msg.lastName}
              </div>
              <div
                className={`px-4 py-2 rounded-xl break-words text-sm ${
                  isMe
                    ? "bg-fuchsia-600 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="flex p-4 border-t border-gray-700 bg-gray-800 gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl font-medium transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};
