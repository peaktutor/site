import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Math Tutoring', href: '/services' },
        { label: 'Science Tutoring', href: '/services' },
        { label: 'Language Arts', href: '/services' },
        { label: 'Test Prep', href: '/services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
  ];

  // No social media icons

  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content with subtle background effect */}
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
            <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-blue-200 blur-3xl"></div>
            <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-indigo-200 blur-3xl"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Brand section - enhanced */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Peak Tutoring
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Empowering students to reach their full potential through personalized tutoring and academic excellence.
              </p>
            </div>

            {/* Links sections - enhanced */}
            {footerSections.map((section) => (
              <div key={section.title} className="md:ml-8">
                <h3 className="text-gray-900 font-semibold text-lg mb-5 relative">
                  {section.title}
                  <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 -mb-2"></span>
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                      >
                        <span className="h-1 w-1 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section - enhanced */}
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex justify-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} <span className="font-medium text-gray-600">Peak Tutoring</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;