import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Download, Eye, Share2, Mail, Smartphone,
  PackageCheck, Bot, Sparkles, ShieldCheck, ArrowRight
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      <Navbar variant="traveler" />

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8 text-center">
        {/* Animated Celebration Icon */}
        <div className="mt-4 sm:mt-6 mb-6 relative inline-block">
          <div className="w-24 sm:w-28 h-24 sm:h-28 bg-emerald-50 rounded-full mx-auto flex items-center justify-center animate-bounce-subtle border border-emerald-100 shadow-md">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-xs">
              <CheckCircle2 size={36} className="text-white" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-200">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Payment Verified & Confirmed</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">Your journey is booked!</h1>
        <p className="text-gray-500 text-xs sm:text-sm mb-8">Official confirmation voucher sent to <span className="font-semibold text-gray-700">alison.pinto@email.com</span></p>

        {/* Booking Details Card */}
        <div className="card rounded-3xl p-6 text-left mb-6 border border-gray-100 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 bg-brand-red rounded-2xl flex items-center justify-center shadow-xs">
              <span className="text-white font-black text-lg">W</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Booking ID</p>
              <p className="font-black text-gray-900 text-base sm:text-lg font-mono">WV-2024-1201</p>
            </div>
            <div className="ml-auto">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black">
                Confirmed ✓
              </span>
            </div>
          </div>

          <div className="space-y-2.5 py-4 border-t border-gray-100 text-xs sm:text-sm">
            {[
              { label: 'Trip Package', value: 'Kashmir Escape (7 Days)' },
              { label: 'Travel Dates', value: 'Oct 12 – Oct 19, 2024' },
              { label: 'Travelers', value: '4 Adults' },
              { label: 'Hotel Reserved', value: 'The Lalit Grand Palace (4 Rooms)' },
              { label: 'Flight Transfer', value: 'IndiGo 6E204 + Private Chauffeur' },
              { label: 'Amount Paid', value: '₹1,87,200 (100% Settled via UPI)' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                <span className="text-gray-400 font-medium">{label}</span>
                <span className="font-bold text-gray-800 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens Next Card with Lucide Icons */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-5 sm:p-6 mb-6 text-left shadow-xs">
          <h3 className="font-black text-blue-950 text-sm mb-3 uppercase tracking-wider">What Happens Next?</h3>
          <div className="space-y-2.5 text-xs sm:text-sm text-blue-900">
            {[
              { icon: Mail, text: 'Vouchers & flight tickets delivered to your inbox' },
              { icon: Smartphone, text: 'Real-time telemetry activates 24h prior to departure' },
              { icon: PackageCheck, text: 'Complete the pre-trip preparation packing checklist' },
              { icon: Bot, text: 'AI Travel Assistant available 24/7 during your journey' },
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 font-medium">
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <ItemIcon size={14} />
                  </div>
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/traveler/trips/WV201')}
            className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-red text-sm sm:text-base"
          >
            <Eye size={18} /> View Live Trip Details
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-xs">
              <Download size={15} /> Download PDF
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-xs">
              <Share2 size={15} /> Share Trip
            </button>
          </div>
          
          <button
            onClick={() => navigate('/traveler/prepare/WV201')}
            className="w-full text-brand-red font-bold text-xs sm:text-sm py-2 hover:underline flex items-center justify-center gap-1.5"
          >
            <span>Start Pre-Trip Preparation</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default BookingSuccess;
