import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, Users, Calendar, Truck, Hotel, Activity,
  CreditCard, BarChart2, AlertCircle, Settings, ChevronLeft, Menu, X, Zap
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/operator' },
  { icon: Map, label: 'Tours', path: '/operator/tours' },
  { icon: Users, label: 'Travelers', path: '/operator/travelers' },
  { icon: Calendar, label: 'Operations', path: '/operator/operations' },
  { icon: Hotel, label: 'Vendors', path: '/operator/vendors' },
  { icon: CreditCard, label: 'Payments', path: '/operator/payments' },
  { icon: BarChart2, label: 'Analytics', path: '/operator/analytics' },
  { icon: AlertCircle, label: 'Alerts', path: '/operator/operations', badge: 3 },
  { icon: Settings, label: 'Settings', path: '/operator/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-gray-900 text-white z-30 flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-800 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-lg">W</span>
        </div>
        {!collapsed && (
          <div>
            <span className="text-white font-black text-lg tracking-tight">WAYVO</span>
            <div className="text-gray-400 text-xs">Operator Console</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 overflow-y-auto hide-scrollbar">
        {navItems.map(({ icon: Icon, label, path, badge }) => {
          const isActive = location.pathname === path && !(badge && location.pathname !== '/operator/operations');
          const activeCheck = location.pathname === path;
          return (
            <Link
              key={label}
              to={path}
              title={collapsed ? label : undefined}
              className={`
                flex items-center gap-3 px-4 py-3 mx-2 rounded-xl mb-1 transition-all duration-200 relative
                ${activeCheck
                  ? 'bg-brand-red text-white shadow-red'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
                ${collapsed ? 'justify-center px-0' : ''}
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
              {badge && !collapsed && (
                <span className="ml-auto bg-brand-red text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {badge}
                </span>
              )}
              {badge && collapsed && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Assistant Button */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-2 bg-gradient-to-r from-brand-red to-red-700 text-white px-4 py-3 rounded-xl font-semibold text-sm hover:shadow-red transition-all">
            <Zap size={16} />
            WAYVO AI Assistant
          </button>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors border border-gray-600"
      >
        <ChevronLeft size={14} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </aside>
  );
};

export default Sidebar;
