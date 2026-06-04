'use client';

import { ChevronLeft, ChevronRight, Paintbrush, Scan, Settings, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ─── DATA ───────────────────────────────────────────────────────────────────

const slides = [
  {
    id: 1,
    tag: 'Advanced Equipment',
    title: 'Premium Garage Equipment & Workshop Tools',
    cta: 'CALL US TODAY',
    ctaHref: '/contact',
    bg: 'bg-gray-200',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=900&q=80',
  },
  {
    id: 2,
    tag: 'Local Expertise',
    title: 'Tailored solutions for the Bangladeshi Market.',
    cta: 'EXPERT ADVICE',
    ctaHref: '/contact',
    bg: 'bg-gray-100',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=80',
  },
  {
    id: 3,
    tag: 'Quality Assured',
    title: 'Trusted Tools from Global Leading Brands.',
    cta: 'VIEW PRODUCTS',
    ctaHref: '/products',
    bg: 'bg-slate-100',
    image: 'https://images.unsplash.com/photo-1504222490345-c075b626f817?w=900&q=80',
  },
  {
    id: 4,
    tag: 'Fast Delivery',
    title: 'Nationwide Delivery with Expert Installation.',
    cta: 'CONTACT US',
    ctaHref: '/contact',
    bg: 'bg-gray-200',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
];

const categories = [
  {
    id: 1,
    name: "LIFTING EQUIPMENT'S",
    icon: <Wrench size={22} className="text-blue-600" />,
    href: '/products?category=lifting',
    products: [
      { id: 1, name: 'Single Post Car Wash Lift Brand-Schumak India', image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&q=80' },
      { id: 2, name: 'FW43-CT-LT Electro-Hydraulic 4-Column Lift 4000kg', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80' },
      { id: 3, name: 'LAUNCH Wheel Alignment Four Post Lift', image: 'https://images.unsplash.com/photo-1597762117709-859f744b84c3?w=400&q=80' },
      { id: 4, name: 'LAUNCH Scissor Lift (লঞ্চ সিসর লিফট)', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
    ],
  },
  {
    id: 2,
    name: 'DIAGNOSTIC AND CHECKING',
    icon: <Scan size={22} className="text-blue-600" />,
    href: '/products?category=diagnostic',
    products: [
      { id: 5, name: 'Texa OHW Package (Off Highway Diagnostics)', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
      { id: 6, name: 'LAUNCH X-431 V / X341 V+', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80' },
      { id: 7, name: 'Fuel Pressure Test Kit Petrol - China', image: 'https://images.unsplash.com/photo-1581092160607-ee22731c552f?w=400&q=80' },
      { id: 8, name: 'FY-1000 Battery Booster & Charger', image: 'https://images.unsplash.com/photo-1609010697446-11f2155278b0?w=400&q=80' },
    ],
  },
  {
    id: 3,
    name: 'SUPPORTING EQUIPMENT',
    icon: <Settings size={22} className="text-blue-600" />,
    href: '/products?category=supporting',
    products: [
      { id: 9, name: 'Air Compressor (এয়ার কম্প্রেসর-বেড ডিউটি)', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { id: 10, name: 'Floor Jack (ফ্লোর জ্যাক)', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&q=80' },
      { id: 11, name: 'Hans Tool Great Air Impact Wrench Made in Taiwan', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80' },
      { id: 12, name: 'Heavy Duty Dewalt Grinding Machine-Germany', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
    ],
  },
  {
    id: 4,
    name: 'DENTING AND PAINTING',
    icon: <Paintbrush size={22} className="text-blue-600" />,
    href: '/products?category=denting',
    products: [
      { id: 13, name: 'Spray Booth Professional Auto Paint', image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=400&q=80' },
      { id: 14, name: 'Dent Puller Kit Professional', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80' },
      { id: 15, name: 'Auto Body Repair Welding Machine', image: 'https://images.unsplash.com/photo-1504222490345-c075b626f817?w=400&q=80' },
      { id: 16, name: 'Car Paint Mixing System Digital', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80' },
    ],
  },
];

const allProducts = [
  { id: 1, name: 'Single Post Car Wash Lift Brand-Schumak India (কার ওয়াশ ওয়ান পোস্ট লিফট)', image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&q=80', tab: 'top' },
  { id: 2, name: 'FW43-CT-LT Electro-Hydraulic 4-Column Lift. 4000 kg Capacity', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80', tab: 'top' },
  { id: 3, name: 'Texa OHW Package (Off Highway Diagnostics)', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', tab: 'top' },
  { id: 4, name: 'ENGINE STAND (ইঞ্জিন স্ট্যান্ড)', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', tab: 'top' },
  { id: 5, name: 'Jack Stand (জ্যাক স্ট্যান্ড)', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80', tab: 'top' },
  { id: 6, name: 'LAUNCH Wheel Alignment Machine', image: 'https://images.unsplash.com/photo-1597762117709-859f744b84c3?w=400&q=80', tab: 'featured' },
  { id: 7, name: 'Air Compressor Heavy Duty (এয়ার কম্প্রেসর)', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80', tab: 'featured' },
  { id: 8, name: 'Hans Tool Air Impact Wrench Taiwan', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80', tab: 'featured' },
  { id: 9, name: 'FY-1000 Battery Booster & Charger', image: 'https://images.unsplash.com/photo-1609010697446-11f2155278b0?w=400&q=80', tab: 'featured' },
  { id: 10, name: 'Floor Jack Heavy Duty (ফ্লোর জ্যাক)', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&q=80', tab: 'featured' },
  { id: 11, name: 'Heavy Duty Dewalt Grinding Machine', image: 'https://images.unsplash.com/photo-1504222490345-c075b626f817?w=400&q=80', tab: 'all' },
  { id: 12, name: 'Makita Electric Drill Machine', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80', tab: 'all' },
  { id: 13, name: 'Fuel Pressure Test Kit Petrol', image: 'https://images.unsplash.com/photo-1581092160607-ee22731c552f?w=400&q=80', tab: 'all' },
  { id: 14, name: 'LAUNCH X-431 V Diagnostic Scanner', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80', tab: 'all' },
  { id: 15, name: 'Car Wash Spray Gun Professional', image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=400&q=80', tab: 'all' },
];

// ─── HERO SLIDER ─────────────────────────────────────────────────────────────

function HeroSlider() {
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

// ─── BRAND BADGE + HEADLINE ───────────────────────────────────────────────────

function BrandHeadline() {
  return (
    <div className="py-12 text-center border-b border-gray-200">
      <div className="inline-block bg-blue-600 text-white text-xs font-bold tracking-widest px-4 py-1.5 mb-4">
        MUAZ TECHNOLOGY
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-3">
        Garage Equipment &amp; Workshop Tools Supplier in Bangladesh
      </h2>
      <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-4" />
      <p className="text-gray-500 text-sm max-w-xl mx-auto">
        Equip Your Workshop with Reliable, High-Quality Tools for Enhanced Productivity and Efficiency.
      </p>
    </div>
  );
}

// ─── CATEGORIES + PRODUCTS ───────────────────────────────────────────────────

function CategoryProducts() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderStart, setSliderStart] = useState(0);
  const active = categories[activeIdx];

  const prevSlide = () => setSliderStart((p) => Math.max(0, p - 1));
  const nextSlide = () => setSliderStart((p) => Math.min(active.products.length - 4, p + 1));
  const visible = active.products.slice(sliderStart, sliderStart + 4);

  useEffect(() => setSliderStart(0), [activeIdx]);

  return (
    <section className="py-14 container mx-auto px-4">
      <div className="flex gap-10">
        {/* Left: category list */}
        <div className="w-64 shrink-0">
          <h3 className="text-lg font-black text-gray-900 mb-1">Upgrade your workshop?</h3>
          <p className="text-gray-500 text-sm mb-6">Everything you need for repairs in one place</p>
          <ul className="space-y-3">
            {categories.map((cat, i) => (
              <li key={cat.id}>
                <button
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-3 w-full text-left text-sm font-bold tracking-wide transition py-1 ${
                    activeIdx === i ? 'text-blue-700' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: product slider */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-4 gap-4">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Arrows */}
          {sliderStart > 0 && (
            <button
              onClick={prevSlide}
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-50 z-10"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {sliderStart + 4 < active.products.length && (
            <button
              onClick={nextSlide}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-50 z-10"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── VIDEO SECTION ────────────────────────────────────────────────────────────

function VideoSection() {
  return (
    <section className="py-14 container mx-auto px-4">
      <div className="flex gap-12 items-center">
        {/* YouTube embed */}
        <div className="w-1/2 shrink-0 rounded-lg overflow-hidden shadow-lg aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/_vH-xc1LMVk?si=3UDWdLM899VHPyT4"
            title="Muaz Technology - Garage Equipment Supplier Bangladesh"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Right text */}
        <div className="flex-1">
          <span className="inline-block border border-blue-600 text-blue-600 text-xs font-bold tracking-widest px-3 py-1 mb-4">
            আপনার ওয়ার্কশপ এর কর্মক্ষমতাকে উন্নত করুন
          </span>
          <h2 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
            Need top-quality garage equipment and expert installation?
          </h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Muaz Technology has you covered! We supply, install, and provide training on a wide
            range of garage equipment. With our skilled team and commitment to customer
            satisfaction, we ensure that your garage is equipped with the best tools and that
            your staff is fully trained to use them efficiently. Whether you&apos;re upgrading or
            starting from scratch,
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold tracking-wide px-6 py-3 transition"
          >
            GARAGE EQUIPMENTS
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── MUST-HAVE PRODUCTS (TABS) ────────────────────────────────────────────────

function MustHaveProducts() {
  const [activeTab, setActiveTab] = useState<'top' | 'featured' | 'all'>('top');

  const filtered = allProducts.filter((p) =>
    activeTab === 'all' ? true : p.tab === activeTab
  );

  return (
    <section className="py-14 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-gray-900">Must-have Products and more</h2>
        <div className="flex items-center gap-6">
          {(['top', 'featured', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-bold tracking-wide transition ${
                activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab === 'top' ? 'TOP PRODUCTS' : tab === 'featured' ? 'FEATURED' : 'ALL OTHERS'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: { id: number; name: string; image: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="border border-gray-200 rounded group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hovered && (
          <div className="absolute inset-x-0 bottom-0">
            <Link
              href={`/product/${product.id}`}
              className="block bg-blue-600 text-white text-center text-xs font-bold py-2 hover:bg-blue-700 transition"
            >
              READ MORE
            </Link>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-800 leading-snug line-clamp-2">{product.name}</p>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSlider />
      <BrandHeadline />
      <CategoryProducts />
      <VideoSection />
      <MustHaveProducts />
    </main>
  );
}