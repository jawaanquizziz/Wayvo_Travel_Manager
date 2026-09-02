import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plane, Car, Hotel, Camera, Utensils, ArrowRight,
  AlertTriangle, CheckCircle2, Zap, Sparkles, RotateCcw,
  CloudRain, XCircle, Clock, User, MapPin, Shield,
  ChevronDown, Activity, Navigation
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { useWayvoEngine } from '../../data/wayvoEngine';

const scenarios = [
  { id: 'flight-delay', label: 'Flight Delay', icon: Plane, color: 'text-red-500 bg-red-50 border-red-200', desc: '+2 hours delay' },
  { id: 'heavy-rain', label: 'Heavy Rain', icon: CloudRain, color: 'text-blue-500 bg-blue-50 border-blue-200', desc: 'Weather impact' },
  { id: 'hotel-unavailable', label: 'Hotel Unavailable', icon: Hotel, color: 'text-orange-500 bg-orange-50 border-orange-200', desc: 'Overbooked' },
  { id: 'activity-cancelled', label: 'Activity Cancelled', icon: XCircle, color: 'text-amber-500 bg-amber-50 border-amber-200', desc: 'Vendor cancelled' },
  { id: 'traffic-delay', label: 'Traffic Delay', icon: Car, color: 'text-purple-500 bg-purple-50 border-purple-200', desc: 'Road blocked' },
  { id: 'plan-change', label: 'Traveler Changes Plan', icon: User, color: 'text-teal-500 bg-teal-50 border-teal-200', desc: 'New preference' },
];

interface JourneyNode {
  id: string;
  type: string;
  icon: any;
  label: string;
  detail: string;
  time: string;
  status: 'confirmed' | 'at-risk' | 'affected' | 'updated';
}

