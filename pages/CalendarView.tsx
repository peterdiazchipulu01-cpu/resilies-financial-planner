
import React from 'react';
import { FamilyProfiles } from '../types';

// Added settings to props to fix TS error in App.tsx
interface CalendarViewProps {
  data: any;
  profiles: FamilyProfiles;
  isSynced: boolean;
  setSynced: (val: boolean) => void;
  settings: any;
}

const CalendarView: React.FC<CalendarViewProps> = ({ data, profiles, isSynced, setSynced, settings }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayDate = new Date().getDate();

  const getEventsForDay = (day: number) => {
    const events = [];
    if (day === 1) events.push({ type: 'salary', label: 'Partner A Salary', color: 'bg-green-500' });
    if (day === 1) events.push({ type: 'birthday', label: `${profiles.partnerA.name}'s Birthday`, color: 'bg-blue-500' });
    if (day === 1) events.push({ type: 'bill', label: 'Rent Due', color: 'bg-red-500' });
    if (day === 5) events.push({ type: 'bill', label: 'ZESCO/LWSC', color: 'bg-red-500' });
    if (day === 15) events.push({ type: 'birthday', label: `${profiles.partnerB.name}'s Birthday`, color: 'bg-pink-500' });
    if (day === 28) events.push({ type: 'savings', label: 'Savings Transfer', color: 'bg-indigo-500' });
    
    // Synced external events
    if (isSynced) {
      if (day === 10) events.push({ type: 'google', label: 'Car Service', color: 'bg-slate-400' });
      if (day === 20) events.push({ type: 'google', label: 'Health Checkup', color: 'bg-slate-400' });
      if (day === 25) events.push({ type: 'google', label: 'Insurance Renewal', color: 'bg-slate-400' });
    }
    
    return events;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Financial Calendar</h2>
          <p className="text-gray-500 dark:text-slate-400">Scheduled paydays, bills, and family events for January 2025.</p>
        </div>
        <button 
          className={`flex items-center px-6 py-3 border rounded-2xl shadow-sm text-sm font-bold transition-all ${
            isSynced 
            ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' 
            : 'bg-white border-gray-200 text-gray-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 hover:bg-gray-50'
          }`}
          onClick={() => setSynced(!isSynced)}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-5 h-5 mr-3" alt="Google Calendar" />
          {isSynced ? 'Google Calendar Synced' : 'Sync Google Calendar'}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden p-10 transition-colors">
        <div className="grid grid-cols-7 gap-4 mb-8">
          {weekDays.map(wd => (
            <div key={wd} className="text-center text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              {wd}
            </div>
          ))}
          {days.map(d => {
            const events = getEventsForDay(d);
            const isToday = d === todayDate;
            return (
              <div 
                key={d} 
                className={`min-h-[140px] p-4 rounded-3xl border transition-all ${
                  isToday ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                } ${
                  events.length > 0 
                  ? 'bg-white dark:bg-slate-800 border-blue-100 dark:border-slate-700 shadow-sm' 
                  : 'bg-gray-50/50 dark:bg-slate-900/50 border-gray-100/50 dark:border-slate-800/50'
                } flex flex-col`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-sm font-bold ${events.length > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-300 dark:text-slate-700'}`}>
                    {d}
                  </span>
                  {isToday && <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-black uppercase">Today</span>}
                </div>
                <div className="space-y-1 flex-1">
                  {events.map((e, idx) => (
                    <div key={idx} className={`${e.color} text-white text-[9px] font-extrabold px-2 py-1.5 rounded-xl truncate uppercase tracking-tighter shadow-sm flex items-center`}>
                      {e.type === 'google' && <i className="fa-brands fa-google mr-1 text-[7px]"></i>}
                      {e.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-6 border-t border-gray-50 dark:border-slate-800 pt-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider">Bills</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider">Family Events</span>
          </div>
          {isSynced && (
            <div className="flex items-center">
              <div className="w-3 h-3 bg-slate-400 rounded-full mr-2"></div>
              <span className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider">Google Synced</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
