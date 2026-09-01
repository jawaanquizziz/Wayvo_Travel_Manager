import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Sparkles, MapPin, Calendar, Users, Plus, Minus,
  Hotel, Truck, Utensils, Camera, AlertTriangle, CheckCircle,
  ChevronDown, ChevronUp, Edit2, Zap, X
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { itineraryData, aiAlternatives } from '../../data/mockData';

interface Activity {
  id: string;
  time: string;
  name: string;
  duration: string;
  price: number;
  location: string;
  category: string;
  icon: string;
  included: boolean;
  alert?: boolean;
  alertMessage?: string;
}

const AlternativeModal: React.FC<{
  onClose: () => void;
  onApply: (alt: typeof aiAlternatives[0]) => void;
}> = ({ onClose, onApply }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-brand-red mb-1">
                <AlertTriangle size={16} />
                <span className="text-sm font-bold uppercase">Activity Unavailable</span>
              </div>
              <h2 className="text-xl font-black text-gray-900">Snow Activities — Gulmarg</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Impact Analysis */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-5">
            <p className="text-sm font-bold text-yellow-800 mb-2">WAYVO has detected:</p>
            <div className="space-y-2">
              {['Activity unavailable (Oct 14)', 'Schedule gap: 2 hours', 'Budget impact: ₹1,000 savings', 'No transport dependency'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-yellow-700">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-3">Recommended Alternatives</h3>
          <div className="space-y-3 mb-5">
            {aiAlternatives.map(alt => (
              <button
                key={alt.id}
                onClick={() => setSelected(alt.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  selected === alt.id ? 'border-brand-red bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-sm">{alt.name}</span>
                      {alt.aiRecommended && (
                        <span className="bg-brand-red text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <Sparkles size={10} /> AI Pick
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{alt.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-brand-red font-bold">₹{alt.price.toLocaleString('en-IN')}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500">{alt.duration}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500">{alt.travelTime}</span>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    alt.match >= 90 ? 'bg-green-100 text-green-700' :
                    alt.match >= 80 ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {alt.match}% match
                  </div>
                </div>
                {alt.aiRecommended && (
                  <div className="mt-3 bg-red-50/50 rounded-xl p-3">
                    <p className="text-xs text-gray-600">
                      <span className="font-bold text-brand-red">AI Reasoning:</span> Best matches your adventure preferences, keeps schedule on track, and saves ₹1,100 vs original activity.
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => { if (selected) onApply(aiAlternatives.find(a => a.id === selected)!); onClose(); }}
            disabled={!selected}
            className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} />
            Apply Recommendation
          </button>
        </div>
      </div>
    </div>
  );
};

const Itinerary: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = itineraryData.kashmir;
  
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [showAlternativeModal, setShowAlternativeModal] = useState(false);
  const [appliedAlternative, setAppliedAlternative] = useState<string | null>(null);
  const [recalculating, setRecalculating] = useState(false);
  const [recalcDone, setRecalcDone] = useState(false);
  const [activities, setActivities] = useState(data.days_data);
  const [totalBudget, setTotalBudget] = useState(data.hotels + data.transport + data.activities + data.food + data.taxes);

  const handleApplyAlternative = async (alt: typeof aiAlternatives[0]) => {
    setAppliedAlternative(alt.name);
    setRecalculating(true);
    await new Promise(r => setTimeout(r, 2000));
    setTotalBudget(prev => prev - 1100);
    setRecalculating(false);
    setRecalcDone(true);
    setTimeout(() => setRecalcDone(false), 4000);
  };

  const removeActivity = (dayIdx: number, actId: string) => {
    setActivities(prev => prev.map((day, i) =>
      i === dayIdx ? { ...day, activities: day.activities.filter(a => a.id !== actId) } : day
    ));
  };

  const categoryIcons: Record<string, any> = {
    Transport: Truck, Hotel: Hotel, Activity: Camera, Food: Utensils
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 mt-4 transition-colors">
          <ArrowLeft size={16} /> Back to Planner
        </button>

        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden mb-6 h-56 sm:h-72">
          <img
            src={data.image}
            alt={data.destination}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-brand-red text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Sparkles size={12} />
                    {data.aiMatch}% AI Match
                  </div>
                </div>
                <h1 className="text-white font-black text-2xl sm:text-3xl">Your personalized {data.destination} journey</h1>
                <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                  <span>📅 {data.days} Days</span>
                  <span>👥 {data.travelers} Travelers</span>
                  <span>💰 ₹{data.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recalculating Banner */}
        {recalculating && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            <span className="text-blue-700 font-semibold text-sm">WAYVO is recalculating your itinerary...</span>
          </div>
        )}
        
        {recalcDone && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-2xl p-4 animate-fade-in">
            <div className="space-y-1.5">
              {['Timing optimized', 'Transport updated', 'Budget recalculated'].map(item => (
                <div key={item} className="flex items-center gap-2 text-green-700 text-sm font-medium">
                  <CheckCircle size={16} className="text-green-500" />
                  {item}
                </div>
              ))}
              {appliedAlternative && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  ✅ Applied: {appliedAlternative} — saving ₹1,100
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Itinerary */}
          <div className="lg:col-span-2 space-y-4">
            {activities.map((dayData, dayIdx) => (
              <div key={dayData.day} className="card rounded-2xl overflow-hidden">
                {/* Day Header */}
                <button
                  onClick={() => setExpandedDay(expandedDay === dayData.day ? -1 : dayData.day)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-red rounded-2xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">DAY</span>
                      <span className="text-white font-black text-lg leading-none">{dayData.day}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-black text-gray-900 text-base">{dayData.title}</h3>
                      <p className="text-gray-400 text-sm">{dayData.date} · {dayData.activities.length} activities</p>
                    </div>
                  </div>
                  {expandedDay === dayData.day ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </button>

                {/* Activities */}
                {expandedDay === dayData.day && (
                  <div className="border-t border-gray-100">
                    {dayData.activities.map((activity: Activity) => {
                      const hasAlert = activity.alert && !appliedAlternative;
                      return (
                        <div key={activity.id} className={`flex gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group ${hasAlert ? 'bg-red-50/50' : ''}`}>
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${hasAlert ? 'bg-red-100' : 'bg-gray-100'}`}>
                              {hasAlert ? '⚠️' : activity.icon}
                            </div>
                            <div className="w-px flex-1 bg-gray-100 mt-2 mb-1"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-gray-900 text-sm">{activity.name}</span>
                                  {hasAlert && (
                                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-semibold">Unavailable</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                  <span>🕐 {activity.time}</span>
                                  <span>·</span>
                                  <span>⏱ {activity.duration}</span>
                                  <span>·</span>
                                  <MapPin size={10} />
                                  <span>{activity.location}</span>
                                </div>
                                {activity.price > 0 && (
                                  <div className="text-brand-red font-bold text-sm mt-1">
                                    ₹{activity.price.toLocaleString('en-IN')}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {hasAlert ? (
                                  <button
                                    onClick={() => setShowAlternativeModal(true)}
                                    className="bg-brand-red text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-1"
                                  >
                                    <Zap size={12} /> Fix
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => removeActivity(dayIdx, activity.id)}
                                    className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-600 flex items-center justify-center transition-all"
                                  >
                                    <Minus size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                            {hasAlert && (
                              <div className="mt-2 bg-red-50 rounded-xl p-3">
                                <p className="text-xs text-red-600 font-medium">⚠️ {activity.alertMessage}</p>
                                <button
                                  onClick={() => setShowAlternativeModal(true)}
                                  className="mt-2 text-xs text-brand-red font-bold hover:underline flex items-center gap-1"
                                >
                                  <Sparkles size={12} /> View WAYVO AI Alternatives →
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Add Activity */}
                    <div className="px-5 py-3">
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm hover:border-brand-red hover:text-brand-red transition-colors">
                        <Plus size={16} /> Add Activity
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cost Summary */}
          <div className="space-y-4">
            {/* Budget Card */}
            <div className="card rounded-2xl sticky top-24">
              <h3 className="font-black text-gray-900 text-lg mb-4">Cost Summary</h3>
              
              {/* Budget Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Trip Cost</span>
                  <span className="font-bold text-gray-900">₹{totalBudget.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Your Budget</span>
                  <span className="font-medium text-gray-600">₹{data.budget.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-3">
                  <div
                    className="h-2 bg-brand-red rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalBudget / data.budget) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹{totalBudget.toLocaleString('en-IN')} spent</span>
                  <span>₹{(data.budget - totalBudget).toLocaleString('en-IN')} saved</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 mb-5">
                {[
                  { label: 'Hotels', icon: '🏨', amount: data.hotels },
                  { label: 'Transport', icon: '✈️', amount: data.transport },
                  { label: 'Activities', icon: '🎯', amount: data.activities },
                  { label: 'Food & Dining', icon: '🍽️', amount: data.food },
                  { label: 'Taxes & Fees', icon: '📄', amount: data.taxes },
                ].map(({ label, icon, amount }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{icon}</span>
                      <span className="text-sm text-gray-600">{label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-black text-xl text-brand-red">₹{totalBudget.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-xs text-gray-400 text-right mt-0.5">per person × {data.travelers} = ₹{(totalBudget * data.travelers).toLocaleString('en-IN')}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Zap size={16} /> Optimize Budget
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Edit2 size={16} /> Modify Trip
                </button>
                <button
                  onClick={() => navigate('/traveler/booking')}
                  className="w-full bg-brand-red text-white py-3.5 rounded-xl font-black text-sm hover:bg-red-700 transition-colors shadow-red flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} /> Book This Journey
                </button>
              </div>

              {/* AI Match Badge */}
              <div className="mt-4 bg-red-50 rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-brand-red font-black text-lg">{data.aiMatch}%</div>
                  <div className="text-xs text-gray-500">AI preference match</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Modal */}
      {showAlternativeModal && (
        <AlternativeModal
          onClose={() => setShowAlternativeModal(false)}
          onApply={handleApplyAlternative}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Itinerary;
