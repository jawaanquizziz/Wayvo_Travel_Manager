import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Bot, Menu, Plus, MapPin, Calendar, Users, ShieldCheck } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { operatorTours } from '../../data/mockData';

const OperatorTours: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = operatorTours.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === 'all' || t.status === filter;
    return matchSearch && matchStatus;
  });

  const statuses = ['all', 'active', 'confirmed', 'at-risk', 'pending'];

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
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">Tour Fleet Management</h1>
              <p className="text-gray-400 text-xs hidden sm:block">{operatorTours.length} tours under active management</p>
            </div>
          </div>
          <button className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4 flex items-center gap-1.5 shadow-xs">
            <Plus size={15} /> <span>New Tour</span>
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by tour name, booking code, or destination..."
                className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
              />
            </div>
            
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                    filter === s
                      ? 'bg-brand-red text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table & Mobile Card View */}
          <div className="card rounded-3xl overflow-hidden border border-gray-100 shadow-card">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <div className="col-span-4">Tour Name & Code</div>
              <div className="col-span-2">Destination</div>
              <div className="col-span-2">Schedule</div>
              <div className="col-span-1">Travelers</div>
              <div className="col-span-1">Total Value</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-gray-100">
              {filtered.map(tour => (
                <div
                  key={tour.id}
                  className="p-4 sm:p-5 lg:px-6 lg:py-4 flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-4 items-start lg:items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Tour info */}
                  <div className="col-span-4 flex items-center gap-3 w-full lg:w-auto">
                    <img
                      src={tour.image}
                      alt={tour.destination}
                      className="w-12 h-12 rounded-2xl object-cover flex-shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.background = '#e2e8f0'; (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-sm truncate">{tour.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded-md font-bold">{tour.id}</span>
                        <span className="text-xs text-gray-400">Coord: {tour.coordinator}</span>
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="col-span-2 text-xs sm:text-sm text-gray-700 flex items-center gap-1.5">
                    <MapPin size={13} className="text-brand-red flex-shrink-0" />
                    <span>{tour.destination}</span>
                  </div>

                  {/* Dates */}
                  <div className="col-span-2 text-xs text-gray-500 flex items-center gap-1.5">
                    <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                    <span>{tour.startDate} – {tour.endDate}</span>
                  </div>

                  {/* Travelers */}
                  <div className="col-span-1 text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Users size={13} className="text-gray-400" />
                    <span>{tour.travelers} pax</span>
                  </div>

                  {/* Value */}
                  <div className="col-span-1 text-xs sm:text-sm font-black text-gray-900">
                    ₹{(tour.value / 1000).toFixed(0)}K
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <StatusBadge status={tour.status} size="sm" />
                  </div>

                  {/* Action */}
                  <div className="col-span-1 flex items-center justify-between lg:justify-end gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <button
                      onClick={() => navigate('/operator/operations')}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-brand-red hover:text-white text-gray-700 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Eye size={13} /> View Ops
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-gray-400 text-sm">No matching tours found</p>
              </div>
            )}
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

export default OperatorTours;
