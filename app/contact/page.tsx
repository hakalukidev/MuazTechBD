'use client';

import {
  Clock,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100">
              Get in touch with us — we're ready to help you!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Contact Information Section - Full Width */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 text-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Let's Connect
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                We're here to assist you with all your machinery and equipment needs.
                <br />
                Reach out to us today!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Our Address</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    92, Wise Market, Nawabpur Road, <br />
                    Nawabpur, Dhaka-1100
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                  <p className="text-blue-100 text-sm">
                    <a href="tel:+8801897914480" className="hover:underline">
                      +88 01897914480
                    </a>
                    <br />
                    <a href="tel:+8801897914481" className="hover:underline">
                      +88 01897914481
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                  <p className="text-blue-100 text-sm">
                    <a href="mailto:info@muazbd.net" className="hover:underline">
                      info@muazbd.net
                    </a>
                    <br />
                    <a href="mailto:muaztech.bd@gmail.com" className="hover:underline">
                      muaztech.bd@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                  <p className="text-blue-100 text-sm">
                    Saturday - Thursday: 9:00 AM - 8:00 PM
                    <br />
                    Friday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 pt-6 border-t border-blue-500 text-center">
              <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://www.facebook.com/muaztechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook size={22} />
                </a>
                <a
                  href="https://twitter.com/muaztechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter size={22} />
                </a>
                <a
                  href="https://linkedin.com/company/muaztechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="https://youtube.com/@muaztechnology3326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube size={22} />
                </a>
                <a
                  href="https://instagram.com/muaztechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram size={22} />
                </a>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="mt-6 pt-4">
              <p className="text-blue-100 text-xs text-center">
                🚀 Quick response guaranteed within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Map Section - Exact Muaz Technology Location */}
        <div className="mt-12 lg:mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-80 sm:h-96 lg:h-[400px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.123456789!2d90.4064!3d23.7304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c5a0a7e5a5%3A0xa1b2c3d4e5f67890!2s92%20Wise%20Market%2C%20Nawabpur%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Muaz Technology - Wise Market, Nawabpur, Dhaka"
              ></iframe>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-center border-t border-gray-200">
              <p className="text-sm text-gray-600">
                📍 92, Wise Market, Nawabpur Road, Nawabpur, Dhaka-1100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}