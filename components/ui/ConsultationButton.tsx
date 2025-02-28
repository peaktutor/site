// app/components/ui/ConsultationButton.tsx
// Styled button component with enhanced background
import React from 'react';

const ConsultationButton = () => {
  const handleCallClick = () => {
    window.location.href = 'tel:5618703273';
  };

  return (
    <div className="relative group">
      {/* Button glow effect wrapper */}
      <div className="relative z-10">
        <button
          onClick={handleCallClick}
          className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-blue-900 bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-300/30 overflow-hidden group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-600"
        >
          {/* Phone icon with pulse effect */}
          <span className="relative">
            <svg 
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-400/30 animate-ping opacity-75"></span>
          </span>
          
          <span>Call for Free Consultation</span>
          
          {/* Animated arrow */}
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      {/* Glass morphism glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-1000 group-hover:duration-200 animate-gradient-slow"></div>
      
      {/* Behind the button animations */}
      <div className="absolute -inset-20 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400/10 blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-indigo-400/10 blur-2xl"></div>
      </div>
    </div>
  );
};

export default ConsultationButton;

// Add this to your global CSS or component style
/*
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-slow {
  animation: gradient-shift 8s ease infinite;
  background-size: 200% 200%;
}
*/