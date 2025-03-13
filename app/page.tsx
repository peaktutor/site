// app/page.tsx
import React from 'react';
import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import CTASection from '@/components/sections/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peak Tutoring | All Ages | Math, Science, Test Prep | Boca Raton, FL',
  description: 'Expert tutoring for all ages: elementary, middle, high school, college, and adults. Math, science, test prep & more. Free consultation in Boca Raton, FL!',
  keywords: [
    'tutoring services', 'all ages tutoring', 'elementary tutoring', 'middle school tutoring',
    'high school tutoring', 'college tutoring', 'adult tutoring', 'math tutoring',
    'science tutoring', 'SAT prep', 'ACT prep', 'Boca Raton tutoring', 'Delray Beach tutoring', 'Deerfield Beach tutoring',
    'academic support', 'test preparation', 'algebra tutoring', 'calculus tutoring',
    'chemistry tutoring', 'physics tutoring'
  ],
  openGraph: {
    title: 'Peak Tutoring | All Ages | Math, Science, Test Prep | Boca Raton, FL',
    description: 'Expert tutoring for all ages: elementary, middle, high school, college, and adults. Math, science, test prep & more. Free consultation in Boca Raton, FL!',
    url: 'https://peaktutor.net',
    siteName: 'Peak Tutoring',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with dynamic background and engaging content */}
      <Hero />
      
      {/* Promotional Banner */}
      <section className="py-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden border-t-2 border-white">
        {/* Animated floating shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white opacity-5 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-300 opacity-5 translate-x-1/3 translate-y-1/3 animate-pulse-slower"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="discount-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#discount-grid)" />
          </svg>
        </div>
        
        {/* Sparkles */}
        <div className="absolute top-5 left-1/4 w-3 h-3 bg-yellow-200 rounded-full opacity-75 animate-ping"></div>
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-yellow-200 rounded-full opacity-75 animate-ping animation-delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-yellow-200 rounded-full opacity-75 animate-ping animation-delay-1500"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 flex items-center justify-center bg-yellow-400 text-blue-900 font-bold rounded-full mr-3 shadow-lg animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white">
                  <span className="text-white">SPECIAL OFFER</span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center">
                <span className="inline-block transform rotate-2 bg-yellow-300 text-blue-800 px-3 py-1 rounded-lg shadow-lg mr-3 animate-pulse">
                  10% OFF
                </span> 
                All Future Tutoring Sessions!
              </h3>
              
              <p className="text-blue-100 text-lg max-w-2xl">
                Start your academic journey today and enjoy exclusive savings on all our professional tutoring services. Limited time offer!
              </p>
            </div>
            
            <div className="md:ml-6">
              <a 
                href="#contact" 
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white p-1 text-blue-600 shadow-lg transition-all duration-300 ease-out hover:shadow-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-300 ease-out group-hover:bg-opacity-100"></span>
                <span className="relative flex items-center space-x-2 rounded-md bg-white px-6 py-3 transition-all duration-300 ease-out group-hover:bg-opacity-0 group-hover:text-white">
                  <span className="font-bold text-lg">Claim Your Discount</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section with animated cards */}
      <ServicesSection />
      
      {/* Floating Divider */}
      <div className="relative h-24 md:h-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 w-full h-24 bg-white rounded-[50%] shadow-inner transform translate-y-6"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-1/4 w-6 h-6 bg-blue-50 rounded-full shadow-sm"></div>
          <div className="absolute top-6 left-1/2 w-4 h-4 bg-indigo-50 rounded-full shadow-sm"></div>
          <div className="absolute top-12 right-1/4 w-8 h-8 bg-blue-50 rounded-full shadow-sm"></div>
        </div>
      </div>
      
      {/* Stats Section with animated counters */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        
        {/* Background grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(
                0deg,
                rgba(59, 130, 246, 0.1) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(59, 130, 246, 0.1) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '20px 20px',
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact by the Numbers
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { value: '500+', label: 'Students Helped', icon: 'Users' },
              { value: '98%', label: 'Success Rate', icon: 'Chart' },
              { value: '12+', label: 'Subjects Offered', icon: 'BookOpen' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  {renderStatIcon(stat.icon)}
                  <div className="mt-4 text-3xl md:text-4xl font-bold text-blue-600">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Animated floating shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white opacity-5 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-300 opacity-5 translate-x-1/3 translate-y-1/3 animate-pulse-slower"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="discount-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#discount-grid)" />
          </svg>
        </div>
        
        {/* Sparkles */}
        <div className="absolute top-5 left-1/4 w-3 h-3 bg-yellow-200 rounded-full opacity-75 animate-ping"></div>
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-yellow-200 rounded-full opacity-75 animate-ping animation-delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-yellow-200 rounded-full opacity-75 animate-ping animation-delay-1500"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 flex items-center justify-center bg-yellow-400 text-blue-900 font-bold rounded-full mr-3 shadow-lg animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-extrabold">
                  <span className="text-white font-bold tracking-wider drop-shadow-md">SPECIAL OFFER</span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center">
                <span className="inline-block transform rotate-2 bg-yellow-300 text-blue-800 px-3 py-1 rounded-lg shadow-lg mr-3 animate-pulse">
                  10% OFF
                </span> 
                All Future Tutoring Sessions!
              </h3>
              
              <p className="text-blue-100 text-lg max-w-2xl">
                Start your academic journey today and enjoy exclusive savings on all our professional tutoring services. Limited time offer!
              </p>
            </div>
            
            <div className="md:ml-6">
              <a 
                href="#contact" 
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white p-1 text-blue-600 shadow-lg transition-all duration-300 ease-out hover:shadow-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-300 ease-out group-hover:bg-opacity-100"></span>
                <span className="relative flex items-center space-x-2 rounded-md bg-white px-6 py-3 transition-all duration-300 ease-out group-hover:bg-opacity-0 group-hover:text-white">
                  <span className="font-bold text-lg">Claim Your Discount</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Subjects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-3">
              Popular Subjects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Academic Programs
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Our most sought-after tutoring programs designed to help students excel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced Mathematics',
                description: 'Comprehensive support for algebra, calculus, statistics, and more. Perfect for high school and college students.',
                image: '/images/math.jpg',
                color: 'from-blue-500 to-indigo-600',
              },
              {
                title: 'SAT/ACT Preparation',
                description: 'Strategic test preparation to maximize scores with proven techniques and personalized study plans.',
                image: '/images/test-prep.jpg',
                color: 'from-purple-500 to-pink-600',
              },
              {
                title: 'Science Mastery',
                description: 'Expert tutoring in physics, chemistry, biology, and environmental science with hands-on learning approaches.',
                image: '/images/science.jpg',
                color: 'from-teal-500 to-green-600',
              },
            ].map((program, index) => (
              <div key={index} className="group relative bg-white rounded-xl overflow-hidden shadow-lg h-full">
                {/* Image placeholder with gradient overlay */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <h3 className="text-xl font-bold">{program.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600 group-hover:underline cursor-pointer">
                      Learn more
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section with form */}
      <CTASection />
    </main>
  );
}

// Icon renderer for stats section
const renderStatIcon = (iconName: string) => {
  const baseClass = "w-12 h-12 text-blue-100 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full";
  
  switch (iconName) {
    case 'Users':
      return (
        <div className={baseClass}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      );
    case 'Chart':
      return (
        <div className={baseClass}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      );
    case 'Briefcase':
      return (
        <div className={baseClass}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      );
    case 'BookOpen':
      return (
        <div className={baseClass}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      );
    default:
      return null;
  }
};