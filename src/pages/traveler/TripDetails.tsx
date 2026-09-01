import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, Hotel, Send, Bot, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { myTrips, itineraryData, chatMessages } from '../../data/mockData';

const TripDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const trip = myTrips.find(t => t.id === id) || myTrips[0];
  const itin = itineraryData.kashmir;
  
  const [activeTab, setActiveTab] = useState<'itinerary' | 'chat' | 'docs'>('itinerary');
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMsg = async () => {
    if (!input.trim()) return;
    const newMsg = { id: `u${Date.now()}`, role: 'user' as const, message: input, time: 'Now' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setMessages(prev => [...prev, {
      id: `ai${Date.now()}`, role: 'assistant' as const,
      message: 'I\'ve analyzed your request. Based on your preferences and current availability, I\'d recommend the Houseboat Relaxation Day as the best alternative. It perfectly matches your relaxed travel style and keeps you within budget. Shall I update your itinerary?',
      time: 'Now'
    }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar variant="traveler" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 mt-4">
          <ArrowLeft size={16} /> Back
        </button>

        {/* Trip Header */}
        <div className="relative rounded-3xl overflow-hidden mb-6 h-48">
          <img src={trip.image} alt={trip.title} className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <span className="text-brand-red font-bold text-sm">{trip.id}</span>
            <h1 className="text-white font-black text-2xl sm:text-3xl">{trip.title}</h1>
            <div className="flex flex-wrap gap-3 mt-2 text-white/70 text-xs">
              <span className="flex items-center gap-1"><Calendar size={12} /> {trip.startDate} – {trip.endDate}</span>
              <span className="flex items-center gap-1"><Users size={12} /> {trip.travelers} travelers</span>
              <span className="flex items-center gap-1"><Hotel size={12} /> {trip.hotel}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1.5 shadow-card mb-6 gap-1">
          {[
            { key: 'itinerary', label: '📅 Itinerary' },
            { key: 'chat', label: '🤖 AI Assistant' },
            { key: 'docs', label: '📄 Documents' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.key ? 'bg-brand-red text-white shadow-red' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4">
            {itin.days_data.map((day) => (
              <div key={day.day} className="card rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-red rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-white text-xs font-bold">DAY</span>
                    <span className="text-white font-black text-lg leading-none">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">{day.title}</h3>
                    <p className="text-gray-400 text-sm">{day.date}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {day.activities.map((act: any) => (
                    <div key={act.id} className="flex items-start gap-3 pl-2">
                      <div className="w-1 h-full bg-gray-100 rounded-full mt-1 flex-shrink-0"></div>
                      <div className="text-sm flex-1">
                        <span className="font-semibold text-gray-800">{act.time}</span>
                        <span className="text-gray-400 mx-2">·</span>
                        <span className="text-gray-700">{act.name}</span>
                        {act.price > 0 && (
                          <span className="ml-2 text-brand-red font-semibold">₹{act.price.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col" style={{ height: '500px' }}>
            <div className="bg-gradient-to-r from-brand-red to-red-700 px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">WAYVO Live Trip Assistant</p>
                <p className="text-white/70 text-xs">Available 24/7 during your journey</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' ? 'bg-brand-red text-white rounded-tr-sm' : 'bg-gray-50 text-gray-800 rounded-tl-sm'
                    }`}>
                      {msg.message}
                    </div>
                    <span className="text-gray-400 text-xs px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 150, 300].map(d => (
                        <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                placeholder="Ask about your trip..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
              <button onClick={sendMsg} disabled={!input.trim() || loading}
                className="w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center hover:bg-red-700 disabled:opacity-50 transition-colors">
                <Send size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'docs' && (
          <div className="space-y-3">
            {[
              { name: 'Flight Ticket — IndiGo 6E204', type: 'PDF', size: '142 KB', date: '28 Sep' },
              { name: 'Hotel Voucher — The Lalit Grand Palace', type: 'PDF', size: '89 KB', date: '28 Sep' },
              { name: 'Complete Itinerary', type: 'PDF', size: '234 KB', date: '28 Sep' },
              { name: 'Travel Insurance Certificate', type: 'PDF', size: '512 KB', date: '28 Sep' },
              { name: 'Activity Booking — Gondola Ride', type: 'PDF', size: '67 KB', date: '28 Sep' },
            ].map(doc => (
              <div key={doc.name} className="card rounded-2xl flex items-center gap-4 hover:shadow-card-hover transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-red font-black text-xs">PDF</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                  <p className="text-gray-400 text-xs">{doc.size} · Added {doc.date}</p>
                </div>
                <button className="text-brand-red text-sm font-bold hover:underline">Download</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default TripDetails;
