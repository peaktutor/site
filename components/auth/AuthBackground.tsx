'use client';

import { useEffect, useState } from 'react';

export default function AuthBackground({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ease = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const normalizedScroll = ease(Math.min(scrollY / 500, 1));
  const cloudOpacity = Math.max(0.3, 1 - normalizedScroll);
  const cloudOffset = scrollY * 0.8;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 w-full h-full">
        {/* Sky Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-300 to-blue-600" />

        {/* Cloud Layers */}
        <div 
          className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
          style={{ opacity: cloudOpacity }}
        >
          {/* Large Clouds */}
          <div 
            className="absolute w-full h-full"
            style={{ 
              transform: `translate(${cloudOffset * -0.3}px, ${cloudOffset * 0.2}px)`,
              transition: 'transform 0.7s ease-out'
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={`cloud-large-${i}`}
                className="absolute transition-all duration-700"
                style={{
                  left: `${(i * 30) - 10}%`,
                  top: `${20 + (i % 2) * 15}%`,
                  width: '200px',
                  height: '60px',
                  borderRadius: '50px',
                  background: 'white',
                  boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.1)',
                  opacity: 0.9 - (i * 0.1),
                  transform: `scale(${1.4 - i * 0.1}) rotate(${i * 3}deg)`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-35px',
                    left: '25px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '25px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Small Clouds */}
          <div 
            className="absolute w-full h-full"
            style={{ 
              transform: `translate(${cloudOffset * 0.3}px, ${cloudOffset * 0.4}px)`,
              transition: 'transform 0.7s ease-out'
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={`cloud-small-${i}`}
                className="absolute transition-all duration-700"
                style={{
                  right: `${(i * 25) - 10}%`,
                  top: `${30 + (i % 3) * 12}%`,
                  width: '150px',
                  height: '45px',
                  borderRadius: '40px',
                  background: 'white',
                  boxShadow: '8px 8px 4px 0px rgba(0,0,0,0.1)',
                  opacity: 0.8 - (i * 0.1),
                  transform: `scale(${0.8 - i * 0.1}) rotate(${-i * 4}deg)`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-25px',
                    left: '20px',
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '-35px',
                    right: '20px',
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen z-10">
        {children}
      </div>
    </div>
  );
}

