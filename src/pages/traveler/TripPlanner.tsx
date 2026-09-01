import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, MapPin, Calendar, Users, Wallet, Hotel, Truck,
  Tag, Smile, Sparkles, Check, Plane, Train, Bus, Car, Shuffle,
  Home, Building, Building2, Landmark, Mountain, Flame, Utensils,
  Palette, ShoppingBag, Moon, Camera, Heart, Trees, Waves,
  Scale, Zap, Crown, Backpack, HeartHandshake, User, ShieldCheck
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

const destinations = ['Kashmir', 'Goa', 'Manali', 'Kerala', 'Rajasthan', 'Ladakh', 'Bali', 'Dubai', 'Singapore', 'Maldives'];

const interestsList = [
  { id: 'Nature', label: 'Nature & Scenic', icon: Trees },
  { id: 'Adventure', label: 'Adventure Sports', icon: Flame },
  { id: 'Food', label: 'Food & Culinary', icon: Utensils },
  { id: 'Culture', label: 'Art & Culture', icon: Palette },
  { id: 'Shopping', label: 'Local Shopping', icon: ShoppingBag },
  { id: 'Nightlife', label: 'Nightlife & Vibe', icon: Moon },
  { id: 'Photography', label: 'Photography', icon: Camera },
  { id: 'Wellness', label: 'Wellness & Spa', icon: Heart },
  { id: 'History', label: 'Heritage & Forts', icon: Landmark },
  { id: 'Beaches', label: 'Coastal & Beaches', icon: Waves },
];

const travelStylesList = [
  { id: 'Relaxed', label: 'Relaxed Pace', desc: 'Slow, leisurely mornings & scenic spots', icon: Smile },
  { id: 'Balanced', label: 'Balanced Journey', desc: 'Even mix of sightseeing, rest & dining', icon: Scale },
  { id: 'Fast-paced', label: 'Action-Packed', desc: 'Maximum highlights & high energy', icon: Zap },
  { id: 'Luxury', label: 'Luxury & Comfort', desc: 'Top tier stays, private chauffeurs', icon: Crown },
  { id: 'Backpacking', label: 'Backpacking', desc: 'Authentic local trails & hostels', icon: Backpack },
  { id: 'Family', label: 'Family Friendly', desc: 'Kid-friendly, spacious, safe pacing', icon: Users },
  { id: 'Couple', label: 'Romantic / Couple', desc: 'Intimate dining & romantic views', icon: HeartHandshake },
  { id: 'Solo', label: 'Solo Explorer', desc: 'Social vibes, flexible itinerary', icon: User },
];

const accommodations = [
  { id: 'budget', label: 'Budget Stays', icon: Home, desc: 'Cozy hostels & verified boutique homestays', price: '< ₹2,500/night' },
  { id: 'comfort', label: 'Comfort (3-Star)', icon: Building, desc: 'Central standard hotels with breakfast included', price: '₹2,500–₹5,500/night' },
  { id: 'premium', label: 'Premium (4-Star)', icon: Building2, desc: 'Upscale resorts with mountain/lake views', price: '₹5,500–₹11,000/night' },
  { id: 'luxury', label: 'Luxury (5-Star)', icon: Landmark, desc: 'Heritage palaces, luxury spas & private villas', price: '₹11,000+/night' },
];

const transports = [
  { id: 'flight', label: 'Flights', icon: Plane },
  { id: 'train', label: 'Scenic Trains', icon: Train },
  { id: 'bus', label: 'Luxury Coach', icon: Bus },
  { id: 'car', label: 'Private Cab', icon: Car },
  { id: 'mixed', label: 'Smart Combo', icon: Shuffle },
];

const steps = [
  { id: 'destination', label: 'Destination', icon: MapPin },
  { id: 'dates', label: 'Dates', icon: Calendar },
  { id: 'travelers', label: 'Travelers', icon: Users },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'accommodation', label: 'Stay', icon: Hotel },
  { id: 'transport', label: 'Transport', icon: Truck },
  { id: 'interests', label: 'Interests', icon: Tag },
  { id: 'style', label: 'Style', icon: Smile },
  { id: 'generate', label: 'Generate', icon: Sparkles },
];

interface PlannerState {
  destination: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  budget: number;
  accommodation: string;
  transport: string[];
  interests: string[];
  style: string;
}

