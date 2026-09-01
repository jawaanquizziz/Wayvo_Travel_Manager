import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: string; up: boolean };
  accent?: boolean;
  color?: 'red' | 'green' | 'blue' | 'orange';
}

const colorMap = {
  red: 'bg-red-50 text-brand-red',
  green: 'bg-green-50 text-green-600',
  blue: 'bg-blue-50 text-blue-600',
  orange: 'bg-orange-50 text-orange-600',
};

const MetricCard: React.FC<MetricCardProps> = ({
  title, value, subtitle, icon, trend, accent, color = 'red'
}) => {
  return (
    <div className={`card rounded-2xl ${accent ? 'bg-brand-red text-white' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${accent ? 'text-white/70' : 'text-gray-500'}`}>{title}</p>
          <p className={`text-2xl font-bold mt-1 ${accent ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          {subtitle && (
            <p className={`text-xs mt-1 ${accent ? 'text-white/60' : 'text-gray-400'}`}>{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
              trend.up ? 'text-green-500' : 'text-red-400'
            } ${accent ? 'text-white/70' : ''}`}>
              <span>{trend.up ? '↑' : '↓'} {trend.value}</span>
              <span className={accent ? 'text-white/50' : 'text-gray-400'}>vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-xl ${accent ? 'bg-white/20' : colorMap[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
