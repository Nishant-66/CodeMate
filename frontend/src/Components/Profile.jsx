import React from 'react'
import {UserCard} from './UserCard'
export function Profile() {
  return (
    <div className="bg-slate-900 text-white px-4 py-10">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="bg-slate-800 rounded-xl p-6 shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
                type="text"
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
        </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm mb-1">Age</label>
            <input
                type="number"
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
        <div>
        <label className="block text-sm mb-1">Gender</label>
            <select
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </div>
        </div>

        <div>
            <label className="block text-sm mb-1">About</label>
            <textarea
              rows="3"
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
        </div>

        <div>
            <label className="block text-sm mb-1">Skills </label>
            <input
              type="text"
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <div>
            <label className="block text-sm mb-1">Photo URL</label>
            <input
              type="text"
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition duration-200">
            Save Changes
        </button>
        </div>

        
        <div className="flex justify-center items-start">
          <UserCard />
          
        </div>
        </div>
        </div>
  );
}