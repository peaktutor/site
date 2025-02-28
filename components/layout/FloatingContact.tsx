"use client";
import React from 'react';
import { Button, Icons } from '../ui/Button';

const FloatingContact = () => {
  const handleCallClick = () => {
    window.location.href = 'tel:5618703273';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="gradient"
        size="lg"
        icon={<Icons.Phone />}
        onClick={handleCallClick}
        className="rounded-full group hover:pr-8"
      >
        <div className="flex flex-col items-start overflow-hidden">
          <span className="text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            FREE Consultation
          </span>
          <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-75">
            (561) 870-3273
          </span>
        </div>
      </Button>
      
      {/* Pulsing effect */}
      <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20"></div>
    </div>
  );
};

export default FloatingContact;