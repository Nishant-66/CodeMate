import React from 'react';
import { Outlet, Link} from 'react-router-dom';
import { Footer } from './Footer';

let user=false;
export function Home() {
  
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
    {/* Here i will add the logic of logged in user .. for now i just want to test that's why i am using user as a boolean to check the ui  */}
    </div>
    </div>
    </div>
    </div>

  
  
  <Outlet className="flex-grow" />

  
  <Footer />
   </div>

  );
  }
