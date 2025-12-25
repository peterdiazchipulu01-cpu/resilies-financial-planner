
import React from 'react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onReset: () => void;
  onDownload: () => void;
  appName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onReset, onDownload, appName }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-gauge', label: 'Dashboard' },
    { id: 'income', icon: 'fa-wallet', label: 'Income Analysis' },
    { id: 'expense', icon: 'fa-receipt', label: 'Expense Deep Dive' },
    { id: 'savings', icon: 'fa-piggy-bank', label: 'Savings & Goals' },
    { id: 'home', icon: 'fa-house-laptop', label: 'Home Tracker' },
    { id: 'business', icon: 'fa-briefcase', label: 'Business Ventures' },
    { id: 'calendar', icon: 'fa-calendar-days', label: 'Financial Calendar' },
    { id: 'profile', icon: 'fa-users', label: 'Family Profile' },
    { id: 'settings', icon: 'fa-gear', label: 'Settings' },
  ];

  return (
    <div className="w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col h-full hidden md:flex shrink-0 transition-colors">
      <div className="p-8">
        <h1 className="text-xl font-bold text-[#1976D2] flex items-center tracking-tight">
          <div className="w-10 h-10 bg-[#1976D2] rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <i className="fa-solid fa-chart-line text-white"></i>
          </div>
          {appName}
        </h1>
      </div>
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl text-sm font-normal transition-all ${
                  activePage === item.id
                    ? 'bg-[#1976D2] !font-semibold text-white shadow-lg'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#1976D2]'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-6 text-lg`}></i>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t border-gray-100 dark:border-slate-800 space-y-3">
        <button 
          onClick={onDownload}
          className="w-full flex items-center justify-center px-4 py-3 text-xs font-normal text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 rounded-xl hover:bg-blue-50 transition-colors"
        >
          <i className="fa-solid fa-download mr-2"></i>
          Download Backup
        </button>
        <button 
          onClick={onReset}
          className="w-full flex items-center justify-center px-4 py-3 text-xs font-normal text-red-500 border border-red-100 dark:border-red-900/50 rounded-xl hover:bg-red-50 transition-colors"
        >
          <i className="fa-solid fa-rotate-left mr-2"></i>
          Reset Data
        </button>
        
        <div className="flex flex-col space-y-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-[#388E3C] flex items-center justify-center text-white text-sm font-bold shadow-sm">
              ZA
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{appName} Household</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-500 uppercase">Lusaka, Zambia</p>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
             <span className="text-[9px] font-normal text-gray-400 dark:text-slate-500 uppercase tracking-tighter">Build v1.0.4</span>
             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
