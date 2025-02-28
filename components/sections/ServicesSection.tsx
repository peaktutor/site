// app/components/sections/ServicesSection.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import Container from '../ui/Container';
import { Button, Icons } from '@/components/ui/Button';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const services = [
    {
      title: 'Mathematics',
      description: 'From algebra to calculus, we help students master mathematical concepts with confidence.',
      features: [
        'Algebra & Advanced Geometry',
        'Calculus & Statistics',
        'SAT/ACT Math Preparation',
        'AP Math Advanced Support'
      ],
      icon: 'Calculator',
      bgGradient: 'from-blue-500/10 to-indigo-500/5'
    },
    {
      title: 'Sciences',
      description: 'Comprehensive support for all science subjects with hands-on learning approaches.',
      features: [
        'Physics & Chemistry',
        'Biology & Environmental Sciences',
        'AP Science Courses',
        'Lab Report Writing Assistance'
      ],
      icon: 'Flask',
      bgGradient: 'from-teal-500/10 to-blue-500/5'
    },
    {
      title: 'Test Preparation',
      description: 'Strategic preparation for standardized tests with proven techniques for success.',
      features: [
        'SAT & ACT Comprehensive Prep',
        'AP Exam Strategies',
        'Advanced Study Skills',
        'Time Management Techniques'
      ],
      icon: 'ClipboardCheck',
      bgGradient: 'from-purple-500/10 to-blue-500/5'
    }
  ];

  const handleCallClick = () => {
    window.location.href = 'tel:5618703273';
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-blue-100 opacity-30 blur-3xl transform -translate-x-1/2 translate-y-1/4" />
        <div className="absolute -right-20 top-2/3 h-80 w-80 rounded-full bg-indigo-100 opacity-30 blur-3xl transform translate-x-1/4 -translate-y-1/2" />
        <div className="absolute left-1/2 top-1/4 h-64 w-64 rounded-full bg-teal-100 opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Animated mesh grid */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(
                0deg,
                rgba(59, 130, 246, 0.3) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(59, 130, 246, 0.3) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '-0.5px -0.5px'
          }}
        />
      </div>

      <Container>
        {/* Section header with animation */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            Personalized Services
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Our Specialized Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive academic support designed to meet your unique learning needs
          </p>
          <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        </div>

        {/* Services grid with enhanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-16 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${idx * 150}ms`,
                transform: hoveredCard === idx ? 'translateY(-8px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card inner glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
              
              {/* Icon header */}
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <ServiceIcon name={service.icon} />
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Popular Choice
                  </span>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-start text-gray-700 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Animated button */}
                <div className="relative overflow-hidden group/btn rounded-lg">
                  <button className="w-full py-3 px-4 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg bg-white group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 relative z-10">
                    Learn More
                    <svg 
                      className="inline-block ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Button with animation */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          <div className="relative inline-block group">
            <Button
              variant="gradient"
              size="lg"
              icon={
                <div className="relative">
                  <svg
  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-30"
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
<svg
  className="relative inline-flex h-5 w-5"
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
                </div>
              }
              onClick={handleCallClick}
              className="shadow-lg hover:shadow-2xl hover:shadow-blue-200 transition-all duration-500 transform group-hover:scale-105"
            >
              Schedule Your Free Consultation
            </Button>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
            Join hundreds of students who have transformed their academic performance with our specialized tutoring programs
          </p>
        </div>
      </Container>
    </section>
  );
};

// Service icon component
const ServiceIcon = ({ name }: { name: string }) => {
  const iconClasses = "h-12 w-12 p-3 rounded-xl bg-blue-50 text-blue-600 transform group-hover:scale-110 transition-transform duration-500";
  
  switch (name) {
    case 'Calculator':
      return (
        <div className={iconClasses}>
          <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
          </svg>
        </div>
      );
    case 'Flask':
      return (
        <div className={iconClasses}>
          <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </div>
      );
    case 'ClipboardCheck':
      return (
        <div className={iconClasses}>
          <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default ServicesSection;