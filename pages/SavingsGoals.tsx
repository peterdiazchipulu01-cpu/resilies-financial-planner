
import React, { useState } from 'react';

interface SavingsGoalsProps {
  data: any;
  updateSavingsGoal: (id: string, newAmount: number) => void;
  updateData: (key: string, newItem: any) => void;
  isDarkMode: boolean;
}

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ data, updateSavingsGoal, updateData, isDarkMode }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', monthly: '', date: '2025-12-31' });

  const startEdit = (goal: any) => {
    setEditingId(goal.id);
    setEditValue(goal.current.toString());
  };

  const saveEdit = (id: string) => {
    updateSavingsGoal(id, parseFloat(editValue) || 0);
    setEditingId(null);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;
    updateData('savings', {
      id: Date.now().toString(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      monthlyContribution: parseFloat(newGoal.monthly) || 0,
      targetDate: newGoal.date,
      startDate: new Date().toISOString().split('T')[0],
      priority: 'Medium'
    });
    setNewGoal({ name: '', target: '', monthly: '', date: '2025-12-31' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Financial Milestones</h3>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-[#1976D2] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#1565C0] transition-colors"
        >
          {showAdd ? 'Cancel' : '+ New Goal'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAddGoal} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#1976D2] dark:border-blue-800 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Goal Name</label>
            <input 
              type="text" 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" 
              placeholder="e.g. New Car"
              value={newGoal.name}
              onChange={e => setNewGoal({...newGoal, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Target (ZMW)</label>
            <input 
              type="number" 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" 
              placeholder="50000"
              value={newGoal.target}
              onChange={e => setNewGoal({...newGoal, target: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Target Date</label>
            <input 
              type="date" 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
              value={newGoal.date}
              onChange={e => setNewGoal({...newGoal, date: e.target.value})}
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full p-2 bg-[#1976D2] text-white rounded-lg text-sm font-semibold">Create Goal</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6">
        {data.savings.map((goal: any) => {
          const progress = Math.min(100, (goal.current / goal.target) * 100);
          const statusColor = progress >= 80 ? 'bg-green-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-red-500';
          const icon = goal.name.toLowerCase().includes('home') ? 'fa-house' : goal.name.toLowerCase().includes('emergency') ? 'fa-shield' : 'fa-star';

          return (
            <div key={goal.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm relative group transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl ${statusColor} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mr-4 shadow-sm`}>
                    <i className={`fa-solid ${icon} text-lg`} style={{ color: statusColor.replace('bg-', '') }}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white uppercase tracking-tight">{goal.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-500">Target: {goal.targetDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${
                    goal.priority === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 
                    goal.priority === 'High' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  }`}>
                    {goal.priority}
                  </span>
                </div>
              </div>

              <div className="mb-2 flex justify-between items-center text-xs font-semibold">
                <div className="flex items-center text-gray-600 dark:text-slate-400">
                  <span>Current: </span>
                  {editingId === goal.id ? (
                    <div className="flex items-center ml-2">
                      <input 
                        autoFocus
                        type="number" 
                        className="w-24 p-1 bg-white dark:bg-slate-800 border border-blue-500 dark:border-blue-400 rounded dark:text-white"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => saveEdit(goal.id)}
                        onKeyDown={e => e.key === 'Enter' && saveEdit(goal.id)}
                      />
                    </div>
                  ) : (
                    <span 
                      onClick={() => startEdit(goal)}
                      className="ml-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded cursor-pointer border border-transparent hover:border-gray-300 dark:hover:border-slate-600 transition-all font-normal"
                    >
                      K {goal.current.toLocaleString()} <i className="fa-solid fa-pen ml-1 opacity-30 text-[10px]"></i>
                    </span>
                  )}
                </div>
                <span className="text-gray-400 dark:text-slate-500 font-normal tracking-tight">Target: K {goal.target.toLocaleString()}</span>
              </div>
              
              <div className="w-full bg-gray-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full ${statusColor} transition-all duration-1000 shadow-sm`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-600 dark:text-slate-400">
                  <i className="fa-solid fa-calendar-days mr-2"></i>
                  <span className="font-normal">{progress.toFixed(0)}% Complete</span>
                </div>
                <div className="text-[#1976D2] dark:text-blue-400 font-semibold uppercase text-xs tracking-wider">
                  K {goal.monthlyContribution.toLocaleString()}/mo
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-[#1976D2] text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Build Your Future Faster</h2>
          <p className="opacity-80 max-w-md font-normal">By increasing your monthly contributions, you can reach your milestones early. Use the pen icons above to update your current progress!</p>
        </div>
        <div className="mt-8 md:mt-0 relative z-10 text-6xl opacity-20">
          <i className="fa-solid fa-vault"></i>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoals;
