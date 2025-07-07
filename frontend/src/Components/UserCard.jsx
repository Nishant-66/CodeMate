import React from 'react'
export function UserCard(){
    return (
    <div className="bg-slate-800 text-white rounded-xl p-4 shadow-md w-full max-w-sm space-y-4">
    <div className="flex items-center gap-4">
    <img
      src="/defaultuser.png"
      alt="User"
      className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover"
    />
    <div>
      <h2 className="text-lg font-semibold">John Doe</h2>
      <p className="text-sm text-slate-400">Male, 25</p>
    </div>
    </div>

  
    <div>
    <h3 className="text-sm font-semibold text-slate-300 mb-1">About</h3>
    <p className="text-sm text-slate-400 leading-relaxed">
      Passionate full-stack developer who loves building scalable web apps and collaborating on open-source projects.
    </p>
    </div>

  
    <div>
    <h3 className="text-sm font-semibold text-slate-300 mb-1">Skills</h3>
    <div className="flex flex-wrap gap-2">
      <span className="bg-slate-700 px-3 py-1 text-xs rounded-full">React</span>
      <span className="bg-slate-700 px-3 py-1 text-xs rounded-full">Node.js</span>
      <span className="bg-slate-700 px-3 py-1 text-xs rounded-full">MongoDB</span>
      <span className="bg-slate-700 px-3 py-1 text-xs rounded-full">Tailwind</span>
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