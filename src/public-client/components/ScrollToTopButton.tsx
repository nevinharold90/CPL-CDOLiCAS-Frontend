// src/components/ScrollToTopButton.tsx
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 hidden lg:flex items-center justify-center
        w-11 h-11 bg-white border border-gray-200 shadow-lg cursor-pointer
        rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      <ArrowUp 
        className="w-5 h-5 text-[#025aa7] transition-transform duration-300 hover:-rotate-45" 
      />
      
      {/* Subtle glow ring on hover */}
      <div className="absolute inset-0 rounded-2xl border border-[#025aa7]/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default ScrollToTopButton;