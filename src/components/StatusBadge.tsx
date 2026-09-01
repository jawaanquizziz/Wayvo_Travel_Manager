import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { label: string; className: string }> = {
  'confirmed': { label: 'Confirmed', className: 'badge-confirmed' },
  'pending': { label: 'Pending', className: 'badge-pending' },
  'at-risk': { label: 'At Risk', className: 'badge-at-risk' },
  'delayed': { label: 'Delayed', className: 'badge-delayed' },
  'cancelled': { label: 'Cancelled', className: 'badge-cancelled' },
  'active': { label: 'Active', className: 'badge-active' },
  'completed': { label: 'Completed', className: 'bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold' },
  'partial': { label: 'Partial', className: 'badge-pending' },
  'limited': { label: 'Limited', className: 'badge-delayed' },
  'available': { label: 'Available', className: 'badge-confirmed' },
  'preparing': { label: 'Preparing', className: 'badge-active' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status] || { label: status, className: 'badge-pending' };
  return (
    <span className={`${config.className} ${size === 'sm' ? 'text-xs px-2 py-0.5' : ''}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
