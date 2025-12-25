
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface IncomeAnalysisProps {
  data: any;
  updateData: (key: string, newItem: any) => void;
  isDarkMode: boolean;
}

const IncomeAnalysis: React.FC<IncomeAnalysisProps> = ({ data, updateData, isDarkMode }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newEntry, setNewEntry] = useState({
    source: '',
    amount: '',
    partner: 'Partner_A',
    method: 'Bank_Transfer'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.source || !newEntry.amount) return;
    
    updateData('incomes', {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      source: newEntry.source,
      amount: parseFloat(newEntry.amount),
      partner: newEntry.partner,
      method: newEntry.method,
      frequency: 'One-Time',
      category: 'Variable_Income',
      status: 'Received'
    });
    
    setNewEntry({ source: '', amount: '', partner: 'Partner_A', method: 'Bank_Transfer' });
    setShowAdd(false);
  };

  const chartData = [
    { month: 'Oct', SalaryA: 15500, SalaryB: 12000, Business: 4000 },
    { month: 'Nov', SalaryA: 15500, SalaryB: 12500, Business: 3500 },
    { month: 'Dec', SalaryA: 15500, SalaryB: 12800, Business: 5000 },
    { month: 'Jan', SalaryA: 15500, SalaryB: 12800, Business: 3200 },
  ];

  const axisStyle = {
    stroke: isDarkMode ? '#475569' : '#94a3b8',
    fontSize: 12,
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Income Overview</h3>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-[#1976D2] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#1565C0] transition-colors"
        >
          {showAdd ? 'Cancel' : '+ Add New Income'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#1976D2] dark:border-blue-800 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Source</label>
            <input 
              type="text" 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" 
              placeholder="e.g. Side Project"
              value={newEntry.source}
              onChange={e => setNewEntry({...newEntry, source: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Amount (ZMW)</label>
            <input 
              type="number" 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" 
              placeholder="0.00"
              value={newEntry.amount}
              onChange={e => setNewEntry({...newEntry, amount: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Partner</label>
            <select 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
              value={newEntry.partner}
              onChange={e => setNewEntry({...newEntry, partner: e.target.value as any})}
            >
              <option value="Partner_A">Partner A</option>
              <option value="Partner_B">Partner B</option>
              <option value="Business">Business</option>
              <option value="Joint">Joint</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full p-2 bg-[#388E3C] text-white rounded-lg text-sm font-semibold shadow-lg shadow-green-100 dark:shadow-none">Save Entry</button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-6 uppercase tracking-wider">Income Growth Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="month" {...axisStyle} />
              <YAxis {...axisStyle} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                  borderColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                  borderRadius: '12px'
                }} 
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f0f0f0'} />
              <Area type="monotone" dataKey="SalaryA" stackId="1" stroke="#1976D2" fill="#1976D2" fillOpacity={0.6} />
              <Area type="monotone" dataKey="SalaryB" stackId="1" stroke="#388E3C" fill="#388E3C" fillOpacity={0.6} />
              <Area type="monotone" dataKey="Business" stackId="1" stroke="#F57C00" fill="#F57C00" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 uppercase tracking-wider">Partner Contributions</h4>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                 { name: 'Partner A', amount: data.incomes.filter((i:any) => i.partner === 'Partner_A').reduce((s:number, i:any) => s+i.amount, 0) },
                 { name: 'Partner B', amount: data.incomes.filter((i:any) => i.partner === 'Partner_B').reduce((s:number, i:any) => s+i.amount, 0) },
                 { name: 'Business', amount: data.incomes.filter((i:any) => i.partner === 'Business').reduce((s:number, i:any) => s+i.amount, 0) }
               ]}>
                 <XAxis dataKey="name" {...axisStyle} />
                 <YAxis {...axisStyle} />
                 <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', borderRadius: '12px' }} />
                 <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                   <Cell fill="#1976D2" />
                   <Cell fill="#388E3C" />
                   <Cell fill="#F57C00" />
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 uppercase tracking-wider">Income Health Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm text-blue-700 dark:text-blue-400 font-medium">Monthly Total</span>
              <span className="text-lg font-semibold text-blue-900 dark:text-blue-300">K {data.incomes.reduce((s:number, i:any) => s+i.amount, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm text-green-700 dark:text-green-400 font-medium">Growth Rate YoY</span>
              <span className="text-lg font-semibold text-green-900 dark:text-green-300">+12.3%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <span className="text-sm text-orange-700 dark:text-orange-400 font-medium">Volatility Index</span>
              <span className="text-lg font-semibold text-orange-900 dark:text-orange-300">Low (8%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Source</th>
              <th className="px-6 py-3">Partner</th>
              <th className="px-6 py-3">Method</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {data.incomes.map((inc: any) => (
              <tr key={inc.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-normal dark:text-white">{inc.source.replace(/_/g, ' ')}</td>
                <td className="px-6 py-4 dark:text-slate-300">{inc.partner.replace('_', ' ')}</td>
                <td className="px-6 py-4 dark:text-slate-300">{inc.method.replace('_', ' ')}</td>
                <td className="px-6 py-4 text-right font-semibold text-green-600 dark:text-green-400">K {inc.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeAnalysis;
