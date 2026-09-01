import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ArrowRight, MapPin, Calendar, Star, Sparkles, TrendingUp, Zap } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { destinations, myTrips } from '../../data/mockData';

const TravelerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featured = destinations.filter(d => d.featured).slice(0, 4);
  const upcomingTrip = myTrips.find(t => t.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Greeting */}
        <div className="mb-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                Good morning, Alison 👋
              </h1>
              <p className="text-gray-500 mt-1">Where will your next journey take you?</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/traveler/trips')}
                className="text-sm font-semibold text-brand-red hover:underline flex items-center gap-1"
              >
                My Trips <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-5 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search destinations, experiences, hotels..."
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm text-gray-700 shadow-card focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
              onKeyDown={e => e.key === 'Enter' && navigate('/traveler/discover')}
            />
            <button
              onClick={() => navigate('/traveler/discover')}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-red text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[
              { icon: '🔍', label: 'Explore', path: '/traveler/discover' },
              { icon: '✈️', label: 'Plan Trip', path: '/traveler/plan' },
              { icon: '🗺️', label: 'My Trips', path: '/traveler/trips' },
              { icon: '🤖', label: 'AI Plan', path: '/traveler/plan' },
            ].map(action => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 bg-white rounded-2xl py-4 px-2 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs font-semibold text-gray-600">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Trip Banner */}
        {upcomingTrip && (
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-lg">
              <img
                src={upcomingTrip.image}
                alt={upcomingTrip.destination}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-brand-red text-white px-2.5 py-1 rounded-full text-xs font-bold">
                        Upcoming Trip
                      </div>
                      <span className="text-white/60 text-xs">in {upcomingTrip.daysLeft} days</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">{upcomingTrip.title}</h2>
                    <p className="text-white/70 text-sm mb-4">
                      {upcomingTrip.startDate} – {upcomingTrip.endDate} · {upcomingTrip.travelers} travelers
                    </p>
                    
                    {/* Progress */}
                    <div className="flex items-center gap-4">
                      {['Booked', 'Preparing', 'Upcoming'].map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            i === 0 ? 'bg-green-400' : i === 1 ? 'bg-yellow-400' : 'bg-gray-500'
                          }`}></div>
                          <span className={`text-xs font-medium ${
                            i === 0 ? 'text-green-400' : i === 1 ? 'text-yellow-400' : 'text-gray-400'
                          }`}>{step}</span>
                          {i < 2 && <ArrowRight size={10} className="text-white/30" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <div className="text-white/60 text-xs mb-1">Total Value</div>
                    <div className="text-white font-black text-2xl">₹{(upcomingTrip.price / 1000).toFixed(0)}K</div>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => navigate(`/traveler/trips/${upcomingTrip.id}`)}
                    className="bg-white text-gray-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
                  >
                    Open Trip
                  </button>
                  <button
                    onClick={() => navigate(`/traveler/prepare/${upcomingTrip.id}`)}
                    className="bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-white/20 transition-colors"
                  >
                    Prepare
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendation */}
        <div className="mb-8 bg-gradient-to-r from-brand-red to-red-700 rounded-3xl p-6 text-white shadow-red">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold">WAYVO AI Recommends</span>
          </div>
          <h3 className="text-xl font-black mb-1">Your next adventure awaits</h3>
          <p className="text-white/70 text-sm mb-5">
            Based on your past trips and preferences, Kashmir is perfect for you this October.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black">Kashmir</div>
              <div className="text-white/70 text-xs mt-1">₹42,500/person · 7 days · October</div>
            </div>
            <button
              onClick={() => navigate('/traveler/plan?destination=kashmir')}
              className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors flex items-center gap-1"
            >
              Explore Trip <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-gray-900">Popular Destinations</h2>
              <p className="text-gray-500 text-sm">Handpicked for the season</p>
            </div>
            <button
              onClick={() => navigate('/traveler/discover')}
              className="text-brand-red text-sm font-semibold hover:underline flex items-center gap-1"
            >
              See all <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map(dest => (
              <div
                key={dest.id}
                onClick={() => navigate(`/traveler/plan?destination=${dest.id}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-36 sm:h-48 relative overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-sm">{dest.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white/80 text-xs">{dest.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white px-3 py-2.5 flex items-center justify-between">
                  <span className="text-brand-red font-bold text-sm">₹{(dest.price/1000).toFixed(0)}K</span>
                  <ArrowRight size={14} className="text-gray-400 group-hover:text-brand-red transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-brand-red" />
            <h2 className="text-xl font-black text-gray-900">Trending Right Now</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {['Kashmir · ₹42K', 'Bali · ₹75K', 'Kerala · ₹35K', 'Ladakh · ₹55K', 'Goa · ₹28K', 'Manali · ₹32K'].map(item => (
              <button
                key={item}
                onClick={() => navigate('/traveler/discover')}
                className="flex-shrink-0 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-red hover:text-brand-red transition-colors shadow-sm"
              >
                📍 {item}
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
