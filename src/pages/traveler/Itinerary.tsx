import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Sparkles, MapPin, Calendar, Users, Plus, Minus,
  Hotel, Truck, Utensils, Camera, AlertTriangle, CheckCircle,
  ChevronDown, ChevronUp, Edit2, Zap, X, Plane, Car, Waves,
  ShieldCheck, CheckCircle2, Sliders, ArrowRight, ShoppingBag,
  Mountain, Compass, Footprints, Anchor
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

const getActivityCategoryIcon = (category: string, iconKey?: string) => {
  const key = (iconKey || category || '').toLowerCase();
  if (key.includes('plane') || key.includes('flight')) return Plane;
  if (key.includes('car') || key.includes('drive') || key.includes('transport')) return Car;
  if (key.includes('hotel') || key.includes('stay') || key.includes('resort')) return Hotel;
  if (key.includes('food') || key.includes('lunch') || key.includes('dinner') || key.includes('dining')) return Utensils;
  if (key.includes('shopping') || key.includes('market')) return ShoppingBag;
  if (key.includes('mountain') || key.includes('snow')) return Mountain;
  if (key.includes('hiking') || key.includes('trek')) return Footprints;
  if (key.includes('boat') || key.includes('shikara') || key.includes('lake')) return Anchor;
  if (key.includes('cable-car') || key.includes('gondola')) return Compass;
  return Camera;
};

