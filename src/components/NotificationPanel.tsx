import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { notifications } from '../data/mockData';

interface NotificationPanelProps {
  onClose: () => void;
}

const iconMap = {
  alert: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
  success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-4 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-gray-100 animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-brand-red" />
            <h3 className="font-bold text-gray-900">Notifications</h3>
            <span className="bg-brand-red text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Notifications */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notif) => {
            const { icon: Icon, color, bg } = iconMap[notif.type as keyof typeof iconMap] || iconMap.info;
            return (
              <div
                key={notif.id}
                className={`flex gap-3 px-5 py-4 border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50 ${
                  !notif.read ? 'bg-red-50/30' : ''
                }`}
              >
                <div className={`${bg} p-2 rounded-xl flex-shrink-0 self-start`}>
                  <Icon size={16} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold text-gray-900 ${!notif.read ? 'text-brand-red' : ''}`}>
                      {notif.title}
                    </p>
                    {!notif.read && <div className="w-2 h-2 bg-brand-red rounded-full flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100">
          <button className="text-brand-red text-sm font-semibold hover:underline w-full text-center">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
