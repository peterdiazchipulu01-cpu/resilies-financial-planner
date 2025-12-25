
import React, { useState, useEffect, useRef } from 'react';
import { AppNotification } from '../App';

interface HeaderProps {
  activePage: string;
  onToggleFullScreen: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLock: () => void;
  notifications: AppNotification[];
  isGoogleSynced: boolean;
}

const Header: React.FC<HeaderProps> = ({ activePage, onToggleFullScreen, isDarkMode, onToggleTheme, onLock, notifications, isGoogleSynced }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch(activePage) {
      case 'dashboard': return 'Executive Overview';
      case 'income': return 'Income Streams';
      case 'expense': return 'Expenses & Budget';
      case 'savings': return 'Savings Goals';
      case 'home': return 'New Home Project';
      case 'business': return 'Business Performance';
      case 'profile': return 'Family Profiles';
      case 'calendar': return 'Financial Calendar';
      default: return 'Financial Planner';
    }
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const formattedDate = currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-10 shrink-0 transition-colors">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{getPageTitle()}</h2>
        <div className="flex items-center ml-6 space-x-2">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded-lg border border-blue-100 dark:border-blue-800 uppercase tracking-widest">
            ZMW (K)
          </span>
          {isGoogleSynced && (
            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold rounded-lg border border-green-100 dark:border-green-800 uppercase tracking-widest flex items-center">
              <i className="fa-brands fa-google mr-1.5 text-[10px]"></i>
              Synced
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Live Clock and Date */}
        <div className="flex items-center space-x-4 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2 border border-gray-100 dark:border-slate-700">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-800 dark:text-white font-mono">{formattedTime}</span>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-semibold uppercase tracking-tighter">{formattedDate}</span>
          </div>
          <i className="fa-solid fa-clock text-[#1976D2] text-lg"></i>
        </div>

        <div className="flex items-center space-x-1">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme}
            className="p-2 text-gray-400 hover:text-[#1976D2] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all rounded-lg"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <i className={`fa-solid ${isDarkMode ? 'fa-sun text-yellow-500' : 'fa-moon text-indigo-500'}`}></i>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 transition-all rounded-lg relative ${
                showNotifications ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-gray-400 hover:text-gray-600 dark:hover:text-slate-300'
              }`}
            >
              <i className="fa-solid fa-bell"></i>
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Updates</h3>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">{notifications.length} New</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center"><p className="text-xs text-gray-400">All caught up!</p></div>
                  ) : (
                    <div className="divide-y divide-gray-50 dark:divide-slate-800">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                          <div className="flex items-start">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 mt-0.5 shrink-0 ${
                              n.type === 'bill' ? 'bg-red-100 text-red-600' : n.type === 'milestone' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              <i className={`fa-solid ${n.type === 'bill' ? 'fa-file-invoice-dollar' : n.type === 'milestone' ? 'fa-trophy' : 'fa-calendar-check'} text-[10px]`}></i>
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">{n.title}</p>
                              <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-tight">{n.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-gray-100 dark:bg-slate-800 mx-2"></div>

        {/* Windows Native-Style Controls */}
        <div className="flex items-center space-x-0.5 bg-gray-50 dark:bg-slate-800/50 p-1 rounded-lg">
          <button 
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors rounded-md"
            title="Minimize"
          >
            <div className="w-3 h-[1.5px] bg-current"></div>
          </button>
          <button 
            onClick={onToggleFullScreen}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors rounded-md"
            title="Maximize"
          >
            <div className="w-3 h-3 border-[1.5px] border-current"></div>
          </button>
          <button 
            onClick={onLock}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all rounded-md"
            title="Close Application"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
