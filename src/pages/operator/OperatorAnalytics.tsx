import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Sidebar from '../../components/Sidebar';
import AIChat from '../../components/AIChat';
import { analyticsData } from '../../data/mockData';
import { Bot, TrendingUp, Menu, Calendar, Globe, Compass, ShieldCheck } from 'lucide-react';

const COLORS = ['#E8173A', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'];

const OperatorAnalytics: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

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
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">Analytics & Intelligence</h1>
              <p className="text-gray-400 text-xs hidden sm:block">Performance metrics, revenue curves, and traveler cohort insights</p>
            </div>
          </div>
          
          <div className="flex gap-1.5">
            {(['month', 'quarter', 'year'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  period === p ? 'bg-brand-red text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p === 'month' ? 'This Month' : p === 'quarter' ? 'Quarter' : 'This Year'}
              </button>
            ))}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { label: 'Total Bookings', value: '125', change: '+14%', up: true },
              { label: 'Gross Revenue', value: '₹45.0L', change: '+18%', up: true },
              { label: 'Avg Group Value', value: '₹59.2K', change: '+8%', up: true },
              { label: 'Cancellation Rate', value: '1.8%', change: '-0.5%', up: true },
            ].map(m => (
              <div key={m.label} className="card rounded-3xl p-5 border border-gray-100 shadow-card">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-xl sm:text-2xl font-black text-gray-900">{m.value}</p>
                <div className={`text-xs font-bold mt-1.5 flex items-center gap-1 ${m.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  <TrendingUp size={13} />
                  <span>{m.change} vs baseline</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bookings Histogram */}
            <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
              <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-brand-red" />
                <span>Monthly Booking Volume</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.bookingsOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px' }}
                      formatter={(v: any) => [v, 'Bookings']}
                    />
                    <Bar dataKey="bookings" fill="#E8173A" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Trend Line */}
            <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
              <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-brand-red" />
                <span>Gross Revenue Trajectory (₹)</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.bookingsOverTime} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px' }}
                      formatter={(v: any) => [`₹${(v / 100000).toFixed(2)}L`, 'Revenue']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#E8173A" strokeWidth={3} dot={{ fill: '#E8173A', r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Destination Distribution Pie */}
            <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
              <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
                <Globe size={16} className="text-brand-red" />
                <span>Destination Share</span>
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-1/2 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={analyticsData.destinations} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                        {analyticsData.destinations.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => [`${v}%`, 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-2">
                  {analyticsData.destinations.map((d, idx) => (
                    <div key={d.name} className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: COLORS[idx % COLORS.length] }}></div>
                        <span className="text-gray-700 font-medium">{d.name}</span>
                      </div>
                      <span className="font-black text-gray-900">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Traveler Preferences Breakdown */}
            <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
              <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
                <Compass size={16} className="text-brand-red" />
                <span>Traveler Rhythm Preferences</span>
              </h3>
              <div className="space-y-3.5">
                {analyticsData.travelerStyles.map((s, idx) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-800 font-semibold">{s.name}</span>
                      <span className="font-black text-gray-900">{s.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${s.value}%`, background: COLORS[idx % COLORS.length] }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default OperatorAnalytics;
