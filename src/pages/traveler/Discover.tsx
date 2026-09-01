import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, ArrowRight, X, SlidersHorizontal, Globe } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import DestinationCard from '../../components/DestinationCard';
import { destinations } from '../../data/mockData';

const categories = ['All', 'India', 'International', 'Beach', 'Mountain', 'Adventure', 'Luxury'];
const budgetRanges = ['Any Budget', 'Under ₹30K', '₹30K–₹60K', '₹60K–₹1L', 'Above ₹1L'];
const durations = ['Any Duration', '3-5 Days', '5-7 Days', '7-10 Days', '10+ Days'];

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [budget, setBudget] = useState('Any Budget');
  const [duration, setDuration] = useState('Any Duration');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase()) ||
      d.bestFor.some(b => b.toLowerCase().includes(search.toLowerCase()));
    
    const matchCategory = category === 'All' || 
      (category === 'India' && d.category === 'india') ||
      (category === 'International' && d.category === 'international') ||
      d.bestFor.some(b => b.toLowerCase() === category.toLowerCase());

    const matchBudget = budget === 'Any Budget' || 
      (budget === 'Under ₹30K' && d.price < 30000) ||
      (budget === '₹30K–₹60K' && d.price >= 30000 && d.price < 60000) ||
      (budget === '₹60K–₹1L' && d.price >= 60000 && d.price < 100000) ||
      (budget === 'Above ₹1L' && d.price >= 100000);

    return matchSearch && matchCategory && matchBudget;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-gray-900">Discover</h1>
          <p className="text-gray-500 mt-1">Find your next perfect destination</p>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border font-medium text-sm transition-all ${
              showFilters ? 'bg-brand-red text-white border-brand-red' : 'bg-white border-gray-200 text-gray-700 hover:border-brand-red'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5 shadow-card animate-slide-up">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Budget</label>
                <div className="flex flex-wrap gap-2">
                  {budgetRanges.map(b => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        budget === b ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Duration</label>
                <div className="flex flex-wrap gap-2">
                  {durations.map(d => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        duration === d ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                category === cat
                  ? 'bg-brand-red text-white shadow-red'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-red hover:text-brand-red'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            <span className="font-bold text-gray-900">{filtered.length}</span> destinations found
          </p>
          <select className="text-sm text-gray-600 bg-transparent border-0 focus:outline-none font-medium">
            <option>Sort: Featured</option>
            <option>Sort: Price Low–High</option>
            <option>Sort: Top Rated</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(dest => (
              <DestinationCard key={dest.id} {...dest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red mb-4 shadow-sm">
              <Globe size={32} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">No destinations found</h3>
            <p className="text-gray-500 text-sm mb-4 max-w-sm">Try adjusting your search or filters to discover new places</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setBudget('Any Budget'); }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Discover;
