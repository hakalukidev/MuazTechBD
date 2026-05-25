'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const res = await fetch('/api/products');
    const products = await res.json();
    const found = products.find((p: any) => p.id === id);
    setProduct(found);
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-8xl">🔧</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <Link 
            href={`/contact?product=${product.name}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
