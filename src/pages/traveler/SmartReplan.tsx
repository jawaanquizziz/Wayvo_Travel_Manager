import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Sparkles, MapPin, Clock, DollarSign,
  CheckCircle2, Star, ArrowUpDown, Zap, RotateCcw, Navigation,
  Mountain, Coffee, Camera, Compass, TrendingDown, TrendingUp
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { useWayvoEngine } from '../../data/wayvoEngine';

const currentActivity = {
  name: 'Gulmarg Gondola Ride',
  price: 2500,
  time: '4:00 PM',
  duration: '2h',
  location: 'Gulmarg Gondola Station',
  day: 'Day 2',
  match: 88,
};

const alternatives = [
  {
    id: 'r1',
    name: 'Mountain Café Experience',
    description: 'Scenic café at 3,500m with panoramic Himalayan views and local Kahwa tea',
    price: 1800,
    time: '4:30 PM',
    duration: '2h',
    location: 'Gulmarg Heights',
    travelDelta: '+10 min travel',
    costDelta: -700,
    match: 94,
    rating: 4.8,
    category: 'Relaxed',
    icon: Coffee,
  },
  {
    id: 'r2',
    name: 'Local Cultural Tour',
    description: 'Guided walk through traditional Gulmarg village with local artisan visits',
    price: 2000,
    time: '4:00 PM',
    duration: '2.5h',
    location: 'Gulmarg Village',
    travelDelta: 'No schedule change',
    costDelta: -500,
    match: 91,
    rating: 4.7,
    category: 'Cultural',
    icon: Compass,
  },
  {
    id: 'r3',
    name: 'Adventure Photography Trek',
    description: 'Guided trek to sunset viewpoint with professional photography session',
    price: 2900,
    time: '5:00 PM',
    duration: '3h',
    location: 'Khilanmarg Trail',
    travelDelta: '+30 min travel',
    costDelta: 400,
    match: 86,
    rating: 4.9,
    category: 'Adventure',
    icon: Camera,
  },
  {
    id: 'r4',
    name: 'Meadow Horse Ride',
    description: 'Guided horseback ride through the famous Gulmarg meadows at golden hour',
    price: 2200,
    time: '4:00 PM',
    duration: '1.5h',
    location: 'Gulmarg Meadows',
    travelDelta: 'No schedule change',
    costDelta: -300,
    match: 82,
    rating: 4.6,
    category: 'Adventure',
    icon: Mountain,
  },
];

type SortType = 'match' | 'cost' | 'time' | 'rating';

