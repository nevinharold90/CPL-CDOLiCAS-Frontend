// src/components/LoginModal.tsx
import { useState } from 'react';
import { useLogin } from './LoginSignup/useLogin';
import { useSignup } from './LoginSignup/useSignup';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type AuthTab = 'login' | 'signup';

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#025aa7] focus:ring-1 focus:ring-[#025aa7]/20 transition-colors disabled:opacity-50";

function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  // 1. Declare ALL useState hooks at the top
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 2. Declare custom hooks unconditionally
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
        onSuccess?.();
      }, 5000);
    },
  });

  const {
    form, updateField,
    loading: signupLoading,
    errorMessage: signupError,
    successMessage: signupSuccess,
    handleSignup,
  } = useSignup({ onSuccess: () => setActiveTab('login') });

  // 3. Helper handlers
  const handleClose = () => {
    setActiveTab('login');
    setSignupStep(1);
    onClose();
  };

  // 4. Early return MUST be after all hook declarations
  if (!isOpen) return null;
  

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
              <div className="flex items-center justify-center py-8 text-sm text-gray-600">
                Login successful — redirecting... 
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
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
        {/* SIGNUP TAB */}
        {activeTab === 'signup' && (
          <>
            {signupSuccess ? (
              /* --- SUCCESS ANIMATION VIEW --- */
              <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                {/* Animated Icon Badge */}
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                <p className="text-sm text-gray-600 max-w-xs mb-6">
                  {signupSuccess}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setSignupStep(1);
                  }}
                  className="w-full py-3 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Proceed to Login
                </button>
              </div>
            ) : (
              /* --- REGISTRATION FORM VIEW --- */
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {signupStep === 1 ? 'Personal Details' : 'Create Account'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {signupStep === 1 ? 'Step 1 of 2: Basic details' : 'Step 2 of 2: Set up your login'}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${signupStep === 1 ? 'bg-[#025aa7]' : 'bg-gray-200'}`} />
                    <span className={`h-2.5 w-2.5 rounded-full ${signupStep === 2 ? 'bg-[#025aa7]' : 'bg-gray-200'}`} />
                  </div>
                </div>

                {signupError && (
                  <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">
                    {signupError}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (signupStep === 1) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setIsTransitioning(false);
                        setSignupStep(2);
                      }, 1000); // 1-second delay
                    } else {
                      handleSignup(e);
                    }
                  }}
                  className="space-y-5"
                >
                  {/* STEP 1: Personal & Work Credentials */}
                  {signupStep === 1 && (
                    <>
                      {/* Name Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <input
                          type="text"
                          value={form.first_name || ''}
                          onChange={(e) => updateField('first_name', e.target.value)}
                          placeholder="First Name *"
                          disabled={signupLoading}
                          required
                          className={inputClass}
                        />
                        <input
                          type="text"
                          value={form.middle_name || ''}
                          onChange={(e) => updateField('middle_name', e.target.value)}
                          placeholder="Middle Name"
                          disabled={signupLoading}
                          className={inputClass}
                        />
                        <input
                          type="text"
                          value={form.last_name || ''}
                          onChange={(e) => updateField('last_name', e.target.value)}
                          placeholder="Last Name *"
                          disabled={signupLoading}
                          required
                          className={inputClass}
                        />
                      </div>

                      {/* Contact & Gender */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input
                          type="tel"
                          value={form.c_number || ''}
                          onChange={(e) => updateField('c_number', e.target.value)}
                          placeholder="Contact Number"
                          disabled={signupLoading}
                          className={inputClass}
                        />
                        <select
                          value={form.sex || ''}
                          onChange={(e) => updateField('sex', e.target.value)}
                          disabled={signupLoading}
                          className={`${inputClass} text-gray-700`}
                        >
                          <option value="">Sex (Optional)</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      {/* Home Address & Organization */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input
                          type="text"
                          value={form.organization_office || ''}
                          onChange={(e) => updateField('organization_office', e.target.value)}
                          placeholder="Organization / Office Name"
                          disabled={signupLoading}
                          className={inputClass}
                        />
                        <input
                          type="text"
                          value={form.address || ''}
                          onChange={(e) => updateField('address', e.target.value)}
                          placeholder="Home Address"
                          disabled={signupLoading}
                          className={inputClass}
                        />
                      </div>

                      {/* Checkbox: Government Employee */}
                      <div className="flex items-center gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="is_gov_employee"
                          checked={form.is_gov_employee || false}
                          onChange={(e) => updateField('is_gov_employee', e.target.checked)}
                          disabled={signupLoading}
                          className="w-4 h-4 text-[#025aa7] rounded border-gray-300 focus:ring-[#025aa7] cursor-pointer"
                        />
                        <label htmlFor="is_gov_employee" className="text-sm text-gray-700 cursor-pointer font-medium select-none">
                          Are you a government employee?
                        </label>
                      </div>

                      {/* Conditional Fields for Government Employees */}
                      {form.is_gov_employee && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 bg-gray-50 border border-gray-200 rounded-xl transition-all">
                          <input
                            type="text"
                            value={form.employee_id_no || ''}
                            onChange={(e) => updateField('employee_id_no', e.target.value)}
                            placeholder="Employee ID No. *"
                            disabled={signupLoading}
                            required={form.is_gov_employee}
                            className={inputClass}
                          />
                          <input
                            type="text"
                            value={form.office_address || ''}
                            onChange={(e) => updateField('office_address', e.target.value)}
                            placeholder="Organization/Office Address *"
                            disabled={signupLoading}
                            className={inputClass}
                          />
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={isTransitioning}
                        className="w-full py-3 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-medium rounded-lg disabled:opacity-60 transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isTransitioning ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                          </>
                        ) : (
                          'Next'
                        )}
                      </button>
                    </>
                  )}

                  {/* STEP 2: Username, Email & Password */}
                  {signupStep === 2 && (
                    <>
                      <input
                        type="text"
                        value={form.username || ''}
                        onChange={(e) => updateField('username', e.target.value)}
                        placeholder="Username *"
                        disabled={signupLoading}
                        required
                        className={inputClass}
                      />

                      <input
                        type="email"
                        value={form.email || ''}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="Email Address *"
                        disabled={signupLoading}
                        required
                        className={inputClass}
                      />

                      <div className="relative">
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          value={form.password || ''}
                          onChange={(e) => updateField('password', e.target.value)}
                          placeholder="Password *"
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

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSignupStep(1)}
                          disabled={signupLoading}
                          className="w-1/3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={signupLoading}
                          className="w-2/3 py-3 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-medium rounded-lg disabled:opacity-60 transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          {signupLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Creating...</span>
                            </>
                          ) : (
                            'Create Account'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </form>

                <p className="text-center text-sm text-gray-500 mt-8">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      setSignupStep(1);
                    }}
                    className="text-[#025aa7] font-semibold hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </>
        )}
          </div>
        </div>
      );
    }

export default LoginModal;