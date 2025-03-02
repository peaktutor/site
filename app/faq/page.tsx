'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card'; // Fixed casing to match other files
import Link from 'next/link';
// Note: You'll need to install framer-motion if not already installed:
// npm install framer-motion
// or
// yarn add framer-motion
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create ref for sections
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced mouse parallax effect
  const calculateMouseParallax = (factor: number, depth = 1) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { 
      transform: `translate3d(${x}px, ${y}px, 0) scale(${1 + depth * 0.01})`,
      transition: 'transform 0.1s ease-out'
    };
  };

  const faqItems = [
    {
      question: "What subjects do you offer tutoring in?",
      answer: "We offer tutoring in a wide range of subjects including Math, Science, Language Arts, and more. We also provide test preparation services for standardized tests like SAT and ACT.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      question: "How do you match tutors with students?",
      answer: "We carefully match tutors with students based on individual needs, learning styles, and academic goals. This personalized approach ensures an effective and enjoyable learning experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      question: "Do you offer online tutoring?",
      answer: "Yes, we offer both online and in-person tutoring options to accommodate different preferences and schedules.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "What age groups do you work with?",
      answer: "We work with students of all ages, from elementary school to adults. Our tutors are experienced in adapting their teaching methods to suit different age groups and learning levels.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      question: "How long are tutoring sessions?",
      answer: "We offer flexible session lengths to accommodate different needs. Typically, sessions can range from 30 minutes to 2 hours, depending on the student's requirements and attention span.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: "Do you offer group tutoring?",
      answer: "Yes, we do offer group tutoring options. This can be a great way for students to learn collaboratively and can also be more cost-effective.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Animations for background elements
  const animationStyles = `
    /* Enhanced Reveals */
    .reveal {
      opacity: 0;
      transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    
    .reveal.fade-up {
      transform: translateY(40px);
    }
    
    .reveal.fade-down {
      transform: translateY(-40px);
    }
    
    .reveal.fade-left {
      transform: translateX(-40px);
    }
    
    .reveal.fade-right {
      transform: translateX(40px);
    }
    
    .reveal.in-view {
      opacity: 1;
      transform: translate(0) scale(1);
    }
    
    /* Floating animations */
    @keyframes float-slow {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes float-medium {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes float-fast {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    
    .float-slow {
      animation: float-slow 6s ease-in-out infinite;
    }
    
    .float-medium {
      animation: float-medium 4s ease-in-out infinite;
    }
    
    .float-fast {
      animation: float-fast 3s ease-in-out infinite;
    }
    
    /* Button hover effects */
    .btn-shine {
      position: relative;
      overflow: hidden;
    }
    
    .btn-shine:after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      transform: rotate(30deg);
      transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }
    
    .btn-shine:hover:after {
      transform: rotate(30deg) translate(10%, 10%);
    }
    
    /* Card hover effects */
    .hover-card {
      transition: all 0.3s ease;
    }
    
    .hover-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04);
    }

    /* FAQ question hover effect */
    .faq-question {
      transition: all 0.3s ease;
    }
    
    .faq-question:hover:not(.active) {
      background-color: rgba(239, 246, 255, 0.7);
    }
    
    .faq-question.active {
      background-color: rgba(219, 234, 254, 0.7);
      border-color: rgba(147, 197, 253, 0.5);
    }
  `;

  // Effect for intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add delay based on element index within parent
            const elements = Array.from(entry.target.parentElement?.children || []);
            const elementIndex = elements.indexOf(entry.target);
            
            setTimeout(() => {
              entry.target.classList.add('in-view');
            }, elementIndex * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="overflow-hidden relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <style jsx>{animationStyles}</style>
      
      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-full h-full">
          {/* Organic shapes that follow scroll and mouse movement */}
          <div 
            className="absolute top-[10%] left-[15%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-r from-blue-200/20 to-indigo-300/20 blur-[80px] float-slow"
            style={calculateMouseParallax(-0.02, 2)}
          />
          <div 
            className="absolute top-[40%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-purple-200/20 to-indigo-200/20 blur-[60px] float-medium"
            style={calculateMouseParallax(0.01, 1.5)}
          />
          <div 
            className="absolute bottom-[20%] left-[20%] w-[20vw] h-[20vw] rounded-full bg-gradient-to-r from-blue-200/10 to-purple-300/10 blur-[50px] float-fast"
            style={calculateMouseParallax(0.015, 1)}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section 
          ref={headerRef}
          className="min-h-[40vh] relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600/90 to-indigo-800/90"
        >
          <div className="absolute inset-0 z-0">
            {/* Organic wave pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z"
                  fill="white"
                  fillOpacity="0.3"
                >
                  <animate
                    attributeName="d"
                    dur="15s"
                    repeatCount="indefinite"
                    values="
                      M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z;
                      M0,50 C30,40 50,60 70,40 C90,30 100,50 100,50 L100,100 L0,100 Z;
                      M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z
                    "
                  />
                </path>
              </svg>
            </div>
          </div>
          
          <div 
            className="container mx-auto px-6 py-12 z-10 text-center"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
            >
              <span className="relative inline-block">
                <span className="relative z-10">FAQs</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-purple-400 opacity-70 rounded-full"></span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Find answers to common questions about our tutoring services and approach
            </motion.p>
          </div>
          
          {/* Wave separator at bottom */}
          <div className="absolute bottom-0 left-0 right-0 transform">
            <svg viewBox="0 0 1440 150" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,128L48,122.7C96,117,192,107,288,90.7C384,75,480,53,576,58.7C672,64,768,96,864,106.7C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,150L1392,150C1344,150,1248,150,1152,150C1056,150,960,150,864,150C768,150,672,150,576,150C480,150,384,150,288,150C192,150,96,150,48,150L0,150Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          ref={faqRef}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal fade-up">
              <h2 className="text-3xl font-bold text-gray-800 inline-block relative">
                Common Questions
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto reveal fade-up">
                We've compiled answers to the questions we receive most frequently from students and parents.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="reveal fade-up hover-card"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`border border-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 faq-question ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activeIndex === index 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-500'
                        } transition-colors duration-300 float-fast`}>
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                      </div>
                      <motion.div
                        animate={{ 
                          rotate: activeIndex === index ? 180 : 0,
                          backgroundColor: activeIndex === index ? 'rgba(219, 234, 254, 1)' : 'rgba(243, 244, 246, 1)'
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100"
                        >
                          <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section 
          ref={ctaRef}
          className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800"
        >
          {/* Wave separator at top - inverted */}
          <div className="absolute top-0 left-0 right-0 transform rotate z-10">
            <svg viewBox="0 0 1440 120" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,0 L1440,0 L1440,30 L1392,32 C1344,32,1248,32,1152,37.3 C1056,43,960,53,864,64 C768,75,672,85,576,80 C480,75,384,53,288,53.3 C192,53,96,75,48,85.3 L0,96 Z"
              ></path>
            </svg>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/30 blur-3xl float-slow"></div>
            <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl float-medium"></div>
            <div className="absolute bottom-10 left-1/3 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl float-fast"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 pt-16"
              >
                Still Have Questions?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-blue-100 mb-8"
              >
                We're here to help. Contact us for personalized assistance with your tutoring needs.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link 
                  href="/contact"
                  className="px-8 py-4 bg-white text-blue-800 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-medium btn-shine"
                >
                  Schedule a Free Consultation
                </Link>
                <Link 
                  href="tel:+15618703273"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-lg font-medium btn-shine flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Us: (561) 870-3273
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Wave separator at bottom */}
          <div className="absolute bottom-0 left-0 right-0 transform">
            <svg viewBox="0 0 1440 120" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              ></path>
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
}