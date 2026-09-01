import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { prepChecklist, myTrips } from '../../data/mockData';

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
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 mt-4">
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-3xl font-black text-gray-900 mb-1">Trip Preparation</h1>
        <p className="text-gray-500 mb-6">{trip.title} · {trip.startDate} – {trip.endDate}</p>

        {/* Progress Circle */}
        <div className="card rounded-2xl mb-6 text-center py-8">
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="42" fill="none" stroke="#E8173A" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-900">{pct}%</span>
              <span className="text-xs text-gray-400">ready</span>
            </div>
          </div>
          <h2 className="font-black text-gray-900 text-xl mb-1">
            {pct >= 90 ? "Almost ready! 🎉" : pct >= 70 ? "Good progress! 👍" : "Let's get prepared 📋"}
          </h2>
          <p className="text-gray-500 text-sm">{completed} of {total} items completed</p>
        </div>

        {/* Checklist by Category */}
        {categories.map(cat => (
          <div key={cat} className="card rounded-2xl mb-4">
            <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-red rounded-full"></div>
              {cat}
              <span className="ml-auto text-xs text-gray-400">
                {checklist.filter(c => c.category === cat && c.done).length}/{checklist.filter(c => c.category === cat).length}
              </span>
            </h3>
            <div className="space-y-2">
              {checklist.filter(c => c.category === cat).map(item => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    item.done ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    item.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {item.done && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm flex-1 text-left ${item.done ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                    {item.item}
                  </span>
                  {item.done && <CheckCircle size={16} className="text-green-500 flex-shrink-0" />}
                  {!item.done && <AlertCircle size={16} className="text-yellow-400 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Emergency Contacts */}
        <div className="card rounded-2xl mb-4">
          <h3 className="font-bold text-gray-900 mb-3">Emergency Contacts</h3>
          <div className="space-y-2">
            {[
              { name: 'Tour Coordinator', value: 'Rahul Singh · +91 98765 43210' },
              { name: 'Hotel (Lalit)', value: '+91 194 250 1001' },
              { name: 'Emergency', value: '112' },
              { name: 'WAYVO Support', value: '1800-WAYVO-01' },
            ].map(c => (
              <div key={c.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{c.name}</span>
                <span className="text-sm font-semibold text-gray-900">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(`/traveler/trips/${trip.id}`)}
          className="w-full bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          View Full Trip Details
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default TripPreparation;
