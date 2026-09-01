import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, MapPin, Calendar, Star, Sparkles, TrendingUp,
  Compass, Sliders, CalendarDays, Bot, CheckCircle2, Clock, Users,
  ShieldCheck, Heart, Luggage
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { destinations, myTrips } from '../../data/mockData';

const TravelerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featured = destinations.filter(d => d.featured).slice(0, 4);
  const upcomingTrip = myTrips.find(t => t.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      <Navbar variant="traveler" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        {/* Personalized Greeting Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red bg-red-50 px-3 py-1 rounded-full mb-1.5 border border-red-100">
                <Sparkles size={12} />
                <span>Personalized Traveler Mode</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Good morning, Alison
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mt-0.5">Where will your next journey take you?</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/traveler/trips')}
                className="text-sm font-bold text-brand-red hover:underline flex items-center gap-1.5 bg-red-50/70 px-4 py-2 rounded-xl border border-red-100"
              >
                <Luggage size={16} />
                My Trips
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-5 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search destinations, mountain treks, beach resorts..."
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-28 py-3.5 sm:py-4 text-sm text-gray-800 shadow-card focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
              onKeyDown={e => e.key === 'Enter' && navigate('/traveler/discover')}
            />
            <button
              onClick={() => navigate('/traveler/discover')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-brand-red text-white px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
            >
              Explore
            </button>
          </div>

          {/* Quick Action Navigation Tiles with Lucide Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { icon: Compass, label: 'Explore Spots', path: '/traveler/discover', color: 'bg-blue-50 text-blue-600' },
              { icon: CalendarDays, label: 'Plan My Trip', path: '/traveler/plan', color: 'bg-rose-50 text-brand-red' },
              { icon: Luggage, label: 'My Bookings', path: '/traveler/trips', color: 'bg-amber-50 text-amber-600' },
              { icon: Bot, label: 'AI Concierge', path: '/traveler/trips/WV201', color: 'bg-purple-50 text-purple-600' },
            ].map(action => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex items-center gap-3 bg-white rounded-2xl p-3.5 sm:p-4 shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100 group text-left"
                >
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 block group-hover:text-brand-red transition-colors">{action.label}</span>
                    <span className="text-[10px] text-gray-400 hidden sm:block">Instant access</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Trip Spotlight Banner */}
        {upcomingTrip && (
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-xl border border-gray-800">
              <img
                src={upcomingTrip.image}
                alt={upcomingTrip.destination}
                className="absolute inset-0 w-full h-full object-cover opacity-45"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="bg-brand-red text-white px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase shadow-xs">
                        Upcoming Trip
                      </span>
                      <span className="text-white/80 text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                        <Clock size={12} className="text-yellow-400" /> In {upcomingTrip.daysLeft} days
                      </span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1.5">{upcomingTrip.title}</h2>
                    <p className="text-white/80 text-xs sm:text-sm mb-5 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={13} /> {upcomingTrip.startDate} – {upcomingTrip.endDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Users size={13} /> {upcomingTrip.travelers} travelers</span>
                    </p>
                    
                    {/* Status Progress Track */}
                    <div className="flex items-center gap-3 sm:gap-4 bg-black/40 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/10 max-w-md">
                      {['Booked', 'Preparing', 'Upcoming'].map((step, i) => (
                        <div key={step} className="flex items-center gap-1.5 text-xs">
                          <div className={`w-2 h-2 rounded-full ${
                            i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-yellow-400 animate-pulse' : 'bg-gray-500'
                          }`}></div>
                          <span className={`font-semibold ${
                            i === 0 ? 'text-emerald-400' : i === 1 ? 'text-yellow-300' : 'text-gray-400'
                          }`}>{step}</span>
                          {i < 2 && <ArrowRight size={10} className="text-white/30 ml-1" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-white/60 text-xs font-medium mb-0.5">Total Value</div>
                    <div className="text-white font-black text-2xl sm:text-3xl">₹{(upcomingTrip.price / 1000).toFixed(0)}K</div>
                    <div className="text-emerald-400 text-xs font-semibold flex items-center sm:justify-end gap-1 mt-1">
                      <CheckCircle2 size={12} /> Confirmed
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate(`/traveler/trips/${upcomingTrip.id}`)}
                    className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-xs"
                  >
                    Open Live Itinerary
                  </button>
                  <button
                    onClick={() => navigate(`/traveler/prepare/${upcomingTrip.id}`)}
                    className="bg-white/10 border border-white/25 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/20 transition-colors backdrop-blur-xs"
                  >
                    Trip Checklist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Personalized Recommendation Card */}
        <div className="mb-8 bg-gradient-to-r from-brand-red via-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-red relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles size={14} className="text-yellow-300" />
            </div>
            <span className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase">AI Autumn Highlight</span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-black mb-1.5">Kashmir Valley & Gulmarg Heights</h3>
          <p className="text-white/80 text-xs sm:text-sm mb-6 max-w-xl leading-relaxed">
            Based on your past preference for scenic mountain trails and boutique lakeside stays, autumn in Kashmir is rated 96% match.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/20">
            <div>
              <div className="text-xl sm:text-2xl font-black">₹42,500 <span className="text-white/70 font-normal text-xs sm:text-sm">/ person</span></div>
              <div className="text-white/70 text-xs mt-0.5">7 days • 4-star stays • Flights included</div>
            </div>
            <button
              onClick={() => navigate('/traveler/plan?destination=kashmir')}
              className="bg-white text-brand-red px-6 py-3 rounded-full font-black text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              Build Kashmir Trip <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Featured Destinations Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">Popular Destinations</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Curated seasonal itineraries</p>
            </div>
            <button
              onClick={() => navigate('/traveler/discover')}
              className="text-brand-red text-xs sm:text-sm font-bold hover:underline flex items-center gap-1"
            >
              Browse all <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {featured.map(dest => (
              <div
                key={dest.id}
                onClick={() => navigate(`/traveler/plan?destination=${dest.id}`)}
                className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-100"
              >
                <div className="h-36 sm:h-44 relative overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="destination-image"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.parentElement!.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                      t.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{dest.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold text-xs">{dest.rating}</span>
                      <span className="text-white/60 text-[10px]">({dest.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
                  <div>
                    <span className="text-brand-red font-black text-sm sm:text-base">₹{(dest.price/1000).toFixed(0)}K</span>
                    <span className="text-gray-400 text-[10px] sm:text-xs ml-1">/ person</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-red-50 group-hover:bg-brand-red flex items-center justify-center transition-colors">
                    <ArrowRight size={13} className="text-brand-red group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Tags Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-brand-red" />
            <h2 className="text-base sm:text-lg font-black text-gray-900">Trending Travel Routes</h2>
          </div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-2">
            {[
              { label: 'Kashmir Valley', price: '₹42K' },
              { label: 'Bali Tropical', price: '₹75K' },
              { label: 'Kerala Backwaters', price: '₹35K' },
              { label: 'Ladakh High Pass', price: '₹55K' },
              { label: 'Goa Coastal', price: '₹28K' },
              { label: 'Manali Snow Trek', price: '₹32K' }
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigate('/traveler/discover')}
                className="flex-shrink-0 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:border-brand-red hover:text-brand-red transition-all shadow-xs flex items-center gap-2"
              >
                <MapPin size={13} className="text-brand-red" />
                <span>{item.label}</span>
                <span className="text-gray-400 font-normal">· {item.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default TravelerDashboard;
