import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, AlertTriangle, Zap, CheckCircle2, Plane, Car, Hotel,
  Utensils, Calendar, Clock, Users, ArrowRight, Sparkles, Shield,
  ChevronDown, DollarSign, Activity, SmilePlus, RotateCcw
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { useWayvoEngine } from '../../data/wayvoEngine';

const impactChain = [
  { id: 'ic1', icon: Plane, label: 'Flight AI-672', detail: 'Delayed by 2 hours', severity: 'high' as const },
  { id: 'ic2', icon: Car, label: 'Airport Transfer', detail: 'Pickup needs rescheduling', severity: 'high' as const },
  { id: 'ic3', icon: Hotel, label: 'Hotel Check-in', detail: 'Late arrival notification needed', severity: 'medium' as const },
  { id: 'ic4', icon: Utensils, label: 'Dinner Reservation', detail: 'Time slot may conflict', severity: 'medium' as const },
  { id: 'ic5', icon: Calendar, label: 'Day 1 Schedule', detail: 'Timeline needs adjustment', severity: 'low' as const },
];

const recommendedActions = [
  { num: 1, label: 'Move airport transfer +2 hours', detail: 'Reschedule pickup from 12:30 PM to 2:30 PM' },
  { num: 2, label: 'Notify hotel of late check-in', detail: 'Send confirmation to The Lalit Grand Palace' },
  { num: 3, label: 'Move dinner reservation', detail: 'Shift from 7:30 PM to 8:30 PM at Ahdoos' },
  { num: 4, label: 'Update traveler itinerary', detail: 'Push new timeline to all 4 travelers' },
];

