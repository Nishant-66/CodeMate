import React from 'react'
import {Link} from 'react-router-dom'
export function Signup(){
    
    return (
      <div className=" flex items-center justify-center bg-slate-900 px-4 py-10">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>
      <form className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
      <input
        type="text"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
      <input
        type="text"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
      <input
        type="email"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
      <input
        type="password"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
        Create Account
      </button>
      </div>
      </form>
      <p className="text-sm text-center text-slate-400 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-fuchsia-400 hover:underline font-medium">
        Login
        </Link>
      </p>
      </div>
      </div>
      )
}