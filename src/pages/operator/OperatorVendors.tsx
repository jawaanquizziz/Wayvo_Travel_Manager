import React, { useState } from 'react';
import { Star, Phone, Bot, Menu, Plus, MapPin, Building, Truck, Camera, Utensils, ShieldCheck } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { vendors } from '../../data/mockData';

const categories = ['all', 'hotel', 'transport', 'activities', 'restaurant'];

const getCategoryIcon = (cat: string) => {
  switch (cat?.toLowerCase()) {
    case 'hotel':
      return Building;
    case 'transport':
      return Truck;
    case 'restaurant':
      return Utensils;
    default:
      return Camera;
  }
};

const OperatorVendors: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [category, setCategory] = useState('all');

  const filtered = vendors.filter(v => category === 'all' || v.category === category);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className={`flex-1 transition-all duration-300 min-w-0 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Open Sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">Vendor Directory</h1>
              <p className="text-gray-400 text-xs hidden sm:block">{vendors.length} partner hotels, drivers & activity operators</p>
            </div>
          </div>
          <button className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4 flex items-center gap-1.5 shadow-xs">
            <Plus size={15} /> <span>Add Vendor</span>
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Category Filter Pills */}
          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  category === cat
                    ? 'bg-brand-red text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {cat === 'all' ? 'All Partners' : `${cat}s`}
              </button>
            ))}
          </div>

          {/* Vendor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(vendor => {
              const CatIcon = getCategoryIcon(vendor.category);
              return (
                <div key={vendor.id} className="card-hover rounded-3xl overflow-hidden group cursor-pointer border border-gray-100 bg-white shadow-card">
                  <div className="h-40 relative overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={vendor.status} size="sm" />
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="bg-black/40 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CatIcon size={12} />
                        <span className="capitalize">{vendor.type}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-lg text-xs font-bold">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span>{vendor.rating}</span>
                      </div>
                      <span className="text-xs font-bold bg-brand-red px-2.5 py-0.5 rounded-md shadow-xs">
                        {vendor.activeBookings} active tours
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight mb-1">{vendor.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <MapPin size={12} className="text-brand-red flex-shrink-0" />
                      <span>{vendor.location}</span>
                    </p>
                    
                    <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-400 block font-medium">Negotiated Rate</span>
                        <span className="text-brand-red font-black text-sm sm:text-base">{vendor.price}</span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono">{vendor.contact}</span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`tel:${vendor.contact}`}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Phone size={12} /> Contact
                      </a>
                      <button className="flex-1 bg-brand-red text-white py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shadow-xs">
                        Reserve Slot
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-6 right-6 bg-brand-red text-white px-5 py-3.5 rounded-full shadow-red-lg font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 z-40"
        >
          <Bot size={18} />
          <span>WAYVO AI</span>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </button>
      )}

      {showAI && <AIChat onClose={() => setShowAI(false)} variant="operator" />}
    </div>
  );
};

export default OperatorVendors;
