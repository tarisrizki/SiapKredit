import React from 'react';
import { Card } from '../ui/Card';

export function MetricCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && <div className="text-gray-400"><Icon size={20} /></div>}
      </div>
      <div className="mt-1 flex-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      {(subtitle || trend) && (
        <div className="mt-3 flex items-center text-xs">
          {trend && (
             <span className={`font-medium mr-1 ${trend > 0 ? 'text-success-600' : trend < 0 ? 'text-danger-600' : 'text-gray-500'}`}>
                {trend > 0 ? '↑' : trend < 0 ? '↓' : '-'}
             </span>
          )}
          <span className="text-gray-500">{subtitle}</span>
        </div>
      )}
    </Card>
  );
}
