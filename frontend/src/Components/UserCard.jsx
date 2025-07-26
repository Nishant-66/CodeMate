import React from 'react';
import { useSelector } from 'react-redux';

export function UserCard() {
  const user = useSelector((store) => store.user);

  // If user isn't loaded yet, render fallback
  if (!user || !user.firstName) {
    return <div className="text-slate-400">Loading user...</div>;
  }

  return (
    <div className="bg-slate-800 text-white rounded-xl p-4 shadow-md w-full max-w-sm space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={user.photoUrl || '/defaultuser.png'}
          alt="User"
          className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-slate-400">
            {user.gender}, {user.age}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-1">About</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{user.about}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-1">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(user.skills) && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-slate-700 px-3 py-1 text-xs rounded-full"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-500">No skills listed.</span>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg transition duration-200">
          Interested
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200">
          Ignore
        </button>
      </div>
    </div>
  );
}
