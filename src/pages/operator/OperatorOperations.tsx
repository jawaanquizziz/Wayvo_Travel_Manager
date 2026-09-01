import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Users, Calendar, Eye, Bot, AlertTriangle, Zap, Check } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { operatorTours } from '../../data/mockData';

const OperatorOperations: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [applyingFix, setApplyingFix] = useState<string | null>(null);
  const [fixApplied, setFixApplied] = useState<string | null>(null);
  const [flightFixApplied, setFlightFixApplied] = useState(false);
  const [flightFixLoading, setFlightFixLoading] = useState(false);

  const handleApplyFix = async (tourId: string) => {
    setApplyingFix(tourId);
    await new Promise(r => setTimeout(r, 2000));
    setFixApplied(tourId);
    setApplyingFix(null);
  };

  const handleFlightFix = async () => {
    setFlightFixLoading(true);
    await new Promise(r => setTimeout(r, 2500));
    setFlightFixApplied(true);
    setFlightFixLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4 flex items-center gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900">Operations Control Center</h1>
            <p className="text-gray-400 text-sm">Real-time tour management & conflict resolution</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-2 rounded-xl">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
              <span className="text-brand-red font-bold text-sm">Live Monitoring</span>
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl">
          {/* Flight Delay Scenario — MAJOR DEMO FEATURE */}
          <div className={`mb-6 rounded-2xl border-2 overflow-hidden transition-all ${
            flightFixApplied ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
          }`}>
            <div className="px-6 py-4 flex items-center gap-3 border-b border-current border-opacity-20">
              {flightFixApplied ? (
                <>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800">✅ Issue Resolved — WV204 Kashmir Escape</p>
                    <p className="text-green-600 text-sm">WAYVO automatically rescheduled all affected activities</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-red-900">⚠️ ALERT: Flight Delayed — WV204 Kashmir Escape</p>
                    <p className="text-red-600 text-sm">IndiGo 6E204 delayed by 2 hours — Oct 12, Srinagar route</p>
                  </div>
                  <div className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    URGENT
                  </div>
                </>
              )}
            </div>

            {!flightFixApplied && (
              <div className="px-6 py-5">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Impact Analysis */}
                  <div>
                    <p className="text-sm font-bold text-red-800 mb-3">🔍 WAYVO Impact Analysis</p>
                    <div className="space-y-2">
                      {[
                        { item: 'Airport Transfer', impact: 'Move by +2 hours → 11:30 AM', severity: 'high' },
                        { item: 'Hotel Check-in', impact: 'Adjust to 15:00 (was 13:00)', severity: 'medium' },
                        { item: 'Dal Lake Activity', impact: 'Move to next day (no availability)', severity: 'high' },
                        { item: 'Dinner Reservation', impact: 'Shift to 20:30 (available)', severity: 'low' },
                      ].map(impact => (
                        <div key={impact.item} className="flex items-start gap-3 bg-white/70 rounded-xl p-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            impact.severity === 'high' ? 'bg-red-500' :
                            impact.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{impact.item}</p>
                            <p className="text-xs text-gray-500">{impact.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center">
                        <Zap size={12} className="text-white" />
                      </div>
                      <p className="text-sm font-bold text-gray-800">WAYVO AI Recommendation</p>
                    </div>
                    <div className="bg-white/70 rounded-2xl p-4 space-y-3">
                      {[
                        '✅ Move airport transfer to 11:30 AM',
                        '✅ Update hotel to 15:00 check-in',
                        '✅ Reschedule Shikara ride to Day 2',
                        '✅ Move dinner to 20:30',
                        '✅ Notify 4 travelers via app',
                        '✅ Update Coordinator Rahul Singh',
                      ].map(action => (
                        <div key={action} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="text-xs">{action}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={handleFlightFix}
                        disabled={flightFixLoading}
                        className="flex-1 bg-brand-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
                      >
                        {flightFixLoading ? (
                          <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> Applying...</>
                        ) : (
                          <><Zap size={14} /> Apply All Changes</>
                        )}
                      </button>
                      <button className="px-4 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50">
                        Customize
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {flightFixApplied && (
              <div className="px-6 py-4 grid grid-cols-3 gap-4">
                {[
                  { label: 'Activities Updated', val: '4' },
                  { label: 'Vendors Notified', val: '3' },
                  { label: 'Travelers Alerted', val: '4' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-black text-green-700">{s.val}</p>
                    <p className="text-xs text-green-600">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All Tours */}
          <div className="card rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-gray-900 text-lg">All Active Tours</h2>
              <button onClick={() => navigate('/operator/tours')} className="text-brand-red text-sm font-bold">
                Manage Tours →
              </button>
            </div>
            <div className="space-y-3">
              {operatorTours.map(tour => (
                <div key={tour.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${
                  tour.status === 'at-risk' ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:bg-white'
                }`}>
                  <img
                    src={tour.image}
                    alt={tour.destination}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.background = '#e2e8f0'; (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{tour.title}</span>
                      <span className="text-gray-400 text-xs font-mono">{tour.id}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {tour.startDate} – {tour.endDate}</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {tour.travelers}</span>
                      <span>Coord: {tour.coordinator}</span>
                    </div>
                    {tour.alert && (
                      <p className="text-xs text-red-600 font-medium mt-1">⚠️ {tour.alert}</p>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="hidden md:block w-28">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{tour.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full">
                      <div
                        className={`h-1.5 rounded-full ${tour.status === 'at-risk' ? 'bg-brand-red' : 'bg-green-500'}`}
                        style={{ width: `${tour.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={tour.status} size="sm" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">₹{(tour.value / 1000).toFixed(0)}K</div>
                    </div>
                    {tour.status === 'at-risk' && (fixApplied !== tour.id) && (
                      <button
                        onClick={() => handleApplyFix(tour.id)}
                        disabled={applyingFix === tour.id}
                        className="bg-brand-red text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        {applyingFix === tour.id ? (
                          <div className="w-3 h-3 border border-white/50 border-t-white rounded-full animate-spin" />
                        ) : <Zap size={12} />}
                        Fix
                      </button>
                    )}
                    {fixApplied === tour.id && (
                      <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                        <Check size={12} /> Fixed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {!showAI && (
        <button onClick={() => setShowAI(true)} className="fixed bottom-6 right-6 bg-brand-red text-white px-5 py-3.5 rounded-full shadow-red-lg font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 z-40">
          <Bot size={18} />WAYVO AI
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}
      {showAI && <AIChat onClose={() => setShowAI(false)} variant="operator" />}
    </div>
  );
};

export default OperatorOperations;
