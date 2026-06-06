'use client';

import { ChevronDown, ChevronRight, Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminCategoriesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  
  const [categories, setCategories] = useState([
    {
      id: 'lifting',
      name: "LIFTING EQUIPMENT'S",
      subCategories: ['Two Post Lift', 'Four Post Lift', 'Scissor Lift', 'Motorcycle Lift']
    },
    {
      id: 'diagnostic',
      name: 'DIAGNOSTIC AND CHECKING',
      subCategories: ['Car Scanner', 'Motorcycle Scanner', 'Battery Tester', 'Compression Tester']
    },
    {
      id: 'tools',
      name: 'HAND TOOLS',
      subCategories: ['Wrench Set', 'Socket Set', 'Pliers', 'Screwdrivers']
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Categories & Sub Categories</h1>
          <p className="text-blue-600">Manage product categories and subcategories</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg border border-blue-200 overflow-hidden">
            <div className="p-4 flex items-center justify-between hover:bg-blue-50 cursor-pointer"
                 onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}>
              <div className="flex items-center gap-3">
                {expanded === cat.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <span className="font-semibold text-blue-950">{cat.name}</span>
                <span className="text-xs text-blue-400">({cat.subCategories.length} subcategories)</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-blue-600 hover:bg-blue-100 rounded"><Edit size={16} /></button>
                <button className="p-1 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
              </div>
            </div>
            
            {expanded === cat.id && (
              <div className="border-t border-blue-100 p-4 bg-blue-50/30">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-blue-700">Sub Categories</h4>
                  <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                    <Plus size={12} /> Add Subcategory
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cat.subCategories.map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-blue-100">
                      <span className="text-sm text-gray-700">{sub}</span>
                      <div className="flex gap-1">
                        <button className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit size={12} /></button>
                        <button className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}