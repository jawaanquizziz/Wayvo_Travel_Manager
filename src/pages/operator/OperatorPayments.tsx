import React, { useState } from 'react';
import { TrendingUp, CreditCard, AlertCircle, RefreshCw, Bot, Menu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { payments } from '../../data/mockData';

const OperatorPayments: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [filter, setFilter] = useState('all');

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter(p => p.status === 'partial' || p.status === 'pending').reduce((sum, p) => sum + (p.total - p.amount), 0);
  const completed = payments.filter(p => p.status === 'completed').length;

  const filtered = payments.filter(p => filter === 'all' || p.status === filter);

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
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">Payment Reconciliation</h1>
              <p className="text-gray-400 text-xs hidden sm:block">Real-time gateway settlement and pending balances</p>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <MetricCard
              title="Settled Revenue"
              value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
              icon={<TrendingUp size={20} className="text-emerald-600" />}
              color="green"
              trend={{ value: '+18%', up: true }}
            />
            <MetricCard
              title="Pending Balance"
              value={`₹${(pending / 1000).toFixed(0)}K`}
              icon={<AlertCircle size={20} className="text-amber-600" />}
              color="orange"
            />
            <MetricCard
              title="Paid in Full"
              value={`${completed}`}
              icon={<CheckCircle2 size={20} className="text-blue-600" />}
              color="blue"
            />
            <MetricCard
              title="Refund Ratio"
              value="0.0%"
              icon={<ShieldCheck size={20} className="text-brand-red" />}
              color="red"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
            {['all', 'completed', 'partial', 'pending'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  filter === s
                    ? 'bg-brand-red text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-red'
                }`}
              >
                {s === 'all' ? 'All Transactions' : s}
              </button>
            ))}
          </div>

          {/* Payments Table */}
          <div className="card rounded-3xl overflow-hidden border border-gray-100 shadow-card">
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <div className="col-span-2">Booking Ref</div>
              <div className="col-span-4">Traveler / Group</div>
              <div className="col-span-2">Paid Amount</div>
              <div className="col-span-2">Total Value</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="divide-y divide-gray-100">
              {filtered.map(payment => (
                <div
                  key={payment.id}
                  className="p-4 sm:p-5 lg:px-6 lg:py-4 flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-4 items-start lg:items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-2 font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                    {payment.bookingId}
                  </div>

                  <div className="col-span-4">
                    <p className="font-bold text-gray-900 text-sm">{payment.traveler}</p>
                    <p className="text-xs text-gray-400">{payment.trip} • {payment.date}</p>
                  </div>

                  <div className="col-span-2 font-black text-sm text-gray-900">
                    ₹{payment.amount.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-gray-400 block sm:inline sm:ml-1">({payment.method})</span>
                  </div>

                  <div className="col-span-2 text-xs sm:text-sm text-gray-600">
                    ₹{payment.total.toLocaleString('en-IN')}
                  </div>

                  <div className="col-span-1">
                    <StatusBadge status={payment.status} size="sm" />
                  </div>

                  <div className="col-span-1 flex justify-end w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    {payment.status === 'partial' && (
                      <button className="text-xs text-brand-red font-bold hover:underline bg-red-50 px-2.5 py-1 rounded-lg">
                        Remind
                      </button>
                    )}
                  </div>
                </div>
              ))}
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

export default OperatorPayments;
