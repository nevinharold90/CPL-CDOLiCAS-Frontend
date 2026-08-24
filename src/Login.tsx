// src/pages/Login.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from './_api/axios'; 

import logo from './admin/assets/logo.png';
import eyeOpen from './admin/assets/eye.png';
import eyeClosed from './admin/assets/eye-crossed.png';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'client' | string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // States for 5-second redirect delay visual effect
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  // 1. Session check on mount
  useEffect(() => {
    const checkActiveSession = () => {
      const token = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          const user: User = JSON.parse(savedUser);
          const role = user?.role;

          if (role === 'superadmin' || role === 'admin') {
            navigate('/dashboard', { replace: true });
            return;
          }

          if (role === 'client') {
            navigate('/', { replace: true });
            return;
          }
        } catch {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      }

      setCheckingAuth(false);
    };

    checkActiveSession();
  }, [navigate]);

  // 2. Submit Handler with 5-second Delay Effect
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post<LoginResponse>('/user/login', { username, password });
      const { user, token } = response.data;
      const userRole = user?.role;

      // Validate allowed roles
      if (!userRole || !['superadmin', 'admin', 'client'].includes(userRole)) {
        setErrorMessage('Access denied: Unauthorized role or insufficient permissions.');
        setLoading(false);
        return; 
      }

      // Save auth payload to local storage
      if (token) localStorage.setItem('auth_token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      // Trigger redirect loading state
      setIsRedirecting(true);
      setLoading(false);

      // Start 5-second countdown timer UI
      let timeLeft = 3;
      const intervalId = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      // Redirect after exactly 5000ms (5 seconds)
      setTimeout(() => {
        if (userRole === 'superadmin' || userRole === 'admin') {
          navigate('/dashboard', { replace: true });
        } else if (userRole === 'client') {
          navigate('/', { replace: true }); 
        }
      }, 5000);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data?.message || 'Invalid username or password.';
          setErrorMessage(message);
        } else if (error.request) {
          setErrorMessage('Unable to reach the server. Please check backend connection.');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 md:p-8 font-[Poppins] relative">
      
      {/* 5-Second Fullscreen Loading Screen Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="relative flex items-center justify-center mb-6">
            {/* Spinning Indicator */}
            <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            {/* <span className="absolute text-xl font-bold text-indigo-400">
              {countdown}s
            </span> */}
          </div>
          
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">
            Login Successful!
          </h2>
          <p className="text-zinc-400 text-sm max-w-sm mb-6">
            Authenticated successfully. Preparing your workspace...
          </p>

          {/* Progress Bar Container */}
          {/* <div className="w-64 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            />
          </div> */}
        </div>
      )}

      {/* Main Login Card */}
      <div className="w-full max-w-4xl bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Left: Form Area */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            
            {/* Logo + Title */}
            <div className="flex flex-col items-center gap-4 mb-8">
              {logo ? (
                <img
                  src={logo}
                  alt="City Public Library"
                  className="h-14 w-14 object-contain rounded-full shadow-lg shadow-indigo-950/30"
                />
              ) : (
                <div className="h-14 w-14 bg-indigo-900/40 rounded-full flex items-center justify-center text-2xl font-bold text-zinc-300">
                  CPL
                </div>
              )}
              <h1 className="text-3xl font-bold text-zinc-100 tracking-tight text-center">
                City Public Library
              </h1>
              <p className="text-zinc-400 text-sm">Login</p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3.5 bg-red-950/50 border border-red-800/80 text-red-300 text-xs text-center rounded-lg shadow-sm">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" "
                  disabled={loading || isRedirecting}
                  className="peer text-white w-full px-4 pt-6 pb-2 bg-zinc-800/60 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 placeholder-transparent disabled:opacity-50"
                  required
                />
                <label
                  htmlFor="username"
                  className="absolute left-4 top-2 text-xs text-zinc-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400"
                >
                  Username
                </label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  disabled={loading || isRedirecting}
                  className="peer text-white w-full px-4 pt-6 pb-2 bg-zinc-800/60 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 placeholder-transparent pr-12 disabled:opacity-50"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-xs text-zinc-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400"
                >
                  Password
                </label>

                <button
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || isRedirecting}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 focus:outline-none transition-colors disabled:opacity-50"
                >
                  <img
                    src={showPassword ? eyeOpen : eyeClosed}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    className="w-5 h-5 object-contain invert cursor-pointer" 
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || isRedirecting}
                className="w-full py-3.5 bg-indigo-700 hover:bg-indigo-600 disabled:bg-indigo-900 text-white font-medium rounded-lg shadow-md shadow-indigo-950/40 cursor-pointer transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {loading ? 'Verifying Credentials...' : 'Sign In'}
              </button>
            </form>

            <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-zinc-500">
              <Link to="/forgot-password" className="text-indigo-400 hover:text-indigo-300">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Right: Background Image Side */}
          <div className="hidden lg:block lg:w-1/2 relative bg-zinc-950">
            <img
              src="https://thumbs.dreamstime.com/b/futuristic-digital-library-bookshelves-filled-books-laptop-computer-ai-powered-info-search-glowing-binary-code-flows-around-356869766.jpg"
              alt="Digital Library Background"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p className="text-2xl font-semibold text-zinc-200 drop-shadow-md">
                Login Portal
              </p>
              <p className="text-sm text-zinc-300/70 mt-2">
                Manage books, track inventory, and organize your collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;