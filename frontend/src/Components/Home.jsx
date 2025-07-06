import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import {useState} from 'react';

let user=true;
export function Home() {
  const [dropdown,setdropdown]=useState(false);
  const navigate=useNavigate();
  return (
  <div className="min-h-screen flex flex-col bg-slate-900 text-white">
  <div className="w-full shadow-md bg-slate-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-16">
  <Link to={user ? "/feed" : "/"}>
  <div className="text-xl font-bold text-fuchsia-400">CODEMATE</div>
  </Link>
  <div className="flex items-center gap-4">
    {!user && (
    <Link to="/signup">
    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
      Get Started
    </button>
    </Link>
      )}
    {/* Added the ui for logged in user */}
    {user && (
  <div className="relative">
    <img
      src={
        user.image || '/defaultuser.png'
      }
      alt="User"
      className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
      onClick={() => setdropdown((prev) => !prev)} 
    />
    {dropdown && (
    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-2 z-50">
    <Link
      to="/profile"
      className="block px-4 py-2 text-sm hover:bg-slate-700"
      onClick={()=>setdropdown(false)}
      >
       Edit Profile
    </Link>
    <Link
      to="/connections"
      className="block px-4 py-2 text-sm hover:bg-slate-700"
      onClick={()=>setdropdown(false)}
      >
      Connections
    </Link>
    <Link
      to="/changepassword"
      className="block px-4 py-2 text-sm hover:bg-slate-700"
      onClick={()=>setdropdown(false)}
      >
      ChangePassword
    </Link>
    <button
      className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
      onClick={() => {
      user=false;
      setdropdown(false)
      navigate('/');
      }}
      >
      Logout
    </button>
    </div>
    )}
  </div>
)}

    </div>
    </div>
    </div>
    </div>

  
  
  <Outlet className="flex-grow" />

  
  <Footer />
   </div>

  );
  }
