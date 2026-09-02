import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

interface NavbarProps {
  variant?: 'traveler' | 'landing';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'landing' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const travelerLinks = [
    { label: 'Plan Trip', path: '/traveler/plan' },
    { label: 'Digital Twin', path: '/traveler/digital-twin' },
    { label: 'Crisis Manager', path: '/traveler/crisis-manager' },
    { label: 'My Trips', path: '/traveler/trips' },
  ];

  const landingLinks = [
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Features', path: '/#features' },
    { label: 'For Operators', path: '/#operators' },
  ];

  const links = variant === 'traveler' ? travelerLinks : landingLinks;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">W</span>
              </div>
              <span className="text-gray-900 font-black text-xl tracking-tight">WAYVO</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link px-4 py-2 rounded-lg hover:bg-gray-50 ${
                    location.pathname === link.path ? 'text-brand-red font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {variant === 'traveler' ? (
                <>
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full"></span>
                  </button>
                  <Link
                    to="/traveler/profile"
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <div className="w-7 h-7 bg-brand-red rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AP</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">Alison</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost">Log In</Link>
                  <Link to="/login" className="btn-primary">Get Started</Link>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 animate-slide-up">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-gray-700 font-medium border-b border-gray-50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            {variant === 'landing' && (
              <div className="pt-3 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary w-full justify-center">Log In</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center">Get Started</Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Notification Panel */}
      {notifOpen && (
        <NotificationPanel onClose={() => setNotifOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
