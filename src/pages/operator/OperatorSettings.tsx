import React, { useState } from 'react';
import { Bot, Menu, Building, Bell, Users, CreditCard, ShieldCheck, Check } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import AIChat from '../../components/AIChat';

const OperatorSettings: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'team' | 'billing'>('profile');

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
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">Operator Organization Settings</h1>
              <p className="text-gray-400 text-xs hidden sm:block">Manage agency credentials, team permissions, and API integrations</p>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Settings Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
            {[
              { key: 'profile', label: 'Company Profile', icon: Building },
              { key: 'notifications', label: 'Alert Preferences', icon: Bell },
              { key: 'team', label: 'Team Coordinators', icon: Users },
              { key: 'billing', label: 'Plan & Billing', icon: CreditCard },
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-brand-red text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-red'
                  }`}
                >
                  <TabIcon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="card rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-card">
                <h3 className="font-black text-gray-900 text-base mb-4">Agency Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Agency Name', value: 'Wanderlust Tours Pvt. Ltd.' },
                    { label: 'GST Number', value: '29AABCT1332L1ZY' },
                    { label: 'License Number', value: 'TT-2024-MH-00142' },
                    { label: 'Official Email', value: 'alex@wanderlusttours.com' },
                    { label: 'Support Phone', value: '+91 98765 00001' },
                    { label: 'Headquarters', value: 'Raheja Tower, Mumbai 400001' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
                      <input type="text" defaultValue={value} className="input-field" />
                    </div>
                  ))}
                </div>
                <button className="mt-5 btn-primary">Save Agency Details</button>
              </div>

              <div className="card rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-card">
                <h3 className="font-black text-gray-900 text-base mb-4">Account Manager Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', value: 'Alex Fernandez' },
                    { label: 'Role', value: 'Head of Operations' },
                    { label: 'Direct Email', value: 'alex@wanderlusttours.com' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
                      <input type="text" defaultValue={value} className="input-field" />
                    </div>
                  ))}
                </div>
                <button className="mt-5 btn-primary">Update Profile</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-card">
              <h3 className="font-black text-gray-900 text-base mb-4">Telemetry & Risk Subscriptions</h3>
              <div className="divide-y divide-gray-100">
                {[
                  { label: 'Flight Delay Alarms', desc: 'Instant push alerts when traveler flights are delayed by >30 mins' },
                  { label: 'Hotel Capacity Alerts', desc: 'Overbooking warnings and alternative room holds' },
                  { label: 'Gateway Settlement Updates', desc: 'Real-time UPI and card payment confirmations' },
                  { label: 'AI Adaptive Actions', desc: 'Auto-suggestion prompts when itinerary disruptions are calculated' },
                  { label: 'Traveler Change Inquiries', desc: 'Direct messages sent from traveler app concierge' },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{n.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
                    </div>
                    <div className="w-11 h-6 bg-brand-red rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-xs"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="card rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-black text-gray-900 text-base">Ground Coordinators</h3>
                <button className="btn-primary text-xs py-2 px-3">+ Invite Staff</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Alex Fernandez', role: 'Operations Manager', email: 'alex@wanderlust.com', active: true },
                  { name: 'Rahul Singh', role: 'Kashmir Coordinator', email: 'rahul@wanderlust.com', active: true },
                  { name: 'Priya Nair', role: 'Kerala Coordinator', email: 'priya@wanderlust.com', active: true },
                  { name: 'Suresh Menon', role: 'Goa Coordinator', email: 'suresh@wanderlust.com', active: false },
                ].map(member => (
                  <div key={member.name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-9 h-9 bg-brand-red text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.role} • {member.email}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${member.active ? 'bg-emerald-400' : 'bg-gray-300'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="card rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-brand-red via-red-600 to-rose-700 text-white shadow-red">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Enterprise Plan</span>
                    <h3 className="font-black text-2xl sm:text-3xl mt-0.5">Professional Agency Tier</h3>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">₹4,999/month • Billed Annually • Unlimited AI Adaptive Runs</p>
                  </div>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-black">Active</span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20 text-center">
                  <div><p className="font-black text-xl">50</p><p className="text-white/70 text-xs">Tours / Mo</p></div>
                  <div><p className="font-black text-xl">500</p><p className="text-white/70 text-xs">Travelers</p></div>
                  <div><p className="font-black text-xl">∞</p><p className="text-white/70 text-xs">AI Operations</p></div>
                </div>
              </div>
            </div>
          )}
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

export default OperatorSettings;
