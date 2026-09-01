import React, { useState } from 'react';
import { Star, Phone, Bot } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { vendors } from '../../data/mockData';

const categories = ['all', 'hotel', 'transport', 'activities', 'restaurant'];

const OperatorVendors: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [category, setCategory] = useState('all');

  const filtered = vendors.filter(v => category === 'all' || v.category === category);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Vendor Management</h1>
            <p className="text-gray-400 text-sm">{vendors.length} partner vendors</p>
          </div>
          <button className="btn-primary text-sm py-2.5 px-4">+ Add Vendor</button>
        </header>

        <main className="p-6 max-w-7xl">
          {/* Category Filter */}
          <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  category === cat ? 'bg-brand-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red'
                }`}
              >
                {cat === 'all' ? 'All Vendors' : cat}
              </button>
            ))}
          </div>

          {/* Vendor Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(vendor => (
              <div key={vendor.id} className="card-hover rounded-2xl overflow-hidden group cursor-pointer">
                <div className="h-36 relative overflow-hidden">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="destination-image"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.parentElement!.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                      t.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={vendor.status} size="sm" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full capitalize">
                      {vendor.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-sm">{vendor.name}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-gray-800">{vendor.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">📍 {vendor.location}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-brand-red font-bold text-sm">{vendor.price}</p>
                      <p className="text-xs text-gray-400">{vendor.activeBookings} active bookings</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                      <Phone size={12} /> Contact
                    </button>
                    <button className="flex-1 bg-brand-red text-white py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {!showAI && (
        <button onClick={() => setShowAI(true)} className="fixed bottom-6 right-6 bg-brand-red text-white px-5 py-3.5 rounded-full shadow-red-lg font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 z-40">
          <Bot size={18} />WAYVO AI<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}
      {showAI && <AIChat onClose={() => setShowAI(false)} variant="operator" />}
    </div>
  );
};

export default OperatorVendors;
