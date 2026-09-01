import React, { useState } from 'react';
import { Search, Eye, Phone, Mail, Bot, X } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { operatorTravelers } from '../../data/mockData';

const OperatorTravelers: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTraveler, setSelectedTraveler] = useState<typeof operatorTravelers[0] | null>(null);

  const filtered = operatorTravelers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.trip.toLowerCase().includes(search.toLowerCase()) ||
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4">
          <h1 className="text-xl font-black text-gray-900">Traveler Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">{operatorTravelers.length} active travelers</p>
        </header>

        <main className="p-6 max-w-7xl">
          <div className="relative max-w-sm mb-5">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search travelers..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            />
          </div>

          <div className="card rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-7 gap-4 px-5 py-3 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase">
              <div className="col-span-2">Traveler</div>
              <div>Trip</div>
              <div>Destination</div>
              <div>Preference</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            {filtered.map(traveler => (
              <div key={traveler.id} className="flex flex-col md:grid md:grid-cols-7 gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors items-start md:items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{traveler.avatar}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{traveler.name}</p>
                    <p className="text-xs text-gray-400">{traveler.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">{traveler.trip}</div>
                <div className="text-sm text-gray-600">{traveler.destination}</div>
                <div className="text-sm">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">{traveler.preference}</span>
                </div>
                <StatusBadge status={traveler.status} size="sm" />
                <button
                  onClick={() => setSelectedTraveler(traveler)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-brand-red hover:text-white text-gray-600 transition-colors"
                >
                  <Eye size={14} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Traveler Detail Modal */}
      {selectedTraveler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedTraveler(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-up overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center">
                    <span className="text-white text-xl font-black">{selectedTraveler.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-white font-black text-lg">{selectedTraveler.name}</h2>
                    <StatusBadge status={selectedTraveler.status} />
                  </div>
                </div>
                <button onClick={() => setSelectedTraveler(null)} className="p-2 hover:bg-white/10 rounded-xl">
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {[
                { label: 'Trip', value: `${selectedTraveler.trip} (${selectedTraveler.tripId})` },
                { label: 'Destination', value: selectedTraveler.destination },
                { label: 'Email', value: selectedTraveler.email },
                { label: 'Phone', value: selectedTraveler.phone },
                { label: 'Date of Birth', value: selectedTraveler.dob },
                { label: 'Passport', value: selectedTraveler.passport },
                { label: 'Preference', value: selectedTraveler.preference },
                { label: 'Budget', value: `₹${selectedTraveler.budget.toLocaleString('en-IN')}` },
                { label: 'Payments', value: selectedTraveler.payments },
                { label: 'Special Needs', value: selectedTraveler.requirements },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-400 w-28 flex-shrink-0">{label}</span>
                  <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-3">
              <a href={`mailto:${selectedTraveler.email}`} className="flex-1 btn-secondary justify-center py-2.5 text-sm">
                <Mail size={14} /> Email
              </a>
              <button className="flex-1 btn-primary justify-center py-2.5 text-sm">
                <Phone size={14} /> Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {!showAI && (
        <button onClick={() => setShowAI(true)} className="fixed bottom-6 right-6 bg-brand-red text-white px-5 py-3.5 rounded-full shadow-red-lg font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 z-40">
          <Bot size={18} />WAYVO AI<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}
      {showAI && <AIChat onClose={() => setShowAI(false)} variant="operator" />}
    </div>
  );
};

export default OperatorTravelers;