const TripPlanner: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [aiSteps, setAiSteps] = useState<number>(-1);
  const [state, setState] = useState<PlannerState>({
    destination: searchParams.get('destination') ? 
      searchParams.get('destination')!.charAt(0).toUpperCase() + searchParams.get('destination')!.slice(1) : 'Kashmir',
    startDate: '2024-10-12',
    endDate: '2024-10-19',
    adults: 4,
    children: 0,
    budget: 50000,
    accommodation: 'premium',
    transport: ['flight', 'car'],
    interests: ['Nature', 'Adventure'],
    style: 'Balanced',
  });

  const [destSearch, setDestSearch] = useState(state.destination);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const aiLoadingSteps = [
    'Analyzing traveler group & pace preferences...',
    'Verifying seasonal weather & attraction hours...',
    'Calculating realistic transfer & travel times...',
    'Selecting optimal 4-star hotels within budget...',
    'Curating verified experiences & booking slots...',
    'Structuring transparent per-person budget...',
    'Finalizing dynamic adaptation checkpoints...',
  ];

  const isStepValid = () => {
    if (step === 0) return state.destination.length > 0;
    if (step === 1) return state.startDate && state.endDate;
    return true;
  };

  const next = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    if (step === steps.length - 2) startGeneration();
  };

  const startGeneration = async () => {
    setGenerating(true);
    for (let i = 0; i < aiLoadingSteps.length; i++) {
      await new Promise(r => setTimeout(r, 550));
      setAiSteps(i);
    }
    await new Promise(r => setTimeout(r, 600));
    navigate('/traveler/itinerary/kashmir');
  };

  const toggleInterest = (interestId: string) => {
    setState(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const toggleTransport = (t: string) => {
    setState(prev => ({
      ...prev,
      transport: prev.transport.includes(t)
        ? prev.transport.filter(x => x !== t)
        : [...prev.transport, t]
    }));
  };

  const filteredDests = destinations.filter(d => 
    d.toLowerCase().includes(destSearch.toLowerCase()) && d !== state.destination
  );

  const days = Math.max(1, Math.ceil((new Date(state.endDate).getTime() - new Date(state.startDate).getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      <Navbar variant="traveler" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8">
        {/* Progress & Breadcrumbs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
              STEP {step + 1} OF {steps.length}
            </span>
            <span className="text-xs text-brand-red font-bold flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-full">
              <Sparkles size={12} />
              {steps[step].label}
            </span>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-brand-red rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Step Icon Bar (Scrollable on small screens) */}
          <div className="flex justify-between items-center mt-3.5 overflow-x-auto hide-scrollbar gap-2 py-1">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => idx < step && setStep(idx)}
                  className={`flex flex-col items-center gap-1 flex-shrink-0 ${idx <= step ? 'cursor-pointer' : 'cursor-default opacity-50'}`}
                  title={s.label}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    idx === step ? 'bg-brand-red text-white shadow-red scale-110' :
                    idx < step ? 'bg-emerald-500 text-white' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {idx < step ? <Check size={14} /> : <Icon size={14} />}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium hidden sm:block">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Content Container */}
        <div className="card rounded-3xl p-6 sm:p-8 animate-fade-in shadow-card border border-gray-100 min-h-96">
          
          {/* Step 0: Destination */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">Where are you headed?</h2>
              <p className="text-gray-500 text-sm mb-6">Search or choose your destination</p>
              
              <div className="relative mb-4">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" />
                <input
                  type="text"
                  value={destSearch}
                  onChange={e => { setDestSearch(e.target.value); setShowDestSuggestions(true); }}
                  onFocus={() => setShowDestSuggestions(true)}
                  placeholder="Enter a destination (e.g. Kashmir, Goa, Bali)..."
                  className="input-field pl-12 py-3.5 text-base"
                />
              </div>
              
              {showDestSuggestions && filteredDests.length > 0 && (
                <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                  {filteredDests.map(d => (
                    <button
                      key={d}
                      onClick={() => {
                        setState(prev => ({ ...prev, destination: d }));
                        setDestSearch(d);
                        setShowDestSuggestions(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white transition-colors border-b border-gray-100 last:border-0 text-left"
                    >
                      <MapPin size={16} className="text-brand-red" />
                      <span className="text-gray-800 font-semibold text-sm">{d}</span>
                    </button>
                  ))}
                </div>
              )}

              {state.destination && (
                <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center shadow-xs">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base">{state.destination}</div>
                    <div className="text-xs text-gray-500">Selected destination</div>
                  </div>
                  <button onClick={() => { setState(prev => ({ ...prev, destination: '' })); setDestSearch(''); }}
                    className="ml-auto w-7 h-7 rounded-lg bg-red-100 text-brand-red flex items-center justify-center font-bold text-xs hover:bg-red-200">✕</button>
                </div>
              )}
              
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {destinations.map(d => (
                    <button
                      key={d}
                      onClick={() => { setState(prev => ({ ...prev, destination: d })); setDestSearch(d); setShowDestSuggestions(false); }}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center gap-1.5 ${
                        state.destination === d
                          ? 'bg-brand-red text-white border-brand-red shadow-xs'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-brand-red hover:text-brand-red'
                      }`}
                    >
                      <MapPin size={13} className={state.destination === d ? 'text-white' : 'text-gray-400'} />
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Dates */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">When are you traveling?</h2>
              <p className="text-gray-500 text-sm mb-6">Select departure and return dates</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Departure Date</label>
                  <input
                    type="date"
                    value={state.startDate}
                    onChange={e => setState(prev => ({ ...prev, startDate: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Return Date</label>
                  <input
                    type="date"
                    value={state.endDate}
                    onChange={e => setState(prev => ({ ...prev, endDate: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>
              {days > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center">
                  <div className="flex items-center justify-center gap-2 text-brand-red mb-1">
                    <Calendar size={18} />
                    <span className="text-3xl font-black">{days} Days</span>
                  </div>
                  <div className="text-gray-600 text-xs font-semibold">Duration automatically calculated</div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Travelers */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">Who is traveling?</h2>
              <p className="text-gray-500 text-sm mb-6">Tell us about your travel party size</p>
              {[
                { label: 'Adults', key: 'adults', sub: 'Ages 18 and above', val: state.adults },
                { label: 'Children', key: 'children', sub: 'Ages 0 to 17', val: state.children },
              ].map(({ label, key, sub, val }) => (
                <div key={key} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-black text-gray-900 text-base">{label}</p>
                    <p className="text-xs text-gray-400 font-medium">{sub}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setState(prev => ({ ...prev, [key]: Math.max(key === 'adults' ? 1 : 0, (prev as any)[key] - 1) }))}
                      className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 font-black text-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-black text-gray-900 text-lg w-6 text-center">{val}</span>
                    <button
                      onClick={() => setState(prev => ({ ...prev, [key]: (prev as any)[key] + 1 }))}
                      className="w-10 h-10 rounded-xl bg-brand-red text-white font-black text-lg hover:bg-red-700 transition-colors flex items-center justify-center shadow-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-200">
                <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
                  <Users size={18} className="text-brand-red" />
                  <span>Total Group Size</span>
                </div>
                <span className="font-black text-gray-900 text-xl">{state.adults + state.children} Travelers</span>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">What is your budget?</h2>
              <p className="text-gray-500 text-sm mb-6">Target budget per person for the full itinerary</p>
              
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl font-black text-brand-red">₹{state.budget.toLocaleString('en-IN')}</div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">per traveler</div>
              </div>

              <input
                type="range"
                min={15000}
                max={200000}
                step={5000}
                value={state.budget}
                onChange={e => setState(prev => ({ ...prev, budget: +e.target.value }))}
                className="w-full h-2.5 accent-brand-red bg-gray-200 rounded-full mb-3 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 font-bold mb-6">
                <span>₹15,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000+</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: 'Budget', val: 25000 },
                  { label: 'Mid-Range', val: 50000 },
                  { label: 'Luxury', val: 120000 }
                ].map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => setState(prev => ({ ...prev, budget: opt.val }))}
                    className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all ${
                      state.budget === opt.val
                        ? 'bg-brand-red text-white border-brand-red shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-brand-red'
                    }`}
                  >
                    {opt.label}
                    <div className="text-xs font-normal opacity-80 mt-0.5">₹{(opt.val/1000)}K</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Accommodation */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">Where would you like to stay?</h2>
              <p className="text-gray-500 text-sm mb-6">Select your accommodation tier</p>
              <div className="space-y-3">
                {accommodations.map(acc => {
                  const AccIcon = acc.icon;
                  const isSelected = state.accommodation === acc.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => setState(prev => ({ ...prev, accommodation: acc.id }))}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-brand-red bg-red-50/70 shadow-xs'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-brand-red text-white shadow-xs' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <AccIcon size={22} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-gray-900 text-sm sm:text-base">{acc.label}</div>
                        <div className="text-xs text-gray-500">{acc.desc}</div>
                        <div className="text-xs text-brand-red font-bold mt-0.5">{acc.price}</div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center shadow-xs">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Transport */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">How would you like to travel?</h2>
              <p className="text-gray-500 text-sm mb-6">Choose one or more modes of transport</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {transports.map(t => {
                  const TIcon = t.icon;
                  const isSelected = state.transport.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTransport(t.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-brand-red bg-red-50/70 shadow-xs'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 ${
                        isSelected ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <TIcon size={22} />
                      </div>
                      <span className="text-xs font-bold text-gray-800 text-center">{t.label}</span>
                      {isSelected && (
                        <span className="mt-1 bg-red-100 text-brand-red text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 6: Interests */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">What are your interests?</h2>
              <p className="text-gray-500 text-sm mb-6">Select your top travel themes</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestsList.map(interest => {
                  const IIcon = interest.icon;
                  const isSelected = state.interests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-brand-red bg-red-50/70 shadow-xs'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <IIcon size={18} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-800 flex-1">{interest.label}</span>
                      {isSelected && (
                        <Check size={16} className="text-brand-red" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 7: Travel Style */}
          {step === 7 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">What is your travel rhythm?</h2>
              <p className="text-gray-500 text-sm mb-6">Choose the style that matches your group</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {travelStylesList.map(style => {
                  const SIcon = style.icon;
                  const isSelected = state.style === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setState(prev => ({ ...prev, style: style.id }))}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-brand-red bg-red-50/70 shadow-xs'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-brand-red text-white shadow-xs' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <SIcon size={20} />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-gray-900 text-sm block">{style.label}</span>
                        <span className="text-xs text-gray-500 font-normal leading-relaxed">{style.desc}</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-brand-red rounded-full flex items-center justify-center shadow-xs flex-shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 8: Ready to Generate & Simulation */}
          {step === 8 && (
            <div className="text-center py-2">
              {!generating ? (
                <>
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <Sparkles size={32} className="text-brand-red" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Ready to Build Itinerary!</h2>
                  <p className="text-gray-500 text-sm mb-6">Review your personalized preferences summary:</p>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 mb-6 border border-gray-200">
                    {[
                      { label: 'Destination', value: state.destination, icon: MapPin },
                      { label: 'Dates', value: `${state.startDate} → ${state.endDate} (${days} days)`, icon: Calendar },
                      { label: 'Travelers', value: `${state.adults} adults${state.children > 0 ? `, ${state.children} children` : ''}`, icon: Users },
                      { label: 'Budget Target', value: `₹${state.budget.toLocaleString('en-IN')}/person`, icon: Wallet },
                      { label: 'Stay Category', value: accommodations.find(a => a.id === state.accommodation)?.label || '', icon: Hotel },
                      { label: 'Transport', value: state.transport.join(', ').toUpperCase(), icon: Truck },
                      { label: 'Travel Rhythm', value: state.style, icon: Smile },
                    ].map(({ label, value, icon: ItemIcon }) => (
                      <div key={label} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <ItemIcon size={14} className="text-brand-red" />
                          {label}
                        </span>
                        <span className="font-bold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={startGeneration}
                    className="w-full bg-brand-red text-white py-4 rounded-2xl font-black text-base hover:bg-red-700 transition-colors flex items-center justify-center gap-2.5 shadow-red"
                  >
                    <Sparkles size={20} />
                    Generate My Personalized Itinerary
                  </button>
                </>
              ) : (
                <div className="py-4">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-red-100 rounded-full animate-spin-slow border-t-brand-red"></div>
                    <div className="absolute inset-2 border-4 border-red-50 rounded-full animate-spin border-t-red-400" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles size={24} className="text-brand-red animate-pulse" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-1">WAYVO AI Engine Active</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-6">Synthesizing personalized options for {state.destination}...</p>
                  
                  <div className="space-y-2.5 text-left bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    {aiLoadingSteps.map((s, idx) => (
                      <div key={idx} className={`flex items-center gap-2.5 transition-all duration-300 ${idx <= aiSteps ? 'opacity-100' : 'opacity-25'}`}>
                        {idx < aiSteps ? (
                          <div className="w-5 h-5 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-white" />
                          </div>
                        ) : idx === aiSteps ? (
                          <div className="w-5 h-5 border-2 border-brand-red rounded-lg flex-shrink-0 animate-spin border-t-transparent"></div>
                        ) : (
                          <div className="w-5 h-5 border border-gray-300 rounded-lg flex-shrink-0"></div>
                        )}
                        <span className={`text-xs sm:text-sm ${idx === aiSteps ? 'text-brand-red font-bold' : idx < aiSteps ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step Navigation Actions */}
        {step !== 8 && (
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-gray-300 bg-white text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors shadow-xs"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <button
              onClick={next}
              disabled={!isStepValid()}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-red"
            >
              {step === steps.length - 2 ? (
                <><Sparkles size={16} /> Generate My Trip</>
              ) : (
                <>Next Step <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default TripPlanner;
