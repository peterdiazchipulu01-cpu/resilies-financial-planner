
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  isPositive?: boolean;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, isPositive, icon, color }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${color}`}>
          <i className={`fa-solid ${icon} text-white text-lg`}></i>
        </div>
        <span className={`text-[10px] font-normal px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {trend}
        </span>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-normal uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-normal text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
