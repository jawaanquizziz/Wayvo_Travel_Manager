import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Sparkles, MapPin, Calendar, Users, Wallet,
  ChevronRight, Star, Zap, Globe, Shield, RefreshCw, Play, Bot
} from 'lucide-react';
import Navbar from '../components/Navbar';

const howItWorksSteps = [
  { num: '01', title: 'Discover', desc: 'Find destinations that match your travel style and budget.', icon: '🔍' },
  { num: '02', title: 'Personalize', desc: 'Set your preferences, interests, and accommodation type.', icon: '🎯' },
  { num: '03', title: 'Plan', desc: 'AI builds a detailed day-by-day itinerary for you.', icon: '📅' },
  { num: '04', title: 'Price', desc: 'Get transparent pricing with every detail included.', icon: '💰' },
  { num: '05', title: 'Book', desc: 'Confirm your trip with secure, instant booking.', icon: '✅' },
  { num: '06', title: 'Prepare', desc: 'Get your checklist, documents, and tips ready.', icon: '🎒' },
  { num: '07', title: 'Operate', desc: 'Operators coordinate every detail in real-time.', icon: '⚙️' },
  { num: '08', title: 'Assist', desc: 'AI travel assistant is available 24/7 during your trip.', icon: '🤖' },
  { num: '09', title: 'Adapt', desc: 'Plans change automatically when conditions change.', icon: '🔄' },
  { num: '10', title: 'Complete', desc: 'Finish your journey with all details wrapped up.', icon: '🏁' },
  { num: '11', title: 'Review', desc: 'Share your experience and help others plan better.', icon: '⭐' },
];

const features = [
  {
    icon: '🎯',
    title: 'Personalized',
    desc: 'Build a trip around your interests, budget and travel style. No two journeys are the same.',
    color: 'bg-blue-50',
  },
  {
    icon: '🔄',
    title: 'Dynamic',
    desc: 'Adapt your itinerary when plans, availability or conditions change — instantly.',
    color: 'bg-green-50',
  },
  {
    icon: '🔗',
    title: 'Connected',
    desc: 'Coordinate travelers, hotels, transport, activities and operators in one place.',
    color: 'bg-purple-50',
  },
  {
    icon: '🤖',
    title: 'Intelligent',
    desc: 'AI recommendations help you make better travel decisions at every step.',
    color: 'bg-orange-50',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'WAYVO planned our entire Kashmir trip in minutes. When the hotel had issues, it instantly found alternatives. Truly magical.',
    rating: 5,
    trip: 'Kashmir, 7 days',
    avatar: 'PS',
  },
  {
    name: 'Arjun Mehta',
    location: 'Bangalore',
    text: 'The dynamic itinerary feature saved our Goa trip when our flight got delayed. WAYVO rescheduled everything automatically!',
    rating: 5,
    trip: 'Goa, 5 days',
    avatar: 'AM',
  },
  {
    name: 'Sneha Kapoor',
    location: 'Delhi',
    text: 'Finally, a travel platform that understands I want adventure, not a fixed package. WAYVO is the future of travel.',
    rating: 5,
    trip: 'Ladakh, 10 days',
    avatar: 'SK',
  },
];

