import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Eye, Share2, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-lg mx-auto px-4 pt-20 pb-8 text-center">
        {/* Success Animation */}
        <div className="mt-8 mb-6 relative">
          <div className="w-28 h-28 bg-green-50 rounded-full mx-auto flex items-center justify-center animate-bounce-subtle">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-green-500" />
            </div>
          </div>
          <div className="absolute top-2 right-20 text-2xl animate-float" style={{ animationDelay: '0.2s' }}>🎉</div>
          <div className="absolute top-0 left-20 text-xl animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-2 right-16 text-xl animate-float" style={{ animationDelay: '0.8s' }}>🌟</div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Your journey is confirmed!</h1>
        <p className="text-gray-500 mb-8">Booking confirmation sent to alison.pinto@email.com</p>

        {/* Booking Details */}
        <div className="card rounded-2xl mb-6 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center">
              <span className="text-white font-black">W</span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Booking Reference</p>
              <p className="font-black text-gray-900 text-lg">WV-2024-1201</p>
            </div>
            <div className="ml-auto">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Confirmed</span>
            </div>
          </div>

          <div className="space-y-3 py-4 border-t border-gray-100">
            {[
              { label: 'Trip', value: 'Kashmir Escape' },
              { label: 'Dates', value: 'Oct 12 – Oct 19, 2024' },
              { label: 'Travelers', value: '4 Adults' },
              { label: 'Hotel', value: 'The Lalit Grand Palace' },
              { label: 'Transport', value: 'IndiGo 6E204 + Cab' },
              { label: 'Amount Paid', value: '₹1,87,200' },
              { label: 'Payment', value: 'UPI — Confirmed ✓' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 rounded-2xl p-5 mb-6 text-left">
          <h3 className="font-bold text-gray-900 mb-3">What happens next?</h3>
          <div className="space-y-3">
            {[
              { icon: '📧', text: 'Booking confirmation sent to your email' },
              { icon: '📱', text: 'Download WAYVO app to track your trip' },
              { icon: '✅', text: 'Complete trip preparation checklist' },
              { icon: '🤖', text: 'AI assistant available from day 1' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-gray-700">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/traveler/trips/WV201')}
            className="w-full bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={18} /> View My Trip
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Download size={16} /> Download
            </button>
            <button className="bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Share2 size={16} /> Share
            </button>
          </div>
          <button
            onClick={() => navigate('/traveler/prepare/WV201')}
            className="w-full text-brand-red font-semibold text-sm py-2 hover:underline"
          >
            Start Trip Preparation →
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default BookingSuccess;
