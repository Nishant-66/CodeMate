import { useState, useEffect } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    age: "",
    gender: "",
    about: "",
    skills: [],
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        photoUrl: user.photoUrl || "",
        age: user.age || "",
        gender: user.gender || "",
        about: user.about || "",
        skills: Array.isArray(user.skills) ? user.skills : [],
      });
      setSkillsInput(user.skills ? user.skills.join(", ") : "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);
    setFormData({
      ...formData,
      skills: value.split(",").map((s) => s.trim()).filter(Boolean),
    });
  };

  const saveProfile = async () => {
    setError("");
    try {
      const payload = { ...formData };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
      toast.success("Profile saved successfully");
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-slate-400">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg w-full lg:w-[400px] space-y-5">
        <h2 className="text-2xl font-bold text-center text-white">Edit Profile</h2>

        {["firstName", "lastName", "photoUrl", "age", "gender", "about"].map((field) => (
          <div key={field} className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
              {field.replace(/([A-Z])/g, " $1")}:
            </label>

            {field === "about" ? (
              <textarea
                name={field}
                rows="3"
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-fuchsia-600 outline-none"
              />
            ) : field === "gender" ? (
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-fuchsia-600 outline-none"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <input
                type={field === "age" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-fuchsia-600 outline-none"
              />
            )}
          </div>
        ))}

       
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Skills (comma separated):
          </label>
          <input
            type="text"
            value={skillsInput}
            onChange={handleSkillsChange}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-fuchsia-600 outline-none"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center">
          <button
            className="w-full sm:w-auto px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
            onClick={saveProfile}
          >
            Save
          </button>
        </div>
      </div>

     
      <div className="flex justify-center items-start w-full lg:w-[400px]">
        <UserCard user={formData} />
      </div>
    </div>
  );
};