const AlternativeModal: React.FC<{
  onClose: () => void;
  onApply: (alt: typeof aiAlternatives[0]) => void;
}> = ({ onClose, onApply }) => {
  const [selected, setSelected] = useState<string | null>('alt2');

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up border border-gray-100">
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-brand-red mb-1">
                <AlertTriangle size={16} />
                <span className="text-xs font-black uppercase tracking-wider">Activity Unavailable</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">Snow Activities — Gulmarg</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>

          {/* Impact Analysis */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
            <p className="text-xs font-black text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-600" />
              WAYVO Conflict Detection:
            </p>
            <div className="space-y-1.5 text-xs text-amber-800 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                <span>Activity closed on Oct 14 due to local weather</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                <span>Schedule gap: 2 hours open in afternoon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                <span>Budget release: ₹3,000 refunded to trip balance</span>
              </div>
            </div>
          </div>

          <h3 className="font-black text-gray-900 text-sm mb-3 uppercase tracking-wider">WAYVO Recommended Replacements</h3>
          
          <div className="space-y-3 mb-6">
            {aiAlternatives.map(alt => (
              <button
                key={alt.id}
                onClick={() => setSelected(alt.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  selected === alt.id ? 'border-brand-red bg-red-50/70 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm">{alt.name}</span>
                      {alt.aiRecommended && (
                        <span className="bg-brand-red text-white text-[10px] px-2.5 py-0.5 rounded-full font-black flex items-center gap-1">
                          <Sparkles size={10} /> AI Best Pick
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">{alt.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                      <span className="text-brand-red font-bold">₹{alt.price.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span>{alt.duration}</span>
                      <span>•</span>
                      <span>{alt.travelTime}</span>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-black flex-shrink-0 ${
                    alt.match >= 90 ? 'bg-emerald-100 text-emerald-800' :
                    alt.match >= 80 ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {alt.match}% match
                  </div>
                </div>
                {alt.aiRecommended && (
                  <div className="mt-3 bg-red-100/60 rounded-xl p-2.5 border border-red-200/50">
                    <p className="text-[11px] text-gray-700 leading-relaxed">
                      <span className="font-bold text-brand-red">Why this pick:</span> Keeps your schedule completely in sync, matches your adventure preferences, and saves ₹1,100 vs the original booking.
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => { if (selected) onApply(aiAlternatives.find(a => a.id === selected)!); onClose(); }}
            disabled={!selected}
            className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-red"
          >
            <CheckCircle2 size={18} />
            Apply Selected Alternative & Recalculate
          </button>
        </div>
      </div>
    </div>
  );
};

const Itinerary: React.FC = () => {
  const navigate = useNavigate();
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
    await new Promise(r => setTimeout(r, 1800));
    setTotalBudget(prev => prev - 1100);
    setRecalculating(false);
    setRecalcDone(true);
    setTimeout(() => setRecalcDone(false), 5000);
  };

  const removeActivity = (dayIdx: number, actId: string) => {
    setActivities(prev => prev.map((day, i) =>
      i === dayIdx ? { ...day, activities: day.activities.filter(a => a.id !== actId) } : day
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      <Navbar variant="traveler" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        {/* Back navigation */}
        <button onClick={() => navigate('/traveler/plan')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors font-medium text-sm">
          <ArrowLeft size={16} /> Back to Planner
        </button>

        {/* Hero banner */}
        <div className="relative rounded-3xl overflow-hidden mb-6 h-56 sm:h-72 shadow-xl border border-gray-200">
          <img
            src={data.image}
            alt={data.destination}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-brand-red text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <Sparkles size={12} />
                    {data.aiMatch}% AI Personalized Match
                  </div>
                </div>
                <h1 className="text-white font-black text-2xl sm:text-4xl tracking-tight">Your personalized {data.destination} itinerary</h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2 text-white/80 text-xs sm:text-sm font-medium">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {data.days} Days</span>
                  <span className="flex items-center gap-1"><Users size={13} /> {data.travelers} Travelers</span>
                  <span className="flex items-center gap-1 font-bold text-white"><ShieldCheck size={13} className="text-emerald-400" /> ₹{data.totalPrice.toLocaleString('en-IN')} Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live recalculation alert */}
        {recalculating && (
          <div className="mb-5 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 animate-fade-in shadow-sm">
            <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            <span className="text-blue-900 font-bold text-sm">WAYVO AI is recalculating routes, timings, and dynamic budget...</span>
          </div>
        )}
        
        {recalcDone && (
          <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 animate-fade-in shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 text-sm font-bold">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Dynamic Adaptation Applied Successfully!</span>
              </div>
              {appliedAlternative && (
                <p className="text-xs text-emerald-700 font-medium pl-6">
                  Replaced with <span className="font-bold">{appliedAlternative}</span> — New budget: ₹{totalBudget.toLocaleString('en-IN')} (Saved ₹1,100)
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Itinerary timeline */}
          <div className="lg:col-span-2 space-y-4">
            {activities.map((dayData, dayIdx) => (
              <div key={dayData.day} className="card rounded-3xl overflow-hidden border border-gray-100 shadow-card">
                {/* Day Header */}
                <button
                  onClick={() => setExpandedDay(expandedDay === dayData.day ? -1 : dayData.day)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50/80 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-red rounded-2xl flex flex-col items-center justify-center flex-shrink-0 shadow-xs text-white">
                      <span className="text-[10px] font-bold tracking-wider opacity-80">DAY</span>
                      <span className="font-black text-lg leading-none">{dayData.day}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-base sm:text-lg">{dayData.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm font-medium">{dayData.date} • {dayData.activities.length} activities scheduled</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    {expandedDay === dayData.day ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Day Activities List */}
                {expandedDay === dayData.day && (
                  <div className="border-t border-gray-100 px-4 sm:px-6 py-2">
                    {dayData.activities.map((activity: Activity) => {
                      const hasAlert = activity.alert && !appliedAlternative;
                      const CatIcon = getActivityCategoryIcon(activity.category, activity.icon);
                      return (
                        <div key={activity.id} className={`flex gap-3 sm:gap-4 py-4 border-b border-gray-100 last:border-0 group ${hasAlert ? 'bg-red-50/70 p-3 sm:p-4 rounded-2xl my-2 border border-red-200' : ''}`}>
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              hasAlert ? 'bg-red-100 text-brand-red animate-pulse' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {hasAlert ? <AlertTriangle size={18} /> : <CatIcon size={18} />}
                            </div>
                            <div className="w-px flex-1 bg-gray-200 mt-2 mb-1"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-gray-900 text-sm sm:text-base">{activity.name}</span>
                                  {hasAlert && (
                                    <span className="bg-red-100 text-brand-red text-xs px-2.5 py-0.5 rounded-full font-bold">
                                      Disruption Detected
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 flex-wrap">
                                  <span>{activity.time}</span>
                                  <span>•</span>
                                  <span>{activity.duration}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1"><MapPin size={10} /> {activity.location}</span>
                                </div>
                                {activity.price > 0 && (
                                  <div className="text-brand-red font-black text-xs sm:text-sm mt-1">
                                    ₹{activity.price.toLocaleString('en-IN')}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-1 flex-shrink-0">
                                {hasAlert ? (
                                  <button
                                    onClick={() => setShowAlternativeModal(true)}
                                    className="bg-brand-red text-white text-xs px-3.5 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-xs"
                                  >
                                    <Zap size={13} /> Resolve
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => removeActivity(dayIdx, activity.id)}
                                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-brand-red flex items-center justify-center transition-all"
                                    title="Remove activity"
                                  >
                                    <Minus size={14} />
                                  </button>
                                )}
                              </div>
                            </div>

                            {hasAlert && (
                              <div className="mt-3 bg-red-100/60 rounded-xl p-3 border border-red-200">
                                <p className="text-xs text-red-700 font-medium flex items-center gap-1.5">
                                  <AlertTriangle size={13} className="flex-shrink-0 text-brand-red" />
                                  <span>{activity.alertMessage}</span>
                                </p>
                                <button
                                  onClick={() => setShowAlternativeModal(true)}
                                  className="mt-2 text-xs text-brand-red font-bold hover:underline flex items-center gap-1.5"
                                >
                                  <Sparkles size={13} /> View AI Optimized Alternatives →
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Add Activity button */}
                    <div className="py-3">
                      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 font-semibold text-xs sm:text-sm hover:border-brand-red hover:text-brand-red transition-colors">
                        <Plus size={16} /> Add Custom Activity
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cost breakdown & Booking action */}
          <div className="space-y-4">
            <div className="card rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-card sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-gray-900 text-lg">Cost Breakdown</h3>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold">Transparent</span>
              </div>
              
              {/* Budget Progress Bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
                  <span>Current Total</span>
                  <span className="font-black text-gray-900 text-sm">₹{totalBudget.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Target Budget</span>
                  <span>₹{data.budget.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-brand-red rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalBudget / data.budget) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 mt-1.5 font-medium">
                  <span>₹{totalBudget.toLocaleString('en-IN')} allocated</span>
                  <span className="text-emerald-600 font-bold">₹{(data.budget - totalBudget).toLocaleString('en-IN')} under budget</span>
                </div>
              </div>

              {/* Itemized Categories with Lucide icons */}
              <div className="space-y-2.5 mb-5 border-t border-gray-100 pt-4">
                {[
                  { label: 'Hotels & Resorts', icon: Hotel, amount: data.hotels },
                  { label: 'Flights & Cab Transfers', icon: Car, amount: data.transport },
                  { label: 'Activities & Passes', icon: Camera, amount: data.activities },
                  { label: 'Culinary & Meals', icon: Utensils, amount: data.food },
                  { label: 'Taxes & Insurance', icon: ShieldCheck, amount: data.taxes },
                ].map(({ label, icon: CatIcon, amount }) => (
                  <div key={label} className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <CatIcon size={13} />
                      </div>
                      <span>{label}</span>
                    </div>
                    <span className="font-bold text-gray-900">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">Total Per Person</span>
                  <span className="font-black text-2xl text-brand-red">₹{totalBudget.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[11px] text-gray-400 text-right mt-0.5 font-medium">
                  × {data.travelers} travelers = ₹{(totalBudget * data.travelers).toLocaleString('en-IN')}
                </div>
              </div>

              {/* Booking Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={() => navigate('/traveler/booking')}
                  className="w-full bg-brand-red text-white py-4 rounded-2xl font-black text-sm sm:text-base hover:bg-red-700 transition-colors shadow-red flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} /> Book This Journey
                </button>
                <button
                  onClick={() => setShowAlternativeModal(true)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold text-xs sm:text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={15} /> Simulate Dynamic Adaptation
                </button>
              </div>

              {/* AI Badge */}
              <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-brand-red font-black text-base">{data.aiMatch}% Match</div>
                  <div className="text-xs text-gray-500">Live operator synchronization ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Alternative Selection Modal */}
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
