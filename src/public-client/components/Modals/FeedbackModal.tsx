// src/components/FeedbackModal.tsx
import React, { useState } from 'react';
import { X, User, Mail, Sparkles, LogIn } from 'lucide-react';

interface FeedbackModalProps {
  rating: number;
  message: string;
  isLoggedIn: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const FeedbackModal = ({
  rating,
  message,
  isLoggedIn,
  onClose,
  onLoginClick,
}: FeedbackModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you! Your feedback has been submitted successfully ✨");
      onClose();
    }, 1400);
  };

  // ========== NOT LOGGED IN ==========
  if (!isLoggedIn) {
    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-white/60 relative my-8 p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -top-28 -right-28 w-64 h-64 bg-gradient-to-br from-[#025aa7] via-blue-500 to-purple-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#025aa7] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-5">
            <LogIn className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-900">Login Required</h3>
          <p className="text-gray-600 mt-2 text-[15px]">
            You need to be logged in before you can submit feedback.
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={onLoginClick}
              className="w-full bg-gradient-to-r from-[#025aa7] to-blue-600 hover:from-[#024d8f] hover:to-blue-700 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg"
            >
              Login to Continue
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== LOGGED IN – normal form ==========
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-white/60 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Gradient Orb */}
        <div className="absolute -top-28 -right-28 w-64 h-64 bg-gradient-to-br from-[#025aa7] via-blue-500 to-purple-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#025aa7] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Almost there!</h3>
          <p className="text-gray-600 mt-1 text-[15px]">
            Just a few details to make your feedback personal
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-7">
          {/* Name Field */}
          <div className="relative group">
            <div className="absolute left-5 top-4 text-gray-400 group-focus-within:text-[#025aa7]">
              <User size={20} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className="peer w-full bg-white border border-gray-200 pl-12 pr-5 py-4 rounded-2xl focus:outline-none focus:border-[#025aa7] focus:ring-1 focus:ring-[#025aa7]/30 transition-all"
              required
            />
            <label className="absolute left-12 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#025aa7]">
              Your Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative group">
            <div className="absolute left-5 top-4 text-gray-400 group-focus-within:text-[#025aa7]">
              <Mail size={20} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full bg-white border border-gray-200 pl-12 pr-5 py-4 rounded-2xl focus:outline-none focus:border-[#025aa7] focus:ring-1 focus:ring-[#025aa7]/30 transition-all"
              required
            />
            <label className="absolute left-12 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#025aa7]">
              Email Address
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative overflow-hidden bg-gradient-to-r from-[#025aa7] to-blue-600 hover:from-[#024d8f] hover:to-blue-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 disabled:opacity-70 shadow-lg active:scale-[0.985]"
            >
              <span className={isSubmitting ? "opacity-0" : ""}>
                Submit My Feedback
              </span>
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>

          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Maybe later
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;