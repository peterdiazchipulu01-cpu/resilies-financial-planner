
import React from 'react';

const HomeBudget: React.FC<{ data: any; isDarkMode: boolean }> = ({ data, isDarkMode }) => {
  return (
    <div className="space-y-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
           <p className="text-xs text-gray-500 dark:text-slate-500 font-bold uppercase mb-1 tracking-widest">Items Completed</p>
           <p className="text-3xl font-black text-gray-900 dark:text-white">4 / 50</p>
           <p className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-2">↑ 2 items this week</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
           <p className="text-xs text-gray-500 dark:text-slate-500 font-bold uppercase mb-1 tracking-widest">Project Spend</p>
           <p className="text-3xl font-black text-gray-900 dark:text-white">K 78,500</p>
           <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold mt-2">Budget Utilization: 31.4%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
           <p className="text-xs text-gray-500 dark:text-slate-500 font-bold uppercase mb-1 tracking-widest">Time Remaining</p>
           <p className="text-3xl font-black text-gray-900 dark:text-white">18 Months</p>
           <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold mt-2">Target: June 2026</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="px-8 py-6 bg-gray-50/50 dark:bg-slate-800/20 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Dream Home Item Tracker</h3>
          <button className="text-xs px-4 py-2 bg-[#1976D2] text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 dark:shadow-none">Add Item</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Description</th>
                <th className="px-8 py-4 text-right">Est. Cost</th>
                <th className="px-8 py-4">Priority</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {data.homeBudget.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded-full border border-blue-100 dark:border-blue-900/50">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-900 dark:text-white">{item.description}</td>
                  <td className="px-8 py-5 text-right font-black text-gray-800 dark:text-slate-300">K {item.estimatedCost.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.priority.startsWith('1') ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
                      {item.priority.replace('_', ' ').replace(/^\d+ /, '')}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/50' :
                      item.status === 'Researching' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50' : 
                      'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-700'
                    }`}>
                      {item.status}
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

export default HomeBudget;
