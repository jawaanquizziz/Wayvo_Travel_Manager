import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu, Bot, AlertTriangle, Zap, Check, Plane, Clock, Hotel,
  Utensils, Camera, Users, Bell, ArrowRight, ShieldCheck, CheckCircle2
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import AIChat from '../../components/AIChat';
import { operatorTours } from '../../data/mockData';

const OperatorOperations: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [applyingFix, setApplyingFix] = useState<string | null>(null);
  const [fixApplied, setFixApplied] = useState<string | null>(null);
  const [flightFixApplied, setFlightFixApplied] = useState(false);
  const [flightFixLoading, setFlightFixLoading] = useState(false);

  const handleApplyFix = async (tourId: string) => {
    setApplyingFix(tourId);
    await new Promise(r => setTimeout(r, 1800));
    setFixApplied(tourId);
    setApplyingFix(null);
  };

  const handleFlightFix = async () => {
    setFlightFixLoading(true);
    await new Promise(r => setTimeout(r, 2200));
    setFlightFixApplied(true);
    setFlightFixLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className={`flex-1 transition-all duration-300 min-w-0 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Open Sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">Operations Control Center</h1>
              <p className="text-gray-400 text-xs hidden sm:block">Live conflict detection & automated tour adaptation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
              <span className="text-brand-red font-bold text-xs">Live Telemetry Active</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Flight Delay Live Simulation Banner */}
          <div className={`mb-6 rounded-3xl border-2 overflow-hidden transition-all shadow-card ${
            flightFixApplied ? 'border-emerald-200 bg-emerald-50/70' : 'border-red-200 bg-red-50/60'
          }`}>
            <div className="px-5 sm:px-7 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-current border-opacity-10">
              <div className="flex items-center gap-3">
                {flightFixApplied ? (
                  <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-xs flex-shrink-0">
                    <Check size={18} className="text-white" />
                  </div>
                ) : (
                  <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center shadow-xs flex-shrink-0 animate-pulse">
                    <AlertTriangle size={18} className="text-white" />
                  </div>
                )}
                <div>
                  <p className={`font-black text-sm sm:text-base ${flightFixApplied ? 'text-emerald-900' : 'text-red-950'}`}>
                    {flightFixApplied ? 'Disruption Resolved — Kashmir Group WV204' : 'LIVE ALERT: Flight Delay Detected — WV204 Kashmir Escape'}
                  </p>
                  <p className={`text-xs ${flightFixApplied ? 'text-emerald-700' : 'text-red-700'}`}>
                    {flightFixApplied ? 'WAYVO AI rescheduled ground transfers, updated hotel, and alerted travelers' : 'IndiGo 6E204 delayed by 2 hours on Srinagar route (Oct 12)'}
                  </p>
                </div>
              </div>

              {!flightFixApplied && (
                <div className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-brand-red text-white text-[10px] sm:text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider shadow-xs">
                  <Zap size={11} /> Immediate Action
                </div>
              )}
            </div>

            {!flightFixApplied ? (
              <div className="p-5 sm:p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Impact Analysis */}
                  <div>
                    <p className="text-xs font-black text-red-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Clock size={14} className="text-brand-red" />
                      WAYVO Conflict Impact Matrix:
                    </p>
                    <div className="space-y-2">
                      {[
                        { item: 'Airport Driver Transfer', impact: 'Pushed +2h (Now 13:00 IST)', severity: 'high', icon: Plane },
                        { item: 'Hotel Check-in', impact: 'Adjusted to 15:00 at Lalit Palace', severity: 'medium', icon: Hotel },
                        { item: 'Dal Lake Shikara Tour', impact: 'Moved to Day 2 afternoon', severity: 'high', icon: Camera },
                        { item: 'Ahdoos Dinner Reservation', impact: 'Shifted to 20:30 (Confirmed)', severity: 'low', icon: Utensils },
                      ].map(impact => {
                        const IIcon = impact.icon;
                        return (
                          <div key={impact.item} className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-red-100 shadow-xs">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              impact.severity === 'high' ? 'bg-red-50 text-brand-red' :
                              impact.severity === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                              <IIcon size={15} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 truncate">{impact.item}</p>
                              <p className="text-[11px] text-gray-500 truncate">{impact.impact}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Recommendation Actions */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-brand-red rounded-lg flex items-center justify-center">
                        <Zap size={11} className="text-white" />
                      </div>
                      <p className="text-xs font-black text-gray-900 uppercase tracking-wider">WAYVO Automated Action Plan:</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 space-y-2.5 border border-gray-200/80 shadow-xs text-xs text-gray-700">
                      {[
                        '✓ Push driver pickup to 13:00 automatically',
                        '✓ Update hotel reception for late arrival check-in',
                        '✓ Reschedule Shikara ticket without cancellation penalty',
                        '✓ Send synchronized push notification to all 4 travelers',
                        '✓ Notify local ground coordinator Rahul Singh',
                      ].map(action => (
                        <div key={action} className="flex items-center gap-2 font-medium">
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                      <button
                        onClick={handleFlightFix}
                        disabled={flightFixLoading}
                        className="flex-1 bg-brand-red text-white py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-red disabled:opacity-80"
                      >
                        {flightFixLoading ? (
                          <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Syncing Ground Operations...</>
                        ) : (
                          <><Zap size={15} /> Apply All Changes Instantly</>
                        )}
                      </button>
                      <button
                        onClick={() => navigate('/operator/tours')}
                        className="px-4 bg-white border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-xs hover:bg-gray-50 text-center"
                      >
                        Review Tour
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 sm:p-7 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Activities Rescheduled', val: '4', icon: CheckCircle2 },
                  { label: 'Vendors Re-coordinated', val: '3', icon: Hotel },
                  { label: 'Travelers Updated', val: '4', icon: Users },
                ].map(s => {
                  const SIcon = s.icon;
                  return (
                    <div key={s.label} className="bg-white rounded-2xl p-3.5 border border-emerald-200">
                      <div className="inline-flex items-center justify-center w-7 h-7 bg-emerald-50 text-emerald-600 rounded-xl mb-1">
                        <SIcon size={15} />
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-emerald-800">{s.val}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">{s.label}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tour Timeline + Traveler Notification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Tour Timeline */}
            <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-black text-gray-900 text-sm sm:text-base">Trip Timeline — Kashmir Escape</h2>
                  <p className="text-gray-400 text-[10px]">12 Oct – 19 Oct · 4 Travelers</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${flightFixApplied ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {flightFixApplied ? '✓ All Clear' : '⚠ 3 At Risk'}
                </span>
              </div>

              <div className="space-y-0">
                {[
                  { label: 'Flight IndiGo 6E204', time: flightFixApplied ? '12:00 PM (Delayed)' : '10:00 AM', status: flightFixApplied ? 'updated' : 'at-risk', icon: Plane },
                  { label: 'Airport Transfer', time: flightFixApplied ? '2:30 PM' : '12:30 PM', status: flightFixApplied ? 'updated' : 'at-risk', icon: ArrowRight },
                  { label: 'Hotel Check-in', time: flightFixApplied ? '4:00 PM' : '2:00 PM', status: flightFixApplied ? 'updated' : 'at-risk', icon: Hotel },
                  { label: 'Dal Lake Activity', time: flightFixApplied ? '5:30 PM' : '4:00 PM', status: flightFixApplied ? 'confirmed' : 'pending', icon: Camera },
                  { label: 'Kashmiri Dinner', time: flightFixApplied ? '8:30 PM' : '7:30 PM', status: flightFixApplied ? 'confirmed' : 'confirmed', icon: Utensils },
                  { label: 'Day 2 Transfer', time: '9:00 AM', status: 'confirmed', icon: ArrowRight },
                  { label: 'Return Flight', time: '1:00 PM', status: 'confirmed', icon: Plane },
                ].map((item, idx, arr) => {
                  const Icon = item.icon;
                  const statusColor = item.status === 'confirmed' ? 'bg-emerald-500' : item.status === 'updated' ? 'bg-blue-500' : item.status === 'at-risk' ? 'bg-red-500' : 'bg-gray-400';
                  const statusBorder = item.status === 'at-risk' ? 'border-red-200 bg-red-50/30' : item.status === 'updated' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100';

                  return (
                    <div key={item.label}>
                      <div className={`flex items-center gap-3 p-2.5 rounded-xl border ${statusBorder} transition-all`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${statusColor} flex-shrink-0`} />
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${item.status === 'at-risk' ? 'bg-red-100 text-red-600' : item.status === 'updated' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          <Icon size={12} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{item.label}</p>
                        </div>
                        <span className="text-[10px] font-semibold text-gray-500">{item.time}</span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="pl-4 py-0">
                          <div className={`w-px h-3 ml-[3px] ${item.status === 'at-risk' ? 'bg-red-300' : 'bg-gray-200'}`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!flightFixApplied && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                    <AlertTriangle size={12} />
                    WAYVO detected 3 downstream impacts from Flight Delay
                  </p>
                </div>
              )}
            </div>

            {/* Traveler Notification Preview */}
            <div className="card rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card">
              <h2 className="font-black text-gray-900 text-sm sm:text-base mb-1">Traveler ↔ Operator Sync</h2>
              <p className="text-gray-400 text-[10px] mb-4">Real-time notification to travelers</p>

              {flightFixApplied ? (
                <div className="space-y-3 animate-fade-in">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-800">Notification Sent to All 4 Travelers</span>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-emerald-100">
                      <p className="text-sm font-bold text-gray-900 mb-1">Your airport pickup has been updated.</p>
                      <div className="flex gap-4 mt-2">
                        <div>
                          <p className="text-[10px] text-gray-400">New Time</p>
                          <p className="text-sm font-black text-gray-900">2:30 PM</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400">Reason</p>
                          <p className="text-sm font-black text-gray-900">Flight delayed</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400">Cost Impact</p>
                          <p className="text-sm font-black text-emerald-600">₹0</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {['Alison Pinto', 'Rohan Mehta', 'Priya Sharma', 'Arjun Kapoor'].map((name, i) => (
                      <div key={name} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 border border-gray-100">
                        <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center">
                          <span className="text-white text-[9px] font-bold">{name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-800 flex-1">{name}</span>
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="text-[10px] text-gray-400">Notified</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Bell size={20} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-bold text-gray-500">No pending notifications</p>
                  <p className="text-xs text-gray-400 mt-1">Apply the AI solution to notify travelers automatically</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Tours Fleet Status */}
          <div className="card rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <h2 className="font-black text-gray-900 text-base sm:text-lg">Live Tour Fleet Overview</h2>
                <p className="text-gray-400 text-xs">Active group journeys and real-time risk indicators</p>
              </div>
              <button onClick={() => navigate('/operator/tours')} className="text-brand-red text-xs sm:text-sm font-bold hover:underline self-start sm:self-auto">
                Manage Fleet Database →
              </button>
            </div>

            <div className="space-y-3">
              {operatorTours.map(tour => (
                <div
                  key={tour.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                    tour.status === 'at-risk' ? 'border-red-200 bg-red-50/40' : 'border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={tour.image}
                      alt={tour.destination}
                      className="w-12 h-12 rounded-2xl object-cover flex-shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.background = '#e2e8f0'; (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 text-sm">{tour.title}</span>
                        <span className="text-gray-400 text-xs font-mono bg-gray-100 px-2 py-0.5 rounded-md">{tour.id}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>{tour.destination}</span>
                        <span>•</span>
                        <span>{tour.startDate} – {tour.endDate}</span>
                        <span>•</span>
                        <span className="font-semibold text-gray-700">{tour.travelers} pax</span>
                      </p>
                      {tour.alert && (
                        <p className="text-xs text-red-600 font-bold mt-1">⚠️ {tour.alert}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <StatusBadge status={tour.status} size="sm" />
                    
                    <div className="text-right">
                      <span className="text-xs font-black text-gray-900 block">₹{(tour.value / 1000).toFixed(0)}K</span>
                      <span className="text-[10px] text-gray-400">Total Value</span>
                    </div>

                    {tour.status === 'at-risk' && fixApplied !== tour.id && (
                      <button
                        onClick={() => handleApplyFix(tour.id)}
                        disabled={applyingFix === tour.id}
                        className="bg-brand-red text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1 shadow-xs disabled:opacity-75"
                      >
                        {applyingFix === tour.id ? (
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                        ) : <Zap size={12} />}
                        Fix
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-6 right-6 bg-brand-red text-white px-5 py-3.5 rounded-full shadow-red-lg font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 z-40"
        >
          <Bot size={18} />
          <span>WAYVO AI</span>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </button>
      )}

      {showAI && <AIChat onClose={() => setShowAI(false)} variant="operator" />}
    </div>
  );
};

export default OperatorOperations;
