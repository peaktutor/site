// app/components/sections/CTASection.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import  Container  from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleConsultationClick = () => {
    window.location.href = 'tel:5618703273';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    alert('Form submitted successfully!');
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Dynamic animated background with interactive blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900">
        {/* Interactive gradient overlay that follows mouse */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(147, 197, 253, 0.4) 0%,
                rgba(79, 70, 229, 0.2) 45%, 
                transparent 70%
              )
            `,
          }}
        />
        
        {/* Geometric shapes - fixed styling to avoid hydration issues */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3">
          <div className="absolute top-[10%] right-[20%] w-64 h-64 rounded-full bg-blue-600/10 backdrop-blur-3xl"></div>
          <div className="absolute top-[40%] right-[10%] w-40 h-40 rounded-full bg-indigo-600/10 backdrop-blur-3xl"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3">
          <div className="absolute bottom-[15%] left-[20%] w-72 h-72 rounded-full bg-purple-600/10 backdrop-blur-3xl"></div>
          <div className="absolute bottom-[35%] left-[5%] w-48 h-48 rounded-full bg-blue-300/10 backdrop-blur-3xl"></div>
        </div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="cta-orb cta-orb-1"></div>
          <div className="cta-orb cta-orb-2"></div>
          <div className="cta-orb cta-orb-3"></div>
          <div className="cta-orb cta-orb-4"></div>
          <div className="cta-orb cta-orb-5"></div>
          <div className="cta-orb cta-orb-6"></div>
        </div>
      </div>

      <Container>
        <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Text content - spans 5 columns */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative shapes */}
              <div className="absolute -top-10 -left-10 w-16 h-16 border-2 border-blue-400/20 rounded-xl transform rotate-12"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-2 border-blue-400/20 rounded-full"></div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to <span className="bg-gradient-to-r from-blue-200 to-indigo-100 bg-clip-text text-transparent">Transform</span> Your Academic Journey?
              </h2>
              
              <p className="text-lg text-blue-100 mb-8 max-w-lg">
                Take the first step toward academic excellence today. Our expert tutors are ready to help you unlock your full potential and achieve remarkable results.
              </p>
              
              <div className="mb-10">
                {/* Enhanced call button with animation effects */}
                <div className="relative group">
                  <button
                    onClick={handleConsultationClick}
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
                  
                  {/* Glass morphism glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-1000 group-hover:duration-200 animate-gradient-x"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start text-blue-200">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-300 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Flexible scheduling that works with your calendar</span>
                </div>
                
                <div className="flex items-start text-blue-200">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-300 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Personalized learning plans for your specific needs</span>
                </div>
                
                <div className="flex items-start text-blue-200">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-300 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>No commitment required — cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form - spans 7 columns with animation */}
          <div className="lg:col-span-7">
            <div 
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/30 transform transition-all duration-700"
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Request More Information</h3>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-xs text-gray-600">We typically respond within 24 hours</span>
                </div>
              </div>
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="group">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formState.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formState.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    placeholder="(555) 555-5555"
                    required
                  />
                </div>
                
                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                    Subject Interested In
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 appearance-none bg-white transition-all duration-200"
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="math">Mathematics</option>
                      <option value="science">Science</option>
                      <option value="language">Languages</option>
                      <option value="humanities">Humanities</option>
                      <option value="test-prep">Test Preparation</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                    rows={4}
                    placeholder="Tell us about your tutoring needs..."
                  />
                </div>
                
                <div className="relative group">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Submit Request
                  </button>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(var(--orbit-distance)) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(var(--orbit-distance)) rotate(-360deg); }
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .cta-orb {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          filter: blur(7px);
        }
        
        .cta-orb-1 {
          --orbit-distance: 100px;
          width: 40px;
          height: 40px;
          top: 20%;
          left: 70%;
          animation: orbit 25s linear infinite;
        }
        
        .cta-orb-2 {
          --orbit-distance: 150px;
          width: 60px;
          height: 60px;
          top: 60%;
          left: 20%;
          animation: orbit 30s linear infinite reverse;
        }
        
        .cta-orb-3 {
          --orbit-distance: 80px;
          width: 25px;
          height: 25px;
          top: 30%;
          left: 30%;
          animation: orbit 20s linear infinite;
        }
        
        .cta-orb-4 {
          --orbit-distance: 120px;
          width: 35px;
          height: 35px;
          top: 70%;
          left: 75%;
          animation: orbit 22s linear infinite reverse;
        }
        
        .cta-orb-5 {
          --orbit-distance: 65px;
          width: 20px;
          height: 20px;
          top: 15%;
          left: 40%;
          animation: orbit 18s linear infinite;
        }
        
        .cta-orb-6 {
          --orbit-distance: 90px;
          width: 30px;
          height: 30px;
          top: 40%;
          left: 60%;
          animation: orbit 28s linear infinite reverse;
        }
      `}</style>
    </section>
  );
};

export default CTASection;