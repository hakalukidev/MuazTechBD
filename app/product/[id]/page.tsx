// app/product/[id]/page.tsx
'use client';

import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Sample products data (same as your products page)
const allProducts = [
  // Diagnostic Scanners
  { id: 1, name: 'Autel MX808S', category: 'Diagnostic Scanners', price: 'Contact for Price', image: '🔧', hot: true, description: 'Professional diagnostic scanner for all car models. Features include: Full system diagnostics, 28+ service functions, 2 years free update, Android OS.', longDescription: 'The Autel MX808S is a powerful diagnostic scanner that provides comprehensive diagnostics for all car models. It comes with 28+ special functions including oil reset, EPB, SAS, BMS, DPF, ABS bleeding, etc. The 7-inch HD screen and Android 10.0 OS provide smooth operation.' },
  
  { id: 2, name: 'Autel MS906 MAX', category: 'Diagnostic Scanners', price: 'Contact for Price', image: '📱', hot: true, description: 'Advanced diagnostic system with ADAS calibration support.', longDescription: 'Autel MS906 MAX is the flagship diagnostic tool with ADAS calibration capabilities. Features 9.7-inch screen, 2-year free updates, 32+ special functions, and full system diagnostics.' },
  
  { id: 3, name: 'Launch X431 Pros V5.0', category: 'Diagnostic Scanners', price: 'Contact for Price', image: '📟', hot: true, description: 'Complete diagnostic solution with 2-year free update.', longDescription: 'The Launch X431 Pros V5.0 is a professional diagnostic tool with comprehensive vehicle coverage. Features include: 2 years free software updates, 30+ special functions, smart diagnostics, and remote assistance.' },
  
  { id: 4, name: 'JDia M100 Pro', category: 'Diagnostic Scanners', price: 'Contact for Price', image: '📱', hot: false, description: 'Entry-level professional scanner for basic diagnostics.', longDescription: 'JDia M100 Pro is an entry-level diagnostic scanner perfect for small workshops. Features basic OBD2 functions, code reading, live data, and emissions readiness.' },
  
  { id: 5, name: 'JDia M300', category: 'Diagnostic Scanners', price: 'Contact for Price', image: '📟', hot: false, description: 'Mid-range diagnostic tool with advanced features.', longDescription: 'JDia M300 offers mid-range diagnostic capabilities with full system coverage. Features 10+ special functions, 2-year warranty, and easy-to-use interface.' },
  
  { id: 6, name: 'MOTO SCAN', category: 'Diagnostic Scanners', price: 'Contact for Price', image: '🏍️', hot: false, description: 'Specialized motorcycle diagnostic tool.', longDescription: 'MOTO SCAN is specifically designed for motorcycle diagnostics. It covers all major motorcycle brands including Honda, Yamaha, Suzuki, Bajaj, and more.' },
  
  // Workshop Equipment
  { id: 7, name: 'Engine Crane - 2TON', category: 'Workshop Equipment', price: 'Contact for Price', image: '🏗️', hot: true, description: 'Heavy duty engine crane for workshop use.', longDescription: '2-ton capacity hydraulic engine crane. Features include: Foldable design, 6-position boom, swivel casters, and durable steel construction.' },
  
  { id: 8, name: 'Engine Crane - 1TON', category: 'Workshop Equipment', price: 'Contact for Price', image: '🏗️', hot: false, description: 'Light duty engine crane.', longDescription: '1-ton capacity engine crane perfect for small workshops and home garages. Lightweight design with easy maneuverability.' },
  
  { id: 9, name: 'Tyre Changer - LAUNCH', category: 'Workshop Equipment', price: 'Contact for Price', image: '⚙️', hot: true, description: 'Automatic tyre changing machine.', longDescription: 'LAUNCH automatic tyre changer with advanced features. Suitable for cars, SUVs, and light trucks. Pneumatic operation with quick-change functionality.' },
  
  { id: 10, name: 'Car Lift', category: 'Workshop Equipment', price: 'Contact for Price', image: '🔧', hot: true, description: 'Hydraulic car lift for workshops.', longDescription: '2-post hydraulic car lift with 3-ton capacity. Features include: Symmetric design, triple telescopic arms, and automatic safety locks.' },
  
  { id: 11, name: 'Air Impact Wrench', category: 'Workshop Equipment', price: 'Contact for Price', image: '💨', hot: true, description: 'Pneumatic impact wrench.', longDescription: 'Professional air impact wrench with 1000 ft-lbs torque. Lightweight composite housing and twin hammer mechanism.' },
  
  { id: 12, name: 'High Pressure Washer Pump', category: 'Workshop Equipment', price: 'Contact for Price', image: '💧', hot: false, description: 'Industrial pressure washer.', longDescription: 'High-pressure washer pump with 2500 PSI capacity. Suitable for heavy-duty cleaning applications.' },
  
  // Hand Tools
  { id: 13, name: 'Professional Tools Set', category: 'Hand Tools', price: 'Contact for Price', image: '🧰', hot: true, description: 'Complete tool set for professionals.', longDescription: '200-piece professional tool set includes sockets, wrenches, pliers, screwdrivers, and hex keys. Chrome vanadium steel construction with lifetime warranty.' },
  
  { id: 14, name: 'Circuit Tester', category: 'Hand Tools', price: 'Contact for Price', image: '⚡', hot: false, description: 'Electrical circuit testing tool.', longDescription: 'Digital circuit tester with voltage detection and continuity testing. LED indicator and audible alert.' },
  
  { id: 15, name: 'Injector Cleaner - AUTON', category: 'Hand Tools', price: 'Contact for Price', image: '💉', hot: true, description: 'Fuel injector cleaning machine.', longDescription: 'AUTON ultrasonic fuel injector cleaner with testing capabilities. Cleans up to 4 injectors simultaneously with adjustable frequency.' },
  
  { id: 16, name: 'Car Creeper', category: 'Hand Tools', price: 'Contact for Price', image: '🛞', hot: false, description: 'Mechanics creeper for under-car work.', longDescription: 'Folding mechanics creeper with 6 casters and padded headrest. Max load capacity 300kg.' },
  
  { id: 17, name: 'Mechanical Stethoscope', category: 'Hand Tools', price: 'Contact for Price', image: '🩺', hot: true, description: 'Engine noise detection tool.', longDescription: 'Professional mechanical stethoscope for pinpointing engine noise sources. Adjustable probe length and sensitive diaphragm.' },
  
  // Testing Equipment
  { id: 18, name: 'Engine Oil Tester', category: 'Testing Equipment', price: 'Contact for Price', image: '🛢️', hot: true, description: 'Engine oil quality tester.', longDescription: 'Digital engine oil tester measures viscosity and contamination level. Easy-to-read LCD display.' },
  
  { id: 19, name: 'Spark Plug Tester', category: 'Testing Equipment', price: 'Contact for Price', image: '🔌', hot: true, description: 'Spark plug diagnostic tool.', longDescription: 'Spark plug tester with adjustable frequency. Tests spark intensity and consistency.' },
  
  { id: 20, name: 'Brake Oil Tester', category: 'Testing Equipment', price: 'Contact for Price', image: '🛞', hot: false, description: 'Brake fluid tester.', longDescription: 'Digital brake fluid tester measures moisture content and boiling point. LED indicator for results.' },
  
  { id: 21, name: 'Automotive Wheel Balancer', category: 'Testing Equipment', price: 'Contact for Price', image: '⚖️', hot: true, description: 'Wheel balancing machine.', longDescription: 'Computerized wheel balancer with LED display. Suitable for car and light truck wheels.' },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  
  const product = allProducts.find(p => p.id === parseInt(id as string));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
        <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Back to Products
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 md:mb-6 text-sm md:text-base"
        >
          <ArrowLeft size={18} /> Back to Products
        </Link>

        {/* Product Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 md:p-12 flex items-center justify-center">
              <span className="text-8xl md:text-9xl">{product.image}</span>
            </div>
            
            {/* Product Info */}
            <div className="space-y-4 md:space-y-6">
              {product.hot && (
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full w-fit">
                  🔥 Hot Sale
                </span>
              )}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-blue-600 font-semibold text-lg md:text-xl">{product.price}</p>
              <div className="border-t border-b border-gray-200 py-3 md:py-4">
                <p className="text-gray-700 leading-relaxed">{product.longDescription || product.description}</p>
              </div>
              
              {/* Key Features */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Key Features:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> High-quality durable construction</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Professional grade performance</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Easy to use and maintain</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Warranty and after-sales support</li>
                </ul>
              </div>

              {/* Inquiry Button */}
              <div className="flex gap-3 md:gap-4 pt-2">
                <button 
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="flex-1 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Get Quote
                </button>
                <Link 
                  href="/contact"
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition text-center"
                >
                  Contact Us
                </Link>
              </div>

              {/* Inquiry Form */}
              {showInquiryForm && (
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 mt-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Request Quote for {product.name}</h3>
                  <form className="space-y-3" action="/api/contact" method="POST">
                    <input type="hidden" name="product" value={product.name} />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Your Name" className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" required />
                      <input type="tel" placeholder="Phone Number" className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" required />
                    </div>
                    <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" required />
                    <textarea rows={3} placeholder="Your Message" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"></textarea>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                      Submit Inquiry
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 md:mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map(relProduct => (
                <Link href={`/product/${relProduct.id}`} key={relProduct.id}>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-lg transition">
                    <div className="text-4xl md:text-5xl text-center py-3 md:py-4">{relProduct.image}</div>
                    <h3 className="font-medium text-gray-800 text-xs md:text-sm text-center line-clamp-2">{relProduct.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}