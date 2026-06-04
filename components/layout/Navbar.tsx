"use client";

import { ChevronDown, ChevronRight, Menu, Search, Settings, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PRODUCT_CATEGORIES } from "@/lib/products";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // [NEW] State to control Browse Categories dropdown visibility
  const [isBrowseCategoriesOpen, setIsBrowseCategoriesOpen] = useState(false);
  // [NEW] Ref to detect clicks outside the dropdown
  const browseDropdownRef = useRef<HTMLDivElement>(null);

  // [NEW] Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (browseDropdownRef.current && !browseDropdownRef.current.contains(event.target as Node)) {
        setIsBrowseCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* [NEW] Browse Categories Dropdown - Desktop */}
          <div className="relative" ref={browseDropdownRef}>
            <button
              onClick={() => setIsBrowseCategoriesOpen(!isBrowseCategoriesOpen)}
              className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-sm font-semibold text-gray-700 transition whitespace-nowrap"
            >
              <Menu size={15} />
              BROWSE IN CATEGORIES
              {/* [NEW] Chevron rotates when dropdown is open */}
              <ChevronDown size={13} className={`transition-transform ${isBrowseCategoriesOpen ? "rotate-180" : ""}`} />
            </button>

            {/* [NEW] Dropdown Menu - shows when isBrowseCategoriesOpen is true */}
            {isBrowseCategoriesOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* Dropdown header */}
                <div className="px-3 py-2 border-b border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Shop by Category
                  </h3>
                </div>
                {/* Category list */}
                <ul className="py-1">
                  {/* All Products link */}
                  <li>
                    <Link
                      href="/products"
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setIsBrowseCategoriesOpen(false)}
                    >
                      <span>📦 All Products</span>
                      <ChevronRight size={14} />
                    </Link>
                  </li>
                  {/* Dynamic categories from PRODUCT_CATEGORIES array */}
                  {PRODUCT_CATEGORIES.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setIsBrowseCategoriesOpen(false)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

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
            {/* Garage Equipments button */}
            <button className="w-full flex items-center justify-between gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm font-semibold text-gray-700 transition">
              <span className="flex items-center gap-2">
                <Settings size={16} className="text-blue-600" />
                GARAGE EQUIPMENT&apos;S
              </span>
              <ChevronDown size={14} />
            </button>

            {/* [NEW] Browse Categories - Mobile Dropdown */}
            <div>
              <button
                onClick={() => setIsBrowseCategoriesOpen(!isBrowseCategoriesOpen)}
                className="w-full flex items-center justify-between gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-sm font-semibold text-gray-700 transition"
              >
                <span className="flex items-center gap-2">
                  <Menu size={16} />
                  BROWSE IN CATEGORIES
                </span>
                {/* [NEW] Chevron rotates when dropdown is open */}
                <ChevronDown size={14} className={`transition-transform ${isBrowseCategoriesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* [NEW] Mobile dropdown menu */}
              {isBrowseCategoriesOpen && (
                <div className="mt-2 ml-4 space-y-1 border-l-2 border-blue-200 pl-3">
                  <Link
                    href="/products"
                    className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                    onClick={() => {
                      setIsBrowseCategoriesOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    📦 All Products
                  </Link>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => {
                        setIsBrowseCategoriesOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom navigation links */}
            <div className="pt-2 border-t border-gray-200">
              <Link
                href="/"
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}