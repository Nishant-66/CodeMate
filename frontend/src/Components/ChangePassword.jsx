import React from 'react';

export function ChangePassword() {
  return (
    <div className="bg-slate-900 text-white px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Change Password</h2>

        <form className="space-y-4">
          
          <div>
            <label className="block text-sm mb-1">Old Password</label>
            <input
              type="password"
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter old password"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter new password"
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
