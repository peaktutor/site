'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';



export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create refs for all sections
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const mathRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const testPrepRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position for parallax and animations
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

  // Enhanced Animation on scroll with Intersection Observer
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

  // Mouse parallax effect with enhanced 3D feel
  const calculateMouseParallax = (factor: number, depth = 1) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { 
      transform: `translate3d(${x}px, ${y}px, 0) scale(${1 + depth * 0.01})`,
      transition: 'transform 0.1s ease-out'
    };
  };

  // Add these styles to your component or import them
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
    
    .reveal.zoom-in {
      transform: scale(0.9);
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
  `;

  return (
    <div className="overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-50">
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
          ref={heroRef}
          className="min-h-screen relative flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-800/90"></div>
            
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white reveal fade-up">
              Our <span className="relative inline-block">
                <span className="relative z-10">Services</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-purple-400 opacity-70 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8 reveal fade-up" style={{ animationDelay: '100ms' }}>
              Comprehensive tutoring solutions tailored to meet your academic needs and goals
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 reveal fade-up" style={{ animationDelay: '200ms' }}>
              <Link 
                href="#services" 
                className="px-8 py-3 bg-white text-blue-800 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-medium btn-shine"
                onClick={(e) => {
                  e.preventDefault();
                  overviewRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Services
              </Link>
              <Link 
                href="tel:+15618703273"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-lg font-medium btn-shine"
              >
                Contact Us
              </Link>
            </div>
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

        {/* Services Overview Section */}
        <section 
          ref={overviewRef}
          id="services"
          className="py-20 px-6 bg-white"
        >
          <div className="container mx-auto max-w-5xl">
            <p className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed reveal fade-up">
              At Peak Tutoring, we provide personalized learning experiences designed to help students 
              master challenging subjects, build confidence, and achieve academic excellence. 
              Each of our services is crafted to address specific educational needs while adapting to 
              each student's unique learning style.
            </p>
          </div>
        </section>

        {/* Math Tutoring Section */}
        <section 
          ref={mathRef}
          className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-blue-50"
        >
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 w-64 h-64 rounded-full bg-blue-100/50 -translate-x-1/2 -translate-y-1/2 blur-3xl float-slow"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-indigo-100/50 translate-x-1/2 translate-y-1/2 blur-3xl float-medium"></div>
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
                Math Tutoring
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left Image/Visual */}
              <div className="md:col-span-5 reveal fade-right">
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl hover-card">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center float-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Building Mathematical Confidence</h3>
                        <p className="text-blue-100">Our approach transforms math from intimidating to inspiring, helping students develop strong foundations and problem-solving skills.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-200 rounded-2xl -z-10 rotate-3 float-slow"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-50 -z-10 blur-xl float-fast"></div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="md:col-span-7 reveal fade-left">
                <Card className="bg-white/80 backdrop-blur-lg shadow-xl hover-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Comprehensive Math Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Our math tutoring services cover a wide range of topics and difficulty levels, from elementary arithmetic to advanced calculus. We focus on:
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Building strong foundational skills",
                        "Developing problem-solving strategies",
                        "Preparing for exams and standardized tests",
                        "Addressing individual learning challenges",
                        "Fostering a growth mindset in mathematics"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start reveal fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                          <svg className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-gray-800">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link 
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 btn-shine"
                      >
                        Get Started with Math Tutoring
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Science Tutoring Section */}
        <section 
          ref={scienceRef}
          className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-green-50"
        >
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-green-100/50 translate-x-1/2 -translate-y-1/2 blur-3xl float-slow"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-teal-100/50 -translate-x-1/2 translate-y-1/2 blur-3xl float-medium"></div>

          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
                Science Tutoring
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left Content */}
              <div className="md:col-span-7 reveal fade-right">
                <Card className="bg-white/80 backdrop-blur-lg shadow-xl hover-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Exploring the World of Science</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Our science tutoring program is designed to ignite curiosity and foster a deep understanding of scientific principles. We cover various disciplines including:
                    </p>

                    <ul className="space-y-4">
                      {[
                        "Biology and Life Sciences",
                        "Chemistry and Molecular Studies",
                        "Physics and Natural Laws",
                        "Earth and Environmental Sciences",
                        "Scientific Method and Experimentation"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start reveal fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                          <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-gray-800">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link 
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 btn-shine"
                      >
                        Discover Science Tutoring
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Image/Visual */}
              <div className="md:col-span-5 reveal fade-left">
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl hover-card">
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center float-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Hands-On Learning</h3>
                        <p className="text-green-100">We emphasize practical experiments and real-world applications to make science engaging and relevant.</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-green-200 rounded-2xl -z-10 -rotate-3 float-slow"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-50 -z-10 blur-xl float-fast"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Language Arts Section */}
        <section 
          ref={languageRef}
          className="py-24 relative bg-gradient-to-br from-white to-blue-50 overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 w-64 h-64 rounded-full bg-blue-100/50 -translate-x-1/2 -translate-y-1/2 blur-3xl float-slow"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-indigo-100/50 translate-x-1/2 translate-y-1/2 blur-3xl float-medium"></div>
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
                Language Arts
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left Image/Visual */}
              <div className="md:col-span-5 reveal fade-right">
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl hover-card">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center float-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Mastering Communication</h3>
                        <p className="text-blue-100">Develop critical reading skills, powerful writing, and confident expression to become an effective communicator in any context.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-purple-200 rounded-2xl -z-10 rotate-3 float-slow"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-50 -z-10 blur-xl float-fast"></div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="md:col-span-7 reveal fade-left">
                <Card className="bg-white/80 backdrop-blur-lg shadow-xl hover-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Language & Communication Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Improve your reading comprehension, writing skills, and literary analysis with our 
                      experienced language arts tutors. We foster a deep appreciation for literature while 
                      developing the communication skills essential for academic and professional success.
                    </p>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Reading Comprehension",
                          description: "Develop critical reading strategies to analyze texts, identify themes, and understand author's intent.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )
                        },
                        {
                          title: "Writing Skills",
                          description: "Learn effective writing techniques for essays, research papers, creative writing, and more.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          )
                        },
                        {
                          title: "Grammar & Vocabulary",
                          description: "Build a strong foundation in grammar and expand vocabulary for more powerful self-expression.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                          )
                        },
                        {
                          title: "Literary Analysis",
                          description: "Develop skills to analyze literature, poetry, and rhetoric with confidence and insight.",
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover-card reveal fade-up" style={{ animationDelay: `${index * 150}ms` }}>
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 float-fast">
                              <div className="text-blue-600">
                                {item.icon}
                              </div>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link 
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300 btn-shine"
                      >
                        Enhance Your Language Skills
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Test Prep Section */}
        <section 
          ref={testPrepRef}
          className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-amber-50"
        >
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-amber-100/50 translate-x-1/2 -translate-y-1/2 blur-3xl float-slow"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-orange-100/50 -translate-x-1/2 translate-y-1/2 blur-3xl float-medium"></div>

          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
                Test Preparation
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left Content */}
              <div className="md:col-span-7 reveal fade-right">
                <Card className="bg-white/80 backdrop-blur-lg shadow-xl hover-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Strategic Test Preparation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Our targeted test preparation services are designed to maximize scores and build confidence. 
                      We provide personalized strategies, practice materials, and techniques specific to each exam.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white/50 backdrop-blur-sm p-5 rounded-lg shadow-md hover-card reveal fade-up">
                        <h3 className="text-xl font-semibold mb-3 text-amber-700">Standardized Tests</h3>
                        <ul className="space-y-2">
                          {["SAT", "ACT", "PSAT", "AP Exams", "IB Assessments"].map((test, index) => (
                            <li key={index} className="flex items-center reveal fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                              <svg className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="text-gray-800">{test}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/50 backdrop-blur-sm p-5 rounded-lg shadow-md hover-card reveal fade-up" style={{ animationDelay: '150ms' }}>
                        <h3 className="text-xl font-semibold mb-3 text-orange-700">Our Approach</h3>
                        <ul className="space-y-2">
                          {[
                            "Strategic test-taking techniques",
                            "Targeted content review",
                            "Full-length practice tests",
                            "Performance analysis",
                            "Time management strategies"
                          ].map((item, index) => (
                            <li key={index} className="flex items-center reveal fade-up" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                              <svg className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="text-gray-800">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed reveal fade-up">
                      Our test prep programs have helped students achieve significant score improvements, 
                      with many gaining admission to their top-choice schools and universities.
                    </p>

                    <div className="mt-8">
                      <Link 
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300 btn-shine"
                      >
                        Prepare for Success
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Image/Visual */}
              <div className="md:col-span-5 reveal fade-left">
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl hover-card">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center float-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Score Higher, Go Further</h3>
                        <p className="text-amber-100">Our personalized approach helps students achieve their target scores and gain admission to their dream schools.</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-amber-200 rounded-2xl -z-10 -rotate-3 float-slow"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-50 -z-10 blur-xl float-fast"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section 
          ref={approachRef}
          className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-gray-50"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
                Our Approach
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></span>
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Personalized Learning",
                    description: "We customize our teaching methods to match each student's unique learning style, strengths, and areas for improvement.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )
                  },
                  {
                    title: "Growth Mindset",
                    description: "We cultivate a positive attitude toward learning, where challenges are viewed as opportunities for growth rather than obstacles.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )
                  },
                  {
                    title: "Skill Building",
                    description: "Beyond subject knowledge, we focus on developing critical thinking, problem-solving, and self-management skills.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 reveal fade-up hover-card" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-100 flex items-center justify-center float-medium">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-center mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-center">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl shadow-xl overflow-hidden reveal fade-up hover-card">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-8 p-8 md:p-10">
                    <h3 className="text-2xl font-bold text-white mb-4">Our Commitment to Excellence</h3>
                    <p className="text-indigo-100 mb-6">
                      At Peak Tutoring, we are committed to helping each student reach their full potential. 
                      Our tutors are not just subject experts but also mentors who inspire confidence and 
                      foster a love for learning that extends beyond the classroom.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        "Highly Qualified Tutors",
                        "Proven Results",
                        "Flexible Scheduling",
                        "Regular Progress Reports"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 reveal fade-up" style={{ animationDelay: `${index * 100 + 300}ms` }}>
                          <svg className="w-5 h-5 text-indigo-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-white text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-indigo-800/30 backdrop-blur-sm flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center float-fast">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Excellence Driven</h4>
                      <p className="text-indigo-200 text-sm">Committed to your academic success</p>
                    </div>
                  </div>
                </div>
              </div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 reveal fade-up pt-16">
                Ready to Transform Your Academic Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-8 reveal fade-up" style={{ animationDelay: '150ms' }}>
                Join the hundreds of students who have achieved their academic goals with Peak Tutoring. 
                Request a free consultation today to discover how we can help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 reveal fade-up" style={{ animationDelay: '300ms' }}>
                <Link 
                  href="/contact"
                  className="px-8 py-4 bg-white text-blue-800 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-medium btn-shine"
                >
                  Request a Free Consultation
                </Link>
                <Link 
                  href="tel:+15618703273"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-lg font-medium btn-shine"
                >
                  Call Us: (561) 870-3273
                </Link>
              </div>
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