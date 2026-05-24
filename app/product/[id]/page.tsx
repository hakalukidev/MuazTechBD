'use client';

import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Product Details</h1>
      <p className="mt-4">Product ID: {id}</p>
    </div>
  );
}
