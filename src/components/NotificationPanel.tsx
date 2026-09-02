import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X, Bell, AlertTriangle, CheckCircle2, Info, RefreshCw,
  MapPin, Sparkles, CreditCard, ArrowRight, Clock
} from 'lucide-react';
import { useWayvoEngine } from '../data/wayvoEngine';

interface NotificationPanelProps {
  onClose: () => void;
}

const defaultNotifications = [
  {
    id: 'dn1',
    type: 'alert' as const,
    icon: '⚠',
    title: 'Flight Delay Detected',
    message: 'IndiGo 6E204 (Kashmir) delayed by 2 hours. 4 travelers affected.',
    time: '10 min ago',
    priority: 'high' as const,
    read: false,
    affectedTrip: 'Kashmir Escape',
    actionType: 'view-impact' as const,
    actionRoute: '/traveler/crisis-manager',
  },
  {
    id: 'dn2',
    type: 'success' as const,
    icon: '✓',
    title: 'Hotel Confirmed',
    message: 'The Lalit Grand Palace confirmed 4 rooms for Oct 12–18.',
    time: '1 hour ago',
    priority: 'normal' as const,
    read: false,
    affectedTrip: 'Kashmir Escape',
    actionType: null,
    actionRoute: undefined,
  },
  {
    id: 'dn3',
    type: 'success' as const,
    icon: '✓',
    title: 'Payment Received',
    message: 'Payment of ₹46,000 received for Kashmir Escape.',
    time: '3 hours ago',
    priority: 'normal' as const,
    read: true,
    affectedTrip: 'Kashmir Escape',
    actionType: null,
    actionRoute: undefined,
  },
  {
    id: 'dn4',
    type: 'warning' as const,
    icon: '⚠',
    title: 'Activity Unavailable',
    message: 'Snowmobile activity in Gulmarg is unavailable for Oct 14.',
    time: '5 hours ago',
    priority: 'high' as const,
    read: true,
    affectedTrip: 'Kashmir Escape',
    actionType: 'view-impact' as const,
    actionRoute: '/traveler/replan',
  },
  {
    id: 'dn5',
    type: 'update' as const,
    icon: '🔄',
    title: 'Itinerary Updated',
    message: 'Your Day 3 schedule has been optimized by WAYVO.',
    time: '6 hours ago',
    priority: 'normal' as const,
    read: true,
    affectedTrip: 'Kashmir Escape',
    actionType: 'view-itinerary' as const,
    actionRoute: '/traveler/itinerary/kashmir',
  },
  {
    id: 'dn6',
    type: 'info' as const,
    icon: '📍',
    title: 'Driver Arriving',
    message: 'Your airport pickup driver will arrive at Terminal 2 in 15 min.',
    time: '1 day ago',
    priority: 'normal' as const,
    read: true,
    affectedTrip: 'Kashmir Escape',
    actionType: null,
    actionRoute: undefined,
  },
  {
    id: 'dn7',
    type: 'info' as const,
    icon: '💡',
    title: 'New Recommendation',
    message: 'Based on your interests, try the Dal Lake sunset photography tour.',
    time: '1 day ago',
    priority: 'low' as const,
    read: true,
    affectedTrip: 'Kashmir Escape',
    actionType: 'view-details' as const,
    actionRoute: '/traveler/digital-twin',
  },
];

const typeStyles: Record<string, { bg: string; border: string; iconBg: string; iconColor: string }> = {
  alert: { bg: 'bg-red-50', border: 'border-red-200', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
  success: { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  info: { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  update: { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
};

const typeIcons: Record<string, any> = {
  alert: AlertTriangle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  update: RefreshCw,
};

const actionLabels: Record<string, string> = {
  'view-impact': 'View Impact',
  'view-itinerary': 'View Itinerary',
  'view-details': 'View Details',
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { state } = useWayvoEngine();

  // Merge engine notifications with defaults
  const allNotifications = [...state.notifications, ...defaultNotifications];
  const unreadCount = allNotifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={onClose} />
      <div className="absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center">
              <Bell size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-black text-gray-900 text-base">Notifications</h2>
              <p className="text-xs text-gray-400">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {allNotifications.map((notif) => {
            const style = typeStyles[notif.type] || typeStyles.info;
            const IconComp = typeIcons[notif.type] || Info;

            return (
              <div
                key={notif.id}
                className={`rounded-2xl border p-4 transition-all ${
                  !notif.read
                    ? `${style.bg} ${style.border}`
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${!notif.read ? style.iconBg : 'bg-gray-100'}`}>
                    <IconComp size={14} className={!notif.read ? style.iconColor : 'text-gray-400'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-sm font-bold ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</p>
                      {!notif.read && notif.priority === 'high' && (
                        <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">Urgent</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{notif.message}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> {notif.time}
                      </span>
                      {notif.affectedTrip && (
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <MapPin size={10} /> {notif.affectedTrip}
                        </span>
                      )}
                    </div>

                    {notif.actionType && notif.actionRoute && (
                      <button
                        onClick={() => {
                          onClose();
                          navigate(notif.actionRoute!);
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 bg-brand-red text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors"
                      >
                        {actionLabels[notif.actionType] || 'View'}
                        <ArrowRight size={10} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
