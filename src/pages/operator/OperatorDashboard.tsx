import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, Search, MapPin, Calendar, Users, TrendingUp,
  AlertTriangle, CheckCircle, Clock, Zap, BarChart2, Bot
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { operatorTours, analyticsData, notifications } from '../../data/mockData';

const OperatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const atRiskTours = operatorTours.filter(t => t.status === 'at-risk');
  const todayOps = [
    { time: '09:30', action: 'Airport Pickup', location: 'Srinagar Airport', travelers: 4, tour: 'WV204', type: 'transport' },
    { time: '11:00', action: 'Hotel Check-in', location: 'Pahalgam Hill Resort', travelers: 8, tour: 'WV202', type: 'hotel' },
    { time: '14:00', action: 'Gondola Activity', location: 'Gulmarg Cable Car', travelers: 4, tour: 'WV204', type: 'activity' },
    { time: '16:30', action: 'Backwaters Houseboat', location: 'Alleppey, Kerala', travelers: 2, tour: 'WV203', type: 'activity' },
    { time: '19:00', action: 'Group Dinner', location: 'Rajput Heritage Haveli', travelers: 12, tour: 'WV202', type: 'food' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4 flex items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours, travelers, vendors..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
              <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AX</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">Alex</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5"
            >
              Switch to Traveler
            </button>
          </div>
        </header>

        <main className="p-6 max-w-7xl">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-gray-900">Good morning, Alex 👋</h1>
            <p className="text-gray-500 mt-1">Here's what's happening across your tours today.</p>
          </div>

          {/* Alert Banner */}
          {atRiskTours.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-900">{atRiskTours.length} tours require immediate attention</p>
                <p className="text-red-600 text-sm">{atRiskTours.map(t => t.id).join(', ')} — action needed</p>
              </div>
              <button
                onClick={() => navigate('/operator/operations')}
                className="bg-brand-red text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors flex-shrink-0"
              >
                Review Now
              </button>
            </div>
          )}

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Active Tours"
              value="24"
              subtitle="Across 12 destinations"
              icon={<MapPin size={20} className="text-brand-red" />}
              trend={{ value: '+3', up: true }}
              color="red"
            />
            <MetricCard
              title="Travelers"
              value="186"
              subtitle="Currently on tour"
              icon={<Users size={20} className="text-blue-600" />}
              trend={{ value: '+12', up: true }}
              color="blue"
            />
            <MetricCard
              title="Revenue (Month)"
              value="₹18.6L"
              subtitle="Target: ₹20L"
              icon={<TrendingUp size={20} className="text-green-600" />}
              trend={{ value: '+18%', up: true }}
              color="green"
            />
            <MetricCard
              title="Bookings"
              value="312"
              subtitle="Year to date"
              icon={<CheckCircle size={20} className="text-orange-600" />}
              trend={{ value: '+24', up: true }}
              color="orange"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Operations */}
            <div className="lg:col-span-2 space-y-4">
              <div className="card rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-black text-gray-900 text-lg">Today's Operations</h2>
                    <p className="text-gray-400 text-sm">{todayOps.length} scheduled actions</p>
                  </div>
                  <button
                    onClick={() => navigate('/operator/operations')}
                    className="text-brand-red text-sm font-bold hover:underline"
                  >
                    Full View →
                  </button>
                </div>

                <div className="space-y-3">
                  {todayOps.map((op, idx) => {
                    const statusColors = ['at-risk', 'confirmed', 'confirmed', 'confirmed', 'confirmed'];
                    return (
                      <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="text-center flex-shrink-0 w-12">
                          <p className="text-brand-red font-black text-sm">{op.time}</p>
                        </div>
                        <div className="w-px h-10 bg-gray-100 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{op.action}</p>
                          <p className="text-gray-400 text-xs">{op.location} · {op.travelers} travelers</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400 font-mono">{op.tour}</span>
                          <StatusBadge status={statusColors[idx]} size="sm" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* At Risk Tours */}
              <div className="card rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} className="text-brand-red" />
                  <h2 className="font-black text-gray-900 text-lg">Attention Required</h2>
                </div>

                {atRiskTours.map(tour => (
                  <div key={tour.id} className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-3 last:mb-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status="at-risk" size="sm" />
                          <span className="text-xs font-mono text-gray-500">{tour.id}</span>
                        </div>
                        <h3 className="font-bold text-gray-900">{tour.title}</h3>
                        <p className="text-xs text-red-600 mt-1">⚠️ {tour.alert}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>{tour.travelers} travelers</p>
                        <p className="font-bold text-gray-800">₹{(tour.value / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate('/operator/operations')}
                        className="flex-1 bg-brand-red text-white py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <Zap size={12} /> Apply WAYVO Fix
                      </button>
                      <button className="px-4 bg-white border border-gray-200 text-gray-600 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-4">
              {/* Active Tours Summary */}
              <div className="card rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Active Tours</h3>
                  <button onClick={() => navigate('/operator/tours')} className="text-brand-red text-xs font-bold">All →</button>
                </div>
                <div className="space-y-3">
                  {operatorTours.map(tour => (
                    <div key={tour.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
                      onClick={() => navigate('/operator/tours')}>
                      <img
                        src={tour.image}
                        alt={tour.destination}
                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.background = '#e2e8f0'; (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{tour.title}</p>
                        <p className="text-xs text-gray-400">{tour.travelers} travelers · {tour.startDate}</p>
                      </div>
                      <StatusBadge status={tour.status} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">This Month</h3>
                <div className="space-y-3">
                  {[
                    { label: 'New Bookings', value: '28', icon: '📅' },
                    { label: 'Completed Tours', value: '12', icon: '✅' },
                    { label: 'Avg. Trip Value', value: '₹59K', icon: '💰' },
                    { label: 'Satisfaction', value: '4.8/5', icon: '⭐' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="text-lg">{s.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{s.label}</p>
                      </div>
                      <p className="font-bold text-gray-900">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Chat Button */}
      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-6 right-6 bg-brand-red text-white px-5 py-3.5 rounded-full shadow-red-lg font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 z-40"
        >
          <Bot size={18} />
          WAYVO AI
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}
      {showAI && <AIChat onClose={() => setShowAI(false)} variant="operator" />}
    </div>
  );
};

export default OperatorDashboard;
