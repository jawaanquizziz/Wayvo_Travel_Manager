import React, { useState } from 'react';
import { TrendingUp, CreditCard, AlertCircle, RefreshCw, Bot } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { payments } from '../../data/mockData';

const OperatorPayments: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [filter, setFilter] = useState('all');

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter(p => p.status === 'partial' || p.status === 'pending').reduce((sum, p) => sum + (p.total - p.amount), 0);
  const completed = payments.filter(p => p.status === 'completed').length;

  const filtered = payments.filter(p => filter === 'all' || p.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4">
          <h1 className="text-xl font-black text-gray-900">Payments</h1>
          <p className="text-gray-400 text-sm">Revenue & payment tracking</p>
        </header>

        <main className="p-6 max-w-7xl">
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Revenue"
              value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
              icon={<TrendingUp size={20} className="text-green-600" />}
              color="green"
              trend={{ value: '+18%', up: true }}
            />
            <MetricCard
              title="Pending"
              value={`₹${(pending / 1000).toFixed(0)}K`}
              icon={<AlertCircle size={20} className="text-orange-600" />}
              color="orange"
            />
            <MetricCard
              title="Completed"
              value={`${completed}`}
              icon={<CreditCard size={20} className="text-blue-600" />}
              color="blue"
            />
            <MetricCard
              title="Refunds"
              value="₹0"
              icon={<RefreshCw size={20} className="text-brand-red" />}
              color="red"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-5">
            {['all', 'completed', 'partial', 'pending'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                  filter === s ? 'bg-brand-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red'
                }`}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>

          {/* Payments Table */}
          <div className="card rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-7 gap-4 px-5 py-3 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase">
              <div>Booking ID</div>
              <div className="col-span-2">Traveler / Trip</div>
              <div>Amount</div>
              <div>Total</div>
              <div>Date</div>
              <div>Status</div>
            </div>
            {filtered.map(payment => (
              <div key={payment.id} className="flex flex-col md:grid md:grid-cols-7 gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors items-start md:items-center">
                <div className="font-mono text-xs text-gray-500">{payment.bookingId}</div>
                <div className="col-span-2">
                  <p className="font-bold text-gray-900 text-sm">{payment.traveler}</p>
                  <p className="text-xs text-gray-400">{payment.trip}</p>
                </div>
                <div className="font-bold text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</div>
                <div className="text-sm text-gray-500">₹{payment.total.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-400">{payment.date}</div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={payment.status} size="sm" />
                  {payment.status === 'partial' && (
                    <button className="text-xs text-brand-red font-bold hover:underline">Remind</button>
                  )}
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

export default OperatorPayments;
