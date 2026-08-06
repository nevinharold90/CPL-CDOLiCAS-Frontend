// src/components/FloatingFeedbackButton.tsx
import React, { useState } from 'react';

const FloatingFeedbackButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToFeedback = () => {
    const feedbackSection = document.getElementById('feedback');
    if (feedbackSection) {
      feedbackSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div id="feedback" className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:block">
      <button
        onClick={scrollToFeedback}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group cursor-pointer
          bg-[#025aa7] text-white 
          px-3 py-8 rounded-3xl shadow-lg transition-all duration-300
          border border-white/30 backdrop-blur-md
          hover:bg-[#025aa7] hover:shadow-2xl hover:scale-105
          ${isHovered 
            ? 'bg-[#025aa7] shadow-2xl' 
            : 'bg-[#025aa7]/20'
          }
        `}
        aria-label="Give Feedback"
      >
        {/* Vertical Text Only */}
        <div 
          className={`
            text-sm font-semibold tracking-widest uppercase transition-all duration-300
            ${isHovered ? 'text-white' : 'text-white/80'}
          `}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          Feedback
        </div>
      </button>

      {/* Optional Tooltip */}
      {isHovered && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-full">
          Share your thoughts
        </div>
      )}
    </div>
  );
};

export default FloatingFeedbackButton;