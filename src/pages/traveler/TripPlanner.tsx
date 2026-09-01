import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users, Wallet, Hotel, Truck, Tag, Smile, Sparkles, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

const destinations = ['Kashmir', 'Goa', 'Manali', 'Kerala', 'Rajasthan', 'Ladakh', 'Bali', 'Dubai', 'Singapore', 'Maldives'];
const interests = ['🏔️ Nature', '🧗 Adventure', '🍽️ Food', '🎭 Culture', '🛍️ Shopping', '🌃 Nightlife', '📷 Photography', '🧘 Wellness', '🏛️ History', '🏖️ Beaches'];
const travelStyles = ['Relaxed', 'Balanced', 'Fast-paced', 'Luxury', 'Backpacking', 'Family', 'Couple', 'Solo'];
const accommodations = [
  { id: 'budget', label: 'Budget', icon: '🏠', desc: 'Hostels & guesthouses', price: '< ₹2,000/night' },
  { id: 'comfort', label: 'Comfort', icon: '🏨', desc: '3-star hotels', price: '₹2,000–₹5,000/night' },
  { id: 'premium', label: 'Premium', icon: '🏩', desc: '4-star hotels & resorts', price: '₹5,000–₹10,000/night' },
  { id: 'luxury', label: 'Luxury', icon: '🏰', desc: '5-star & boutique', price: '₹10,000+/night' },
];
const transports = [
  { id: 'flight', label: 'Flight', icon: '✈️' },
  { id: 'train', label: 'Train', icon: '🚆' },
  { id: 'bus', label: 'Bus', icon: '🚌' },
  { id: 'car', label: 'Car', icon: '🚗' },
  { id: 'mixed', label: 'Mixed', icon: '🔀' },
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
      searchParams.get('destination')!.charAt(0).toUpperCase() + searchParams.get('destination')!.slice(1) : '',
    startDate: '2024-10-12',
    endDate: '2024-10-19',
    adults: 4,
    children: 0,
    budget: 50000,
    accommodation: 'premium',
    transport: ['flight'],
    interests: ['🏔️ Nature', '🧗 Adventure'],
    style: 'Balanced',
  });

  const [destSearch, setDestSearch] = useState(state.destination);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const aiLoadingSteps = [
    'Analyzing your preferences...',
    'Checking destination availability...',
    'Optimizing route & transport...',
    'Selecting best hotels within budget...',
    'Curating activities & experiences...',
    'Calculating complete budget...',
    'Finalizing your personalized itinerary...',
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
      await new Promise(r => setTimeout(r, 600));
      setAiSteps(i);
    }
    await new Promise(r => setTimeout(r, 600));
    navigate('/traveler/itinerary/kashmir');
  };

  const toggleInterest = (interest: string) => {
    setState(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
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

  const days = Math.ceil((new Date(state.endDate).getTime() - new Date(state.startDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-xs text-brand-red font-semibold">
              {steps[step].label}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-1.5 bg-brand-red rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Step icons */}
          <div className="flex justify-between mt-3">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => idx < step && setStep(idx)}
                  className={`flex flex-col items-center gap-1 ${idx <= step ? 'cursor-pointer' : 'cursor-default'}`}
                  title={s.label}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    idx === step ? 'bg-brand-red text-white shadow-red' :
                    idx < step ? 'bg-green-500 text-white' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {idx < step ? <Check size={14} /> : <Icon size={14} />}
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:block">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Content */}
        <div className="card animate-fade-in min-h-96">
          {/* Step 0: Destination */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Where do you want to go?</h2>
              <p className="text-gray-500 text-sm mb-6">Choose your dream destination</p>
              
              <div className="relative mb-4">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" />
                <input
                  type="text"
                  value={destSearch}
                  onChange={e => { setDestSearch(e.target.value); setShowDestSuggestions(true); }}
                  onFocus={() => setShowDestSuggestions(true)}
                  placeholder="Search destinations..."
                  className="input-field pl-12"
                />
              </div>
              
              {showDestSuggestions && filteredDests.length > 0 && (
                <div className="bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-200">
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
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">{d}</span>
                    </button>
                  ))}
                </div>
              )}

              {state.destination && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{state.destination}</div>
                    <div className="text-xs text-gray-500">Selected destination</div>
                  </div>
                  <button onClick={() => { setState(prev => ({ ...prev, destination: '' })); setDestSearch(''); }}
                    className="ml-auto text-gray-400 hover:text-gray-600">✕</button>
                </div>
              )}
              
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-3">Popular destinations</p>
                <div className="flex flex-wrap gap-2">
                  {destinations.slice(0, 8).map(d => (
                    <button
                      key={d}
                      onClick={() => { setState(prev => ({ ...prev, destination: d })); setDestSearch(d); setShowDestSuggestions(false); }}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all border ${
                        state.destination === d
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-gray-100 text-gray-600 border-transparent hover:border-brand-red hover:text-brand-red'
                      }`}
                    >
                      📍 {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Dates */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">When are you traveling?</h2>
              <p className="text-gray-500 text-sm mb-6">Select your travel dates</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={state.startDate}
                    onChange={e => setState(prev => ({ ...prev, startDate: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={state.endDate}
                    onChange={e => setState(prev => ({ ...prev, endDate: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>
              {days > 0 && (
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-brand-red">{days}</div>
                  <div className="text-gray-600 text-sm font-medium">days of adventure</div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Travelers */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Who's traveling?</h2>
              <p className="text-gray-500 text-sm mb-6">Tell us about your group</p>
              {[
                { label: 'Adults', key: 'adults', sub: '18+ years', val: state.adults },
                { label: 'Children', key: 'children', sub: 'Under 18', val: state.children },
              ].map(({ label, key, sub, val }) => (
                <div key={key} className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-bold text-gray-900">{label}</p>
                    <p className="text-sm text-gray-400">{sub}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setState(prev => ({ ...prev, [key]: Math.max(key === 'adults' ? 1 : 0, (prev as any)[key] - 1) }))}
                      className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-black text-gray-900 text-xl w-6 text-center">{val}</span>
                    <button
                      onClick={() => setState(prev => ({ ...prev, [key]: (prev as any)[key] + 1 }))}
                      className="w-10 h-10 rounded-full bg-brand-red text-white font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 bg-gray-50 rounded-xl p-4 text-center">
                <span className="font-black text-gray-900 text-2xl">{state.adults + state.children}</span>
                <span className="text-gray-500 text-sm ml-2">total travelers</span>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">What's your budget?</h2>
              <p className="text-gray-500 text-sm mb-6">Budget per person for the entire trip</p>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-brand-red">₹{state.budget.toLocaleString('en-IN')}</div>
                <div className="text-gray-400 text-sm mt-1">per person</div>
              </div>

              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={state.budget}
                onChange={e => setState(prev => ({ ...prev, budget: +e.target.value }))}
                className="w-full h-2 accent-brand-red rounded-full mb-4 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mb-6">
                <span>₹10,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Budget', val: 25000 }, { label: 'Mid-range', val: 50000 }, { label: 'Luxury', val: 150000 }].map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => setState(prev => ({ ...prev, budget: opt.val }))}
                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                      state.budget === opt.val
                        ? 'bg-brand-red text-white border-brand-red'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-red'
                    }`}
                  >
                    {opt.label}
                    <div className="text-xs font-normal mt-0.5">₹{(opt.val/1000)}K</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Accommodation */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Where would you like to stay?</h2>
              <p className="text-gray-500 text-sm mb-6">Choose your accommodation style</p>
              <div className="space-y-3">
                {accommodations.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => setState(prev => ({ ...prev, accommodation: acc.id }))}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      state.accommodation === acc.id
                        ? 'border-brand-red bg-red-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl">{acc.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-gray-900">{acc.label}</div>
                      <div className="text-sm text-gray-500">{acc.desc}</div>
                      <div className="text-xs text-brand-red font-semibold mt-0.5">{acc.price}</div>
                    </div>
                    {state.accommodation === acc.id && (
                      <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Transport */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">How would you like to travel?</h2>
              <p className="text-gray-500 text-sm mb-6">Select one or more transport modes</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {transports.map(t => (
                  <button
                    key={t.id}
                    onClick={() => toggleTransport(t.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      state.transport.includes(t.id)
                        ? 'border-brand-red bg-red-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl">{t.icon}</span>
                    <span className="text-xs font-semibold text-gray-700">{t.label}</span>
                    {state.transport.includes(t.id) && (
                      <div className="w-5 h-5 bg-brand-red rounded-full flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Interests */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">What are your interests?</h2>
              <p className="text-gray-500 text-sm mb-6">Select all that apply</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`flex items-center gap-2 p-3.5 rounded-2xl border-2 transition-all text-left ${
                      state.interests.includes(interest)
                        ? 'border-brand-red bg-red-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl">{interest.split(' ')[0]}</span>
                    <span className="text-sm font-semibold text-gray-700">{interest.split(' ').slice(1).join(' ')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Travel Style */}
          {step === 7 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">What's your travel style?</h2>
              <p className="text-gray-500 text-sm mb-6">How do you like to experience destinations?</p>
              <div className="grid grid-cols-2 gap-3">
                {travelStyles.map(style => {
                  const icons: Record<string, string> = {
                    'Relaxed': '😌', 'Balanced': '⚖️', 'Fast-paced': '⚡', 'Luxury': '👑',
                    'Backpacking': '🎒', 'Family': '👨‍👩‍👧‍👦', 'Couple': '💑', 'Solo': '🧑'
                  };
                  return (
                    <button
                      key={style}
                      onClick={() => setState(prev => ({ ...prev, style }))}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        state.style === style
                          ? 'border-brand-red bg-red-50'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{icons[style]}</span>
                      <span className="font-semibold text-gray-700">{style}</span>
                      {state.style === style && (
                        <div className="ml-auto w-5 h-5 bg-brand-red rounded-full flex items-center justify-center">
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 8: Generate */}
          {step === 8 && (
            <div className="text-center py-4">
              {!generating ? (
                <>
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles size={36} className="text-brand-red" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-3">Ready to generate!</h2>
                  <p className="text-gray-500 mb-6">Here's your trip summary:</p>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 mb-6">
                    {[
                      { label: 'Destination', value: state.destination },
                      { label: 'Dates', value: `${state.startDate} → ${state.endDate} (${days} days)` },
                      { label: 'Travelers', value: `${state.adults} adults${state.children > 0 ? `, ${state.children} children` : ''}` },
                      { label: 'Budget', value: `₹${state.budget.toLocaleString('en-IN')}/person` },
                      { label: 'Stay', value: accommodations.find(a => a.id === state.accommodation)?.label || '' },
                      { label: 'Transport', value: state.transport.join(', ') },
                      { label: 'Style', value: state.style },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{label}</span>
                        <span className="text-sm font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={startGeneration}
                    className="w-full bg-brand-red text-white py-4 rounded-xl font-black text-base hover:bg-red-700 transition-colors flex items-center justify-center gap-3 shadow-red"
                  >
                    <Sparkles size={20} />
                    Generate My Personalized Trip
                  </button>
                </>
              ) : (
                <div className="py-6">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-red-100 rounded-full animate-spin-slow border-t-brand-red"></div>
                    <div className="absolute inset-3 border-4 border-red-50 rounded-full animate-spin border-t-red-300" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles size={24} className="text-brand-red" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-2">WAYVO AI is designing your journey</h3>
                  <p className="text-gray-400 text-sm mb-8">Crafting your perfect {state.destination} experience...</p>
                  
                  <div className="space-y-3 text-left">
                    {aiLoadingSteps.map((s, idx) => (
                      <div key={idx} className={`flex items-center gap-3 transition-all duration-300 ${idx <= aiSteps ? 'opacity-100' : 'opacity-30'}`}>
                        {idx < aiSteps ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-white" />
                          </div>
                        ) : idx === aiSteps ? (
                          <div className="w-5 h-5 border-2 border-brand-red rounded-full flex-shrink-0 animate-spin border-t-transparent"></div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-200 rounded-full flex-shrink-0"></div>
                        )}
                        <span className={`text-sm ${idx === aiSteps ? 'text-brand-red font-semibold' : idx < aiSteps ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
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

        {/* Navigation */}
        {step !== 8 && (
          <div className="flex gap-4 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <button
              onClick={next}
              disabled={!isStepValid()}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-red"
            >
              {step === steps.length - 2 ? (
                <><Sparkles size={16} /> Generate My Trip</>
              ) : (
                <>Continue <ArrowRight size={16} /></>
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
