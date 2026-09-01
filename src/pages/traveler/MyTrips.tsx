import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Users, MapPin, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import StatusBadge from '../../components/StatusBadge';
import { myTrips } from '../../data/mockData';

const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const upcoming = myTrips.filter(t => t.status !== 'completed');
  const past = myTrips.filter(t => t.status === 'completed');

  const TripCard = ({ trip }: { trip: typeof myTrips[0] }) => (
    <div
      onClick={() => navigate(`/traveler/trips/${trip.id}`)}
      className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.destination}
          className="destination-image"
          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #667eea, #764ba2)'; (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={trip.status} />
        </div>
        {trip.daysLeft > 0 && (
          <div className="absolute top-3 left-3 bg-brand-red text-white px-2.5 py-1 rounded-full text-xs font-bold">
            In {trip.daysLeft} days
          </div>
        )}
        <div className="absolute bottom-3 left-4">
          <h3 className="text-white font-black text-lg">{trip.title}</h3>
          <p className="text-white/70 text-xs">{trip.id}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Calendar size={12} /> {trip.startDate} – {trip.endDate}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {trip.travelers} travelers</span>
          <span className="flex items-center gap-1"><MapPin size={12} /> {trip.destination}</span>
        </div>

        {trip.status === 'confirmed' && (
          <div className="flex gap-2 mb-3">
            {['Booked', 'Preparing', 'Upcoming'].map((step, i) => (
              <div key={step} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                <span className={`text-xs font-medium ${i === 0 ? 'text-green-600' : i === 1 ? 'text-yellow-600' : 'text-gray-400'}`}>{step}</span>
                {i < 2 && <span className="text-gray-200 text-xs">→</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="text-brand-red font-black text-lg">₹{(trip.price / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-400">total trip value</div>
          </div>
          <div className="flex gap-2">
            {trip.status === 'confirmed' && (
              <button
                onClick={e => { e.stopPropagation(); navigate(`/traveler/prepare/${trip.id}`); }}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 font-semibold transition-colors"
              >
                Prepare
              </button>
            )}
            <button className="bg-brand-red text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-1">
              Open <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Trips</h1>
            <p className="text-gray-500 mt-1">{myTrips.length} trips in your journey history</p>
          </div>
          <button
            onClick={() => navigate('/traveler/plan')}
            className="btn-primary"
          >
            + Plan New Trip
          </button>
        </div>

        {/* Upcoming */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-brand-red" /> Upcoming ({upcoming.length})
          </h2>
          {upcoming.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map(trip => <TripCard key={trip.id} trip={trip} />)}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-card">
              <div className="text-5xl mb-4">✈️</div>
              <h3 className="font-bold text-gray-900 mb-2">No upcoming trips</h3>
              <p className="text-gray-500 text-sm mb-4">Start planning your next adventure!</p>
              <button onClick={() => navigate('/traveler/plan')} className="btn-primary">
                Plan a Trip
              </button>
            </div>
          )}
        </div>

        {/* Past Trips */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Past Trips ({past.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {past.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MyTrips;
