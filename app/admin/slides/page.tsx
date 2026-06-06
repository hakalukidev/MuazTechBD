'use client';

import { Edit, GripVertical, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminSlidesPage() {
  const [slides, setSlides] = useState([
    { id: 1, title: 'Premium Garage Equipment', image: '/images/slides/slide-1.jpg', order: 1, active: true },
    { id: 2, title: 'Tailored solutions for Bangladesh', image: '/images/slides/slide-2.jpg', order: 2, active: true },
    { id: 3, title: 'Trusted Tools from Global Brands', image: '/images/slides/slide-3.jpg', order: 3, active: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Slides</h1>
          <p className="text-blue-600">Manage homepage slider images</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Plus size={18} />
          Add Slide
        </button>
      </div>

      <div className="space-y-3">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-lg border border-blue-200 p-4 flex items-center gap-4">
            <div className="cursor-move text-blue-400"><GripVertical size={20} /></div>
            <img src={slide.image} alt={slide.title} className="w-32 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-medium text-blue-950">{slide.title}</h3>
              <p className="text-sm text-blue-500">Order: {slide.order}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}