import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import SplashScreen from './pages/SplashScreen';
import Landing from './pages/Landing';
import Login from './pages/Login';
import TravelerDashboard from './pages/traveler/TravelerDashboard';
import Discover from './pages/traveler/Discover';
import TripPlanner from './pages/traveler/TripPlanner';
import Itinerary from './pages/traveler/Itinerary';
import MyTrips from './pages/traveler/MyTrips';
import TripDetails from './pages/traveler/TripDetails';
import TripPreparation from './pages/traveler/TripPreparation';
import Booking from './pages/traveler/Booking';
import BookingSuccess from './pages/traveler/BookingSuccess';
import TravelerProfile from './pages/traveler/TravelerProfile';
import OperatorDashboard from './pages/operator/OperatorDashboard';
import OperatorTours from './pages/operator/OperatorTours';
import OperatorTravelers from './pages/operator/OperatorTravelers';
import OperatorVendors from './pages/operator/OperatorVendors';
import OperatorPayments from './pages/operator/OperatorPayments';
import OperatorAnalytics from './pages/operator/OperatorAnalytics';
import OperatorOperations from './pages/operator/OperatorOperations';
import OperatorSettings from './pages/operator/OperatorSettings';

// Context
export type UserRole = 'traveler' | 'operator' | null;
export interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}
export const AppContext = React.createContext<AppContextType>({
  role: null, setRole: () => {}, isLoggedIn: false, setIsLoggedIn: () => {}
});

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <AppContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Traveler Routes */}
          <Route path="/traveler" element={<TravelerDashboard />} />
          <Route path="/traveler/discover" element={<Discover />} />
          <Route path="/traveler/plan" element={<TripPlanner />} />
          <Route path="/traveler/itinerary/:id" element={<Itinerary />} />
          <Route path="/traveler/trips" element={<MyTrips />} />
          <Route path="/traveler/trips/:id" element={<TripDetails />} />
          <Route path="/traveler/prepare/:id" element={<TripPreparation />} />
          <Route path="/traveler/booking" element={<Booking />} />
          <Route path="/traveler/booking/success" element={<BookingSuccess />} />
          <Route path="/traveler/profile" element={<TravelerProfile />} />

          {/* Operator Routes */}
          <Route path="/operator" element={<OperatorDashboard />} />
          <Route path="/operator/tours" element={<OperatorTours />} />
          <Route path="/operator/travelers" element={<OperatorTravelers />} />
          <Route path="/operator/vendors" element={<OperatorVendors />} />
          <Route path="/operator/payments" element={<OperatorPayments />} />
          <Route path="/operator/analytics" element={<OperatorAnalytics />} />
          <Route path="/operator/operations" element={<OperatorOperations />} />
          <Route path="/operator/settings" element={<OperatorSettings />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
