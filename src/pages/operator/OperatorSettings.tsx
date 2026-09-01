import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import AIChat from '../../components/AIChat';

const OperatorSettings: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'team' | 'billing'>('profile');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4">
          <h1 className="text-xl font-black text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm">Manage your operator account</p>
        </header>

        <main className="p-6 max-w-3xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
            {[
              { key: 'profile', label: 'Company Profile' },
              { key: 'notifications', label: 'Notifications' },
              { key: 'team', label: 'Team' },
              { key: 'billing', label: 'Billing' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key ? 'bg-brand-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="card rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Company Information</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Company Name', value: 'Wanderlust Tours Pvt. Ltd.' },
                    { label: 'GST Number', value: '29AABCT1332L1ZY' },
                    { label: 'License Number', value: 'TT-2024-MH-00142' },
                    { label: 'Contact Email', value: 'alex@wanderlusttours.com' },
                    { label: 'Support Phone', value: '+91 98765 00001' },
                    { label: 'Address', value: 'Level 4, Raheja Tower, Mumbai 400001' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
                      <input type="text" defaultValue={value} className="input-field" />
                    </div>
                  ))}
                </div>
                <button className="mt-4 btn-primary">Save Company Profile</button>
              </div>

              <div className="card rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Operator Profile — Alex</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: 'Alex Fernandez' },
                    { label: 'Role', value: 'Operations Manager' },
                    { label: 'Email', value: 'alex@wanderlusttours.com' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
                      <input type="text" defaultValue={value} className="input-field" />
                    </div>
                  ))}
                </div>
                <button className="mt-4 btn-primary">Update Profile</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Flight Delays', desc: 'Real-time alerts for traveler flights' },
                  { label: 'Hotel Issues', desc: 'Overbookings, cancellations, availability' },
                  { label: 'Payment Alerts', desc: 'New payments and pending balances' },
                  { label: 'AI Risk Alerts', desc: 'When WAYVO detects tour conflicts' },
                  { label: 'Traveler Requests', desc: 'Changes requested by travelers' },
                  { label: 'Daily Summary', desc: 'End-of-day operations digest' },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{n.label}</p>
                      <p className="text-xs text-gray-400">{n.desc}</p>
                    </div>
                    <div className="w-11 h-6 bg-brand-red rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="card rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Team Members</h3>
                  <button className="btn-primary text-xs py-2 px-3">+ Invite</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Alex Fernandez', role: 'Operations Manager', email: 'alex@...', active: true },
                    { name: 'Rahul Singh', role: 'Tour Coordinator', email: 'rahul@...', active: true },
                    { name: 'Priya Nair', role: 'Tour Coordinator', email: 'priya@...', active: true },
                    { name: 'Suresh Menon', role: 'Coordinator', email: 'suresh@...', active: false },
                  ].map(member => (
                    <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <div className="w-9 h-9 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role} · {member.email}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${member.active ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="card rounded-2xl bg-gradient-to-r from-brand-red to-red-700 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/70 text-sm">Current Plan</p>
                    <h3 className="font-black text-2xl">Professional</h3>
                    <p className="text-white/70 text-sm mt-1">₹4,999/month · Billed annually</p>
                  </div>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">Active</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20 text-center">
                  <div><p className="font-black text-xl">50</p><p className="text-white/60 text-xs">Tours/month</p></div>
                  <div><p className="font-black text-xl">500</p><p className="text-white/60 text-xs">Travelers</p></div>
                  <div><p className="font-black text-xl">∞</p><p className="text-white/60 text-xs">AI Actions</p></div>
                </div>
              </div>
              <div className="card rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-3">Payment Method</h3>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-black">VISA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Visa •••• 4242</p>
                    <p className="text-xs text-gray-400">Expires 12/26</p>
                  </div>
                  <button className="ml-auto text-brand-red text-xs font-bold">Change</button>
                </div>
              </div>
            </div>
          )}
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

export default OperatorSettings;
