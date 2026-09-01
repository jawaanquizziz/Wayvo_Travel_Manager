import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Sidebar from '../../components/Sidebar';
import AIChat from '../../components/AIChat';
import { analyticsData } from '../../data/mockData';
import { Bot, TrendingUp } from 'lucide-react';

const COLORS = ['#E8173A', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'];

const OperatorAnalytics: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Analytics</h1>
            <p className="text-gray-400 text-sm">Performance insights & trends</p>
          </div>
          <div className="flex gap-2">
            {(['month', 'quarter', 'year'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                  period === p ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p === 'month' ? 'This Month' : p === 'quarter' ? 'Quarter' : 'This Year'}
              </button>
            ))}
          </div>
        </header>

        <main className="p-6 max-w-7xl">
          {/* Summary Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Bookings', value: '125', change: '+14%', up: true },
              { label: 'Revenue', value: '₹45L', change: '+18%', up: true },
              { label: 'Avg Trip Value', value: '₹59K', change: '+8%', up: true },
              { label: 'Cancellation Rate', value: '2.1%', change: '-0.5%', up: true },
            ].map(m => (
              <div key={m.label} className="card rounded-2xl">
                <p className="text-xs text-gray-400 font-medium mb-1">{m.label}</p>
                <p className="text-2xl font-black text-gray-900">{m.value}</p>
                <div className={`text-xs font-semibold mt-1 flex items-center gap-1 ${m.up ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp size={12} />
                  {m.change} vs last period
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Bookings Over Time */}
            <div className="card rounded-2xl col-span-2 lg:col-span-1">
              <h3 className="font-bold text-gray-900 mb-4">Bookings Over Time</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={analyticsData.bookingsOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    formatter={(v: any) => [v, 'Bookings']}
                  />
                  <Bar dataKey="bookings" fill="#E8173A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Trend */}
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Revenue Trend (₹)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={analyticsData.bookingsOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    formatter={(v: any) => [`₹${(v / 100000).toFixed(2)}L`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#E8173A" strokeWidth={3} dot={{ fill: '#E8173A', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Popular Destinations */}
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Popular Destinations</h3>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={160}>
                  <PieChart>
                    <Pie data={analyticsData.destinations} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                      {analyticsData.destinations.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`${v}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {analyticsData.destinations.map((d, idx) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: COLORS[idx % COLORS.length] }}></div>
                        <span className="text-sm text-gray-600">{d.name}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Traveler Styles */}
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Traveler Preferences</h3>
              <div className="space-y-3">
                {analyticsData.travelerStyles.map((s, idx) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{s.name}</span>
                      <span className="font-bold text-gray-900">{s.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
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
        <button onClick={() => setShowAI(true)} className="fixed bottom-6 right-6 bg-brand-red text-white px-5 py-3.5 rounded-full shadow-red-lg font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 z-40">
          <Bot size={18} />WAYVO AI<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}
      {showAI && <AIChat onClose={() => setShowAI(false)} variant="operator" />}
    </div>
  );
};

export default OperatorAnalytics;