const SmartReplan: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useWayvoEngine();
  const [sortBy, setSortBy] = useState<SortType>('match');
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchComplete, setSearchComplete] = useState(true);

  const sortedAlternatives = [...alternatives].sort((a, b) => {
    switch (sortBy) {
      case 'match': return b.match - a.match;
      case 'cost': return a.price - b.price;
      case 'time': return a.travelDelta.includes('No') ? -1 : 1;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const handleFindAlternative = () => {
    setSearching(true);
    setSearchComplete(false);
    setApplied(false);
    setSelectedAlt(null);
    setTimeout(() => {
      setSearching(false);
      setSearchComplete(true);
    }, 2000);
  };

  const handleApply = async () => {
    if (!selectedAlt) return;
    setApplying(true);
    await new Promise(r => setTimeout(r, 1500));
    setApplied(true);
    setApplying(false);

    const altData = alternatives.find(a => a.id === selectedAlt);
    addNotification({
      type: 'update',
      icon: '🔄',
      title: 'Activity Replaced',
      message: `${currentActivity.name} has been replaced with ${altData?.name}. Your itinerary has been updated.`,
      time: 'Just now',
      priority: 'normal',
      read: false,
      affectedTrip: 'Kashmir Escape',
      actionType: 'view-itinerary',
      actionRoute: '/traveler/itinerary/kashmir',
    });
  };

  const handleReset = () => {
    setApplied(false);
    setSelectedAlt(null);
    setApplying(false);
  };

  const appliedAlt = alternatives.find(a => a.id === selectedAlt);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="traveler" />

      <main className="pt-20 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-4 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ArrowUpDown size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Smart Replanning</h1>
                <p className="text-gray-500 text-sm">Find the best alternative while balancing cost, time and preferences</p>
              </div>
            </div>
          </div>

          {/* Current Activity */}
          <div className={`bg-white rounded-3xl border shadow-card p-6 mb-6 transition-all ${applied ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                {applied ? '✓ Updated Activity' : 'Current Activity'}
              </span>
              <span className="text-xs font-bold text-gray-400">{currentActivity.day}</span>
            </div>

            {applied && appliedAlt ? (
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-1">{appliedAlt.name}</h2>
                <p className="text-sm text-gray-500 mb-3">{appliedAlt.description}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1 text-gray-600"><Clock size={12} /> {appliedAlt.time} · {appliedAlt.duration}</span>
                  <span className="flex items-center gap-1 text-gray-600"><MapPin size={12} /> {appliedAlt.location}</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600"><DollarSign size={12} /> ₹{appliedAlt.price.toLocaleString()}</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">{appliedAlt.match}% match</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate('/traveler/itinerary/kashmir')}
                    className="bg-brand-red text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-red-700 transition-colors flex items-center gap-1.5"
                  >
                    View Itinerary <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-1">{currentActivity.name}</h2>
                <div className="flex flex-wrap gap-3 text-xs mt-2">
                  <span className="flex items-center gap-1 text-gray-600"><Clock size={12} /> {currentActivity.time} · {currentActivity.duration}</span>
                  <span className="flex items-center gap-1 text-gray-600"><MapPin size={12} /> {currentActivity.location}</span>
                  <span className="flex items-center gap-1 font-bold text-gray-800"><DollarSign size={12} /> ₹{currentActivity.price.toLocaleString()}</span>
                  <span className="bg-red-50 text-brand-red px-2 py-0.5 rounded-full font-bold">{currentActivity.match}% match</span>
                </div>
                <button
                  onClick={handleFindAlternative}
                  disabled={searching}
                  className="mt-4 bg-brand-red text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-red active:scale-95 flex items-center gap-2 disabled:opacity-70"
                >
                  {searching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Searching alternatives...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Find Alternative
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Alternatives */}
          {searchComplete && !applied && (
            <div className="animate-slide-up">
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="font-bold text-gray-900 text-sm">
                  <Sparkles size={14} className="inline text-brand-red mr-1" />
                  {alternatives.length} Alternatives Found
                </h3>
                <div className="flex gap-1.5">
                  {([
                    { key: 'match' as SortType, label: 'Best Match' },
                    { key: 'cost' as SortType, label: 'Lowest Cost' },
                    { key: 'time' as SortType, label: 'Fastest' },
                    { key: 'rating' as SortType, label: 'Highest Rated' },
                  ]).map(s => (
                    <button
                      key={s.key}
                      onClick={() => setSortBy(s.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        sortBy === s.key
                          ? 'bg-brand-red text-white shadow-xs'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {sortedAlternatives.map((alt, idx) => {
                  const Icon = alt.icon;
                  const isSelected = selectedAlt === alt.id;
                  const isTopMatch = sortBy === 'match' && idx === 0;

                  return (
                    <div
                      key={alt.id}
                      onClick={() => setSelectedAlt(alt.id)}
                      className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all duration-200 hover:shadow-card ${
                        isSelected
                          ? 'border-brand-red shadow-red/10 shadow-lg ring-1 ring-brand-red/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {isTopMatch && (
                        <div className="flex items-center gap-1 mb-2">
                          <Sparkles size={12} className="text-brand-red" />
                          <span className="text-[10px] font-black text-brand-red uppercase tracking-wider">Best Match for You</span>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <Icon size={20} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">{alt.name}</h4>
                              <p className="text-xs text-gray-500 mt-0.5">{alt.description}</p>
                            </div>
                            <span className={`text-sm font-black flex-shrink-0 ${alt.costDelta < 0 ? 'text-emerald-600' : alt.costDelta > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                              ₹{alt.price.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="flex items-center gap-1 text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              <Clock size={10} /> {alt.time} · {alt.duration}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              <Navigation size={10} /> {alt.travelDelta}
                            </span>
                            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                              alt.costDelta < 0 ? 'bg-emerald-100 text-emerald-700' : alt.costDelta > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {alt.costDelta < 0 ? <TrendingDown size={10} /> : alt.costDelta > 0 ? <TrendingUp size={10} /> : null}
                              {alt.costDelta < 0 ? `Save ₹${Math.abs(alt.costDelta)}` : alt.costDelta > 0 ? `+₹${alt.costDelta}` : 'Same cost'}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              <Star size={10} /> {alt.rating}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                              alt.match >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {alt.match}% match
                            </span>
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-4 pt-3 border-t border-gray-100 animate-fade-in">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleApply(); }}
                            disabled={applying}
                            className="w-full bg-brand-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-red active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                          >
                            {applying ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Updating itinerary...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={16} />
                                Apply to Itinerary
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SmartReplan;
