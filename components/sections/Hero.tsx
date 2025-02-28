// app/components/sections/Hero.tsx
"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Container from '../ui/Container';
import { Button } from '@/components/ui/Button';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleConsultationClick = () => {
    window.location.href = 'tel:5618703273';
  };

  // Dynamic gradient following mouse
  const gradientPosition = `${mousePosition.x}% ${mousePosition.y}%`;
  
  // Parallax effect calculations
  const parallaxOffset = Math.min(scrollY * 0.4, 100);
  const featureOffset = Math.max(0, 100 - scrollY * 0.5);

  // Feature icon renderer - direct function definition
  const renderFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return (
          <svg className="h-5 w-5 text-blue-300 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'Users':
        return (
          <svg className="h-5 w-5 text-blue-300 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'TrendingUp':
        return (
          <svg className="h-5 w-5 text-blue-300 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden pt-20 pb-24 md:pt-24 md:pb-32 lg:pt-28 lg:pb-40 min-h-[90vh] flex items-center"
    >
      {/* Dynamic animated background */}
      <div 
        className="absolute inset-0 transition-all duration-200 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${gradientPosition}, 
              #87CEEB 0%,    /* Sky Blue */
              #3B82F6 40%,   /* Light Blue */
              #1E40AF 100%   /* Dark Blue */
            )
          `,
        }}
      >
        {/* Animated noise texture */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `
              linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.1) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(255, 255, 255, 0.1) 75%,
                transparent 75%,
                transparent
              )
            `,
            backgroundSize: '200px 200px',
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        
        {/* Fixed particles to avoid hydration issues */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
          <div className="particle particle-7"></div>
          <div className="particle particle-8"></div>
          <div className="particle particle-9"></div>
          <div className="particle particle-10"></div>
          <div className="particle particle-11"></div>
          <div className="particle particle-12"></div>
        </div>
      </div>

      {/* Content with parallax effect */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Main content with parallax */}
              <div 
                className="text-center lg:text-left"
                style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-6 animate-pulse">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  Now Enrolling New Students
                </span>
                
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                    Academic Performance
                  </span>
                </h1>
                
                <p className="mb-8 text-lg text-blue-100 md:text-xl max-w-xl">
                  Expert tutoring tailored to your needs. Get started today with a free consultation
                  and take the first step towards academic excellence.
                </p>
                
                {/* CTA Section with hover effects */}
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <Button
                    variant="white"
                    size="lg"
                    icon={<svg
                        className="w-5 h-5 animate-pulse"
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
                      </svg>}
                    onClick={handleConsultationClick}
                    className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/20"
                  >
                    Get Your Free Consultation
                  </Button>
                  <p className="text-sm text-blue-100 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    No obligation, just results
                  </p>
                </div>
              </div>

              {/* Image Section with parallax effect */}
              <div 
                className="relative hidden lg:block"
                style={{ transform: `translateY(${-parallaxOffset * 0.1}px)` }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-100 min-h-[450px] group">
                  {/* Floating elements using CSS classes instead of inline styles */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-500/30 backdrop-blur-md z-10 floating-element"></div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-purple-500/20 backdrop-blur-md z-10 floating-element-delayed"></div>
                  
                  <Image
                    src="/images/desk-setup.jpeg"
                    alt="Professional study setup with books and materials"
                    width={600}
                    height={450}
                    className="object-cover w-full h-full rounded-xl transform group-hover:scale-105 transition-all duration-700"
                    priority
                  />
                  
                  {/* Enhanced glass-morphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/30 to-transparent backdrop-blur-[2px] group-hover:backdrop-blur-[1px] transition-all duration-500 pointer-events-none" />
                  
                  {/* Animated glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-blue-500/0 via-blue-400/20 to-purple-500/0 transition-opacity duration-700 pointer-events-none" />
                </div>
                
                {/* Stats with enhanced glass effect and animation */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-md transform transition-transform duration-500 group-hover:translate-y-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-white text-center transform hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">500+</div>
                      <div className="text-sm">Students Helped</div>
                    </div>
                    <div className="text-white text-center transform hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">98%</div>
                      <div className="text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features list with parallax and glass effect */}
            <div 
              className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
              style={{ transform: `translateY(${-featureOffset * 0.2}px)`, opacity: 1 - (featureOffset * 0.01) }}
            >
              {[
                { text: 'Personalized Learning Plans', icon: 'BookOpen' },
                { text: 'Experienced Tutors', icon: 'Users' },
                { text: 'Proven Results', icon: 'TrendingUp' },
              ].map((feature, index) => (
                <div
                  key={feature.text}
                  className="rounded-lg backdrop-blur-md bg-white/10 px-6 py-4 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  {renderFeatureIcon(feature.icon)}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      
      {/* Custom animations with CSS classes instead of dynamic styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .floating-element {
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-element-delayed {
          animation: floatDelayed 12s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          filter: blur(4px);
        }
        
        .particle-1 {
          width: 6px;
          height: 6px;
          top: 10%;
          left: 15%;
          opacity: 0.6;
          animation: float 14s ease-in-out infinite;
        }
        
        .particle-2 {
          width: 8px;
          height: 8px;
          top: 20%;
          left: 65%;
          opacity: 0.4;
          animation: floatDelayed 16s ease-in-out infinite;
        }
        
        .particle-3 {
          width: 4px;
          height: 4px;
          top: 35%;
          left: 30%;
          opacity: 0.7;
          animation: float 18s ease-in-out infinite;
        }
        
        .particle-4 {
          width: 7px;
          height: 7px;
          top: 50%;
          left: 80%;
          opacity: 0.5;
          animation: floatDelayed 15s ease-in-out infinite;
        }
        
        .particle-5 {
          width: 5px;
          height: 5px;
          top: 70%;
          left: 45%;
          opacity: 0.6;
          animation: float 19s ease-in-out infinite;
        }
        
        .particle-6 {
          width: 9px;
          height: 9px;
          top: 85%;
          left: 70%;
          opacity: 0.4;
          animation: floatDelayed 17s ease-in-out infinite;
        }
        
        .particle-7 {
          width: 6px;
          height: 6px;
          top: 15%;
          left: 85%;
          opacity: 0.5;
          animation: float 13s ease-in-out infinite;
        }
        
        .particle-8 {
          width: 5px;
          height: 5px;
          top: 40%;
          left: 10%;
          opacity: 0.6;
          animation: floatDelayed 20s ease-in-out infinite;
        }
        
        .particle-9 {
          width: 7px;
          height: 7px;
          top: 65%;
          left: 25%;
          opacity: 0.7;
          animation: float 16s ease-in-out infinite;
        }
        
        .particle-10 {
          width: 4px;
          height: 4px;
          top: 80%;
          left: 55%;
          opacity: 0.5;
          animation: floatDelayed 14s ease-in-out infinite;
        }
        
        .particle-11 {
          width: 8px;
          height: 8px;
          top: 25%;
          left: 40%;
          opacity: 0.6;
          animation: float 17s ease-in-out infinite;
        }
        
        .particle-12 {
          width: 6px;
          height: 6px;
          top: 55%;
          left: 90%;
          opacity: 0.4;
          animation: floatDelayed 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;