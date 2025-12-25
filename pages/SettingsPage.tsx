
import React from 'react';
import { UserSettings } from '../App';

interface SettingsPageProps {
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
  appName: string;
  onUpdateAppName: (name: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onUpdateSettings, appName, onUpdateAppName }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Application Settings</h2>
        <p className="text-gray-500 dark:text-slate-400 font-normal">Customize the look and feel of your financial planner for Windows 10+.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl p-10 space-y-10">
        <section>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">Branding</h3>
          <div className="space-y-6">
            <div className="flex flex-col p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
              <label className="text-sm font-bold text-gray-800 dark:text-white mb-2">Application Name</label>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-normal mb-4">This name will be displayed in the sidebar and throughout the app.</p>
              <input 
                type="text" 
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1976D2] outline-none dark:text-white transition-all"
                value={appName}
                onChange={(e) => onUpdateAppName(e.target.value)}
                placeholder="Enter App Name"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">Typography Preferences</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">Font Family</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 font-normal">Switch between a modern sleek feel or a standard professional look.</p>
              </div>
              <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
                <button 
                  onClick={() => onUpdateSettings({ ...settings, fontFamily: 'sans' })}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${settings.fontFamily === 'sans' ? 'bg-[#1976D2] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  SANS (Modern)
                </button>
                <button 
                  onClick={() => onUpdateSettings({ ...settings, fontFamily: 'standard' })}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${settings.fontFamily === 'standard' ? 'bg-[#1976D2] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  STANDARD (Classic)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">Header Boldness Only</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 font-normal">When active, only titles and headers use bold fonts. Content remains standard weight.</p>
              </div>
              <button 
                onClick={() => onUpdateSettings({ ...settings, boldHeadersOnly: !settings.boldHeadersOnly })}
                className={`w-14 h-8 rounded-full transition-all relative ${settings.boldHeadersOnly ? 'bg-green-500 shadow-inner' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${settings.boldHeadersOnly ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4">Application Environment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase mb-1">Target Platform</p>
              <p className="text-sm font-normal text-gray-800 dark:text-white">Windows 10 / 11 Startup Edition</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
              <p className="text-[10px] font-bold text-green-700 dark:text-green-300 uppercase mb-1">Sync Status</p>
              <p className="text-sm font-normal text-gray-800 dark:text-white">Active Connection Established</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="text-center p-8 opacity-50 font-normal">
        <p className="text-xs">{appName} Financial Planner • Integrated Windows Startup Build 1.0.4</p>
      </div>
    </div>
  );
};

export default SettingsPage;
