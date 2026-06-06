'use client';

import { slides } from '@/lib/home-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <div className="flex gap-0" style={{ minHeight: 480 }}>
      {/* Slider */}
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: 480 }}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.bg} flex`}
          >
            {/* Blue left accent bar */}
            <div className="w-2 bg-blue-600 shrink-0" />

            {/* Text side */}
            <div className="flex flex-col justify-center px-10 py-12 w-64 shrink-0 z-10">
              <span className="text-blue-600 font-semibold text-sm mb-3">{slide.tag}</span>
              <h2 className="text-3xl font-black text-gray-900 leading-tight mb-6">{slide.title}</h2>
              <Link
                href={slide.ctaHref}
                className="text-xs font-bold tracking-widest underline underline-offset-4 text-gray-900 hover:text-blue-600"
              >
                {slide.cta}
              </Link>
            </div>

            {/* Image */}
            <div className="flex-1 relative overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots / numbered indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="flex items-center gap-1.5 group"
            >
              <span className={`text-xs font-bold ${i === current ? 'text-gray-900' : 'text-gray-400'}`}>
                0{i + 1}
              </span>
              <span
                className={`block h-0.5 transition-all duration-300 ${i === current ? 'w-10 bg-blue-600' : 'w-5 bg-gray-400'}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right panels */}
      <div className="w-72 shrink-0 flex flex-col">
        <div className="flex-1 bg-gray-100 p-5 flex flex-col justify-between overflow-hidden">
          <div>
            <h3 className="text-blue-600 font-bold text-base mb-1">Our Services</h3>
            <p className="text-gray-600 text-sm">Discover all the ways to get your product.</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80"
            alt="Our Services"
            className="w-full h-28 object-cover rounded mt-3"
          />
        </div>
        <div className="flex-1 bg-gray-50 p-5 flex flex-col justify-between overflow-hidden border-t border-gray-200">
          <div>
            <h3 className="text-blue-600 font-bold text-base mb-1">Free Shipping!</h3>
            <p className="text-gray-600 text-sm">Empowering Workshops Across Bangladesh.</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=400&q=80"
            alt="Free Shipping"
            className="w-full h-28 object-cover rounded mt-3"
          />
        </div>
      </div>
    </div>
  );
}