import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import medicine from '../assets/medicine.png'
import { register } from '../services/authServices'
import { MdShield } from 'react-icons/md'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'


const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      toast.success('Registered successfully');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Register failed. Try again.';
      toast.error(msg);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#EBF4F6] flex items-center justify-center px-4">

      <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-xl shadow-[#088395]/10 overflow-hidden min-h-[560px]">

        {/* ── Left Panel ── */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#071952] to-[#088395] p-10 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#37B7C3]/15 pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-white/[0.04] pointer-events-none" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <MdShield size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">PharmaFlow</span>
          </div>

          {/* Text + image */}
          <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-center">
            <h2 className="text-2xl font-bold text-white leading-snug mb-2">
              Pharmaceutical Supply<br />Management System
            </h2>
            <p className="text-sm text-white/60 mb-8">
              Manage pharmacy stock, orders, and suppliers easily.
            </p>
            <img
              src={medicine}
              alt="Medicine illustration"
              className="w-52 drop-shadow-2xl"
            />
          </div>

          {/* Bottom badge */}
          <div className="relative z-10 flex items-center gap-2 bg-white/10 border border-white/15 rounded-2xl px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-[#37B7C3] animate-pulse" />
            <p className="text-xs text-white/80 font-medium">Trusted by 500+ pharmacies nationwide</p>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex flex-col justify-center w-full md:w-1/2 px-8 sm:px-12 py-10">

          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#071952] to-[#088395] flex items-center justify-center">
              <MdShield size={14} className="text-white" />
            </div>
            <span className="font-bold text-[#071952] text-base tracking-tight">PharmaFlow</span>
          </div>

          <h1 className="text-2xl font-bold text-[#071952] mb-1">Create an account</h1>
          <p className="text-sm text-slate-400 mb-8">Fill in the details below to get started</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-[#071952] uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
                <input
                  type="text"
                  name="username"
                  placeholder="John Smith"
                  autoComplete="username"
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full bg-[#F7FBFC] border border-[#daeef2] focus:border-[#37B7C3] focus:ring-2 focus:ring-[#37B7C3]/20 focus:outline-none text-[#071952] placeholder-slate-400 text-sm pl-10 pr-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#071952] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F7FBFC] border border-[#daeef2] focus:border-[#37B7C3] focus:ring-2 focus:ring-[#37B7C3]/20 focus:outline-none text-[#071952] placeholder-slate-400 text-sm pl-10 pr-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#071952] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#F7FBFC] border border-[#daeef2] focus:border-[#37B7C3] focus:ring-2 focus:ring-[#37B7C3]/20 focus:outline-none text-[#071952] placeholder-slate-400 text-sm pl-10 pr-11 py-3 rounded-xl transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#088395] transition-colors duration-150"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#071952] to-[#088395] hover:from-[#088395] hover:to-[#37B7C3] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#088395]/30 hover:shadow-lg hover:-translate-y-0.5 mt-1"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-slate-400 mt-1">
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-[#088395] font-semibold cursor-pointer hover:text-[#071952] transition-colors duration-150"
              >
                Log in
              </span>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;