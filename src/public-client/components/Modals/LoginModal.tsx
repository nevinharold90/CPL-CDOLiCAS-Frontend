// src/components/LoginModal.tsx
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useSignup } from '../../hooks/useSignup';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // ← new optional callback
}

type AuthTab = 'login' | 'signup';

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#025aa7] focus:ring-1 focus:ring-[#025aa7]/20 transition-colors disabled:opacity-50";

function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const {
    username, setUsername,
    password, setPassword,
    loading: loginLoading,
    errorMessage: loginError,
    isRedirecting,
    handleLogin,
  } = useLogin({
    onSuccess: () => {
      setTimeout(() => {
        onClose();
        onSuccess?.(); // ← call the extra success handler
      }, 800);
    },
  });

  const {
    form, updateField,
    loading: signupLoading,
    errorMessage: signupError,
    successMessage: signupSuccess,
    handleSignup,
  } = useSignup({ onSuccess: () => setActiveTab('login') });

  if (!isOpen) return null;

  const handleClose = () => {
    setActiveTab('login');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className={`w-full ${activeTab === 'signup' ? 'max-w-2xl' : 'max-w-md'} bg-white rounded-2xl shadow-2xl p-10 relative transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>

        {/* LOGIN */}
        {activeTab === 'login' && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <p className="text-sm text-gray-500 mt-1.5">Enter your credentials to continue.</p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">
                {loginError}
              </div>
            )}

            {isRedirecting ? (
              <div className="text-center py-8 text-sm text-gray-600">
                Login successful — redirecting...
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or Email"
                  disabled={loginLoading}
                  required
                  className={inputClass}
                />

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={loginLoading}
                    required
                    className={`${inputClass} pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-medium rounded-lg disabled:opacity-60 transition-colors"
                >
                  {loginLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            )}

            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className="text-[#025aa7] font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </>
        )}

        {/* SIGNUP */}
        {activeTab === 'signup' && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
              <p className="text-sm text-gray-500 mt-1.5">Fill in your details to create an account.</p>
            </div>

            {signupError && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">
                {signupError}
              </div>
            )}

            {signupSuccess && (
              <div className="mb-5 p-3 bg-green-50 border border-green-100 text-green-600 text-xs rounded-lg">
                {signupSuccess}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Full Name"
                  disabled={signupLoading}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => updateField('username', e.target.value)}
                  placeholder="Username"
                  disabled={signupLoading}
                  required
                  className={inputClass}
                />
              </div>

              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="Email Address"
                disabled={signupLoading}
                required
                className={inputClass}
              />

              <div className="relative">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Password"
                  disabled={signupLoading}
                  required
                  className={`${inputClass} pr-14`}
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  {showSignupPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  value={form.number}
                  onChange={(e) => updateField('number', e.target.value)}
                  placeholder="Phone Number"
                  disabled={signupLoading}
                  required
                  className={inputClass}
                />
                <select
                  value={form.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  disabled={signupLoading}
                  required
                  className={`${inputClass} text-gray-700`}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="number"
                  min={1}
                  value={form.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  placeholder="Age"
                  disabled={signupLoading}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Location"
                  disabled={signupLoading}
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={signupLoading}
                className="w-full py-3 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-medium rounded-lg disabled:opacity-60 transition-colors"
              >
                {signupLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-[#025aa7] font-semibold hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;