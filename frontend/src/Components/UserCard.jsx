import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

export function UserCard({ user }) {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full max-w-sm space-y-5">
     
      <div className="flex items-center gap-4">
        <img
          src={photoUrl || "/defaultuser.png"}
          alt={`${firstName} ${lastName}`}
          className="w-20 h-20 rounded-full border-2 border-fuchsia-500 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-400">
              {age}, {gender}
            </p>
          )}
        </div>
      </div>

      
      {about && (
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-1">About</h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
            {about}
          </p>
        </div>
      )}

     
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-1">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 px-3 py-1 text-xs rounded-full text-gray-200"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">No skills listed.</span>
          )}
        </div>
      </div>

    
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          className="w-full sm:w-1/2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium rounded-lg shadow transition-colors duration-200"
          onClick={() => handleSendRequest("interested", _id)}
        >
          Interested
        </button>
        <button
          className="w-full sm:w-1/2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colors duration-200"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignore
        </button>
      </div>
    </div>
  );
}
