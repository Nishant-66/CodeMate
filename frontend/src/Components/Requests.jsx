import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

export const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, request) => {
    try {
      const _id=request._id;
      const id=request.fromUserId._id;
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center text-gray-400 font-semibold text-xl mt-10">
        No Requests Found
      </h1>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-center text-white mb-8">
        Connection Requests
      </h1>

      <div className="space-y-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  alt={`${firstName} ${lastName}`}
                  src={photoUrl || "/defaultuser.png"}
                  className="w-20 h-20 rounded-full border-2 border-fuchsia-500 object-cover"
                />
                <div className="text-left">
                  <h2 className="font-bold text-xl text-white">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-400 text-sm">{age}, {gender}</p>
                  )}
                  <p className="text-gray-300 mt-1 line-clamp-2">{about}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
                <button
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition-colors duration-200"
                  onClick={() => reviewRequest("rejected", request)}
                >
                  Reject
                </button>
                <button
                  className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium rounded-lg shadow transition-colors duration-200"
                  onClick={() => reviewRequest("accepted", request)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


