import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Sparkles, MapPin, Calendar, Users,
  ChevronRight, Star, Zap, Globe, RefreshCw, Play, Bot,
  Compass, Sliders, CalendarDays, Receipt, CheckCheck,
  PackageCheck, Cpu, MessageSquareQuote, CheckCircle2,
  TrendingUp, ShieldCheck, PhoneCall, Layers, HeartHandshake
} from 'lucide-react';
import Navbar from '../components/Navbar';

const howItWorksSteps = [
  { num: '01', title: 'Discover', desc: 'Find destinations tailored to your travel style and budget.', icon: Compass, color: 'from-blue-500/20 to-blue-600/10 text-blue-600' },
  { num: '02', title: 'Personalize', desc: 'Set your interests, preferred pace, and accommodation tier.', icon: Sliders, color: 'from-purple-500/20 to-purple-600/10 text-purple-600' },
  { num: '03', title: 'Plan', desc: 'AI generates a realistic, balanced day-by-day itinerary in seconds.', icon: CalendarDays, color: 'from-red-500/20 to-red-600/10 text-brand-red' },
  { num: '04', title: 'Price', desc: 'Complete transparent cost breakdown with zero hidden fees.', icon: Receipt, color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-600' },
  { num: '05', title: 'Book', desc: 'Instant multi-vendor confirmation via secure one-click checkout.', icon: CheckCheck, color: 'from-teal-500/20 to-teal-600/10 text-teal-600' },
  { num: '06', title: 'Prepare', desc: 'Interactive packing checklists, vouchers, and emergency contacts.', icon: PackageCheck, color: 'from-amber-500/20 to-amber-600/10 text-amber-600' },
  { num: '07', title: 'Operate', desc: 'Real-time ground coordination linking drivers, hotels, and guides.', icon: Layers, color: 'from-indigo-500/20 to-indigo-600/10 text-indigo-600' },
  { num: '08', title: 'Assist', desc: '24/7 proactive AI travel concierge always by your side.', icon: Bot, color: 'from-pink-500/20 to-pink-600/10 text-pink-600' },
  { num: '09', title: 'Adapt', desc: 'Smart automated adjustments when weather or flights change.', icon: RefreshCw, color: 'from-rose-500/20 to-rose-600/10 text-brand-red' },
  { num: '10', title: 'Complete', desc: 'Seamless departure wrap-up and digital memories organized.', icon: ShieldCheck, color: 'from-sky-500/20 to-sky-600/10 text-sky-600' },
  { num: '11', title: 'Review', desc: 'Share your feedback to continuously enhance future journeys.', icon: HeartHandshake, color: 'from-orange-500/20 to-orange-600/10 text-orange-600' },
];

const features = [
  {
    icon: Sliders,
    title: 'Personalized',
    desc: 'Build every trip around your unique interests, budget, and rhythm. No rigid fixed packages.',
    iconBg: 'bg-blue-50 text-blue-600',
  },
  {
    icon: RefreshCw,
    title: 'Dynamic Adaptation',
    desc: 'Instantly re-route schedules, swap activities, and adjust budgets when unexpected delays occur.',
    iconBg: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Layers,
    title: 'Connected Operations',
    desc: 'Synchronize travelers, drivers, luxury hotels, and local operators on a single live dashboard.',
    iconBg: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Bot,
    title: 'Intelligent AI',
    desc: 'Machine intelligence that optimizes routes, predicts schedule bottlenecks, and saves costs.',
    iconBg: 'bg-rose-50 text-brand-red',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'WAYVO planned our entire Kashmir trip in minutes. When an activity was closed, it instantly recommended a picturesque alternative within budget. Truly magical!',
    rating: 5,
    trip: 'Kashmir, 7 days',
    avatar: 'PS',
  },
  {
    name: 'Arjun Mehta',
    location: 'Bangalore',
    text: 'The dynamic itinerary engine saved our group when our flight was delayed. WAYVO coordinated with our driver and hotel automatically.',
    rating: 5,
    trip: 'Goa, 5 days',
    avatar: 'AM',
  },
  {
    name: 'Sneha Kapoor',
    location: 'Delhi',
    text: 'Finally, a platform that gives me full freedom to customize every single day while keeping professional tour operator support on standby.',
    rating: 5,
    trip: 'Ladakh, 10 days',
    avatar: 'SK',
  },
];

const TripPlannerCard = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-8 right-8 hidden lg:block w-80 animate-float">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-5 border border-white/60">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-brand-red rounded-xl flex items-center justify-center shadow-red">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <span className="text-sm font-black text-gray-900 block leading-tight">AI Trip Planner</span>
            <span className="text-xs text-gray-400">Live Optimization</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-700 font-bold">Active</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 border border-gray-100">
            <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={16} className="text-brand-red" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 font-medium">Destination</div>
              <div className="text-sm font-bold text-gray-800 truncate">Mumbai → Kashmir</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Calendar size={12} className="text-brand-red" />
                <span>Duration</span>
              </div>
              <div className="text-sm font-black text-gray-800 mt-0.5">7 Days</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Users size={12} className="text-brand-red" />
                <span>Travelers</span>
              </div>
              <div className="text-sm font-black text-gray-800 mt-0.5">4 People</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
            <div className="text-xs text-gray-400 font-medium mb-1">Optimized Budget</div>
            <div className="text-base font-black text-gray-900 flex items-baseline gap-1">
              ₹46,800 <span className="text-gray-400 font-medium text-xs">/ person</span>
            </div>
          </div>
        </div>

        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <CheckCircle2 size={14} className="text-green-600" />
              <span>Hotels, Transfers, Activities</span>
            </div>
            <span className="bg-red-50 text-brand-red text-xs px-2 py-0.5 rounded-full font-bold">94% match</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/traveler/plan')}
          className="mt-4 w-full bg-brand-red text-white py-3 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-red active:scale-98"
        >
          <Sparkles size={16} />
          Generate Itinerary
        </button>
      </div>
    </div>
  );
};

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string[]>(['Adventure', 'Cultural']);
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              Next-Gen Dynamic Travel Intelligence
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6 tracking-tight">
              Your trip.
              <br />
              <span className="text-brand-red">Your choices.</span>
              <br />
              One journey.
            </h1>

            <p className="text-white/85 text-base sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg font-normal">
              Build personalized trips, optimize budgets in real time, and adapt on the go with our intelligent traveler and operator platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
              <button
                onClick={() => navigate('/traveler/plan')}
                className="inline-flex items-center justify-center gap-2.5 bg-brand-red text-white px-8 py-4 rounded-full font-bold text-base hover:bg-red-700 hover:shadow-red-lg transition-all duration-200 active:scale-95 shadow-red"
              >
                <Sparkles size={18} />
                Plan My Trip
                <ArrowRight size={16} />
              </button>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all duration-200"
              >
                <Play size={16} className="fill-white" />
                Tour Operator Demo
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="flex -space-x-2">
                {['#E8173A', '#3B82F6', '#10B981', '#F59E0B'].map((color, i) => (
                  <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white flex items-center justify-center shadow-sm" style={{ background: color }}>
                    <span className="text-white text-xs font-bold">
                      {['A', 'R', 'P', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                  <span className="text-white font-bold text-xs ml-1">4.9/5</span>
                </div>
                <p className="text-white/70 text-xs mt-0.5">Trusted by 50,000+ travelers & operators</p>
              </div>
            </div>
          </div>

          {/* Floating Trip Card */}
          <TripPlannerCard />
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '50K+', label: 'Happy Travelers', icon: Users },
              { value: '200+', label: 'Curated Destinations', icon: Globe },
              { value: '98%', label: 'Satisfaction Rate', icon: Star },
              { value: '24/7', label: 'AI Assistance', icon: Bot },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="p-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-800 text-brand-red rounded-xl mb-2">
                    <Icon size={16} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-0.5 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why WAYVO */}
      <section id="features" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
              <Zap size={15} />
              Why WAYVO?
            </div>
            <h2 className="section-title text-3xl sm:text-5xl">Travel reimagined,<br /><span className="gradient-text">from the ground up</span></h2>
            <p className="section-subtitle max-w-2xl mx-auto text-sm sm:text-base">
              Say goodbye to rigid package tours. WAYVO bridges real-time traveler personalization with tour operator intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, iconBg }) => (
              <div key={title} className="card-hover group p-7 sm:p-8 rounded-3xl border border-gray-100 bg-white">
                <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 shadow-xs`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Complete Lifecycle) */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
              <RefreshCw size={15} />
              Complete Lifecycle
            </div>
            <h2 className="section-title text-3xl sm:text-5xl">11 Steps from Dream to Destination</h2>
            <p className="section-subtitle text-sm sm:text-base">Every phase intelligently orchestrated for travelers and operators alike.</p>
          </div>

          {/* Horizontal scroll on mobile with touch snapping, responsive grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-4 xl:grid-cols-6 lg:overflow-visible">
            {howItWorksSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex-shrink-0 w-60 sm:w-64 lg:w-auto snap-center group">
                  <div className="card-hover p-5 sm:p-6 text-center relative h-full flex flex-col items-center justify-between rounded-3xl bg-white border border-gray-100 shadow-xs">
                    {idx < howItWorksSteps.length - 1 && (
                      <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-300">
                        <ChevronRight size={18} />
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-xs" style={{ background: 'rgba(232, 23, 58, 0.08)' }}>
                      <Icon size={22} className="text-brand-red" />
                    </div>
                    <div className="text-brand-red font-black text-xs tracking-wider mb-1">STEP {step.num}</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Trip Builder Preview */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
                <Sparkles size={15} />
                Interactive Trip Builder
              </div>
              <h2 className="section-title text-3xl sm:text-5xl mb-6">Plan your personalized<br />trip in minutes</h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                Select your dream destination, dates, budget, and travel interests. 
                WAYVO crafts a complete, realistic itinerary with hotel pairings, transport routes, and verified activities.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Multi-step personalization with live cost updates',
                  'AI-optimized day schedules without unrealistic travel times',
                  'Transparent vendor pricing & instant booking',
                  'One-click dynamic adaptation on the fly',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/traveler/plan')}
                className="btn-primary"
              >
                Launch Trip Planner <ArrowRight size={16} />
              </button>
            </div>

            {/* Interactive Preview Card */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-black text-gray-900 text-lg">Quick Trip Builder</h3>
                <span className="text-xs bg-red-50 text-brand-red px-2.5 py-1 rounded-full font-bold">Interactive</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Destination</label>
                  <div className="input-field flex items-center gap-2.5 cursor-pointer hover:border-brand-red transition-colors" onClick={() => navigate('/traveler/plan')}>
                    <MapPin size={18} className="text-brand-red" />
                    <span className="text-gray-800 font-semibold">Kashmir, India</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Start Date</label>
                    <div className="input-field flex items-center gap-2 cursor-pointer hover:border-brand-red transition-colors" onClick={() => navigate('/traveler/plan')}>
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700 text-sm font-medium">12 Oct 2024</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">End Date</label>
                    <div className="input-field flex items-center gap-2 cursor-pointer hover:border-brand-red transition-colors" onClick={() => navigate('/traveler/plan')}>
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700 text-sm font-medium">19 Oct 2024</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Budget Target (per person)</label>
                  <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl">
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span className="text-xs text-gray-400">₹30,000</span>
                      <span className="font-black text-brand-red text-base">₹50,000</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-2 bg-brand-red rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Travel Style</label>
                  <div className="flex flex-wrap gap-2">
                    {styles.map(style => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(prev =>
                          prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
                        )}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          selectedStyle.includes(style)
                            ? 'bg-brand-red text-white shadow-xs'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate('/traveler/plan')}
                  className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-red"
                >
                  <Sparkles size={16} />
                  Build My Customized Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Intelligence & Dynamic Adaptation Section */}
      <section className="py-20 sm:py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6">
                <Bot size={16} className="text-yellow-400" />
                Adaptive Travel Engine
              </div>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-6">
                Travel plans change.<br />
                <span className="text-brand-red">WAYVO adapts</span><br />
                in real time.
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                WAYVO continuously monitors flight status, weather forecasts, and activity availability.
                When delays happen, it resolves conflicts with smart alternatives instantly.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  'Budget & preferences', 'Live vendor availability',
                  'Transport dependencies', 'Unexpected disruptions',
                  'Time optimization', 'Multi-operator sync',
                  'Group member needs', 'Weather alerts',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full flex-shrink-0"></div>
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/traveler/itinerary/kashmir')}
                className="inline-flex items-center gap-2 bg-brand-red text-white px-7 py-3.5 rounded-full font-bold hover:bg-red-600 transition-colors shadow-red"
              >
                See Live Simulation <ArrowRight size={16} />
              </button>
            </div>

            {/* Right: AI Flow Visual with professional Lucide icons */}
            <div className="space-y-3">
              {[
                { icon: CalendarDays, label: 'Original Plan', desc: 'Day 3: Snowmobile at Gulmarg 10:00 AM', color: 'bg-white/10', border: 'border-white/20', iconColor: 'text-white' },
                { icon: Zap, label: 'Unexpected Change', desc: 'Snowmobile activity — unavailable due to weather', color: 'bg-yellow-500/20', border: 'border-yellow-500/30', iconColor: 'text-yellow-400' },
                { icon: Compass, label: 'WAYVO Detects Conflict', desc: 'Impact: Day 3 activity gap + budget release of ₹3,000', color: 'bg-blue-500/20', border: 'border-blue-500/30', iconColor: 'text-blue-400' },
                { icon: Sparkles, label: 'AI Alternatives Suggested', desc: '3 tailored alternatives found within budget & schedule', color: 'bg-purple-500/20', border: 'border-purple-500/30', iconColor: 'text-purple-400' },
                { icon: CheckCircle2, label: 'Optimized Itinerary', desc: 'Gondola + Mountain Café chosen — saving ₹1,100', color: 'bg-emerald-500/20', border: 'border-emerald-500/30', iconColor: 'text-emerald-400' },
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.label} className="flex items-start gap-4">
                    <div className={`flex-1 ${step.color} border ${step.border} rounded-2xl p-4 transition-all hover:scale-[1.01]`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                          <StepIcon size={20} className={step.iconColor} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{step.label}</p>
                          <p className="text-white/60 text-xs mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="flex flex-col items-center justify-center mt-3">
                        <div className="w-px h-4 bg-white/20"></div>
                        <div className="text-white/30 text-xs">↓</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Operator Preview */}
      <section id="operators" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            {/* Operator Dashboard Preview */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-800 rounded-lg h-5 mx-2"></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Active Tours', value: '24', icon: MapPin },
                    { label: 'Travelers', value: '186', icon: Users },
                    { label: 'Revenue', value: '₹18.6L', icon: TrendingUp },
                    { label: 'Bookings', value: '312', icon: CheckCircle2 },
                  ].map(m => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className="bg-gray-800 rounded-2xl p-3 border border-gray-700/50">
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                          <Icon size={12} className="text-brand-red" />
                          <span>{m.label}</span>
                        </div>
                        <div className="text-white font-black text-lg">{m.value}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 mb-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 bg-brand-red rounded-full flex items-center justify-center">
                      <Zap size={12} className="text-white" />
                    </div>
                    <span className="text-red-400 font-bold text-xs uppercase tracking-wide">Live Alert Detected</span>
                  </div>
                  <p className="text-white text-sm font-bold">Flight Delay — IndiGo 6E204 (+2 Hours)</p>
                  <p className="text-gray-400 text-xs mt-0.5">4 travelers in Kashmir Group #WV204 affected.</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => navigate('/operator/operations')} className="bg-brand-red text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-700">
                      Apply WAYVO AI Fix
                    </button>
                    <button onClick={() => navigate('/operator/operations')} className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-gray-700">
                      Review Impact
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    'WV203 · Kerala Backwaters — On Schedule',
                    'WV202 · Rajasthan Heritage — Day 5 Active',
                    'WV195 · Ladakh Bike Tour — Departing Oct 20'
                  ].map(tour => (
                    <div key={tour} className="bg-gray-800/80 rounded-xl px-4 py-2.5 text-gray-300 text-xs font-medium flex items-center justify-between">
                      <span>{tour}</span>
                      <CheckCircle2 size={14} className="text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
                <Globe size={15} />
                For Tour Operators
              </div>
              <h2 className="section-title text-3xl sm:text-5xl mb-6">One intelligent control center for every tour</h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                Eliminate scattered spreadsheets and chaotic communication.
                WAYVO gives operators an end-to-end mission control center with real-time risk alerts and automated coordination.
              </p>
              <div className="grid grid-cols-2 gap-3.5 mb-8">
                {[
                  { icon: Users, label: 'Traveler Management' },
                  { icon: Layers, label: 'Vendor Sync' },
                  { icon: Receipt, label: 'Payment Tracking' },
                  { icon: Zap, label: 'Real-time Operations' },
                  { icon: TrendingUp, label: 'Analytics Dashboard' },
                  { icon: ShieldCheck, label: 'AI Risk Engine' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors border border-gray-100">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-brand-red shadow-xs">
                        <Icon size={16} />
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => navigate('/operator')}
                className="btn-primary"
              >
                Open Operator Console <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-16">
            <h2 className="section-title text-3xl sm:text-5xl mb-4">Loved by travelers & operators<br /><span className="gradient-text">across India and beyond</span></h2>
            <p className="section-subtitle text-sm sm:text-base">Real experiences from travelers using WAYVO.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card-hover p-6 sm:p-7 rounded-3xl bg-white border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center shadow-xs">
                    <span className="text-white text-sm font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location} · {t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 bg-brand-red text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">Ready to travel your way?</h2>
          <p className="text-white/85 text-base sm:text-xl mb-10 leading-relaxed font-normal">
            Personalized itineraries, dynamic schedule changes, and real-time operations in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/traveler/plan')}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-red px-8 py-4 rounded-full font-black text-base hover:bg-gray-100 transition-colors active:scale-95 shadow-lg"
            >
              <Sparkles size={18} />
              Start Planning Now
            </button>
            <button
              onClick={() => navigate('/operator')}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-colors"
            >
              Tour Operator Console
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-14 sm:py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center shadow-red">
                  <span className="text-white font-black text-lg">W</span>
                </div>
                <span className="font-black text-xl tracking-tight">WAYVO</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Travel your way. Adapt as you go. Intelligent tour planning and dynamic operations.
              </p>
            </div>
            {[
              { title: 'Travelers', links: [{ label: 'Discover', to: '/traveler/discover' }, { label: 'Plan Trip', to: '/traveler/plan' }, { label: 'My Trips', to: '/traveler/trips' }, { label: 'AI Assistant', to: '/traveler' }] },
              { title: 'Operators', links: [{ label: 'Dashboard', to: '/operator' }, { label: 'Tours', to: '/operator/tours' }, { label: 'Operations', to: '/operator/operations' }, { label: 'Analytics', to: '/operator/analytics' }] },
              { title: 'Company', links: [{ label: 'About', to: '/' }, { label: 'Features', to: '/#features' }, { label: 'Lifecycle', to: '/#how-it-works' }, { label: 'Login', to: '/login' }] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-xs sm:text-sm mb-4 text-gray-200 tracking-wide uppercase">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-xs sm:text-sm">© 2024 WAYVO. Built with ❤️ for travelers everywhere.</p>
            <p className="text-gray-500 text-xs sm:text-sm">Personalized Dynamic Tour Planning & Operations Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
