import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import {useState,useEffect} from 'react';
import { BASE_URL } from "../utils/constants";
import { removeUser,addUser } from "../utils/userSlice";
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
export function Home() {
  const user =useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const [dropdown,setdropdown]=useState(false);
  const navigate=useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setdropdown(false);
      toast.success("Logout successful");
      return navigate("/");
    } catch (err) {
     console.log(err);
     toast.error(err.response.data);
    }
  };

  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
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
        user.photoUrl || '/defaultuser.png'
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
      onClick={handleLogout}
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

  
  
  <div className="flex-grow">
  <Outlet />
  </div>

  
  <Footer />
   </div>

  );
  }
