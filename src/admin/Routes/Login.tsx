// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';
import api from '../../_api/axios'; // 👈 This is the centralized call for Axios


// Import your custom icons
import eyeOpen from '../assets/eye.png';     // show password (open eye)
import eyeClosed from '../assets/eye-crossed.png'; // hide password (closed/slashed eye)

// Define API Axios instance outside component to avoid re-creations on render
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, // Your Laravel API base URL
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   withCredentials: true, // Needed if using Laravel Sanctum cookies/CSRF
// });

// Response interface matching Laravel auth response
interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // UI states for API handling
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // Send credentials to Laravel API
      const response = await api.post('/user/login', { username, password });

      console.log('Login successful:', response.data);

      // Save token if returning bearer token from Laravel Sanctum/Passport
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }

      // 1. Extract the user role and token from the response
      const userRole = response.data?.user?.role;
      const token = response.data?.token;

      // 2. Validate role: allow ONLY 'superadmin' or 'admin'
      if (userRole !== 'superadmin' && userRole !== 'admin') {
        setErrorMessage('Access denied: Only administrators can access this system.');
        return; // Stop execution here
      }

      // 3. Save token and user info if role check passes
      if (token) {
        localStorage.setItem('auth_token', token);
      }

      // Optional: save user object for quick access across your app
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Navigate to dashboard on success
      navigate('/dashboard');

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 md:p-8 font-[Poppins]">
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
              <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">
                City Public Library
              </h1>
              <p className="text-zinc-400 text-sm">Admin Login</p>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="mb-6 p-3.5 bg-red-950/50 border border-red-800/80 text-red-300 text-xs text-center rounded-lg shadow-sm">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username field */}
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" "
                  className="peer text-white w-full px-4 pt-6 pb-2 bg-zinc-800/60 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 placeholder-transparent"
                  required
                />
                <label
                  htmlFor="username"
                  className="absolute left-4 top-2 text-xs text-zinc-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400"
                >
                  Username
                </label>
              </div>

              {/* Password field with toggle icon */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer text-white w-full px-4 pt-6 pb-2 bg-zinc-800/60 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 placeholder-transparent pr-12"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-xs text-zinc-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400"
                >
                  Password
                </label>

                {/* Toggle Icon - clickable */}
                <button
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 focus:outline-none transition-colors"
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
                disabled={loading}
                className="w-full py-3.5 bg-indigo-700 hover:bg-indigo-600 disabled:bg-indigo-900 text-white font-medium rounded-lg shadow-md shadow-indigo-950/40 cursor-pointer transition-all disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Contact the library admin if you need access.
            </p>
          </div>

          {/* Right: Image Area */}
          <div className="hidden lg:block lg:w-1/2 relative bg-zinc-950">
            <img
              src="https://thumbs.dreamstime.com/b/futuristic-digital-library-bookshelves-filled-books-laptop-computer-ai-powered-info-search-glowing-binary-code-flows-around-356869766.jpg"
              alt="Digital Library Background"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p className="text-2xl font-semibold text-zinc-200 drop-shadow-md">
                Library Admin Panel System
              </p>
              <p className="text-sm text-zinc-300/70 mt-2">
                Manage books, track inventory, and organize your collection
              </p>
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="lg:hidden w-full h-48 relative bg-zinc-950">
            <img
              src="https://thumbs.dreamstime.com/b/futuristic-digital-library-bookshelves-filled-books-laptop-computer-ai-powered-info-search-glowing-binary-code-flows-around-356869766.jpg"
              alt="Digital Library"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-zinc-950/70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;