const TripPlannerCard = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-8 right-8 hidden lg:block w-72">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-5 border border-white/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-brand-red rounded-lg flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">AI Trip Planner</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Live</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <MapPin size={16} className="text-brand-red flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400">Route</div>
              <div className="text-sm font-semibold text-gray-800">Mumbai → Kashmir</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400">Duration</div>
              <div className="text-sm font-bold text-gray-800">7 Days</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400">Travelers</div>
              <div className="text-sm font-bold text-gray-800">4 People</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs text-gray-400 mb-1">Budget</div>
            <div className="text-base font-bold text-gray-800">₹45,000 <span className="text-gray-400 font-normal text-xs">/ person</span></div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={12} className="text-green-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium">AI Optimized</span>
            <div className="ml-auto bg-red-50 px-2 py-0.5 rounded-full">
              <span className="text-xs font-bold text-brand-red">94% match</span>
            </div>
          </div>
          {['Hotels ✓', 'Transport ✓', 'Activities ✓'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={12} className="text-green-600" />
              </div>
              <span className="text-xs text-gray-600">{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/traveler/plan')}
          className="mt-4 w-full bg-brand-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles size={14} />
          Generate Trip
        </button>
      </div>
    </div>
  );
};

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const styles = ['Adventure', 'Relaxed', 'Cultural', 'Luxury', 'Family', 'Solo'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Kashmir mountains"
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={14} className="text-yellow-400" />
              AI-Powered Travel Intelligence
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Your trip.
              <br />
              <span className="text-brand-red">Your choices.</span>
              <br />
              One journey.
            </h1>

            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Build personalized trips, optimize every detail, and adapt your journey in real time — all from one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/traveler/plan')}
                className="inline-flex items-center gap-2 bg-brand-red text-white px-8 py-4 rounded-full font-bold text-base hover:bg-red-700 hover:shadow-red-lg transition-all duration-200 active:scale-95"
              >
                <Sparkles size={18} />
                Plan My Trip
                <ArrowRight size={16} />
              </button>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all duration-200"
              >
                <Play size={16} className="fill-white" />
                See How It Works
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-2">
                {['#E8173A', '#3B82F6', '#10B981', '#F59E0B'].map((color, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center" style={{ background: color }}>
                    <span className="text-white text-xs font-bold">
                      {['A', 'R', 'P', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-white/70 text-xs mt-0.5">Trusted by 50,000+ travelers</p>
              </div>
            </div>
          </div>

          {/* Floating Trip Card */}
          <TripPlannerCard />
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '50K+', label: 'Happy Travelers' },
              { value: '200+', label: 'Destinations' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'AI Assistance' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why WAYVO */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap size={14} />
              Why WAYVO?
            </div>
            <h2 className="section-title">Travel reimagined,<br /><span className="gradient-text">from the ground up</span></h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              From fixed packages to fully personalized, dynamically managed journeys — WAYVO changes what's possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc, color }) => (
              <div key={title} className="card-hover group p-8">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-200`}>
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <RefreshCw size={14} />
              The Journey
            </div>
            <h2 className="section-title">Complete lifecycle,<br />beautifully handled</h2>
            <p className="section-subtitle">Every step of your journey, from dream to destination.</p>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible">
            {howItWorksSteps.map((step, idx) => (
              <div key={step.num} className="flex-shrink-0 w-44 lg:w-auto group">
                <div className="card-hover p-5 text-center relative">
                  {idx < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-300">
                      <ChevronRight size={20} />
                    </div>
                  )}
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className="text-brand-red font-black text-xs mb-1">{step.num}</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed hidden lg:block">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Builder Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles size={14} />
                Personalized Planner
              </div>
              <h2 className="section-title mb-6">Build your perfect<br />trip in minutes</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Tell WAYVO where you want to go, your budget, travel style, and preferences. 
                Our AI builds you a complete, detailed itinerary — hotels, transport, activities, and meals included.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Multi-step personalization wizard',
                  'AI-generated day-by-day itinerary',
                  'Real-time budget optimization',
                  'One-click modifications',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/traveler/plan')}
                className="btn-primary"
              >
                Start Planning <ArrowRight size={16} />
              </button>
            </div>

            {/* Interactive Preview */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">Quick Planner</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Where do you want to go?</label>
                  <div className="input-field flex items-center gap-2 cursor-pointer" onClick={() => navigate('/traveler/plan')}>
                    <MapPin size={16} className="text-brand-red" />
                    <span className="text-gray-700">Kashmir, India</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Start Date</label>
                    <div className="input-field flex items-center gap-2 cursor-pointer" onClick={() => navigate('/traveler/plan')}>
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700">12 Oct</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">End Date</label>
                    <div className="input-field flex items-center gap-2 cursor-pointer" onClick={() => navigate('/traveler/plan')}>
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700">19 Oct</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Budget (per person)</label>
                  <div className="px-4 py-3 bg-white border border-gray-200 rounded-xl">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>₹30,000</span>
                      <span className="font-bold text-brand-red">₹50,000</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-brand-red rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Travel Style</label>
                  <div className="flex flex-wrap gap-2">
                    {styles.map(style => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(prev =>
                          prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
                        )}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedStyle.includes(style)
                            ? 'bg-brand-red text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Travelers</label>
                  <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <Users size={16} className="text-gray-400" />
                    <div className="flex items-center gap-3">
                      <button className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 flex items-center justify-center">−</button>
                      <span className="font-bold text-gray-800 w-4 text-center">4</span>
                      <button className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 flex items-center justify-center">+</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/traveler/plan')}
                  className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  Build My Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Intelligence Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Bot size={14} className="text-yellow-400" />
                Travel Intelligence Engine
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
                Travel plans change.<br />
                <span className="text-brand-red">WAYVO changes</span><br />
                with them.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                WAYVO continuously analyzes your trip and automatically resolves conflicts, 
                suggests alternatives, and keeps your journey on track — even when the unexpected happens.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  'Budget & preferences', 'Real-time availability',
                  'Transport dependencies', 'Unexpected changes',
                  'Time optimization', 'Vendor coordination',
                  'Group preferences', 'Weather & conditions',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full flex-shrink-0"></div>
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/traveler/itinerary/kashmir')}
                className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3.5 rounded-full font-bold hover:bg-red-600 transition-colors"
              >
                See It in Action <ArrowRight size={16} />
              </button>
            </div>

            {/* Right: AI Flow Visual */}
            <div className="space-y-3">
              {[
                { icon: '📅', label: 'Original Plan', desc: 'Day 3: Snowmobile at Gulmarg 10:00 AM', color: 'bg-white/10', border: 'border-white/20' },
                { icon: '⚠️', label: 'Unexpected Change', desc: 'Snowmobile activity — unavailable due to weather', color: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
                { icon: '🔍', label: 'WAYVO Detects Conflict', desc: 'Impact: Day 3 activity gap + budget release of ₹3,000', color: 'bg-blue-500/20', border: 'border-blue-500/30' },
                { icon: '💡', label: 'Alternative Suggestions', desc: '3 alternatives found within budget + schedule', color: 'bg-purple-500/20', border: 'border-purple-500/30' },
                { icon: '✅', label: 'Optimized Itinerary', desc: 'Gondola + Mountain Café selected — saving ₹1,100', color: 'bg-green-500/20', border: 'border-green-500/30' },
              ].map((step, idx) => (
                <div key={step.label} className="flex items-start gap-4">
                  <div className={`flex-1 ${step.color} border ${step.border} rounded-2xl p-4 transition-all hover:scale-[1.01]`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{step.icon}</span>
                      <div>
                        <p className="text-white font-semibold text-sm">{step.label}</p>
                        <p className="text-white/60 text-xs mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                  {idx < 4 && (
                    <div className="flex flex-col items-center justify-center mt-2">
                      <div className="w-px h-4 bg-white/20"></div>
                      <div className="text-white/30 text-xs">↓</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operator Preview */}
      <section id="operators" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Operator Dashboard Preview */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-800 rounded-lg h-6 mx-2"></div>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Active Tours', value: '24' },
                    { label: 'Travelers', value: '186' },
                    { label: 'Revenue', value: '₹18.6L' },
                    { label: 'Bookings', value: '312' },
                  ].map(m => (
                    <div key={m.label} className="bg-gray-800 rounded-xl p-3">
                      <div className="text-gray-400 text-xs">{m.label}</div>
                      <div className="text-white font-bold text-lg">{m.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-red-400 font-semibold text-sm">Attention Required</span>
                  </div>
                  <p className="text-white text-sm font-medium">⚠ Flight delay — Kashmir Group #WV204</p>
                  <p className="text-gray-400 text-xs mt-1">IndiGo 6E204 delayed by 2 hours. 4 travelers affected.</p>
                  <div className="flex gap-2 mt-3">
                    <button className="bg-brand-red text-white px-3 py-1.5 rounded-lg text-xs font-bold">Apply Fix</button>
                    <button className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-xs">Review</button>
                  </div>
                </div>

                <div className="space-y-2">
                  {['WV203 · Kerala — On Schedule ✓', 'WV202 · Rajasthan — Day 5 Active ✓', 'WV195 · Ladakh — Departing Oct 20'].map(tour => (
                    <div key={tour} className="bg-gray-800 rounded-xl px-4 py-2.5 text-gray-300 text-xs font-medium">
                      {tour}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Globe size={14} />
                For Tour Operators
              </div>
              <h2 className="section-title mb-6">One control center<br />for every journey</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Stop managing tours across spreadsheets, WhatsApp groups, and phone calls. 
                WAYVO gives operators a single operations center for every personalized tour.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '👥', label: 'Traveler Management' },
                  { icon: '🏨', label: 'Vendor Coordination' },
                  { icon: '💳', label: 'Payment Tracking' },
                  { icon: '⚙️', label: 'Real-time Operations' },
                  { icon: '📊', label: 'Analytics Dashboard' },
                  { icon: '🤖', label: 'AI Risk Detection' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary"
              >
                Explore Operator Tools <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Loved by travelers<br /><span className="gradient-text">across India & beyond</span></h2>
            <p className="section-subtitle">Real stories from real WAYVO users.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card-hover p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location} · {t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-red text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">Ready to travel differently?</h2>
          <p className="text-white/80 text-xl mb-10 leading-relaxed">
            From dream to destination — intelligently planned, dynamically managed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/traveler/plan')}
              className="inline-flex items-center gap-2 bg-white text-brand-red px-8 py-4 rounded-full font-black text-base hover:bg-gray-100 transition-colors active:scale-95"
            >
              <Sparkles size={18} />
              Start Planning Now
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-colors"
            >
              Tour Operator? Join Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg">W</span>
                </div>
                <span className="font-black text-xl">WAYVO</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Travel your way. Adapt as you go. From dream to destination, intelligently.
              </p>
            </div>
            {[
              { title: 'Travelers', links: ['Discover', 'Plan Trip', 'My Trips', 'AI Assistant'] },
              { title: 'Operators', links: ['Dashboard', 'Tours', 'Operations', 'Analytics'] },
              { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-4 text-gray-200">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <Link to={link === 'Dashboard' ? '/operator' : link === 'Plan Trip' ? '/traveler/plan' : '/traveler'}
                        className="text-gray-400 text-sm hover:text-white transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2024 WAYVO. All rights reserved.</p>
            <p className="text-gray-500 text-sm">Built with ❤️ for travelers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
