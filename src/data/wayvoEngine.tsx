import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

// ============================================
// WAYVO Intelligence Engine — Shared State
// Connects all 6 core features together
// ============================================

export interface TwinNode {
  id: string;
  type: 'flight' | 'transfer' | 'hotel' | 'activity' | 'transport' | 'meal';
  label: string;
  detail: string;
  time: string;
  status: 'confirmed' | 'at-risk' | 'affected' | 'cancelled' | 'updated';
  day: number;
  dependsOn?: string[];
}

export interface DisruptionImpact {
  nodeId: string;
  effect: string;
  severity: 'high' | 'medium' | 'low';
}

export interface SimulationOption {
  id: string;
  label: string;
  description: string;
  cost: string;
  costDelta: number;
  impact: 'Low' | 'Medium' | 'High';
  recommended: boolean;
  timeDelta: string;
}

export interface CrisisAction {
  id: string;
  label: string;
  completed: boolean;
}

export interface WayvoNotification {
  id: string;
  type: 'alert' | 'success' | 'info' | 'warning' | 'update';
  icon: string;
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'normal' | 'low';
  read: boolean;
  affectedTrip?: string;
  actionType?: 'view-impact' | 'view-itinerary' | 'view-details' | null;
  actionRoute?: string;
}

export interface DemoStep {
  id: number;
  phase: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export interface WayvoState {
  // Trip state
  currentItinerary: any;
  itineraryModified: boolean;
  optimizationToast: string | null;

  // Digital Twin
  twinNodes: TwinNode[];
  activeScenario: string | null;
  scenarioImpacts: DisruptionImpact[];
  simulationOptions: SimulationOption[];
  simulationApplied: boolean;
  simulatingScenario: boolean;

  // Crisis Manager
  activeCrisis: boolean;
  crisisAlert: string | null;
  crisisImpacts: string[];
  crisisActions: CrisisAction[];
  crisisResolved: boolean;
  crisisResolving: boolean;

  // Notifications
  notifications: WayvoNotification[];

  // Operator sync
  operatorSynced: boolean;
  travelerNotified: boolean;
  lastSyncEvent: string | null;

  // Demo mode
  demoActive: boolean;
  demoStep: number;
  demoSteps: DemoStep[];
  demoCompleted: boolean;
}

type WayvoAction =
  | { type: 'SET_ITINERARY'; payload: any }
  | { type: 'MODIFY_ITINERARY'; payload: { toast: string } }
  | { type: 'CLEAR_TOAST' }
  | { type: 'SET_TWIN_NODES'; payload: TwinNode[] }
  | { type: 'TRIGGER_SCENARIO'; payload: string }
  | { type: 'SET_SIMULATING'; payload: boolean }
  | { type: 'SET_SCENARIO_RESULTS'; payload: { impacts: DisruptionImpact[]; options: SimulationOption[] } }
  | { type: 'APPLY_SIMULATION' }
  | { type: 'RESET_SCENARIO' }
  | { type: 'TRIGGER_CRISIS'; payload: { alert: string; impacts: string[] } }
  | { type: 'SET_CRISIS_RESOLVING'; payload: boolean }
  | { type: 'COMPLETE_CRISIS_ACTION'; payload: string }
  | { type: 'RESOLVE_CRISIS' }
  | { type: 'RESET_CRISIS' }
  | { type: 'ADD_NOTIFICATION'; payload: WayvoNotification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SYNC_OPERATOR'; payload: string }
  | { type: 'NOTIFY_TRAVELER' }
  | { type: 'START_DEMO' }
  | { type: 'ADVANCE_DEMO' }
  | { type: 'COMPLETE_DEMO' }
  | { type: 'RESET_DEMO' }
  | { type: 'RESET_ALL' };

const initialDemoSteps: DemoStep[] = [
  { id: 1, phase: '01', label: 'Detect', description: 'Flight delay detected for Kashmir trip', status: 'pending' },
  { id: 2, phase: '02', label: 'Analyze', description: 'Mapping affected dependencies', status: 'pending' },
  { id: 3, phase: '03', label: 'Predict', description: 'Calculating downstream impacts', status: 'pending' },
  { id: 4, phase: '04', label: 'Recommend', description: 'Generating optimal alternatives', status: 'pending' },
  { id: 5, phase: '05', label: 'Adapt', description: 'Applying best solution', status: 'pending' },
  { id: 6, phase: '06', label: 'Notify', description: 'Updating all stakeholders', status: 'pending' },
];

const initialState: WayvoState = {
  currentItinerary: null,
  itineraryModified: false,
  optimizationToast: null,
  twinNodes: [],
  activeScenario: null,
  scenarioImpacts: [],
  simulationOptions: [],
  simulationApplied: false,
  simulatingScenario: false,
  activeCrisis: false,
  crisisAlert: null,
  crisisImpacts: [],
  crisisActions: [],
  crisisResolved: false,
  crisisResolving: false,
  notifications: [],
  operatorSynced: false,
  travelerNotified: false,
  lastSyncEvent: null,
  demoActive: false,
  demoStep: 0,
  demoSteps: initialDemoSteps,
  demoCompleted: false,
};

function wayvoReducer(state: WayvoState, action: WayvoAction): WayvoState {
  switch (action.type) {
    case 'SET_ITINERARY':
      return { ...state, currentItinerary: action.payload };
    case 'MODIFY_ITINERARY':
      return { ...state, itineraryModified: true, optimizationToast: action.payload.toast };
    case 'CLEAR_TOAST':
      return { ...state, optimizationToast: null };

    case 'SET_TWIN_NODES':
      return { ...state, twinNodes: action.payload };
    case 'TRIGGER_SCENARIO':
      return { ...state, activeScenario: action.payload, simulationApplied: false, simulatingScenario: true, scenarioImpacts: [], simulationOptions: [] };
    case 'SET_SIMULATING':
      return { ...state, simulatingScenario: action.payload };
    case 'SET_SCENARIO_RESULTS':
      return { ...state, scenarioImpacts: action.payload.impacts, simulationOptions: action.payload.options, simulatingScenario: false };
    case 'APPLY_SIMULATION':
      return {
        ...state,
        simulationApplied: true,
        itineraryModified: true,
        twinNodes: state.twinNodes.map(n =>
          state.scenarioImpacts.some(i => i.nodeId === n.id)
            ? { ...n, status: 'updated' as const }
            : n
        ),
      };
    case 'RESET_SCENARIO':
      return {
        ...state,
        activeScenario: null,
        scenarioImpacts: [],
        simulationOptions: [],
        simulationApplied: false,
        simulatingScenario: false,
        twinNodes: state.twinNodes.map(n => ({ ...n, status: 'confirmed' as const })),
      };

    case 'TRIGGER_CRISIS':
      return {
        ...state,
        activeCrisis: true,
        crisisAlert: action.payload.alert,
        crisisImpacts: action.payload.impacts,
        crisisResolved: false,
        crisisResolving: false,
        crisisActions: [
          { id: 'ca1', label: 'Move airport transfer +2 hours', completed: false },
          { id: 'ca2', label: 'Notify hotel of late check-in', completed: false },
          { id: 'ca3', label: 'Reschedule dinner reservation', completed: false },
          { id: 'ca4', label: 'Update traveler itinerary', completed: false },
          { id: 'ca5', label: 'Notify traveler', completed: false },
        ],
      };
    case 'SET_CRISIS_RESOLVING':
      return { ...state, crisisResolving: action.payload };
    case 'COMPLETE_CRISIS_ACTION':
      return {
        ...state,
        crisisActions: state.crisisActions.map(a =>
          a.id === action.payload ? { ...a, completed: true } : a
        ),
      };
    case 'RESOLVE_CRISIS':
      return { ...state, crisisResolved: true, crisisResolving: false, activeCrisis: false };
    case 'RESET_CRISIS':
      return {
        ...state,
        activeCrisis: false,
        crisisAlert: null,
        crisisImpacts: [],
        crisisActions: [],
        crisisResolved: false,
        crisisResolving: false,
      };

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };

    case 'SYNC_OPERATOR':
      return { ...state, operatorSynced: true, lastSyncEvent: action.payload };
    case 'NOTIFY_TRAVELER':
      return { ...state, travelerNotified: true };

    case 'START_DEMO':
      return {
        ...state,
        demoActive: true,
        demoStep: 0,
        demoCompleted: false,
        demoSteps: initialDemoSteps.map((s, i) =>
          i === 0 ? { ...s, status: 'active' as const } : { ...s, status: 'pending' as const }
        ),
      };
    case 'ADVANCE_DEMO': {
      const next = state.demoStep + 1;
      if (next >= state.demoSteps.length) {
        return {
          ...state,
          demoStep: next,
          demoCompleted: true,
          demoSteps: state.demoSteps.map(s => ({ ...s, status: 'completed' as const })),
        };
      }
      return {
        ...state,
        demoStep: next,
        demoSteps: state.demoSteps.map((s, i) => {
          if (i < next) return { ...s, status: 'completed' as const };
          if (i === next) return { ...s, status: 'active' as const };
          return { ...s, status: 'pending' as const };
        }),
      };
    }
    case 'COMPLETE_DEMO':
      return {
        ...state,
        demoActive: false,
        demoCompleted: true,
        demoSteps: state.demoSteps.map(s => ({ ...s, status: 'completed' as const })),
      };
    case 'RESET_DEMO':
      return {
        ...state,
        demoActive: false,
        demoStep: 0,
        demoCompleted: false,
        demoSteps: initialDemoSteps,
      };

    case 'RESET_ALL':
      return initialState;

    default:
      return state;
  }
}

// ============================================
// Context & Provider
// ============================================

interface WayvoEngineContextType {
  state: WayvoState;
  dispatch: React.Dispatch<WayvoAction>;
  triggerDisruption: (scenarioId: string) => void;
  applySimulation: () => void;
  triggerCrisis: (alert: string, impacts: string[]) => void;
  applyCrisisFix: () => Promise<void>;
  addNotification: (notif: Omit<WayvoNotification, 'id'>) => void;
  syncOperator: (event: string) => void;
  notifyTraveler: () => void;
  runDemo: () => Promise<void>;
  resetAll: () => void;
}

const WayvoEngineContext = createContext<WayvoEngineContextType | null>(null);

// Scenario data lookup
const scenarioData: Record<string, { impacts: DisruptionImpact[]; options: SimulationOption[] }> = {
  'flight-delay': {
    impacts: [
      { nodeId: 'flight-1', effect: 'Flight delayed by 2 hours', severity: 'high' },
      { nodeId: 'transfer-1', effect: 'Airport transfer timing affected', severity: 'high' },
      { nodeId: 'hotel-1', effect: 'Hotel check-in delayed', severity: 'medium' },
      { nodeId: 'activity-1', effect: 'Evening activity schedule affected', severity: 'medium' },
    ],
    options: [
      { id: 'opt-a', label: 'Option A', description: 'Move airport transfer, keep all activities', cost: '+₹500', costDelta: 500, impact: 'Low', recommended: false, timeDelta: '+2 hrs' },
      { id: 'opt-b', label: 'Option B', description: 'Reschedule afternoon activity to evening', cost: '₹0', costDelta: 0, impact: 'Low', recommended: true, timeDelta: '+2 hrs shift' },
      { id: 'opt-c', label: 'Option C', description: 'Replace afternoon activity with nearby option', cost: '+₹800', costDelta: 800, impact: 'Medium', recommended: false, timeDelta: 'No change' },
    ],
  },
  'heavy-rain': {
    impacts: [
      { nodeId: 'activity-1', effect: 'Outdoor activity unsafe', severity: 'high' },
      { nodeId: 'transfer-2', effect: 'Road travel may be delayed', severity: 'medium' },
    ],
    options: [
      { id: 'opt-a', label: 'Option A', description: 'Switch to indoor cultural experience', cost: '-₹200', costDelta: -200, impact: 'Low', recommended: true, timeDelta: 'No change' },
      { id: 'opt-b', label: 'Option B', description: 'Postpone activity to next clear day', cost: '₹0', costDelta: 0, impact: 'Medium', recommended: false, timeDelta: '+1 day' },
      { id: 'opt-c', label: 'Option C', description: 'Replace with spa & wellness session', cost: '+₹1,200', costDelta: 1200, impact: 'Low', recommended: false, timeDelta: 'No change' },
    ],
  },
  'hotel-unavailable': {
    impacts: [
      { nodeId: 'hotel-1', effect: 'Hotel overbooked, room unavailable', severity: 'high' },
      { nodeId: 'transfer-1', effect: 'Transfer route may change', severity: 'low' },
      { nodeId: 'activity-1', effect: 'Nearby activities may need adjustment', severity: 'low' },
    ],
    options: [
      { id: 'opt-a', label: 'Option A', description: 'Upgrade to 5-star heritage hotel nearby', cost: '+₹2,000', costDelta: 2000, impact: 'Low', recommended: false, timeDelta: 'No change' },
      { id: 'opt-b', label: 'Option B', description: 'Move to partner hotel, same area, same tier', cost: '₹0', costDelta: 0, impact: 'Low', recommended: true, timeDelta: '+15 min transfer' },
      { id: 'opt-c', label: 'Option C', description: 'Dal Lake premium houseboat stay', cost: '+₹1,500', costDelta: 1500, impact: 'Medium', recommended: false, timeDelta: '+30 min transfer' },
    ],
  },
  'activity-cancelled': {
    impacts: [
      { nodeId: 'activity-2', effect: 'Activity cancelled by vendor', severity: 'high' },
    ],
    options: [
      { id: 'opt-a', label: 'Option A', description: 'Mountain Café Experience', cost: '-₹700', costDelta: -700, impact: 'Low', recommended: false, timeDelta: '+10 min travel' },
      { id: 'opt-b', label: 'Option B', description: 'Extended Gondola + Summit Photography', cost: '-₹300', costDelta: -300, impact: 'Low', recommended: true, timeDelta: 'No change' },
      { id: 'opt-c', label: 'Option C', description: 'Local Village Adventure Tour', cost: '+₹100', costDelta: 100, impact: 'Low', recommended: false, timeDelta: '+25 min travel' },
    ],
  },
  'traffic-delay': {
    impacts: [
      { nodeId: 'transfer-2', effect: 'Road blocked, 1 hour additional delay', severity: 'high' },
      { nodeId: 'activity-2', effect: 'Afternoon activity start delayed', severity: 'medium' },
    ],
    options: [
      { id: 'opt-a', label: 'Option A', description: 'Take alternate scenic route (+30 min)', cost: '+₹300', costDelta: 300, impact: 'Low', recommended: true, timeDelta: '+30 min' },
      { id: 'opt-b', label: 'Option B', description: 'Wait for road to clear', cost: '₹0', costDelta: 0, impact: 'High', recommended: false, timeDelta: '+1–2 hrs' },
      { id: 'opt-c', label: 'Option C', description: 'Skip next transfer, do nearby activity', cost: '-₹500', costDelta: -500, impact: 'Medium', recommended: false, timeDelta: 'No change' },
    ],
  },
  'plan-change': {
    impacts: [
      { nodeId: 'activity-1', effect: 'Traveler wants to swap activity', severity: 'low' },
      { nodeId: 'meal-1', effect: 'Dinner timing may shift', severity: 'low' },
    ],
    options: [
      { id: 'opt-a', label: 'Option A', description: 'Houseboat relaxation afternoon', cost: '+₹400', costDelta: 400, impact: 'Low', recommended: true, timeDelta: 'No change' },
      { id: 'opt-b', label: 'Option B', description: 'Mughal Gardens heritage walk', cost: '-₹600', costDelta: -600, impact: 'Low', recommended: false, timeDelta: '-30 min' },
      { id: 'opt-c', label: 'Option C', description: 'Free afternoon (self-explore)', cost: '-₹2,500', costDelta: -2500, impact: 'Low', recommended: false, timeDelta: 'No change' },
    ],
  },
};

export const WayvoEngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wayvoReducer, initialState);

  const addNotification = useCallback((notif: Omit<WayvoNotification, 'id'>) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { ...notif, id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}` },
    });
  }, []);

  const triggerDisruption = useCallback((scenarioId: string) => {
    dispatch({ type: 'TRIGGER_SCENARIO', payload: scenarioId });
    // Simulate AI processing delay
    setTimeout(() => {
      const data = scenarioData[scenarioId];
      if (data) {
        dispatch({ type: 'SET_SCENARIO_RESULTS', payload: data });
      }
    }, 2500);
  }, []);

  const applySimulation = useCallback(() => {
    dispatch({ type: 'APPLY_SIMULATION' });
    addNotification({
      type: 'update',
      icon: '🔄',
      title: 'Itinerary Updated',
      message: 'Your itinerary has been updated based on the simulation results.',
      time: 'Just now',
      priority: 'normal',
      read: false,
      affectedTrip: 'Kashmir Escape',
      actionType: 'view-itinerary',
      actionRoute: '/traveler/itinerary/kashmir',
    });
    dispatch({ type: 'SYNC_OPERATOR', payload: 'Simulation applied — itinerary updated' });
  }, [addNotification]);

  const triggerCrisis = useCallback((alert: string, impacts: string[]) => {
    dispatch({ type: 'TRIGGER_CRISIS', payload: { alert, impacts } });
    addNotification({
      type: 'alert',
      icon: '⚠',
      title: 'Disruption Detected',
      message: alert,
      time: 'Just now',
      priority: 'high',
      read: false,
      affectedTrip: 'Kashmir Escape',
      actionType: 'view-impact',
      actionRoute: '/traveler/crisis-manager',
    });
  }, [addNotification]);

  const applyCrisisFix = useCallback(async () => {
    dispatch({ type: 'SET_CRISIS_RESOLVING', payload: true });
    const actions = ['ca1', 'ca2', 'ca3', 'ca4', 'ca5'];
    for (const actionId of actions) {
      await new Promise(r => setTimeout(r, 700));
      dispatch({ type: 'COMPLETE_CRISIS_ACTION', payload: actionId });
    }
    await new Promise(r => setTimeout(r, 500));
    dispatch({ type: 'RESOLVE_CRISIS' });
    dispatch({ type: 'SYNC_OPERATOR', payload: 'Crisis resolved — all components updated' });
    dispatch({ type: 'NOTIFY_TRAVELER' });
    addNotification({
      type: 'success',
      icon: '✓',
      title: 'Journey Adapted',
      message: 'Your journey has been automatically adapted. All affected bookings have been updated.',
      time: 'Just now',
      priority: 'high',
      read: false,
      affectedTrip: 'Kashmir Escape',
      actionType: 'view-itinerary',
      actionRoute: '/traveler/itinerary/kashmir',
    });
  }, [addNotification]);

  const syncOperator = useCallback((event: string) => {
    dispatch({ type: 'SYNC_OPERATOR', payload: event });
  }, []);

  const notifyTraveler = useCallback(() => {
    dispatch({ type: 'NOTIFY_TRAVELER' });
  }, []);

  const runDemo = useCallback(async () => {
    dispatch({ type: 'START_DEMO' });

    // Step 1: Detect
    await new Promise(r => setTimeout(r, 2000));
    dispatch({ type: 'ADVANCE_DEMO' });

    // Step 2: Analyze
    await new Promise(r => setTimeout(r, 2000));
    dispatch({ type: 'ADVANCE_DEMO' });

    // Step 3: Predict
    await new Promise(r => setTimeout(r, 2000));
    dispatch({ type: 'ADVANCE_DEMO' });

    // Step 4: Recommend
    await new Promise(r => setTimeout(r, 2000));
    dispatch({ type: 'ADVANCE_DEMO' });

    // Step 5: Adapt
    await new Promise(r => setTimeout(r, 2000));
    dispatch({ type: 'ADVANCE_DEMO' });

    // Step 6: Notify — complete
    await new Promise(r => setTimeout(r, 1500));
    dispatch({ type: 'COMPLETE_DEMO' });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
  }, []);

  return (
    <WayvoEngineContext.Provider
      value={{
        state,
        dispatch,
        triggerDisruption,
        applySimulation,
        triggerCrisis,
        applyCrisisFix,
        addNotification,
        syncOperator,
        notifyTraveler,
        runDemo,
        resetAll,
      }}
    >
      {children}
    </WayvoEngineContext.Provider>
  );
};

export const useWayvoEngine = () => {
  const context = useContext(WayvoEngineContext);
  if (!context) {
    // Return a safe fallback so components work even outside provider
    return {
      state: initialState,
      dispatch: (() => {}) as React.Dispatch<WayvoAction>,
      triggerDisruption: () => {},
      applySimulation: () => {},
      triggerCrisis: () => {},
      applyCrisisFix: async () => {},
      addNotification: () => {},
      syncOperator: () => {},
      notifyTraveler: () => {},
      runDemo: async () => {},
      resetAll: () => {},
    };
  }
  return context;
};

export default WayvoEngineContext;
