"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Home, BookOpen, Users, HelpCircle, MessageSquare, Phone } from 'lucide-react';

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !(event.target as Element).closest('button[aria-label="Toggle mobile menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { label: 'Services', href: '/services', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { label: 'About Us', href: '/about', icon: <Users className="h-4 w-4 mr-2" /> },
    { label: 'FAQs', href: '/faq', icon: <HelpCircle className="h-4 w-4 mr-2" /> },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-full p-1 transition-all duration-300 group-hover:bg-blue-50">
                <Image
                  src="/images/peak-logo.png"
                  alt="Peak Tutoring Logo"
                  width={60}
                  height={60}
                  className="w-auto h-12 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Peak Tutoring
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">Reach your academic potential</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Call Us Button */}
            <a href="tel:561-870-3273" className="ml-4">
              <Button 
                variant="gradient" 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-2 rounded-md transition-all duration-300 hover:shadow-md flex items-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                561-870-3273
              </Button>
            </a>

            {/* Contact Us Button */}
            <Link href="/contact" className="ml-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md transition-all duration-300 hover:shadow-md flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-blue-50"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-blue-600" />
              ) : (
                <Menu className="h-6 w-6 text-blue-600" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg rounded-b-lg z-50 transform transition-all duration-300" ref={mobileMenuRef}>
          <div className="px-4 pt-2 pb-3 space-y-1 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {/* Call Us Button - Mobile */}
            <a
              href="tel:561-870-3273"
              className="block px-3 py-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant="gradient"
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-md flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call: 561-870-3273
              </Button>
            </a>
            
            {/* Contact Us Button - Mobile */}
            <Link
              href="/contact"
              className="block px-3 py-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full border-2 border-blue-600 text-blue-600 bg-white py-3 rounded-md flex items-center justify-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;