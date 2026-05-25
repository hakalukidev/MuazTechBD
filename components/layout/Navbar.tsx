'use client';

import { ChevronDown, Menu, Search, Settings, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-6 py-3">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/Mlogo.png"
              alt="Muaz Technology"
              width={60}
              height={35}
              className="object-contain"
              priority
            />
            <div className="flex flex-col ml-2">
              <span className="text-base font-bold text-blue-700 leading-tight">
                MUAZ
              </span>
              <span className="text-[7px] font-semibold text-gray-500 tracking-wider">
                TECHNOLOGY
              </span>
            </div>
          </Link>

          {/* Garage Equipments Dropdown */}
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm font-semibold text-gray-700 transition whitespace-nowrap">
            <Settings size={15} className="text-blue-600" />
            GARAGE EQUIPMENT&apos;S
            <ChevronDown size={13} />
          </button>

          {/* Browse Categories */}
          <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-sm font-semibold text-gray-700 transition whitespace-nowrap">
            <Menu size={15} />
            BROWSE IN CATEGORIES
            <ChevronDown size={13} />
          </button>

          {/* Search */}
          <div className="flex items-center border border-gray-300 rounded overflow-hidden w-72">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2">
              <Search size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Logo - Left for mobile */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/Mlogo.png"
              alt="Muaz Technology"
              width={50}
              height={30}
              className="object-contain"
              priority
            />
            <div className="flex flex-col ml-1">
              <span className="text-sm font-bold text-blue-700 leading-tight">
                MUAZ
              </span>
              <span className="text-[5px] font-semibold text-gray-500 tracking-wider">
                TECHNOLOGY
              </span>
            </div>
          </Link>

          {/* Mobile Icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search size={18} className="text-gray-600" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden mt-3">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-3 py-2 text-sm outline-none"
                autoFocus
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2">
                <Search size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 space-y-2">
            <button className="w-full flex items-center justify-between gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm font-semibold text-gray-700 transition">
              <span className="flex items-center gap-2">
                <Settings size={16} className="text-blue-600" />
                GARAGE EQUIPMENT&apos;S
              </span>
              <ChevronDown size={14} />
            </button>
            
            <button className="w-full flex items-center justify-between gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-sm font-semibold text-gray-700 transition">
              <span className="flex items-center gap-2">
                <Menu size={16} />
                BROWSE IN CATEGORIES
              </span>
              <ChevronDown size={14} />
            </button>

            <div className="pt-2 border-t border-gray-200">
              <Link href="/" className="block py-2 text-sm text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/products" className="block py-2 text-sm text-gray-600 hover:text-blue-600">Products</Link>
              <Link href="/about" className="block py-2 text-sm text-gray-600 hover:text-blue-600">About</Link>
              <Link href="/contact" className="block py-2 text-sm text-gray-600 hover:text-blue-600">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}