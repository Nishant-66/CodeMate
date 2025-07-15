import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
 import { toast } from 'react-toastify';
export function Signup(){
    const[formData,setformData]=useState({firstName:"",lastName:"",emailId:"",password:""});
       function changeHandler(e){
       
        const{name,value}=e.target;
        setformData((prev)=>{
           return {
          ...prev,
          [name]: value
       };
        })
    
       }
       const dispatch =useDispatch();
       const navigate = useNavigate();
       const handleSignUp=async(e)=>{
           e.preventDefault(); 
           try{
           const res=await axios.post(BASE_URL + "/signup", formData,{withCredentials:true})
           console.log(res);
           dispatch(addUser(res.data.data))
           toast.success("Signup successful");
           return navigate("/feed");

           }
           catch(err){
             console.log(err);
             toast.error(err.response.data);
           }
       
          }
       
    return (
      <div className=" flex items-center justify-center bg-slate-900 px-4 py-10">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSignUp}>
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
      <input
        type="text"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        name='firstName'
        value={formData.firstName}
        onChange={changeHandler}
        />
      </div>
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
      <input
        type="text"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        name='lastName'
        value={formData.lastName}
        onChange={changeHandler}
        />
      </div>
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
      <input
        type="email"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        name='emailId'
        value={formData.emailId}
        onChange={changeHandler}
        />
      </div>
      <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
      <input
        type="password"
        className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        name='password'
        value={formData.password}
        onChange={changeHandler}
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