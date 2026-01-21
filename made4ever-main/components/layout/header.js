'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

// Helper to combine classNames
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/aboutus' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contactus' },
  // { name: 'Admin Login', href: 'https://made4ever-admin.vercel.app/' },
  { name: 'Bureau Login', href: 'https://made4ever-admin-dkjf.vercel.app/' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Made4Ever New Logo (600 x 300 px) (1).png"
              alt="Made4Ever"
              width={150}
              height={60}
              className="object-contain h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium text-gray-700 hover:text-[#bf5281] transition-colors duration-300 group'
                )}
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#bf5281] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 overflow-hidden bg-white border-t border-gray-200',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-3 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 text-base font-medium hover:bg-gradient-to-r from-red-50 to-pink-50 hover:text-red-600 rounded-lg px-3 py-2 transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
