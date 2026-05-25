'use client';

import { Home, Menu, Phone, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function TopBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop TopBar - Hidden on mobile */}
      <div className="bg-blue-600 text-white text-sm py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <p className="font-medium text-xs lg:text-sm">
            Comprehensive Solutions for Every Workshop Need.
          </p>
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="flex items-center gap-1 hover:text-blue-200 transition text-xs lg:text-sm">
              <Home size={14} /> START HERE
            </Link>
            <Link href="/about" className="flex items-center gap-1 hover:text-blue-200 transition text-xs lg:text-sm">
              <Settings size={14} /> ABOUT SERVICE
            </Link>
            <Link href="/contact" className="flex items-center gap-1 hover:text-blue-200 transition text-xs lg:text-sm">
              <Phone size={14} /> CONTACT US
            </Link>
            <div className="flex items-center gap-2 lg:gap-3 border-l border-blue-400 pl-3 lg:pl-4">
              <a href="#" className="hover:text-blue-200 transition"><FaFacebook size={14} /></a>
              <a href="#" className="hover:text-blue-200 transition"><FaTwitter size={14} /></a>
              <a href="#" className="hover:text-blue-200 transition"><FaYoutube size={14} /></a>
              <a href="#" className="hover:text-blue-200 transition"><FaLinkedin size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile TopBar - Visible on mobile only */}
      <div className="bg-blue-600 text-white md:hidden">
        <div className="flex justify-between items-center py-2 px-4">
          <p className="font-medium text-xs">
            Solutions for Every Workshop
          </p>
          <button 
            onClick={toggleMenu}
            className="p-1 hover:bg-blue-700 rounded transition"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu - Fixed with relative positioning */}
        {isMobileMenuOpen && (
          <div className="border-t border-blue-500 bg-blue-600">
            <div className="px-4 py-2 space-y-1">
              <Link 
                href="/" 
                className="flex items-center gap-2 py-2 px-2 hover:bg-blue-700 rounded transition text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home size={16} /> START HERE
              </Link>
              <Link 
                href="/about" 
                className="flex items-center gap-2 py-2 px-2 hover:bg-blue-700 rounded transition text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings size={16} /> ABOUT SERVICE
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center gap-2 py-2 px-2 hover:bg-blue-700 rounded transition text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone size={16} /> CONTACT US
              </Link>
              <div className="flex items-center gap-4 py-2 px-2 border-t border-blue-500 mt-1">
                <a href="#" className="hover:text-blue-200 transition"><FaFacebook size={18} /></a>
                <a href="#" className="hover:text-blue-200 transition"><FaTwitter size={18} /></a>
                <a href="#" className="hover:text-blue-200 transition"><FaYoutube size={18} /></a>
                <a href="#" className="hover:text-blue-200 transition"><FaLinkedin size={18} /></a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}