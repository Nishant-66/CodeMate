import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants"; 

export function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/change-password",
        { oldPassword, newPassword },
        { withCredentials: true } 
      );
      setMessage(res.data.message || "Password updated successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="bg-slate-900 text-white px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Change Password</h2>

        {message && (
          <p className="text-center text-sm text-fuchsia-400">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter old password"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-lg transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
