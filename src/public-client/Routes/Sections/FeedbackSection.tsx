// src/components/FeedbackSection.tsx
import React, { useState } from 'react';
import StarIcon from "../../assets/star.png";

interface FeedbackSectionProps {
  onFeedbackSubmit: (rating: number, message: string) => void;
}

const FeedbackSection = ({ onFeedbackSubmit }: FeedbackSectionProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !message.trim()) return;

    // Send data to parent (Homepage)
    onFeedbackSubmit(rating, message);

    // Optional: Reset form immediately
    setRating(0);
    setMessage("");
  };

  return (
    <section className="py-35 md:py-32 px-5 md:px-10 lg:px-16 bg-linear-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#025aa7_0.8px,transparent_1px)] bg-size-[40px_40px] opacity-10" />
      </div>

      <div className="absolute top-12 left-12 w-24 h-24 border border-[#025aa7]/20 rounded-2xl rotate-12 hidden lg:block" />
      <div className="absolute top-20 right-16 w-20 h-20 border-2 border-[#025aa7]/10 rounded-full -rotate-6 hidden lg:block" />
      <div className="absolute bottom-16 left-20 w-16 h-16 border border-amber-400/30 rounded-xl -rotate-12 hidden xl:block" />
      <div className="absolute bottom-24 right-12 w-28 h-28 border border-[#025aa7]/15 rounded-3xl rotate-6 hidden lg:block" />

      <div id="feedback" className="max-w-lg mx-auto relative z-10 scroll-animate">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-[#025aa7]/10 text-[#025aa7] px-6 py-2.5 rounded-full text-sm font-medium shadow-sm">
            YOUR FEEDBACK
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6 leading-tight">
            How Was Your Visit?
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Your feedback helps us serve you better.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Star Rating */}
            <div className="text-center">
              <p className="text-gray-700 mb-4">Rate your experience</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <img
                      src={StarIcon}
                      alt={`Star ${star}`}
                      className={`w-12 h-12 transition-all duration-200 ${
                        (hover || rating) >= star
                          ? "brightness-110 saturate-150 drop-shadow-sm"
                          : "grayscale opacity-40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What did you like? How can we improve?"
                rows={5}
                className="w-full px-6 py-5 border border-gray-200 rounded-3xl focus:outline-none focus:border-[#025aa7] focus:ring-1 focus:ring-[#025aa7]/30 resize-y min-h-[140px]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0 || !message.trim()}
              className="w-full bg-[#025aa7] disabled:bg-gray-300 hover:bg-[#024d8f] text-white font-medium py-4 rounded-2xl transition-all text-base shadow-sm cursor-pointer"
            >
              Continue
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Thank you for helping us improve!
        </p>
      </div>
    </section>
  );
};

export default FeedbackSection;