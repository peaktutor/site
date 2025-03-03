'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

// Custom throttle and debounce implementations
const throttle = (fn: Function, delay: number): Function => {
  let lastCall = 0;
  return function(...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

const debounce = (fn: Function, delay: number): Function => {
  let timer: NodeJS.Timeout;
  return function(...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function FAQPage() {
  // Browser detection state
  const [isBrowser, setIsBrowser] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Create ref for sections
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Mouse motion values for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother mouse movement
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Set browser and get window dimensions on mount
  useEffect(() => {
    setIsBrowser(true);
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Set loaded state after a short delay to trigger initial animations
    setTimeout(() => setIsLoaded(true), 100);
  }, []);
  
  // Derived values for parallax effects - safely handle window references
  const rotateX = useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [-5, 5]);
  const moveX = useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [-15, 15]);
  const moveY = useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [-15, 15]);
  
  // Enhanced FAQ data with categories
  const faqCategories = useMemo(() => [
    { id: 'all', name: 'All Questions' },
    { id: 'services', name: 'Our Services' },
    { id: 'scheduling', name: 'Scheduling & Logistics' },
    { id: 'methods', name: 'Our Tutors & Methods' }
  ], []);

  const faqItems = useMemo(() => [
    {
      question: "What subjects do you offer tutoring in?",
      answer: "We have tutors who are knowledgeable in a variety of fields across mathematics, sciences, humanities, language arts, and test preparation. Our diverse team of educators allows us to provide comprehensive support for students at all academic levels.",
      category: "services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      question: "How do you match tutors with students?",
      answer: "We take a personalized approach to matching students with tutors. Through an initial consultation with the student or their parents, we carefully assess learning needs, academic goals, and personality traits to identify which of our tutors would create the most effective and comfortable learning partnership.",
      category: "methods",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      question: "What are your tutors' qualifications?",
      answer: "All of our tutors have different qualifications but are exceptional in their selected fields. Some hold advanced degrees, others have years of classroom experience, and many specialize in specific learning approaches. This diversity is why finding the right tutor for you is so important, and we take pride in our ability to make perfect matches between students and educators.",
      category: "methods",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      question: "Do you offer online tutoring?",
      answer: "Yes, our tutors provide flexible online tutoring options to accommodate various scheduling needs. However, NIH studies show students generally prefer ***in-person teaching*** and report higher engagement, learning, and understanding in face-to-face settings. While we fully support online options as an excellent alternative, we believe in-person instruction typically yields optimal results when possible.",
      category: "services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "What age groups do you work with?",
      answer: "There is nobody too young or too old for our services. We have specialized tutors for elementary, middle, and high school students, as well as college-level support and adult education. Our personalized approach ensures that learners of any age receive appropriate instruction tailored to their developmental stage and learning style.",
      category: "services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      question: "How long are typical tutoring sessions?",
      answer: "Typical tutoring sessions range from 1-2 hours per week, but the optimal duration and frequency depend entirely on the student's specific needs, learning goals, and attention span. We work with families to determine the most effective schedule for each individual learner to ensure maximum benefit without overwhelming the student.",
      category: "scheduling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: "Do you offer group tutoring?",
      answer: "Yes, we offer specialized group tutoring sessions for families and small groups of students with similar learning needs. Group settings can foster collaborative learning and provide cost-effective options while maintaining educational quality. Please call us at (561)-870-3273 to discuss how we can create a customized group learning experience for your specific situation.",
      category: "services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      question: "How do I schedule a session?",
      answer: "Once you're connected with your dedicated tutor, you'll communicate directly with them for all scheduling needs. This direct line of communication ensures flexibility and convenience, allowing you to work around your existing commitments and establish a routine that works best for your family.",
      category: "scheduling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "How do I reschedule or cancel a session?",
      answer: "After being matched with your tutor, you'll have direct communication with them for scheduling adjustments. This personalized approach allows for seamless rescheduling when necessary and ensures clear communication about any scheduling changes, making the process as convenient as possible for our clients.",
      category: "scheduling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "How do I know if my child needs tutoring?",
      answer: "There are several indicators that your child might benefit from tutoring: 1) Teacher Recommendations: If your child's teachers suggest they need additional support beyond what the classroom can provide, this is a significant indicator. 2) Academic Performance Changes: Any noticeable decline in grades or understanding of material, despite consistent effort, often signals a need for personalized instruction. 3) Homework Struggles: Difficulty starting, completing, or understanding homework assignments can indicate knowledge gaps that tutoring can address. 4) Need for Advanced Learning: Sometimes high-achieving students benefit from tutoring that provides enrichment beyond the standard curriculum. 5) Executive Functioning Challenges: Students struggling with organization, time management, or study skills can greatly benefit from a tutor who specializes in these areas. 6) Subject-Specific Difficulties: Consistent challenges with particular subjects may indicate a need for specialized instruction in those areas. Our initial consultation can help determine if tutoring would benefit your child's specific situation.",
      category: "services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: "Can you help with standardized test preparation?",
      answer: "Yes, we specialize in standardized test preparation with tutors who have extensive experience in this area. Our test prep specialists understand both test content and testing strategies, equipping students with the knowledge, skills, and confidence needed to excel on standardized assessments such as SAT, ACT, AP exams, and state-mandated tests.",
      category: "services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      question: "Do you provide homework help?",
      answer: "Absolutely. Our tutors are committed to providing comprehensive homework support that goes beyond simply completing assignments. They help students understand underlying concepts, develop problem-solving strategies, and build the confidence and skills needed for independent academic success in all their educational endeavors.",
      category: "services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      question: "How many sessions per week do you recommend?",
      answer: "We typically recommend 1-2 sessions per week for ongoing academic support, which provides consistent reinforcement without overwhelming students. For intensive test preparation, we suggest 2-3 weekly sessions to ensure comprehensive coverage of material. Maintaining a consistent tutoring schedule is crucial as it establishes productive routines, builds momentum in learning, and leads to more sustainable academic improvements over time.",
      category: "scheduling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      question: "Can we request specific characteristics of a tutor?",
      answer: "Yes, absolutely. We believe that the tutor-student relationship is fundamental to learning success, which is why we welcome requests for specific tutor characteristics. Whether your child works better with certain teaching styles, personalities, or backgrounds, we strive to accommodate these preferences to create the most effective learning partnership possible.",
      category: "methods",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
        </svg>
      )
    }
  ], []);

  // Filter FAQs based on category only
  const filteredFAQs = useMemo(() => {
    return faqItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      return matchesCategory;
    });
  }, [faqItems, activeCategory, activeIndex]);

  // Performance optimized event handlers
  const handleScroll = useCallback(
    throttle(() => {
      if (!isBrowser) return;
      setScrollY(window.scrollY);
    }, 16), // ~60fps
  [isBrowser]);

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (!isBrowser) return;
      // Update both raw values for calculations and framer motion values
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    }, 16), // ~60fps
  [mouseX, mouseY, isBrowser]);

  const toggleQuestion = useCallback((index: number) => {
    // Force re-render when toggling the same question by setting to a temporary value before setting to null
    if (activeIndex === index) {
      setActiveIndex(-1); // Temporary value
      setTimeout(() => setActiveIndex(null), 10); // Then set to null after a short delay
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  // Enhanced parallax effect with better performance
  const calculateMouseParallax = useCallback((factor: number, depth = 1) => {
    if (!isBrowser) return { transform: 'none' };
    
    const x = (mousePosition.x - windowSize.width / 2) * factor;
    const y = (mousePosition.y - windowSize.height / 2) * factor;
    
    // Use transform for better performance
    return { 
      transform: `translate3d(${x}px, ${y}px, 0) scale(${1 + depth * 0.01})`,
      transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)'
    };
  }, [mousePosition, windowSize, isBrowser]);

  // Track scroll position for parallax effects - throttled for performance
  useEffect(() => {
    if (!isBrowser) return;
    
    window.addEventListener('scroll', handleScroll as unknown as EventListener, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll as unknown as EventListener);
  }, [handleScroll, isBrowser]);
  
  // Track mouse position for interactive elements - throttled for performance
  useEffect(() => {
    if (!isBrowser) return;
    
    window.addEventListener('mousemove', handleMouseMove as unknown as EventListener, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
  }, [handleMouseMove, isBrowser]);

  // Animation delay based on element visibility using Intersection Observer
  useEffect(() => {
    if (!isBrowser) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [isBrowser]);

  // Enhanced animations and visual effects CSS
  const animationStyles = `
    /* Base animations */
    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes shimmer {
      0% { 
        background-position: -200% 0;
      }
      100% { 
        background-position: 200% 0;
      }
    }
    
    /* Enhanced Reveals */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1), 
                 transform 0.8s cubic-bezier(0.5, 0, 0, 1);
      will-change: opacity, transform;
    }
    
    .reveal.fade-up { transform: translateY(30px); }
    .reveal.fade-down { transform: translateY(-30px); }
    .reveal.fade-left { transform: translateX(-30px); }
    .reveal.fade-right { transform: translateX(30px); }
    .reveal.fade-scale { transform: scale(0.95); }
    
    .reveal.in-view {
      opacity: 1;
      transform: translate(0) scale(1);
    }
    
    /* Floating animations with variable speeds and delays */
    .float-slow {
      animation: float 6s ease-in-out infinite;
    }
    
    .float-medium {
      animation: float 4s ease-in-out infinite;
      animation-delay: 0.5s;
    }
    
    .float-fast {
      animation: float 2.5s ease-in-out infinite;
      animation-delay: 1s;
    }
    
    /* Enhanced button effects */
    .btn-glow {
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    
    .btn-glow:before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #ff0099, #00bcd4, #3f51b5, #ff0099);
      background-size: 400% 400%;
      z-index: -1;
      animation: shimmer 8s ease-in-out infinite;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      border-radius: 9999px;
    }
    
    .btn-glow:hover:before {
      opacity: 0.6;
    }
    
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
        rgba(255, 255, 255, 0.15) 100%
      );
      transform: rotate(30deg) translateY(-100%);
      transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }
    
    .btn-shine:hover:after {
      transform: rotate(30deg) translateY(-60%);
    }
    
    /* Enhanced card effects */
    .hover-card {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      will-change: transform, box-shadow;
    }
    
    .hover-card:hover {
      transform: translateY(-5px) scale(1.01);
      box-shadow: 0 15px 30px -10px rgba(59, 130, 246, 0.2), 
                  0 8px 10px -5px rgba(59, 130, 246, 0.1);
    }

    /* FAQ question effects */
    .faq-question {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: background-color, transform, box-shadow;
      transform-origin: center;
    }
    
    .faq-question:hover:not(.active) {
      background-color: rgba(239, 246, 255, 0.8);
      transform: translateX(2px);
    }
    
    .faq-question.active {
      background-color: rgba(219, 234, 254, 0.8);
      border-color: rgba(147, 197, 253, 0.6);
      box-shadow: 0 8px 16px -4px rgba(59, 130, 246, 0.15);
    }
    
    /* Search box effects */
    .search-input {
      transition: all 0.3s ease;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }
    
    .search-input:focus {
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
      transform: translateY(-1px);
    }
    
    /* Category pills */
    .category-pill {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .category-pill:hover:not(.active) {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }
    
    .category-pill.active {
      background: linear-gradient(to right, #3b82f6, #60a5fa);
      color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    }
    
    /* Shimmering background for special sections */
    .shimmer-bg {
      background: linear-gradient(90deg, 
                 rgba(255, 255, 255, 0) 0%,
                 rgba(255, 255, 255, 0.2) 25%, 
                 rgba(255, 255, 255, 0.2) 50%, 
                 rgba(255, 255, 255, 0) 100%);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }
    
    /* 3D effects for cards */
    .card-3d {
      transform-style: preserve-3d;
      perspective: 1000px;
    }
    
    .card-3d-inner {
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform: rotateX(0) rotateY(0);
    }
    
    /* Progress bar animation */
    .progress-bar {
      height: 3px;
      background: linear-gradient(to right, #3b82f6, #60a5fa);
      transition: width 0.3s ease;
    }

    /* Mobile optimization */
    @media (max-width: 640px) {
      .category-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      
      .category-container::-webkit-scrollbar {
        display: none;
      }
      
      .reveal {
        transition-duration: 0.6s;
      }
      
      .float-slow, .float-medium, .float-fast {
        animation-duration: 3s;
      }
    }
  `;

  return (
    <div className="overflow-hidden relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      <style jsx>{animationStyles}</style>
      
      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-80">
        <div className="absolute w-full h-full">
          {/* Enhanced organic shapes with more vibrant gradients */}
          <motion.div 
            className="absolute top-[5%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-blue-300/30 via-indigo-400/20 to-violet-300/30 blur-[80px] float-slow"
            style={{ 
              x: moveX,
              y: moveY,
              rotate: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [0, 5])
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 0.8 : 0 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div 
            className="absolute top-[40%] right-[5%] w-[28vw] h-[28vw] rounded-full bg-gradient-to-r from-purple-300/20 via-pink-300/20 to-indigo-300/30 blur-[70px] float-medium"
            style={{ 
              x: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [0, -15]),
              y: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [0, -5])
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 0.7 : 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <motion.div 
            className="absolute bottom-[15%] left-[15%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-cyan-300/20 via-blue-400/20 to-indigo-300/20 blur-[60px] float-fast"
            style={{ 
              x: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [0, 10]),
              y: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [0, 10])
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 0.6 : 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
          
          {/* Added floating 3D elements */}
          <motion.div 
            className="absolute top-[20%] right-[25%] opacity-30"
            style={{ 
              x: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [-20, 20]),
              y: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [-20, 20]),
              rotateX,
              rotateY
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" stroke="url(#paint0_linear)" strokeWidth="2" />
              <circle cx="60" cy="60" r="40" stroke="url(#paint1_linear)" strokeWidth="2" />
              <circle cx="60" cy="60" r="30" stroke="url(#paint2_linear)" strokeWidth="2" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#A78BFA" />
                </linearGradient>
                <linearGradient id="paint2_linear" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93C5FD" />
                  <stop offset="1" stopColor="#C4B5FD" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-[30%] right-[15%] opacity-30"
            style={{ 
              x: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [20, -20]),
              y: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [20, -20]),
              rotateX: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [-5, 5]),
              rotateY: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [5, -5])
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,0 100,50 50,100 0,50" stroke="url(#paint3_linear)" strokeWidth="2" fill="none" />
              <polygon points="50,20 80,50 50,80 20,50" stroke="url(#paint4_linear)" strokeWidth="2" fill="none" />
              <defs>
                <linearGradient id="paint3_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="paint4_linear" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <motion.section 
          ref={headerRef}
          className="min-h-[50vh] relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-violet-700/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 z-0">
            {/* Enhanced organic wave pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z"
                  fill="white"
                  fillOpacity="0.4"
                >
                  <animate
                    attributeName="d"
                    dur="12s"
                    repeatCount="indefinite"
                    values="
                      M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z;
                      M0,50 C30,40 50,60 70,40 C90,30 100,50 100,50 L100,100 L0,100 Z;
                      M0,50 C40,30 60,50 80,60 C90,70 100,50 100,50 L100,100 L0,100 Z;
                      M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z
                    "
                  />
                </path>
              </svg>
            </div>
            
            {/* Dynamic particle effect */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 4 + 1 + 'px',
                    height: Math.random() * 4 + 1 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.5 + 0.2
                  }}
                  animate={{
                    y: [0, Math.random() * -100 - 50],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </div>
          
          <div 
            className="container mx-auto px-6 py-16 z-10 text-center"
            style={isBrowser ? { transform: `translateY(${scrollY * 0.1}px)` } : {}}
          >
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
            >
              <span className="relative inline-block">
                <span className="relative z-10">Frequently Asked Questions</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-80 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Find answers to common questions about our tutoring services and approach
            </motion.p>
          </div>
          
          {/* Enhanced wave separator at bottom */}
          <div className="absolute bottom-0 left-0 right-0 transform">
            <svg viewBox="0 0 1440 160" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,128L48,122.7C96,117,192,107,288,90.7C384,75,480,53,576,58.7C672,64,768,96,864,106.7C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
              >
                <animate
                  attributeName="d"
                  dur="20s"
                  repeatCount="indefinite"
                  values="
                    M0,128L48,122.7C96,117,192,107,288,90.7C384,75,480,53,576,58.7C672,64,768,96,864,106.7C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z;
                    M0,128L48,117.3C96,107,192,85,288,96C384,107,480,149,576,144C672,139,768,85,864,74.7C960,64,1056,96,1152,96C1248,96,1344,64,1392,48L1440,32L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z;
                    M0,128L48,122.7C96,117,192,107,288,90.7C384,75,480,53,576,58.7C672,64,768,96,864,106.7C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z;
                  "
                />
              </path>
            </svg>
          </div>
        </motion.section>

        {/* Enhanced FAQ Section */}
        <section 
          ref={faqRef}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 reveal fade-up">
              <h2 className="text-3xl font-bold text-gray-800 inline-block relative">
                Find What You're Looking For
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full"></span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto reveal fade-up">
                Browse through frequently asked questions or filter by category to find the information you need.
              </p>
            </div>
            
            {/* Added vertical spacing */}
            <div className="mt-16 mb-8"></div>

            {/* Added category filtering */}
            <div className="mb-10 overflow-hidden reveal fade-up">
              <div className="category-container flex flex-nowrap gap-2 md:gap-3 pb-2 overflow-x-auto">
                {faqCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`category-pill px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                      ${activeCategory === category.id ? 
                        'active' : 
                        'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </motion.div>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="h-1 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className="progress-bar"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(filteredFAQs.length / faqItems.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Category counter */}
              <div className="text-sm text-gray-500 mt-2">
                Showing {filteredFAQs.length} of {faqItems.length} questions
              </div>
            </div>

            {/* Enhanced FAQ items */}
            <div className="space-y-6">
              {filteredFAQs.map((item, index) => {
                const originalIndex = faqItems.indexOf(item);
                return (
                  <div
                    id={`faq-item-${originalIndex}`}
                    key={`faq-${originalIndex}`}
                    className="reveal fade-up hover-card mb-6"
                  >
                    <div
                      className={`border border-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 faq-question ${activeIndex === originalIndex ? 'active' : ''}`}
                      onClick={() => toggleQuestion(originalIndex)}
                    >
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center
                              ${activeIndex === originalIndex ? 
                                'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' : 
                                'bg-blue-50 text-blue-500'}`}
                          >
                            {item.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                        </div>
                        <div
                          style={{ 
                            transform: activeIndex === originalIndex ? 'rotate(180deg)' : 'rotate(0deg)',
                            backgroundColor: activeIndex === originalIndex ? 'rgba(219, 234, 254, 1)' : 'rgba(243, 244, 246, 1)'
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 transition-all duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Simplified dropdown with standard DOM elements for better rendering consistency */}
                      {activeIndex === originalIndex && (
                        <div className="border-t border-gray-100">
                          <div className="p-5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            
                            {/* Quick action buttons */}
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">
                                Was this helpful?
                              </button>
                              <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
                                Related questions
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Empty state when no results */}
              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 mb-4 text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching questions found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Try a different search term or category, or 
                    <button 
                      className="text-blue-600 font-medium mx-1 hover:underline"
                      onClick={() => {
                        setActiveCategory('all');
                      }}
                    >
                      clear all filters
                    </button>
                    to view all questions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action Section */}
        <section 
          ref={ctaRef}
          className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800"
        >
          {/* Enhanced wave separator at top */}
          <div className="absolute top-0 left-0 right-0 transform rotate z-10">
            <svg viewBox="0 0 1440 120" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,0 L1440,0 L1440,30 L1392,32 C1344,32,1248,32,1152,37.3 C1056,43,960,53,864,64 C768,75,672,85,576,80 C480,75,384,53,288,53.3 C192,53,96,75,48,85.3 L0,96 Z"
              >
                <animate
                  attributeName="d"
                  dur="15s"
                  repeatCount="indefinite"
                  values="
                    M0,0 L1440,0 L1440,30 L1392,32 C1344,32,1248,32,1152,37.3 C1056,43,960,53,864,64 C768,75,672,85,576,80 C480,75,384,53,288,53.3 C192,53,96,75,48,85.3 L0,96 Z;
                    M0,0 L1440,0 L1440,40 L1392,38 C1344,36,1248,32,1152,32 C1056,32,960,48,864,48 C768,48,672,32,576,32 C480,32,384,48,288,59 C192,69,96,75,48,77 L0,80 Z;
                    M0,0 L1440,0 L1440,30 L1392,32 C1344,32,1248,32,1152,37.3 C1056,43,960,53,864,64 C768,75,672,85,576,80 C480,75,384,53,288,53.3 C192,53,96,75,48,85.3 L0,96 Z
                  "
                />
              </path>
            </svg>
          </div>

          {/* Enhanced decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <motion.div 
              className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/30 blur-3xl"
              style={{ 
                x: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [-20, 20]),
                y: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [-20, 20])
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-10 right-10 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl"
              style={{ 
                x: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [20, -20]),
                y: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [-10, 10])
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div 
              className="absolute bottom-10 left-1/3 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl"
              style={{ 
                x: useTransform(smoothMouseX, [0, isBrowser ? windowSize.width : 1200], [-10, 10]),
                y: useTransform(smoothMouseY, [0, isBrowser ? windowSize.height : 800], [10, -10])
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 pt-16"
              >
                <span className="relative inline-block">
                  <span>Still Have Questions?</span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-white/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
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
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href="/contact"
                    className="inline-block px-8 py-4 bg-white text-blue-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium btn-glow"
                  >
                    Schedule a Free Consultation
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href="tel:+15618703273"
                    className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-lg font-medium btn-shine flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Us: (561) 870-3273
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Added quick links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-10 flex flex-wrap justify-center gap-3"
              >
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
                <span className="text-blue-300/50">•</span>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors">
                  Our Services
                </Link>
                <span className="text-blue-300/50">•</span>
                <Link href="/testimonials" className="text-blue-200 hover:text-white transition-colors">
                  Testimonials
                </Link>
                <span className="text-blue-300/50">•</span>
                <Link href="/blog" className="text-blue-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Enhanced wave separator at bottom */}
          <div className="absolute bottom-0 left-0 right-0 transform">
            <svg viewBox="0 0 1440 120" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              >
                <animate
                  attributeName="d"
                  dur="18s"
                  repeatCount="indefinite"
                  values="
                    M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z;
                    M0,80L48,80C96,80,192,96,288,96C384,96,480,80,576,80C672,80,768,96,864,96C960,96,1056,80,1152,74.7C1248,69,1344,75,1392,77.3L1440,80L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z;
                    M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z;
                  "
                />
              </path>
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
}