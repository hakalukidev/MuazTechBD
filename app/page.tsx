'use client';

import { ChevronRight, Grid2X2, Grid3X3, LayoutGrid, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const categories = [
  'Denting & Painting',
  'Diagnostic and Checking',
  'Lifting Equipment',
  'Repairing Equipment',
  'Supporting Equipment',
  'Uncategorized',
];

const sidebarProducts = [
  { id: 1, name: 'Single Post Car Wash Lift Brand- Schumak India (কার ওয়াশ ওয়ান পোস্ট লিফট)', image: '🔧' },
  { id: 2, name: 'FW43-CT-LT Electro-Hydraulic 4-Column Lift. 4000 kg Capacity', image: '🏗️' },
  { id: 3, name: 'Texa OHW Package (Off Highway Diagnostics)', image: '🖥️' },
  { id: 4, name: 'ENGINE STAND (ইঞ্জিন স্ট্যান্ড)', image: '⚙️' },
  { id: 5, name: 'Jack Stand (জ্যাক স্ট্যান্ড)', image: '🔩' },
];

const products = [
  { id: 1, name: 'Air Compressor (এয়ার কম্প্রেসর-বেড ডিউটি)', category: 'Supporting Equipment', emoji: '🔵' },
  { id: 2, name: 'Floor Jack (ফ্লোর জ্যাক)', category: 'Supporting Equipment', emoji: '🔴' },
  { id: 3, name: 'Fuel Pressure Test Kit Petrol - China (ফুয়েল প্রেসার টেস্ট কিট – পেট্রোল)', category: 'Supporting Equipment', emoji: '🔴' },
  { id: 4, name: 'FY-1000 Battery Booster & Charger (ব্যাটারি বুস্টার এবং চার্জার)', category: 'Supporting Equipment', emoji: '⚡' },
  { id: 5, name: 'Hans Tool Great Air Impact Wrench Key Features Made in Taiwan (হ্যান্স টুলস)', category: 'Supporting Equipment', emoji: '🔧' },
  { id: 6, name: 'Heavy Duty Dewalt Grinding Machine-Germany (গ্রাইন্ডিং মেশিন)', category: 'Supporting Equipment', emoji: '🟡' },
  { id: 7, name: 'LAUNCH X-431 V / X341 V +', category: 'Supporting Equipment', emoji: '📱' },
  { id: 8, name: 'Makita Bosch Electric Drill Machine (ইলেকট্রিক ড্রিল মেশিন)', category: 'Supporting Equipment', emoji: '🔵' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Supporting Equipment');
  const [gridCols, setGridCols] = useState(4);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Adjust grid columns based on screen size
      if (window.innerWidth < 640) {
        setGridCols(1);
      } else if (window.innerWidth < 768) {
        setGridCols(2);
      } else if (window.innerWidth < 1024) {
        setGridCols(3);
      } else {
        setGridCols(4);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getGridColsClass = () => {
    if (gridCols === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    if (gridCols === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    if (gridCols === 5) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="text-sm font-medium">Categories & Products</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Mobile Responsive */}
          <aside className={`
            ${mobileMenuOpen ? 'block' : 'hidden'} 
            lg:block lg:w-72 lg:shrink-0
            w-full border-b lg:border-b-0 pb-6 lg:pb-0
          `}>
            {/* Categories */}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-base lg:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3 lg:mb-4">
                CATEGORIES
              </h2>
              <ul className="space-y-1 lg:space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setActiveCategory(cat);
                        if (isMobile) setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-2 lg:px-0 py-1.5 lg:py-1 text-sm lg:text-base transition-colors ${
                        activeCategory === cat
                          ? 'font-bold text-gray-900 bg-gray-50 lg:bg-transparent'
                          : 'text-blue-600 hover:text-blue-800 hover:bg-gray-50 lg:hover:bg-transparent'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products sidebar */}
            <div>
              <h2 className="text-base lg:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3 lg:mb-4">
                PRODUCTS
              </h2>
              <ul className="space-y-3 lg:space-y-4">
                {sidebarProducts.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded flex items-center justify-center text-xl lg:text-2xl shrink-0">
                      {p.image}
                    </div>
                    <Link 
                      href={`/product/${p.id}`} 
                      className="text-xs lg:text-sm text-blue-600 hover:text-blue-800 leading-snug"
                      onClick={() => isMobile && setMobileMenuOpen(false)}
                    >
                      {p.name.length > 50 ? `${p.name.substring(0, 50)}...` : p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Breadcrumb + Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 lg:mb-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <ChevronRight size={14} />
                <span className="text-gray-800 font-medium">{activeCategory}</span>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 sm:gap-4">
                {/* Grid controls - Hidden on mobile, visible on tablet+ */}
                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1 rounded transition-colors ${
                      gridCols === 3 ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    aria-label="3 columns"
                  >
                    <Grid2X2 size={18} className="lg:w-5 lg:h-5" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1 rounded transition-colors ${
                      gridCols === 4 ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    aria-label="4 columns"
                  >
                    <Grid3X3 size={18} className="lg:w-5 lg:h-5" />
                  </button>
                  <button
                    onClick={() => setGridCols(5)}
                    className={`p-1 rounded transition-colors ${
                      gridCols === 5 ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    aria-label="5 columns"
                  >
                    <LayoutGrid size={18} className="lg:w-5 lg:h-5" />
                  </button>
                </div>
                
                {/* Sort Dropdown - Full width on mobile */}
                <select className="border border-gray-300 rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-700 outline-none focus:border-blue-400 flex-1 sm:flex-none">
                  <option>Default sorting</option>
                  <option>Sort by price: low to high</option>
                  <option>Sort by price: high to low</option>
                  <option>Sort by newest</option>
                </select>
              </div>
            </div>

            {/* Product Grid - Responsive */}
            <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${getGridColsClass()}`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg group relative overflow-hidden transition-shadow hover:shadow-lg"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image */}
                  <div className="relative bg-gray-50 aspect-square flex items-center justify-center overflow-hidden cursor-pointer">
                    <span className="text-4xl sm:text-5xl lg:text-6xl transition-transform group-hover:scale-110">
                      {product.emoji}
                    </span>
                    
                    {/* Read More overlay - visible on hover for desktop, tap for mobile */}
                    {hoveredProduct === product.id && (
                      <div className="absolute inset-x-0 bottom-0 animate-slide-up">
                        <Link
                          href={`/product/${product.id}`}
                          className="block bg-blue-600 text-white text-center text-xs sm:text-sm font-semibold py-2 sm:py-2.5 hover:bg-blue-700 transition-colors"
                        >
                          READ MORE
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-2 sm:p-3 lg:p-4">
                    <Link 
                      href={`/product/${product.id}`} 
                      className="text-xs sm:text-sm text-gray-800 hover:text-blue-600 leading-snug line-clamp-2 sm:line-clamp-3"
                    >
                      {product.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Products Message */}
            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">No products found in this category.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}