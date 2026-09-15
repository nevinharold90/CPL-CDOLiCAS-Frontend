// src/components/LoginModal.tsx
import { useState } from 'react';
import { useLogin } from './LoginSignup/useLogin';
import { useSignup } from './LoginSignup/useSignup';
import { 
  Loader2, 
  CheckCircle2, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Briefcase, 
  CreditCard,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type AuthTab = 'login' | 'signup';

const inputClass =
  "w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/10 transition-all disabled:opacity-50";

function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  // 1. Declare ALL useState hooks at the top
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

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
    setCustomError(null);
    onClose();
  };

  // Validation interceptor for Step 2 (Gmail & Contact number rules)
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null);

    // Strict Gmail validation check
    const emailVal = form.email?.trim().toLowerCase() || '';
    if (!emailVal.endsWith('@gmail.com') || emailVal === '@gmail.com') {
      setCustomError('Please enter a valid Gmail address ending strictly with @gmail.com');
      return;
    }

    // Strict Contact Number check (if provided, must be digits/symbols and at least 7-11 chars)
    const phoneVal = form.c_number?.trim() || '';
    if (phoneVal) {
      const phoneRegex = /^[+]?[\d\s-]{7,15}$/;
      if (!phoneRegex.test(phoneVal)) {
        setCustomError('Please enter a valid contact number format.');
        return;
      }
    }

    handleSignup(e);
  };

  // 4. Early return MUST be after all hook declarations
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className={`w-full ${activeTab === 'signup' ? 'max-w-2xl' : 'max-w-md'} bg-white rounded-3xl shadow-2xl p-8 sm:p-10 relative transition-all duration-300 overflow-hidden border border-gray-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#025aa7] to-blue-400" />

        {/* Clear, elevated Close Button positioned completely away from content */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer z-20 shadow-sm"
        >
          ✕
        </button>

        {/* Tab Switcher Pills */}
        <div className="flex bg-gray-100/80 p-1 rounded-2xl mb-8 mt-2">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setSignupStep(1); setCustomError(null); }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setCustomError(null); }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* LOGIN */}
        {activeTab === 'login' && (
          <div className="animate-in fade-in duration-300">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
              <p className="text-sm text-gray-500 mt-1">Please enter your login details to proceed.</p>
            </div>

            {loginError && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl flex items-center gap-2">
                <span>{loginError}</span>
              </div>
            )}

            {isRedirecting ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-sm text-gray-600">
                <Loader2 className="h-8 w-8 animate-spin text-[#025aa7]" />
                <span>Login successful — redirecting...</span>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or Email"
                    disabled={loginLoading}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={loginLoading}
                    required
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#025aa7]/20 disabled:opacity-60 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* SIGNUP TAB */}
        {activeTab === 'signup' && (
          <div className="animate-in fade-in duration-300">
            {signupSuccess ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
                <p className="text-sm text-gray-600 max-w-xs mb-6">
                  {signupSuccess}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setSignupStep(1);
                  }}
                  className="w-full py-3.5 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-lg shadow-[#025aa7]/20"
                >
                  Proceed to Login
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      {signupStep === 1 ? 'Personal Details' : 'Account Credentials'}
                    </h2>
                    <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">
                      {signupStep === 1 ? 'Step 1 of 2: Basic Info' : 'Step 2 of 2: Security'}
                    </p>
                  </div>

                  {/* Visual Stepper Dots */}
                  <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-full border border-gray-100">
                    <span className={`h-2 rounded-full transition-all ${signupStep === 1 ? 'w-6 bg-[#025aa7]' : 'w-2 bg-gray-300'}`} />
                    <span className={`h-2 rounded-full transition-all ${signupStep === 2 ? 'w-6 bg-[#025aa7]' : 'w-2 bg-gray-300'}`} />
                  </div>
                </div>

                {(signupError || customError) && (
                  <div className="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl">
                    {signupError || customError}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (signupStep === 1) {
                      setCustomError(null);
                      // Validate contact number format in step 1 if entered
                      const phoneVal = form.c_number?.trim() || '';
                      if (phoneVal) {
                        const phoneRegex = /^[+]?[\d\s-]{7,15}$/;
                        if (!phoneRegex.test(phoneVal)) {
                          setCustomError('Please enter a valid contact number format.');
                          return;
                        }
                      }

                      setIsTransitioning(true);
                      setTimeout(() => {
                        setIsTransitioning(false);
                        setSignupStep(2);
                      }, 800);
                    } else {
                      handleSignupSubmit(e);
                    }
                  }}
                  className="space-y-4"
                >
                  {/* STEP 1 */}
                  {signupStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={form.first_name || ''}
                            onChange={(e) => updateField('first_name', e.target.value)}
                            placeholder="First Name *"
                            disabled={signupLoading}
                            required
                            className={inputClass}
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={form.middle_name || ''}
                            onChange={(e) => updateField('middle_name', e.target.value)}
                            placeholder="Middle Name"
                            disabled={signupLoading}
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#025aa7] transition-all"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={form.last_name || ''}
                            onChange={(e) => updateField('last_name', e.target.value)}
                            placeholder="Last Name *"
                            disabled={signupLoading}
                            required
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#025aa7] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={form.c_number || ''}
                            onChange={(e) => updateField('c_number', e.target.value)}
                            placeholder="Contact Number"
                            disabled={signupLoading}
                            className={inputClass}
                          />
                        </div>
                        <div className="relative">
                          <select
                            value={form.sex || ''}
                            onChange={(e) => updateField('sex', e.target.value)}
                            disabled={signupLoading}
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-[#025aa7] transition-all cursor-pointer"
                          >
                            <option value="">Sex (Optional)</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={form.organization_office || ''}
                            onChange={(e) => updateField('organization_office', e.target.value)}
                            placeholder="Organization / Office (Optional)"
                            disabled={signupLoading}
                            className={inputClass}
                          />
                        </div>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={form.address || ''}
                            onChange={(e) => updateField('address', e.target.value)}
                            placeholder="Home Address"
                            disabled={signupLoading}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3.5 bg-gray-50/80 rounded-xl border border-gray-100">
                        <input
                          type="checkbox"
                          id="is_gov_employee"
                          checked={form.is_gov_employee || false}
                          onChange={(e) => updateField('is_gov_employee', e.target.checked)}
                          disabled={signupLoading}
                          className="w-4 h-4 text-[#025aa7] rounded border-gray-300 focus:ring-[#025aa7] cursor-pointer"
                        />
                        <label htmlFor="is_gov_employee" className="text-xs font-medium text-gray-700 cursor-pointer select-none">
                          Are you a government employee?
                        </label>
                      </div>

                      {form.is_gov_employee && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-blue-50/40 border border-blue-100 rounded-2xl transition-all">
                          <div className="relative">
                            <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={form.employee_id_no || ''}
                              onChange={(e) => updateField('employee_id_no', e.target.value)}
                              placeholder="Employee ID No. *"
                              disabled={signupLoading}
                              required={form.is_gov_employee}
                              className={inputClass}
                            />
                          </div>
                          <div className="relative">
                            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={form.office_address || ''}
                              onChange={(e) => updateField('office_address', e.target.value)}
                              placeholder="Office Address *"
                              disabled={signupLoading}
                              className={inputClass}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isTransitioning}
                        className="w-full py-3.5 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#025aa7]/20 disabled:opacity-60 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                      >
                        {isTransitioning ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                          </>
                        ) : (
                          'Next Step'
                        )}
                      </button>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {signupStep === 2 && (
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={form.username || ''}
                          onChange={(e) => updateField('username', e.target.value)}
                          placeholder="Username *"
                          disabled={signupLoading}
                          required
                          className={inputClass}
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={form.email || ''}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="Gmail Address (e.g., name@gmail.com) *"
                          disabled={signupLoading}
                          required
                          className={inputClass}
                        />
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          value={form.password || ''}
                          onChange={(e) => updateField('password', e.target.value)}
                          placeholder="Password *"
                          disabled={signupLoading}
                          required
                          className={`${inputClass} pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => { setSignupStep(1); setCustomError(null); }}
                          disabled={signupLoading}
                          className="w-1/3 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={signupLoading}
                          className="w-2/3 py-3.5 bg-[#025aa7] hover:bg-[#024d8f] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#025aa7]/20 disabled:opacity-60 transition-all cursor-pointer flex items-center justify-center gap-2"
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
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;