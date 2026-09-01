import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Briefcase, Bot, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { icon: Home, label: 'Home', path: '/traveler' },
    { icon: Compass, label: 'Explore', path: '/traveler/discover' },
    { icon: Briefcase, label: 'Trips', path: '/traveler/trips' },
    { icon: Bot, label: 'AI', path: '/traveler/plan' },
    { icon: User, label: 'Profile', path: '/traveler/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {items.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || 
            (path === '/traveler' && location.pathname === '/traveler');
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive ? 'text-brand-red' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-red-50' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-brand-red rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
