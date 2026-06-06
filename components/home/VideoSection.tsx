import Link from 'next/link';

export default function VideoSection() {
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