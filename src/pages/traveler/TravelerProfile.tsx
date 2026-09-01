import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Bell, Lock, CreditCard, User, Heart } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

const TravelerProfile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
        {/* Profile Header */}
        <div className="card rounded-3xl mb-6 mt-4 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-3xl font-black">AP</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
              <Edit2 size={14} className="text-gray-600" />
            </button>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Alison Pinto</h1>
          <p className="text-gray-500 text-sm mt-1">alison.pinto@email.com</p>
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
            {[{ val: '3', label: 'Trips' }, { val: '5', label: 'Countries' }, { val: '4.9', label: 'Rating' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-black text-xl text-gray-900">{s.val}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1.5 shadow-card mb-6 gap-1">
          {[
            { key: 'profile', label: '👤 Profile' },
            { key: 'preferences', label: '❤️ Preferences' },
            { key: 'security', label: '🔒 Security' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.key ? 'bg-brand-red text-white shadow-red' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                {[
                  { label: 'First Name', value: 'Alison' },
                  { label: 'Last Name', value: 'Pinto' },
                  { label: 'Email', value: 'alison.pinto@email.com' },
                  { label: 'Phone', value: '+91 98765 43210' },
                  { label: 'Date of Birth', value: '15 Mar 1992' },
                  { label: 'Nationality', value: 'Indian' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
                    <input type="text" defaultValue={value} className="input-field" />
                  </div>
                ))}
              </div>
              <button className="mt-4 btn-primary">Save Changes</button>
            </div>

            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3">Payment Methods</h3>
              <div className="space-y-3">
                {[
                  { type: 'UPI', detail: 'alison@oksbi', icon: '📱' },
                  { type: 'Visa', detail: '•••• •••• •••• 4242', icon: '💳' },
                ].map(pm => (
                  <div key={pm.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{pm.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{pm.type}</p>
                        <p className="text-gray-400 text-xs">{pm.detail}</p>
                      </div>
                    </div>
                    <button className="text-brand-red text-xs font-bold hover:underline">Remove</button>
                  </div>
                ))}
                <button className="w-full text-brand-red text-sm font-bold py-2 hover:underline">+ Add Payment Method</button>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-4">
            {[
              { label: 'Travel Style', current: 'Adventure & Cultural', options: ['Adventure', 'Relaxed', 'Luxury', 'Cultural'] },
              { label: 'Accommodation', current: 'Premium (4-star)', options: ['Budget', 'Comfort', 'Premium', 'Luxury'] },
              { label: 'Transport', current: 'Flight preferred', options: ['Flight', 'Train', 'Car', 'Mixed'] },
              { label: 'Diet', current: 'Vegetarian', options: ['No preference', 'Vegetarian', 'Vegan', 'Non-vegetarian'] },
            ].map(pref => (
              <div key={pref.label} className="card rounded-2xl">
                <label className="block text-sm font-bold text-gray-700 mb-2">{pref.label}</label>
                <div className="flex flex-wrap gap-2">
                  {pref.options.map(opt => (
                    <button
                      key={opt}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        pref.current.includes(opt.split(' ')[0])
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-gray-100 text-gray-600 border-transparent hover:border-brand-red'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3">Notifications</h3>
              {[
                { label: 'Trip updates', desc: 'Itinerary changes & alerts' },
                { label: 'AI recommendations', desc: 'Personalized travel tips' },
                { label: 'Booking confirmations', desc: 'Payment & booking status' },
                { label: 'Offers & deals', desc: 'Exclusive WAYVO offers' },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{n.label}</p>
                    <p className="text-xs text-gray-400">{n.desc}</p>
                  </div>
                  <div className="w-11 h-6 bg-brand-red rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
              </div>
              <button className="mt-4 btn-primary">Update Password</button>
            </div>

            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3">Two-Factor Authentication</h3>
              <p className="text-gray-500 text-sm mb-4">Add an extra layer of security to your account</p>
              <button className="btn-secondary">Enable 2FA</button>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={() => navigate('/')}
          className="w-full mt-6 text-gray-500 text-sm font-semibold py-3 hover:text-brand-red transition-colors"
        >
          Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default TravelerProfile;
