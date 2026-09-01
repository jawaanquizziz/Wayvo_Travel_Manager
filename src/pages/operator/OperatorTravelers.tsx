import React, { useState } from 'react';
import { Search, Eye, Phone, Mail, Bot, X, Menu, Users, MapPin, ShieldCheck } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { operatorTravelers } from '../../data/mockData';

const OperatorTravelers: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">Traveler Manifest</h1>
              <p className="text-gray-400 text-xs hidden sm:block">{operatorTravelers.length} registered group travelers</p>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="relative max-w-md mb-6">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by traveler name, email, or destination..."
              className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red shadow-xs"
            />
          </div>

          <div className="card rounded-3xl overflow-hidden border border-gray-100 shadow-card">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <div className="col-span-4">Traveler Name</div>
              <div className="col-span-3">Assigned Tour</div>
              <div className="col-span-2">Destination</div>
              <div className="col-span-1">Preference</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Details</div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-gray-100">
              {filtered.map(traveler => (
                <div
                  key={traveler.id}
                  className="p-4 sm:p-5 lg:px-6 lg:py-4 flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-4 items-start lg:items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-4 flex items-center gap-3 w-full lg:w-auto">
                    <div className="w-10 h-10 bg-brand-red text-white rounded-2xl flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
                      {traveler.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-sm truncate">{traveler.name}</p>
                      <p className="text-xs text-gray-400 truncate">{traveler.email}</p>
                    </div>
                  </div>

                  <div className="col-span-3 text-xs sm:text-sm text-gray-700">
                    <span className="font-semibold text-gray-800">{traveler.trip}</span>
                    <span className="text-[11px] text-gray-400 block font-mono">({traveler.tripId})</span>
                  </div>

                  <div className="col-span-2 text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                    <MapPin size={13} className="text-brand-red flex-shrink-0" />
                    <span>{traveler.destination}</span>
                  </div>

                  <div className="col-span-1">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {traveler.preference}
                    </span>
                  </div>

                  <div className="col-span-1">
                    <StatusBadge status={traveler.status} size="sm" />
                  </div>

                  <div className="col-span-1 flex justify-end w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <button
                      onClick={() => setSelectedTraveler(traveler)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-brand-red hover:text-white text-gray-700 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Eye size={13} /> View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Traveler Detail Modal */}
      {selectedTraveler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedTraveler(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-up overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center shadow-red">
                    <span className="text-white text-xl font-black">{selectedTraveler.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-white font-black text-lg">{selectedTraveler.name}</h2>
                    <p className="text-white/70 text-xs">{selectedTraveler.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTraveler(null)} className="p-2 hover:bg-white/10 rounded-xl text-white/70 hover:text-white">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {[
                { label: 'Assigned Tour', value: `${selectedTraveler.trip} (${selectedTraveler.tripId})` },
                { label: 'Destination', value: selectedTraveler.destination },
                { label: 'Phone', value: selectedTraveler.phone },
                { label: 'Date of Birth', value: selectedTraveler.dob },
                { label: 'Passport / ID', value: selectedTraveler.passport },
                { label: 'Style Match', value: selectedTraveler.preference },
                { label: 'Budget Target', value: `₹${selectedTraveler.budget.toLocaleString('en-IN')}` },
                { label: 'Payment Status', value: selectedTraveler.payments },
                { label: 'Diet & Requests', value: selectedTraveler.requirements },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0 text-xs sm:text-sm">
                  <span className="text-gray-400 font-medium w-32 flex-shrink-0">{label}</span>
                  <span className="font-bold text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-100 flex gap-2.5 bg-gray-50">
              <a href={`mailto:${selectedTraveler.email}`} className="flex-1 btn-secondary justify-center py-2.5 text-xs font-bold">
                <Mail size={14} /> Send Email
              </a>
              <button className="flex-1 btn-primary justify-center py-2.5 text-xs font-bold">
                <Phone size={14} /> Call Coordinator
              </button>
            </div>
          </div>
        </div>
      )}

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

export default OperatorTravelers;
