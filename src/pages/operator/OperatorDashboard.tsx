import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Search, MapPin, Users, TrendingUp,
  AlertTriangle, CheckCircle2, Clock, Zap, Bot,
  Menu, ShieldCheck, Car, Hotel, Camera, Utensils,
  ArrowRight, Calendar, Sparkles
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import NotificationPanel from '../../components/NotificationPanel';
import { operatorTours } from '../../data/mockData';

const OperatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const atRiskTours = operatorTours.filter(t => t.status === 'at-risk');
  const todayOps = [
    { time: '09:30', action: 'Airport Pickup', location: 'Srinagar Airport', travelers: 4, tour: 'WV204', icon: Car },
    { time: '11:00', action: 'Hotel Check-in', location: 'Pahalgam Hill Resort', travelers: 8, tour: 'WV202', icon: Hotel },
    { time: '14:00', action: 'Gondola Activity', location: 'Gulmarg Cable Car', travelers: 4, tour: 'WV204', icon: Camera },
    { time: '16:30', action: 'Houseboat Check-in', location: 'Alleppey, Kerala', travelers: 2, tour: 'WV203', icon: Hotel },
    { time: '19:00', action: 'Group Dinner', location: 'Rajput Heritage Haveli', travelers: 12, tour: 'WV202', icon: Utensils },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Responsive Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 min-w-0 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Open Sidebar"
            >
              <Menu size={22} />
            </button>

            <div className="relative hidden sm:block w-72 lg:w-96">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours, travelers, vendors..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
            >
              <Bell size={19} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 border border-gray-200">
              <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-black">AX</span>
              </div>
              <span className="text-xs font-bold text-gray-800 hidden sm:block">Alex F.</span>
            </div>

            <button
              onClick={() => navigate('/traveler')}
              className="text-xs text-brand-red font-bold hover:bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 transition-colors hidden sm:block"
            >
              Traveler Mode
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Greeting Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck size={14} />
              <span>Tour Operations Mission Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Good morning, Alex
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Here is the real-time operational status across active group tours.</p>
          </div>

          {/* Critical Risk Alert Banner */}
          {atRiskTours.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs">
                  <AlertTriangle size={20} className="text-white animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-red-900 text-sm sm:text-base">{atRiskTours.length} tours require operational intervention</p>
                  <p className="text-red-700 text-xs mt-0.5">{atRiskTours.map(t => `${t.id} (${t.title})`).join(' • ')} — Disruption detected</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/operator/operations')}
                className="w-full sm:w-auto bg-brand-red text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Zap size={14} />
                Resolve in Control Center
              </button>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <MetricCard
              title="Active Tours"
              value="24"
              subtitle="Across 12 destinations"
              icon={<MapPin size={20} className="text-brand-red" />}
              trend={{ value: '+3', up: true }}
              color="red"
            />
            <MetricCard
              title="Total Travelers"
              value="186"
              subtitle="Currently on tour"
              icon={<Users size={20} className="text-blue-600" />}
              trend={{ value: '+12', up: true }}
              color="blue"
            />
            <MetricCard
              title="Monthly Revenue"
              value="₹18.6L"
              subtitle="Target: ₹20L"
              icon={<TrendingUp size={20} className="text-emerald-600" />}
              trend={{ value: '+18%', up: true }}
              color="green"
            />
            <MetricCard
              title="Bookings YTD"
              value="312"
              subtitle="98% fulfillment"
              icon={<CheckCircle2 size={20} className="text-amber-600" />}
              trend={{ value: '+24', up: true }}
              color="orange"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Today's Operations Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-black text-gray-900 text-base sm:text-lg">Today's Operations Timeline</h2>
                    <p className="text-gray-400 text-xs">{todayOps.length} ground actions scheduled today</p>
                  </div>
                  <button
                    onClick={() => navigate('/operator/operations')}
                    className="text-brand-red text-xs sm:text-sm font-bold hover:underline flex items-center gap-1"
                  >
                    Control Center <ArrowRight size={13} />
                  </button>
                </div>

                <div className="space-y-3">
                  {todayOps.map((op, idx) => {
                    const OpIcon = op.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100 bg-white">
                        <div className="text-center flex-shrink-0 w-14">
                          <p className="text-brand-red font-black text-xs sm:text-sm">{op.time}</p>
                          <span className="text-[10px] text-gray-400 font-medium">IST</span>
                        </div>
                        
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0">
                          <OpIcon size={16} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">{op.action}</p>
                          <p className="text-gray-400 text-[11px] truncate">{op.location} • {op.travelers} pax</p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] text-gray-500 font-mono hidden sm:block bg-gray-100 px-2 py-0.5 rounded-lg">{op.tour}</span>
                          <StatusBadge status={idx === 0 ? 'at-risk' : 'confirmed'} size="sm" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* At Risk Group Cards */}
              <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} className="text-brand-red" />
                  <h2 className="font-black text-gray-900 text-base sm:text-lg">Attention Required</h2>
                </div>

                {atRiskTours.map(tour => (
                  <div key={tour.id} className="bg-red-50/70 border border-red-200 rounded-2xl p-4 sm:p-5 mb-3 last:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status="at-risk" size="sm" />
                          <span className="text-xs font-mono font-bold text-gray-700 bg-white px-2 py-0.5 rounded-md">{tour.id}</span>
                        </div>
                        <h3 className="font-black text-gray-900 text-sm sm:text-base">{tour.title}</h3>
                        <p className="text-xs text-red-700 font-medium mt-1">⚠️ {tour.alert}</p>
                      </div>
                      <div className="text-left sm:text-right text-xs text-gray-500">
                        <p>{tour.travelers} travelers • {tour.coordinator}</p>
                        <p className="font-black text-gray-900 text-sm mt-0.5">₹{(tour.value / 1000).toFixed(0)}K Total</p>
                      </div>
                    </div>

                    {/* WAYVO Intelligence Details */}
                    <div className="bg-white rounded-xl p-3 mb-3 border border-red-100">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles size={10} className="text-brand-red" />
                        WAYVO Detected
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className="text-sm font-black text-gray-900">4</p>
                          <p className="text-[10px] text-gray-500">Dependencies</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-black text-gray-900">2</p>
                          <p className="text-[10px] text-gray-500">Conflicts</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-black text-emerald-600">₹0</p>
                          <p className="text-[10px] text-gray-500">Est. Cost</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate('/operator/operations')}
                        className="flex-1 bg-brand-red text-white py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Zap size={13} /> Resolve with AI
                      </button>
                      <button
                        onClick={() => navigate('/operator/tours')}
                        className="px-4 bg-white border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold hover:bg-gray-50"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Active Tours & Quick Stats */}
            <div className="space-y-6">
              {/* Active Tours Quick Summary */}
              <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-gray-900 text-sm sm:text-base">Active Tours</h3>
                  <button onClick={() => navigate('/operator/tours')} className="text-brand-red text-xs font-bold hover:underline">All Tours →</button>
                </div>
                <div className="space-y-3">
                  {operatorTours.map(tour => (
                    <div
                      key={tour.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2.5 rounded-2xl transition-colors border border-gray-100"
                      onClick={() => navigate('/operator/tours')}
                    >
                      <img
                        src={tour.image}
                        alt={tour.destination}
                        className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.background = '#e2e8f0'; (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">{tour.title}</p>
                        <p className="text-[11px] text-gray-400">{tour.travelers} pax • {tour.startDate}</p>
                      </div>
                      <StatusBadge status={tour.status} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Overview Card with Lucide Icons */}
              <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
                <h3 className="font-black text-gray-900 text-sm sm:text-base mb-4">Monthly Performance</h3>
                <div className="space-y-3">
                  {[
                    { label: 'New Bookings', value: '28', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Completed Tours', value: '12', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Avg. Trip Value', value: '₹59K', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
                    { label: 'Traveler Rating', value: '4.8/5', icon: ShieldCheck, color: 'text-brand-red bg-red-50' },
                  ].map(s => {
                    const SIcon = s.icon;
                    return (
                      <div key={s.label} className="flex items-center gap-3 p-2 rounded-xl">
                        <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                          <SIcon size={15} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                        </div>
                        <p className="font-black text-gray-900 text-sm">{s.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating AI Operator Assistant Button */}
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
      {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
    </div>
  );
};

export default OperatorDashboard;
