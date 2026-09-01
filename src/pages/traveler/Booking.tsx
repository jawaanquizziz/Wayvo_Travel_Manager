import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building2, Lock, CheckCircle, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { itineraryData } from '../../data/mockData';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const data = itineraryData.kashmir;
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'summary' | 'payment'>('summary');

  const total = data.hotels + data.transport + data.activities + data.food + data.taxes;
  const grandTotal = total * data.travelers;

  const handlePay = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2500));
    navigate('/traveler/booking/success');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 mt-4">
          <ArrowLeft size={16} /> Back to Itinerary
        </button>

        <h1 className="text-3xl font-black text-gray-900 mb-6">Confirm Booking</h1>

        {step === 'summary' && (
          <div className="space-y-4">
            {/* Trip Summary */}
            <div className="card rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1566837945700-30057527ade0?w=120&q=80"
                  alt="Kashmir"
                  className="w-16 h-16 rounded-xl object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div>
                  <h2 className="font-black text-gray-900 text-lg">Kashmir Escape</h2>
                  <p className="text-gray-500 text-sm">Oct 12 – Oct 19, 2024 · 7 days</p>
                  <p className="text-gray-400 text-xs">{data.travelers} travelers · WV-DEMO-001</p>
                </div>
              </div>

              <div className="space-y-2 py-4 border-t border-gray-100">
                {[
                  { label: 'Hotel: The Lalit Grand Palace (6 nights)', value: `₹${data.hotels.toLocaleString('en-IN')}` },
                  { label: 'Transport (Flights + Transfers)', value: `₹${data.transport.toLocaleString('en-IN')}` },
                  { label: 'Activities & Experiences', value: `₹${data.activities.toLocaleString('en-IN')}` },
                  { label: 'Food & Dining', value: `₹${data.food.toLocaleString('en-IN')}` },
                  { label: 'Taxes & Fees', value: `₹${data.taxes.toLocaleString('en-IN')}` },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Per person subtotal</span>
                  <span className="font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">× {data.travelers} travelers</span>
                  <span className="font-bold text-brand-red text-xl">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Traveler Details */}
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3">Traveler Details</h3>
              <div className="space-y-2 text-sm">
                {['Alison Pinto (Lead)', 'Traveler 2', 'Traveler 3', 'Traveler 4'].map((t, i) => (
                  <div key={t} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-700">{t}</span>
                    <span className="text-xs text-gray-400">Adult</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <h4 className="font-bold text-blue-900 text-sm mb-2">Important Information</h4>
              <ul className="space-y-1 text-xs text-blue-700">
                <li>• Free cancellation up to 72 hours before departure</li>
                <li>• 100% secure payment with SSL encryption</li>
                <li>• Instant booking confirmation via email & SMS</li>
                <li>• 24/7 WAYVO support throughout your journey</li>
              </ul>
            </div>

            <button
              onClick={() => setStep('payment')}
              className="w-full bg-brand-red text-white py-4 rounded-xl font-black hover:bg-red-700 transition-colors shadow-red text-base"
            >
              Proceed to Payment — ₹{grandTotal.toLocaleString('en-IN')}
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-4">
            {/* Payment Method */}
            <div className="card rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Select Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
                  { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'All major banks supported' },
                ].map(method => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === method.id ? 'border-brand-red bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={24} className={paymentMethod === method.id ? 'text-brand-red' : 'text-gray-400'} />
                      <div className="text-left flex-1">
                        <p className="font-bold text-gray-900 text-sm">{method.label}</p>
                        <p className="text-gray-400 text-xs">{method.desc}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <div className="w-5 h-5 bg-brand-red rounded-full flex items-center justify-center">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UPI ID Input */}
            {paymentMethod === 'upi' && (
              <div className="card rounded-2xl animate-fade-in">
                <label className="block text-sm font-bold text-gray-700 mb-2">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="input-field"
                />
                <p className="text-xs text-gray-400 mt-2">Enter your UPI ID to receive payment request</p>
              </div>
            )}

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="card rounded-2xl animate-fade-in space-y-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" className="input-field" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Expiry Date</label>
                    <input type="text" placeholder="MM / YY" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">CVV</label>
                    <input type="password" placeholder="•••" className="input-field" maxLength={3} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Cardholder Name</label>
                  <input type="text" placeholder="Alison Pinto" className="input-field" />
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="card rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Kashmir Escape × {data.travelers}</span>
                <span className="font-bold text-gray-900">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Lock size={12} />
                256-bit SSL encrypted · Demo payment (no real transaction)
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full bg-brand-red text-white py-4 rounded-xl font-black hover:bg-red-700 transition-colors shadow-red disabled:opacity-80 flex items-center justify-center gap-3 text-base"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Confirm Booking — ₹{grandTotal.toLocaleString('en-IN')}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Booking;
