import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Check, CheckCircle2, AlertCircle, Phone, ShieldCheck,
  PackageCheck, FileText, Luggage, Wallet, HeartPulse
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { prepChecklist, myTrips } from '../../data/mockData';

const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'documents':
      return FileText;
    case 'packing':
      return Luggage;
    case 'finance':
      return Wallet;
    case 'safety':
      return HeartPulse;
    default:
      return PackageCheck;
  }
};

const TripPreparation: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const trip = myTrips.find(t => t.id === id) || myTrips[0];
  const [checklist, setChecklist] = useState(prepChecklist);

  const toggle = (itemId: string) => {
    setChecklist(prev => prev.map(item => item.id === itemId ? { ...item, done: !item.done } : item));
  };

  const completed = checklist.filter(c => c.done).length;
  const total = checklist.length;
  const pct = Math.round((completed / total) * 100);

  const categories = [...new Set(checklist.map(c => c.category))];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      <Navbar variant="traveler" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 font-semibold text-xs sm:text-sm">
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-1 tracking-tight">Pre-Trip Preparation</h1>
        <p className="text-gray-500 text-xs sm:text-sm mb-6">{trip.title} • {trip.startDate} – {trip.endDate}</p>

        {/* Animated Progress Circle Card */}
        <div className="card rounded-3xl p-6 sm:p-8 mb-6 text-center border border-gray-100 shadow-card">
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="40" fill="none" stroke="#E8173A" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-900">{pct}%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ready</span>
            </div>
          </div>
          
          <h2 className="font-black text-gray-900 text-lg sm:text-xl mb-1">
            {pct >= 90 ? "You're all set to travel! 🎉" : pct >= 60 ? "Great progress so far! ✈️" : "Let's get organized 📋"}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">{completed} of {total} essentials completed</p>
        </div>

        {/* Categorized Checklist Cards with Lucide Icons */}
        <div className="space-y-4 mb-6">
          {categories.map(cat => {
            const CatIcon = getCategoryIcon(cat);
            const itemsInCat = checklist.filter(c => c.category === cat);
            const doneInCat = itemsInCat.filter(c => c.done).length;

            return (
              <div key={cat} className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="font-black text-gray-900 text-sm sm:text-base flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-red-50 text-brand-red flex items-center justify-center">
                      <CatIcon size={15} />
                    </div>
                    <span>{cat}</span>
                  </h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {doneInCat}/{itemsInCat.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {itemsInCat.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all border text-left ${
                        item.done
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-gray-50/70 border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        item.done ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs' : 'border-gray-300 bg-white'
                      }`}>
                        {item.done && <Check size={14} strokeWidth={3} />}
                      </div>
                      
                      <span className={`text-xs sm:text-sm flex-1 ${
                        item.done ? 'line-through text-gray-400 font-medium' : 'text-gray-800 font-semibold'
                      }`}>
                        {item.item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency & Ground Coordinator Contacts */}
        <div className="card rounded-3xl p-5 sm:p-6 mb-6 border border-gray-100 shadow-card">
          <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
            <Phone size={16} className="text-brand-red" />
            <span>Emergency & Ground Contacts</span>
          </h3>
          <div className="divide-y divide-gray-100 text-xs sm:text-sm">
            {[
              { name: 'Ground Coordinator (Rahul Singh)', value: '+91 98765 43210' },
              { name: 'Lalit Palace Concierge', value: '+91 194 250 1001' },
              { name: 'Srinagar Tourist Helpline', value: '1800-103-1060' },
              { name: 'WAYVO 24/7 Support Desk', value: '1800-WAYVO-01' },
            ].map(c => (
              <div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 gap-0.5">
                <span className="text-gray-500 font-medium">{c.name}</span>
                <span className="font-bold text-gray-900 font-mono">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(`/traveler/trips/${trip.id}`)}
          className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold text-sm sm:text-base hover:bg-red-700 transition-colors shadow-red"
        >
          View Full Live Trip Itinerary
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default TripPreparation;
