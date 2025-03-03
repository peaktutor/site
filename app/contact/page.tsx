'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  
  // Create refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const directContactRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Show loading state
    setIsSubmitting(true);
    
    // Get current date for the email template
    const today = new Date();
    const submissionDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Import EmailJS dynamically
    import('@emailjs/browser').then((emailjs) => {
      // Prepare template parameters
      const templateParams = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        phone: formState.phone,
        subject: formState.subject || 'Not specified',
        message: formState.message || 'No additional information provided',
        submissionDate: submissionDate
      };
      
      // Send email using EmailJS
      emailjs.send(
        'service_ykbe95b',  // Service ID
        'template_qy47u7f', // Template ID
        templateParams,
        '4bK1N7SOkKNwMkqk0' // Public Key
      )
      .then(() => {
        console.log('Email sent successfully!');
        setSubmitStatus('success');
        // Reset form
        setFormState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    });
  };

  // Handle consultation click
  const handleConsultationClick = () => {
    window.location.href = 'tel:5618703273';
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

    /* CTA orbs */
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
          className="min-h-[60vh] relative flex items-center justify-center overflow-hidden"
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
              <span className="relative inline-block">
                <span className="relative z-10">Contact Us</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-purple-400 opacity-70 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8 reveal fade-up" style={{ animationDelay: '100ms' }}>
              We're here to answer your questions and help you achieve academic excellence
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 reveal fade-up" style={{ animationDelay: '200ms' }}>
              <button 
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-blue-800 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-medium btn-shine"
              >
                Send Us a Message
              </button>
              <button 
                onClick={handleConsultationClick}
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-lg font-medium btn-shine"
              >
                Call: (561) 870-3273
              </button>
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

        {/* Contact Form Section */}
        <section 
          ref={formRef}
          className="py-20 px-6 bg-white relative"
        >
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Content */}
              <div className="lg:col-span-5 reveal fade-right">
                <div className="sticky top-10">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 inline-block relative">
                    Get In Touch
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
                  </h2>
                  
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    We're excited to hear from you and learn how we can help you reach your academic goals. Fill out the form, and our team will get back to you promptly.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">Phone</h3>
                        <p className="text-gray-600">Call us for immediate assistance:</p>
                        <a href="tel:5618703273" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">(561) 870-3273</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600">Send us an email at:</p>
                        <a href="mailto:yourpeaktutor@gmail.com" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">yourpeaktutor@gmail.com</a>
                      </div>
                    </div>
                    

                  </div>

                </div>
              </div>
              
              {/* Right Form */}
              <div className="lg:col-span-7 reveal fade-left">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100 hover-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Send Us a Message</h3>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-xs text-gray-600">We typically respond within 24 hours</span>
                    </div>
                  </div>
                  
                  {/* Status messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Thank you! Your message has been sent successfully.</span>
                      </div>
                      <p className="mt-2 text-sm">We'll contact you shortly to discuss your tutoring needs.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Oops! Something went wrong.</span>
                      </div>
                      <p className="mt-2 text-sm">Please try again or call us directly at (561) 870-3273.</p>
                    </div>
                  )}
                  
                  <div className="space-y-5">
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="group">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                          placeholder="Enter your first name"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                          placeholder="Enter your last name"
                          disabled={isSubmitting}
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
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                        placeholder="you@example.com"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                        placeholder="(555) 555-5555"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
                        Subject Interested In
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 appearance-none bg-white transition-all duration-200"
                          disabled={isSubmitting}
                        >
                          <option value="" disabled>Select a subject</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Science">Science</option>
                          <option value="Languages">Languages</option>
                          <option value="Humanities">Humanities</option>
                          <option value="Test Preparation">Test Preparation</option>
                          <option value="Other">Other</option>
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
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all duration-200"
                        rows={5}
                        placeholder="Tell us about your tutoring needs..."
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 btn-shine"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>
                    

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          ref={faqRef}
          className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 relative"
        >
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-12 reveal fade-up">
              <h2 className="text-3xl font-bold text-gray-800 inline-block relative">
                Frequently Asked Questions
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
              </h2>
              <p className="text-lg text-gray-700 mt-4">
                Find answers to common questions about our tutoring services
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How do I schedule a tutoring session?",
                  answer: "You can schedule a tutoring session by filling out the contact form above, calling us directly at (561) 870-3273, or sending an email to yourpeaktuto@gmail.com. We'll match you with the right tutor and find a time that works for your schedule."
                },
                {
                  question: "Where do tutoring sessions take place?",
                  answer: "We offer both in-person and online tutoring sessions. For in-person sessions, we can meet at your home, a local library, or another quiet study space. Our online sessions take place via Zoom, featuring interactive whiteboards and screen sharing."
                },
                {
                  question: "How much do tutoring services cost?",
                  answer: "Our tutoring rates vary based on the subject, level, and specific needs of each student. We offer flexible packages and payment options. Please contact us for a personalized quote tailored to your academic goals."
                },
                {
                  question: "Can I change my tutor if it's not a good fit?",
                  answer: "Absolutely! We want to ensure you have the best experience possible. If you feel your current tutor isn't the right match, simply let us know and we'll pair you with another qualified tutor who better suits your learning style and needs."
                },
                {
                  question: "What age groups do you work with?",
                  answer: "We work with students of all ages, from elementary school through college and adult learners. Our tutors are experienced in adapting their teaching methods to suit different age groups and learning styles."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-white shadow-md hover-card reveal fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10 reveal fade-up">
              <p className="text-gray-700 mb-4">Still have questions? Don't hesitate to reach out!</p>
              <button 
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 btn-shine"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* Direct Contact CTA Section */}
        <section 
          ref={directContactRef}
          className="relative py-20 overflow-hidden"
        >
          {/* Dynamic animated background with interactive blur effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900">
            {/* Interactive gradient overlay that follows mouse */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: `
                  radial-gradient(circle at ${mousePosition.x / window.innerWidth * 100}% ${mousePosition.y / window.innerHeight * 100}%, 
                    rgba(147, 197, 253, 0.4) 0%,
                    rgba(79, 70, 229, 0.2) 45%, 
                    transparent 70%
                  )
                `,
              }}
            />
            
            {/* Grid pattern */}
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

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center reveal fade-up">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Unlock Your Academic Potential?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Take the first step toward academic excellence today. Our expert tutors are ready to help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 reveal fade-up" style={{ animationDelay: '150ms' }}>
                <button 
                  onClick={handleConsultationClick}
                  className="relative group px-8 py-4 bg-white text-blue-800 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-medium btn-shine"
                >
                  <span className="flex items-center">
                    <span className="relative mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-400/30 animate-ping opacity-75"></span>
                    </span>
                    Call for Free Consultation
                  </span>
                </button>
                <button 
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-lg font-medium btn-shine"
                >
                  Send a Message
                </button>
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