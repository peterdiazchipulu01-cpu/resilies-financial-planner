
import React, { useState } from 'react';
import { FamilyProfiles } from '../types';

interface FamilyProfileProps {
  profiles: FamilyProfiles;
  onSave: (newProfiles: FamilyProfiles) => void;
  settings: any;
}

const FamilyProfile: React.FC<FamilyProfileProps> = ({ profiles, onSave, settings }) => {
  const [localProfiles, setLocalProfiles] = useState<FamilyProfiles>(profiles);

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleUpdate = (partner: 'partnerA' | 'partnerB', field: string, value: string) => {
    setLocalProfiles(prev => {
      const updatedPartner = { ...prev[partner], [field]: value };
      if (field === 'dob') {
        updatedPartner.age = calculateAge(value);
      }
      return { ...prev, [partner]: updatedPartner };
    });
  };

  const handleSave = () => {
    onSave(localProfiles);
    alert('User profile settings applied successfully.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Financial Partnership Profiles</h2>
        <p className="text-gray-500 dark:text-slate-400 font-normal">Update the names and details of the household budget managers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Partner A */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl transition-colors">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {localProfiles.partnerA.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Partner A (Default: Male)</h3>
          </div>
          <div className="space-y-6 font-normal">
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
                value={localProfiles.partnerA.name}
                onChange={(e) => handleUpdate('partnerA', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Gender Category</label>
              <select 
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
                value={localProfiles.partnerA.gender}
                onChange={(e) => handleUpdate('partnerA', 'gender', e.target.value as any)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Birth Date</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm dark:text-white outline-none transition-all"
                  value={localProfiles.partnerA.dob}
                  onChange={(e) => handleUpdate('partnerA', 'dob', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Current Age</label>
                <div className="w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 rounded-2xl px-5 py-4 text-sm flex items-center">
                  {localProfiles.partnerA.age} Years
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner B */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl transition-colors">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {localProfiles.partnerB.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Partner B (Default: Female)</h3>
          </div>
          <div className="space-y-6 font-normal">
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-pink-500 dark:text-white outline-none transition-all"
                value={localProfiles.partnerB.name}
                onChange={(e) => handleUpdate('partnerB', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Gender Category</label>
              <select 
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-pink-500 dark:text-white outline-none transition-all"
                value={localProfiles.partnerB.gender}
                onChange={(e) => handleUpdate('partnerB', 'gender', e.target.value as any)}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Birth Date</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm dark:text-white outline-none transition-all"
                  value={localProfiles.partnerB.dob}
                  onChange={(e) => handleUpdate('partnerB', 'dob', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Current Age</label>
                <div className="w-full bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/50 text-pink-700 dark:text-pink-400 rounded-2xl px-5 py-4 text-sm flex items-center">
                  {localProfiles.partnerB.age} Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button 
          onClick={handleSave}
          className="px-12 py-5 bg-[#1976D2] text-white font-bold rounded-3xl shadow-2xl hover:scale-105 transition-all active:scale-95"
        >
          <i className="fa-solid fa-check-double mr-3"></i>
          Commit Profile Updates
        </button>
      </div>
    </div>
  );
};

export default FamilyProfile;
