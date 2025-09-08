import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

export const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [unreadMessages, setUnreadMessages] = useState({});
  const [socket, setSocket] = useState(null);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const s = createSocketConnection();
    setSocket(s);

    s.emit("joinChat", {
      firstName: user.firstName,
      userId: user._id,
    });

    const onMessage = ({ senderId, firstName, lastName, text }) => {
      if (senderId === user._id) return;
      new Audio("/notification.mp3").play().catch(() => {});
      setUnreadMessages((prev) => ({
        ...prev,
        [senderId]: (prev[senderId] || 0) + 1,
      }));
    };

    s.on("messageReceived", onMessage);

    return () => {
      s.off("messageReceived", onMessage);
      s.disconnect();
      setSocket(null);
    };
  }, [user?._id]);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center text-gray-400 font-semibold text-xl mt-10">
        No Connections Found
      </h1>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-center text-white mb-8">
        Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex-shrink-0 relative">
                <img
                  alt={`${firstName} ${lastName}`}
                  className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-600"
                  src={photoUrl}
                />
                {unreadMessages[_id] > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {unreadMessages[_id]}
                  </span>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-400 text-sm mt-1">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-gray-300 mt-2 text-sm sm:text-base line-clamp-3">
                  {about}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:self-center">
                <Link to={`/chat/${_id}`}>
                  <button
                    className="w-full sm:w-auto px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow transition-colors duration-200"
                    onClick={() => {
                      setUnreadMessages((prev) => ({
                        ...prev,
                        [_id]: 0,
                      }));
                    }}
                  >
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
