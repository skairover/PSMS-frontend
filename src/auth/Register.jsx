import React from 'react'
import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import medicine from '../assets/medicine.png'
import {register } from '../services/authServices'

const Register = () => { 

const navigate = useNavigate();
  const [form, setForm] = useState({name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      const token = res.data.token;

      localStorage.setItem('token', token);

      toast.success('registered successfully');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Register failed. Try again.';
      toast.error(msg);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="w-screen h-screen bg-[#d6e8e7] text-gray-900 flex flex-col justify-center items-center">
    
      <div className="h-[70%] w-[80%] flex bg-white rounded-2xl px-4 py-6">
        <div className="w-full hidden md:flex md:flex-col justify-center items-center">
          <h1 className='text-3xl font-bold'>Pharmaceutical Supply<br/>Management System</h1>
          <p className='text-sm text-gray-400 mb-2'>Manage pharmacy stock, order, and suppliers easily</p>
          <img src={medicine} alt="" className="" />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className='text-xl font-bold md:hidden'>Pharmaceutical Supply<br/>Management System</h1>
          <p className='text-xs text-gray-400 mb-2 md:hidden'>Manage pharmacy stock, <br/>order, and suppliers easily</p>
<form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          name="username"
          placeholder="John Smith"
          autoComplete="username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full bg-gray-200 hover:bg-gray-300 dark:text-black px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#0B2027] transition duration-300"
        />
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          autoComplete="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-gray-200 hover:bg-gray-300 dark:text-black px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#0B2027] transition duration-300"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Minimum 8 characters"
          autoComplete="current-password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300 dark:text-black px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#0B2027] transition duration-300"
        />

        <button
          type="submit"
          className="w-full bg-[#118ae7] hover:bg-[#2e6b9d] transition delay-150 duration-300  text-white py-2 rounded-lg  font-semibold"
        >
          Sign up
        </button>

        <p className="text-center mt-4 text-sm">
          already have an account?
          <span
            onClick={handleLogin}
            className="text-[#118ae7] font-semibold ml-1 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </form>
        </div>

      </div>

    </div>
  )
}

export default Register