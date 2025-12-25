
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface BusinessPerformanceProps {
  data: any;
  isDarkMode: boolean;
}

const BusinessPerformance: React.FC<BusinessPerformanceProps> = ({ data, isDarkMode }) => {
  const profitTrend = [
    { month: 'Oct', revenue: 6500, expenses: 2000, profit: 4500 },
    { month: 'Nov', revenue: 7200, expenses: 2400, profit: 4800 },
    { month: 'Dec', revenue: 9500, expenses: 3100, profit: 6400 },
    { month: 'Jan', revenue: 8500, expenses: 2800, profit: 5700 },
  ];

  const axisStyle = {
    stroke: isDarkMode ? '#475569' : '#94a3b8',
    fontSize: 12,
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
           <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase mb-1 tracking-widest">Total Revenue (YTD)</p>
           <p className="text-xl font-black text-gray-900 dark:text-white">K 85,400</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
           <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase mb-1 tracking-widest">Total Expenses (YTD)</p>
           <p className="text-xl font-black text-gray-900 dark:text-white">K 38,200</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
           <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase mb-1 tracking-widest">Net Profit (YTD)</p>
           <p className="text-xl font-black text-green-600 dark:text-green-400">K 47,200</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
           <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase mb-1 tracking-widest">Profit Margin</p>
           <p className="text-xl font-black text-blue-600 dark:text-blue-400">55.3%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-8 tracking-widest">Revenue vs Expenses Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profitTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f0f0f0'} />
              <XAxis dataKey="month" {...axisStyle} />
              <YAxis {...axisStyle} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                  borderColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                  borderRadius: '12px'
                }} 
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="revenue" fill="#388E3C" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="expenses" fill="#D32F2F" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="px-8 py-6 bg-gray-50/50 dark:bg-slate-800/20 border-b border-gray-50 dark:border-slate-800">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Project Profitability Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-8 py-4">Client / Project</th>
                <th className="px-8 py-4 text-right">Revenue</th>
                <th className="px-8 py-4 text-right">Expense</th>
                <th className="px-8 py-4 text-right">Profit</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {data.business.map((bt: any) => (
                <tr key={bt.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-900 dark:text-white">{bt.clientVendor}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-500">{bt.project.replace(/_/g, ' ')}</p>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-green-600 dark:text-green-400">K {bt.type === 'Revenue' ? bt.amount.toLocaleString() : '0'}</td>
                  <td className="px-8 py-5 text-right font-black text-red-600 dark:text-red-400">K {bt.type === 'Expense' ? bt.amount.toLocaleString() : '0'}</td>
                  <td className="px-8 py-5 text-right font-black dark:text-slate-200">K {bt.amount.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full border border-green-100 dark:border-green-900/50">
                      {bt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessPerformance;
