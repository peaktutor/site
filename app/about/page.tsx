'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import AuthBackground from '@/components/auth/AuthBackground';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const uniqueRef = useRef<HTMLDivElement>(null);
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

  // Animation on scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Mouse parallax effect
  const calculateMouseParallax = (factor: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  return (
    <div className="overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-full h-full">
          {/* Organic shapes that follow scroll and mouse movement */}
          <div 
            className="absolute top-[10%] left-[15%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-r from-blue-200/20 to-indigo-300/20 blur-[80px]"
            style={{ 
              transform: `translate(${calculateMouseParallax(-0.02).x}px, ${calculateMouseParallax(-0.02).y + scrollY * 0.05}px)` 
            }}
          />
          <div 
            className="absolute top-[40%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-purple-200/20 to-indigo-200/20 blur-[60px]"
            style={{ 
              transform: `translate(${calculateMouseParallax(0.01).x}px, ${calculateMouseParallax(0.01).y - scrollY * 0.03}px)` 
            }}
          />
          <div 
            className="absolute bottom-[20%] left-[20%] w-[20vw] h-[20vw] rounded-full bg-gradient-to-r from-blue-200/10 to-purple-300/10 blur-[50px]"
            style={{ 
              transform: `translate(${calculateMouseParallax(0.015).x}px, ${calculateMouseParallax(0.015).y + scrollY * 0.02}px)` 
            }}
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
            
            {/* Particle effects */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 2}px`,
                    height: `${Math.random() * 10 + 2}px`,
                    opacity: Math.random() * 0.5 + 0.1,
                    animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div 
            className="container mx-auto px-6 py-12 z-10 text-center"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              About <span className="relative inline-block">
                <span className="relative z-10">Peak Tutoring</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-purple-400 opacity-70 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Where personalized learning meets academic excellence
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
              <Link 
                href="#story" 
                className="px-8 py-3 bg-white text-blue-800 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  storyRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Our Story
              </Link>
              <Link 
                href="tel:+15618703273"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-lg font-medium"
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

        {/* Introduction Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <p className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed reveal fade-up">
              Unlock your full potential with Peak Tutoring - where personalized learning meets academic excellence. 
              Our expert tutors are dedicated to transforming your educational journey, empowering you to achieve remarkable results 
              and build confidence that lasts a lifetime.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section 
          ref={storyRef} 
          id="story"
          className="py-20 relative overflow-hidden bg-gradient-to-br from-white to-blue-50"
        >
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 w-64 h-64 rounded-full bg-blue-100/50 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-indigo-100/50 translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
                Our Story
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left Image/Visual */}
              <div className="md:col-span-5 reveal fade-right">
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                        <p className="text-blue-100">To transform education through personalized learning experiences that empower every student to reach their full potential.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-200 rounded-2xl -z-10 rotate-3"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-50 -z-10 blur-xl"></div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="md:col-span-7 reveal fade-left">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Peak Tutoring began with a simple belief: every student deserves personalized attention to unlock their full potential. 
                    Founded by Thomas McGrath, an educator driven by a vision of transforming education, our journey started with just 
                    a handful of dedicated tutors.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Today, we've grown into a community of passionate educators committed to academic excellence and student success. 
                    But our founding principles remain the same—creating tailored learning experiences that build both knowledge and confidence.
                  </p>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">Our Mission</h4>
                    <p className="text-gray-700">To create supportive learning environments where students can develop the skills, confidence, 
                    and knowledge they need not just to excel academically, but to become lifelong learners who approach 
                    challenges with curiosity and resilience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section 
          ref={servicesRef}
          className="py-24 bg-white relative overflow-hidden"
        >
          {/* Wave separator at top */}
          <div className="absolute top-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="w-full">
              <path 
                fill="#f0f4ff" 
                fillOpacity="1" 
                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,85.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-6 pt-8">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-gray-800 inline-block relative">
                What We Do
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                  title: "Our Founder",
                  description: "Thomas McGrath built Peak Tutoring on a foundation of personalized learning, tailoring each educational experience to the individual student."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Our Approach",
                  description: "We carefully match tutors with students based on individual needs, ensuring a personalized and effective learning experience."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: "Our Services",
                  description: "We offer tutoring in Math, Science, Language Arts, and test preparation services for SAT and ACT exams."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: "Our Philosophy",
                  description: "We believe in creating safe learning environments that push students to develop crucial skills for lifelong learning."
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="relative group reveal fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl transform group-hover:scale-[1.03] transition-all duration-300 opacity-0 group-hover:opacity-100 blur-xl -z-10"></div>
                  <div className="h-full bg-gradient-to-r from-blue-50 to-indigo-50 group-hover:from-white group-hover:to-white p-6 rounded-2xl border border-blue-100 group-hover:border-blue-200 transition-all duration-300 shadow-lg group-hover:shadow-xl backdrop-blur-sm">
                    <div className="mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section 
          ref={uniqueRef}
          className="py-24 relative bg-gradient-to-br from-blue-600 to-indigo-800 overflow-hidden"
        >
          {/* Wave separator at top */}
          <div className="absolute top-0 left-0 right-0 transform rotate-0">
            <svg viewBox="0 0 1440 100" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,85.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  opacity: Math.random() * 0.5 + 0.1,
                  animation: `float ${Math.random() * 8 + 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16 reveal fade-up">
              <h2 className="text-4xl font-bold text-white inline-block relative">
                What Sets Us Apart
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></span>
              </h2>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl reveal fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { 
                    title: "Personalized Matching", 
                    description: "We carefully pair tutors and students based on learning style, personality, and educational needs." 
                  },
                  { 
                    title: "Flexible Session Options", 
                    description: "Choose between online or in-person tutoring with session lengths that work for your schedule." 
                  },
                  { 
                    title: "Passionate Educators", 
                    description: "Our tutors are enthusiastic experts who inspire confidence and a love of learning." 
                  },
                  { 
                    title: "Comprehensive Support", 
                    description: "Beyond tutoring, we provide study plans, resources, and educational guidance." 
                  },
                  { 
                    title: "Results-Focused Approach", 
                    description: "We measure success through tangible academic improvement and growing confidence." 
                  },
                  { 
                    title: "Continuous Learning", 
                    description: "Our tutors stay current with educational best practices and subject matter expertise." 
                  },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 reveal fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="w-12 h-12 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-blue-100">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Wave separator at bottom */}
          <div className="absolute bottom-0 left-0 right-0 rotate-180">
            <svg viewBox="0 0 1440 100" className="w-full transform rotate-180">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,85.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaRef}
          className="py-24 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center reveal fade-up">
              <h3 className="text-4xl font-bold text-gray-800 mb-6">
                Join Us on Our Journey
              </h3>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                Whether you're a student looking for support or an experienced tutor wanting to make a difference, 
                we'd love to hear from you.
              </p>
              
              <Link 
                href="tel:+15618703273"
                className="relative group inline-block"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"></span>
                <span className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-lg rounded-full shadow-lg group-hover:shadow-xl transform transition-all duration-300 group-hover:-translate-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Contact Us Today
                </span>
              </Link>
              
              <div className="mt-6 flex justify-center space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-blue-100/30 -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-indigo-100/30 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 py-12 text-white relative overflow-hidden">
          {/* Wave separator at top */}
          <div className="absolute top-0 left-0 right-0 rotate-0">
            <svg viewBox="0 0 1440 100" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,85.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
          
          {/* Floating particle effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  opacity: Math.random() * 0.3 + 0.1,
                  animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-6 relative z-10 pt-20">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-2">Peak Tutoring</h3>
              <p className="text-blue-200 text-sm">Where personalized learning meets academic excellence.</p>
            </div>
            
            <div className="mt-12 pt-6 border-t border-blue-700/50 text-center text-blue-300 text-sm">
              &copy; {new Date().getFullYear()} Peak Tutoring. All rights reserved.
            </div>
          </div>
        </footer>
      </main>

      {/* Custom animations for scroll and reveal effects */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .fade-up.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-left {
          opacity: 0;
          transform: translateX(-30px);
        }
        
        .fade-left.in-view {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-right {
          opacity: 0;
          transform: translateX(30px);
        }
        
        .fade-right.in-view {
          opacity: 1;
          transform: translateX(0);
        }
        
        /* Staggered animations */
        .fade-up:nth-child(1) { transition-delay: 0ms; }
        .fade-up:nth-child(2) { transition-delay: 100ms; }
        .fade-up:nth-child(3) { transition-delay: 200ms; }
        .fade-up:nth-child(4) { transition-delay: 300ms; }
        .fade-up:nth-child(5) { transition-delay: 400ms; }
        
        /* Aspect ratio utility */
        .aspect-w-4 {
          position: relative;
          padding-bottom: calc(5 / 4 * 100%);
        }
        
        .aspect-h-5 > * {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
}