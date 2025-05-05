'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                LogoAI
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/logo"
                className="border-transparent text-primary-700 hover:text-primary hover:border-primary-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Logo Generator
              </Link>
              <Link
                href="/image-generator"
                className="border-transparent text-primary-700 hover:text-primary hover:border-primary-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Image Generator
              </Link>
            </nav>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-400 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/logo"
              className="border-transparent text-primary-700 hover:text-primary hover:bg-primary-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Logo Generator
            </Link>
            <Link
              href="/image-generator"
              className="border-transparent text-primary-700 hover:text-primary hover:bg-primary-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Image Generator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
