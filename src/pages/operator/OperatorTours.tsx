import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Bot } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { operatorTours } from '../../data/mockData';

const OperatorTours: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4 flex items-center gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900">Tour Management</h1>
            <p className="text-gray-400 text-sm">{operatorTours.length} active tours</p>
          </div>
          <div className="ml-auto">
            <button className="btn-primary text-sm py-2.5 px-4">+ New Tour</button>
          </div>
        </header>

        <main className="p-6 max-w-7xl">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tours..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
            <div className="flex gap-2">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    filter === s ? 'bg-brand-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tours Table */}
          <div className="card rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-8 gap-4 px-5 py-3 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wide">
              <div className="col-span-2">Tour</div>
              <div>Destination</div>
              <div>Dates</div>
              <div>Travelers</div>
              <div>Value</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {filtered.map(tour => (
              <div key={tour.id} className="flex flex-col md:grid md:grid-cols-8 gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors items-start md:items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <img
                    src={tour.image}
                    alt={tour.destination}
                    className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.background = '#e2e8f0'; (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{tour.title}</p>
                    <p className="text-xs text-gray-400 font-mono">{tour.id}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">{tour.destination}</div>
                <div className="text-xs text-gray-500">{tour.startDate} – {tour.endDate}</div>
                <div className="text-sm text-gray-700">{tour.travelers} pax</div>
                <div className="text-sm font-semibold text-gray-900">₹{(tour.value / 1000).toFixed(0)}K</div>
                <div><StatusBadge status={tour.status} size="sm" /></div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/operator/operations')}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    title="View Tour"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-gray-400 text-sm">No tours match your search</p>
              </div>
            )}
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

export default OperatorTours;
