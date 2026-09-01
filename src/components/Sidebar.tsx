import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, Users, Calendar, Hotel,
  CreditCard, BarChart2, AlertCircle, Settings, ChevronLeft, Zap, X
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
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

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-fade-in"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 bg-gray-900 text-white z-50 flex flex-col
          transition-all duration-300 ease-in-out
          ${/* Mobile: Slide in from left */ ''}
          ${mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}
          ${/* Desktop width */ ''}
          ${collapsed ? 'md:w-16' : 'md:w-64'}
          shadow-2xl md:shadow-none
        `}
      >
        {/* Logo Header */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-800 justify-between md:justify-start ${collapsed ? 'md:justify-center' : 'gap-3'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0 shadow-red">
              <span className="text-white font-black text-lg">W</span>
            </div>
            {(!collapsed || mobileOpen) && (
              <div>
                <span className="text-white font-black text-lg tracking-tight">WAYVO</span>
                <div className="text-gray-400 text-xs font-medium">Operator Console</div>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 md:hidden"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 overflow-y-auto hide-scrollbar">
          {navItems.map(({ icon: Icon, label, path, badge }) => {
            const activeCheck = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                onClick={onMobileClose}
                title={collapsed ? label : undefined}
                className={`
                  flex items-center gap-3 px-4 py-3 mx-2 rounded-xl mb-1 transition-all duration-200 relative group
                  ${activeCheck
                    ? 'bg-brand-red text-white shadow-red font-semibold'
                    : 'text-gray-400 hover:bg-gray-800/80 hover:text-white font-medium'
                  }
                  ${collapsed && !mobileOpen ? 'md:justify-center md:px-0' : ''}
                `}
              >
                <Icon size={20} className={`flex-shrink-0 transition-transform group-hover:scale-110 ${activeCheck ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                {(!collapsed || mobileOpen) && (
                  <span className="text-sm tracking-wide">{label}</span>
                )}
                {badge && (!collapsed || mobileOpen) && (
                  <span className="ml-auto bg-brand-red text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-xs">
                    {badge}
                  </span>
                )}
                {badge && collapsed && !mobileOpen && (
                  <span className="hidden md:block absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full ring-2 ring-gray-900"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Assistant Quick Launcher */}
        {(!collapsed || mobileOpen) && (
          <div className="p-4 border-t border-gray-800">
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-red-700 text-white px-4 py-3 rounded-xl font-bold text-sm hover:shadow-red transition-all">
              <Zap size={16} className="fill-white" />
              WAYVO AI Operator
            </button>
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggle}
          className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-gray-800 rounded-full items-center justify-center text-gray-300 hover:text-white hover:bg-brand-red transition-all border border-gray-700 shadow-md"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft size={14} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