const CrisisManager: React.FC = () => {
  const navigate = useNavigate();
  const { state, triggerCrisis, applyCrisisFix, dispatch, addNotification } = useWayvoEngine();

  const [crisisTriggered, setCrisisTriggered] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [showTravelerNotif, setShowTravelerNotif] = useState(false);

  const handleTriggerCrisis = () => {
    setCrisisTriggered(true);
    triggerCrisis('Flight AI-672 delayed by 2 hours', [
      'Airport Transfer',
      'Hotel Check-in',
      'Dinner Reservation',
      'Day 1 Timeline',
    ]);
  };

  const handleApplyFix = async () => {
    setResolving(true);
    const actionIds = ['ca1', 'ca2', 'ca3', 'ca4', 'ca5'];
    const labels = [
      'Transfer updated',
      'Hotel notified',
      'Dinner rescheduled',
      'Traveler notified',
      'Itinerary updated',
    ];

    for (let i = 0; i < actionIds.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      setCompletedActions(prev => [...prev, labels[i]]);
    }

    await new Promise(r => setTimeout(r, 600));
    setResolving(false);
    setResolved(true);
    setShowTravelerNotif(true);

    addNotification({
      type: 'success',
      icon: '✓',
      title: 'Crisis Resolved',
      message: 'All 4 affected components have been updated. Your journey continues seamlessly.',
      time: 'Just now',
      priority: 'high',
      read: false,
      affectedTrip: 'Kashmir Escape',
      actionType: 'view-itinerary',
      actionRoute: '/traveler/itinerary/kashmir',
    });
  };

  const handleReset = () => {
    setCrisisTriggered(false);
    setResolving(false);
    setResolved(false);
    setCompletedActions([]);
    setShowTravelerNotif(false);
    dispatch({ type: 'RESET_CRISIS' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="traveler" />

      <main className="pt-20 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-4 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900">AI Crisis Manager</h1>
                    <p className="text-gray-500 text-sm">When plans change, WAYVO responds</p>
                  </div>
                </div>
              </div>
              {crisisTriggered && !resolved && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-bold text-xs">Live Crisis Active</span>
                </div>
              )}
              {resolved && (
                <button onClick={handleReset} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">
                  <RotateCcw size={12} /> Reset Demo
                </button>
              )}
            </div>
          </div>

          {/* Trigger */}
          {!crisisTriggered && (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                <AlertTriangle size={32} className="text-brand-red" />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2">Simulate a Disruption</h2>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                Click below to simulate a real-time flight delay and see how WAYVO's AI Crisis Manager automatically detects, analyzes, and resolves the disruption across your entire journey.
              </p>
              <button
                onClick={handleTriggerCrisis}
                className="bg-brand-red text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-red active:scale-95 inline-flex items-center gap-2"
              >
                <Zap size={16} />
                Trigger Flight Delay
              </button>
            </div>
          )}

          {/* Crisis Active */}
          {crisisTriggered && (
            <div className="space-y-6 animate-fade-in">
              {/* Alert Banner */}
              <div className={`rounded-3xl border-2 overflow-hidden transition-all ${resolved ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/60'}`}>
                <div className="px-6 py-4 flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${resolved ? 'bg-emerald-500' : 'bg-brand-red'}`}>
                    {resolved ? <CheckCircle2 size={20} className="text-white" /> : <AlertTriangle size={20} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-xs font-black uppercase tracking-wider mb-0.5 ${resolved ? 'text-emerald-700' : 'text-red-700'}`}>
                      {resolved ? '✓ CRISIS RESOLVED' : '⚠ ALERT'}
                    </div>
                    <p className={`text-sm font-bold ${resolved ? 'text-emerald-900' : 'text-gray-900'}`}>
                      {resolved ? 'Your journey has been automatically adapted.' : 'Flight AI-672 delayed by 2 hours'}
                    </p>
                    {!resolved && <p className="text-gray-500 text-xs mt-0.5">Kashmir Escape · 4 travelers affected</p>}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left: Dependency Chain */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-6">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Detected Impact</h3>
                  <p className="text-gray-400 text-xs mb-5">Dependency chain analysis</p>

                  <div className="space-y-0">
                    {impactChain.map((item, idx) => {
                      const Icon = item.icon;
                      const isResolved = resolved;
                      return (
                        <div key={item.id}>
                          <div className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-500 ${
                            isResolved
                              ? 'border-emerald-200 bg-emerald-50/30'
                              : item.severity === 'high'
                              ? 'border-red-200 bg-red-50/40'
                              : item.severity === 'medium'
                              ? 'border-amber-200 bg-amber-50/40'
                              : 'border-yellow-200 bg-yellow-50/40'
                          }`} style={{ animationDelay: `${idx * 150}ms` }}>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isResolved ? 'bg-emerald-100 text-emerald-600' :
                              item.severity === 'high' ? 'bg-red-100 text-red-600' :
                              item.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {isResolved ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900">{item.label}</p>
                              <p className="text-xs text-gray-500">{isResolved ? 'Resolved' : item.detail}</p>
                            </div>
                            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                              isResolved ? 'bg-emerald-500' :
                              item.severity === 'high' ? 'bg-red-500' :
                              item.severity === 'medium' ? 'bg-amber-500' :
                              'bg-yellow-400'
                            }`} />
                          </div>
                          {idx < impactChain.length - 1 && (
                            <div className="flex justify-start pl-7 py-0.5">
                              <ChevronDown size={14} className={`${isResolved ? 'text-emerald-300' : 'text-gray-300'}`} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* AI Analysis */}
                  <div className="mt-5 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-purple-600" />
                      <span className="text-xs font-black text-purple-900 uppercase tracking-wider">AI Analysis</span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {resolved
                        ? 'All 5 connected components have been successfully updated with zero additional cost.'
                        : `${impactChain.length} connected components are affected. WAYVO can resolve this automatically.`
                      }
                    </p>
                  </div>
                </div>

                {/* Right: Actions / Resolution */}
                <div className="space-y-6">
                  {/* Recommended Actions */}
                  {!resolved && (
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-6">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">Recommended Actions</h3>
                      <p className="text-gray-400 text-xs mb-4">WAYVO's optimal resolution strategy</p>

                      <div className="space-y-2.5 mb-5">
                        {recommendedActions.map(a => (
                          <div key={a.num} className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-7 h-7 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-black">{a.num}</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{a.label}</p>
                              <p className="text-xs text-gray-500">{a.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Impact Summary */}
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        <div className="text-center p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <DollarSign size={14} className="text-emerald-600 mx-auto mb-1" />
                          <p className="text-xs font-black text-emerald-900">₹0</p>
                          <p className="text-[10px] text-emerald-600">Additional Cost</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-2xl border border-blue-100">
                          <Clock size={14} className="text-blue-600 mx-auto mb-1" />
                          <p className="text-xs font-black text-blue-900">Minimal</p>
                          <p className="text-[10px] text-blue-600">Disruption</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-2xl border border-purple-100">
                          <SmilePlus size={14} className="text-purple-600 mx-auto mb-1" />
                          <p className="text-xs font-black text-purple-900">High</p>
                          <p className="text-[10px] text-purple-600">Satisfaction</p>
                        </div>
                      </div>

                      <button
                        onClick={handleApplyFix}
                        disabled={resolving}
                        className="w-full bg-brand-red text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-red active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {resolving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Applying AI Solution...
                          </>
                        ) : (
                          <>
                            <Zap size={16} />
                            Apply AI Solution
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Resolution Progress */}
                  {(resolving || resolved) && (
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-6 animate-fade-in">
                      <h3 className="font-bold text-gray-900 text-sm mb-4">
                        {resolved ? '✓ Resolution Complete' : 'Applying Solution...'}
                      </h3>
                      <div className="space-y-2.5">
                        {['Transfer updated', 'Hotel notified', 'Dinner rescheduled', 'Traveler notified', 'Itinerary updated'].map((label, idx) => {
                          const isComplete = completedActions.includes(label);
                          return (
                            <div key={label} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500 ${isComplete ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                              {isComplete ? (
                                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                              )}
                              <span className={`text-sm font-medium ${isComplete ? 'text-emerald-800' : 'text-gray-400'}`}>
                                {label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {resolved && (
                        <div className="mt-5 flex gap-2">
                          <button
                            onClick={() => navigate('/traveler/itinerary/kashmir')}
                            className="flex-1 bg-brand-red text-white py-2.5 rounded-xl font-bold text-xs hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
                          >
                            View Updated Itinerary <ArrowRight size={12} />
                          </button>
                          <button
                            onClick={() => navigate('/operator/operations')}
                            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors"
                          >
                            Operator View
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Traveler Notification Preview */}
                  {showTravelerNotif && (
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white animate-slide-up">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Traveler Notification Sent</span>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mb-3">
                        <p className="text-white font-bold text-sm mb-1">Your airport pickup has been updated.</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div>
                            <p className="text-gray-400 text-[10px]">New Time</p>
                            <p className="text-white font-bold text-sm">2:30 PM</p>
                          </div>
                          <div className="w-px h-8 bg-white/20" />
                          <div>
                            <p className="text-gray-400 text-[10px]">Reason</p>
                            <p className="text-white font-bold text-sm">Flight delayed</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate('/traveler/itinerary/kashmir')}
                        className="w-full bg-white/10 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center gap-1.5"
                      >
                        View Updated Itinerary <ArrowRight size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CrisisManager;