const defaultNodes: JourneyNode[] = [
  { id: 'flight-1', type: 'flight', icon: Plane, label: 'Flight', detail: 'Mumbai → Srinagar', time: '10:00 AM', status: 'confirmed' },
  { id: 'transfer-1', type: 'transfer', icon: Car, label: 'Airport Transfer', detail: 'Airport → Hotel', time: '12:30 PM', status: 'confirmed' },
  { id: 'hotel-1', type: 'hotel', icon: Hotel, label: 'Hotel Check-in', detail: 'The Lalit Grand Palace', time: '2:00 PM', status: 'confirmed' },
  { id: 'activity-1', type: 'activity', icon: Camera, label: 'Dal Lake Shikara Ride', detail: 'Dal Lake, Srinagar', time: '4:00 PM', status: 'confirmed' },
  { id: 'meal-1', type: 'meal', icon: Utensils, label: 'Kashmiri Dinner', detail: 'Ahdoos Restaurant', time: '7:30 PM', status: 'confirmed' },
  { id: 'transfer-2', type: 'transfer', icon: Car, label: 'Day 2 Transfer', detail: 'Srinagar → Gulmarg', time: '9:00 AM', status: 'confirmed' },
  { id: 'activity-2', type: 'activity', icon: Activity, label: 'Gondola Ride', detail: 'Gulmarg Gondola Station', time: '11:30 AM', status: 'confirmed' },
  { id: 'flight-2', type: 'flight', icon: Plane, label: 'Return Flight', detail: 'Srinagar → Mumbai', time: '1:00 PM', status: 'confirmed' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-500',
  'at-risk': 'bg-amber-500',
  affected: 'bg-red-500',
  updated: 'bg-blue-500',
};

const statusBorders: Record<string, string> = {
  confirmed: 'border-gray-200',
  'at-risk': 'border-amber-300',
  affected: 'border-red-300 shadow-[0_0_20px_rgba(239,68,68,0.15)]',
  updated: 'border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmed',
  'at-risk': 'At Risk',
  affected: 'Affected',
  updated: 'Updated',
};

const DigitalTwin: React.FC = () => {
  const navigate = useNavigate();
  const { state, triggerDisruption, applySimulation, dispatch, addNotification } = useWayvoEngine();

  const [nodes, setNodes] = useState<JourneyNode[]>(defaultNodes);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [showBefore, setShowBefore] = useState(false);
  const [impactRevealed, setImpactRevealed] = useState(false);
  const [simulationAppliedLocal, setSimulationAppliedLocal] = useState(false);

  // When scenario results arrive, update node statuses
  useEffect(() => {
    if (state.scenarioImpacts.length > 0 && !state.simulatingScenario) {
      setImpactRevealed(true);
      const affectedIds = state.scenarioImpacts.map(i => i.nodeId);
      setNodes(prev =>
        prev.map(n =>
          affectedIds.includes(n.id) ? { ...n, status: 'affected' } : n
        )
      );
    }
  }, [state.scenarioImpacts, state.simulatingScenario]);

  // When simulation is applied, update nodes
  useEffect(() => {
    if (state.simulationApplied && !simulationAppliedLocal) {
      setSimulationAppliedLocal(true);
      setNodes(prev => prev.map(n => n.status === 'affected' ? { ...n, status: 'updated' } : n));
    }
  }, [state.simulationApplied, simulationAppliedLocal]);

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setShowBefore(true);
    setImpactRevealed(false);
    setSimulationAppliedLocal(false);
    setNodes(defaultNodes);
    triggerDisruption(scenarioId);
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setShowBefore(false);
    setImpactRevealed(false);
    setSimulationAppliedLocal(false);
    setNodes(defaultNodes);
    dispatch({ type: 'RESET_SCENARIO' });
  };

  const handleApply = () => {
    applySimulation();
    addNotification({
      type: 'success',
      icon: '✓',
      title: 'Simulation Applied',
      message: 'Your itinerary has been updated based on the Digital Twin simulation.',
      time: 'Just now',
      priority: 'high',
      read: false,
      affectedTrip: 'Kashmir Escape',
      actionType: 'view-itinerary',
      actionRoute: '/traveler/itinerary/kashmir',
    });
  };

  const recommendedOption = state.simulationOptions.find(o => o.recommended);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="traveler" />

      <main className="pt-20 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-4 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield size={20} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900">AI Digital Twin</h1>
                    <p className="text-gray-500 text-sm">Simulate your journey before you travel</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2 max-w-xl">
                  WAYVO creates a digital representation of your planned journey and evaluates possible scenarios before they affect your trip.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  Kashmir Escape · 7 Days
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Journey Visualization */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-gray-900 text-lg">Journey Map</h2>
                  {selectedScenario && (
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <RotateCcw size={12} /> Reset
                    </button>
                  )}
                </div>

                {/* Node Graph */}
                <div className="space-y-0">
                  {nodes.map((node, idx) => {
                    const Icon = node.icon;
                    const isAffected = node.status === 'affected';
                    const isUpdated = node.status === 'updated';
                    const impact = state.scenarioImpacts.find(i => i.nodeId === node.id);

                    return (
                      <div key={node.id}>
                        <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-500 ${statusBorders[node.status]} ${isAffected ? 'bg-red-50/50 animate-pulse-subtle' : isUpdated ? 'bg-blue-50/50' : 'bg-white'}`}>
                          {/* Status dot + line */}
                          <div className="flex flex-col items-center pt-1">
                            <div className={`w-3.5 h-3.5 rounded-full ${statusColors[node.status]} transition-colors duration-500 ${isAffected ? 'ring-4 ring-red-200' : isUpdated ? 'ring-4 ring-blue-200' : ''}`} />
                            {idx < nodes.length - 1 && (
                              <div className={`w-px h-8 mt-1 ${isAffected ? 'bg-red-300' : 'bg-gray-200'} transition-colors duration-500`} />
                            )}
                          </div>

                          {/* Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isAffected ? 'bg-red-100 text-red-600' : isUpdated ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                            <Icon size={18} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 text-sm">{node.label}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                node.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                node.status === 'at-risk' ? 'bg-amber-100 text-amber-700' :
                                node.status === 'affected' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {statusLabels[node.status]}
                              </span>
                            </div>
                            <p className="text-gray-500 text-xs mt-0.5">{node.detail}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{node.time}</p>

                            {/* Impact detail */}
                            {impact && impactRevealed && (
                              <div className="mt-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2 animate-fade-in">
                                <p className="text-red-700 text-xs font-semibold flex items-center gap-1.5">
                                  <AlertTriangle size={12} />
                                  {impact.effect}
                                </p>
                              </div>
                            )}

                            {/* Updated confirmation */}
                            {isUpdated && (
                              <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 animate-fade-in">
                                <p className="text-blue-700 text-xs font-semibold flex items-center gap-1.5">
                                  <CheckCircle2 size={12} />
                                  Updated by WAYVO simulation
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Connector arrow */}
                        {idx < nodes.length - 1 && (
                          <div className="flex items-center justify-start pl-[22px] py-0">
                            <ChevronDown size={14} className={`${isAffected ? 'text-red-400' : 'text-gray-300'} transition-colors duration-500`} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Scenario Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scenario Selector */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-6">
                <h3 className="font-bold text-gray-900 text-base mb-1">Simulate a Scenario</h3>
                <p className="text-gray-400 text-xs mb-4">Click a scenario to see how it impacts your journey.</p>

                <div className="grid grid-cols-2 gap-2.5">
                  {scenarios.map(s => {
                    const Icon = s.icon;
                    const isActive = selectedScenario === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleSelectScenario(s.id)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 group ${
                          isActive
                            ? 'border-brand-red bg-red-50 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${isActive ? 'bg-brand-red text-white' : s.color.split(' ').slice(1).join(' ')}`}>
                          <Icon size={16} className={isActive ? '' : s.color.split(' ')[0]} />
                        </div>
                        <p className={`text-xs font-bold ${isActive ? 'text-brand-red' : 'text-gray-800'}`}>{s.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{s.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Impact Analysis */}
              {selectedScenario && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-card p-6 animate-slide-up">
                  {state.simulatingScenario ? (
                    // Loading
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-spin-slow">
                        <Sparkles size={20} className="text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-1">WAYVO is simulating...</h3>
                      <p className="text-gray-400 text-xs">Analyzing dependencies and generating alternatives</p>
                      <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full progress-animate" />
                      </div>
                    </div>
                  ) : impactRevealed && !simulationAppliedLocal ? (
                    // Impact + Options
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                          <AlertTriangle size={16} className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">Impact Detected</h3>
                          <p className="text-gray-400 text-[10px]">{state.scenarioImpacts.length} components affected</p>
                        </div>
                      </div>

                      {/* Impact list */}
                      <div className="space-y-2 mb-5">
                        {state.scenarioImpacts.map((impact, idx) => (
                          <div key={impact.nodeId} className="flex items-center gap-3 text-xs animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              impact.severity === 'high' ? 'bg-red-500' :
                              impact.severity === 'medium' ? 'bg-amber-500' : 'bg-yellow-400'
                            }`} />
                            <span className="text-gray-700 font-medium">{impact.effect}</span>
                          </div>
                        ))}
                      </div>

                      {/* Simulation Results */}
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Sparkles size={12} className="text-purple-600" />
                          Simulation Results
                        </h4>

                        <div className="space-y-2.5">
                          {state.simulationOptions.map((option) => (
                            <div
                              key={option.id}
                              className={`p-3.5 rounded-2xl border transition-all ${
                                option.recommended
                                  ? 'border-brand-red bg-red-50/50 shadow-sm'
                                  : 'border-gray-200 bg-white'
                              }`}
                            >
                              {option.recommended && (
                                <div className="flex items-center gap-1 mb-2">
                                  <CheckCircle2 size={12} className="text-brand-red" />
                                  <span className="text-[10px] font-black text-brand-red uppercase tracking-wider">Recommended</span>
                                </div>
                              )}
                              <p className="text-sm font-bold text-gray-900">{option.label}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`text-xs font-bold ${option.costDelta > 0 ? 'text-red-600' : option.costDelta < 0 ? 'text-emerald-600' : 'text-gray-600'}`}>
                                  {option.cost}
                                </span>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  option.impact === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                                  option.impact === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {option.impact} Impact
                                </span>
                                <span className="text-[10px] text-gray-400">{option.timeDelta}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {recommendedOption && (
                          <div className="mt-4 bg-gray-50 rounded-2xl p-3 border border-gray-100">
                            <p className="text-xs text-gray-600">
                              <span className="font-bold text-gray-900">Best match:</span>{' '}
                              {recommendedOption.description} with {recommendedOption.cost === '₹0' ? 'zero additional cost' : recommendedOption.cost}.
                            </p>
                          </div>
                        )}

                        <button
                          onClick={handleApply}
                          className="w-full mt-4 bg-brand-red text-white py-3 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-red active:scale-95"
                        >
                          <Sparkles size={16} />
                          Apply Simulation
                        </button>
                      </div>
                    </>
                  ) : simulationAppliedLocal ? (
                    // Success
                    <div className="text-center py-6">
                      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={28} className="text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">Simulation Applied</h3>
                      <p className="text-gray-500 text-xs mb-4">Your itinerary has been updated and your operator has been notified.</p>

                      <div className="space-y-2 text-left mb-4">
                        {['Itinerary updated', 'Schedule recalculated', 'Operator notified', 'Costs adjusted'].map((item, i) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-gray-700 animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            <span className="font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate('/traveler/itinerary/kashmir')}
                          className="flex-1 bg-brand-red text-white py-2.5 rounded-xl font-bold text-xs hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
                        >
                          View Itinerary <ArrowRight size={12} />
                        </button>
                        <button
                          onClick={handleReset}
                          className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Go to Crisis Manager */}
              {!selectedScenario && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-brand-red rounded-xl flex items-center justify-center">
                      <Zap size={16} className="text-white" />
                    </div>
                    <h3 className="font-bold text-sm">AI Crisis Manager</h3>
                  </div>
                  <p className="text-gray-400 text-xs mb-4">Need to handle a real-time disruption? The Crisis Manager automatically detects, analyzes, and resolves issues.</p>
                  <button
                    onClick={() => navigate('/traveler/crisis-manager')}
                    className="w-full bg-white/10 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-white/20 transition-colors flex items-center justify-center gap-1.5 border border-white/20"
                  >
                    Open Crisis Manager <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DigitalTwin;
