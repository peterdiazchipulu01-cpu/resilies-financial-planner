
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ExpenseDeepDiveProps {
  data: any;
  updateData: (key: string, newItem: any) => void;
  isDarkMode: boolean;
}

const ExpenseDeepDive: React.FC<ExpenseDeepDiveProps> = ({ data, updateData, isDarkMode }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: 'Housing',
    subcategory: '',
    actual: '',
    budgeted: '',
    priority: 'Essential'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.subcategory || !newExpense.actual) return;

    updateData('expenses', {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      category: newExpense.category,
      subcategory: newExpense.subcategory,
      budgeted: parseFloat(newExpense.budgeted) || 0,
      actual: parseFloat(newExpense.actual),
      method: 'Cash',
      recurring: false,
      priority: newExpense.priority,
      paidTo: newExpense.subcategory,
      status: 'Paid'
    });

    setNewExpense({ category: 'Housing', subcategory: '', actual: '', budgeted: '', priority: 'Essential' });
    setShowAdd(false);
  };

  const categoryData = [
    { name: 'Housing', budgeted: data.expenses.filter((e:any) => e.category === 'Housing').reduce((s:number, e:any) => s+e.budgeted, 0), actual: data.expenses.filter((e:any) => e.category === 'Housing').reduce((s:number, e:any) => s+e.actual, 0) },
    { name: 'Food', budgeted: data.expenses.filter((e:any) => e.category === 'Food_Groceries').reduce((s:number, e:any) => s+e.budgeted, 0), actual: data.expenses.filter((e:any) => e.category === 'Food_Groceries').reduce((s:number, e:any) => s+e.actual, 0) },
    { name: 'Transport', budgeted: data.expenses.filter((e:any) => e.category === 'Transport').reduce((s:number, e:any) => s+e.budgeted, 0), actual: data.expenses.filter((e:any) => e.category === 'Transport').reduce((s:number, e:any) => s+e.actual, 0) },
    { name: 'Utilities', budgeted: data.expenses.filter((e:any) => e.category === 'Utilities').reduce((s:number, e:any) => s+e.budgeted, 0), actual: data.expenses.filter((e:any) => e.category === 'Utilities').reduce((s:number, e:any) => s+e.actual, 0) },
    { name: 'Savings', budgeted: data.expenses.filter((e:any) => e.category === 'Savings_Transfers').reduce((s:number, e:any) => s+e.budgeted, 0), actual: data.expenses.filter((e:any) => e.category === 'Savings_Transfers').reduce((s:number, e:any) => s+e.actual, 0) },
  ];

  const axisStyle = {
    stroke: isDarkMode ? '#475569' : '#94a3b8',
    fontSize: 12,
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Expense Analysis</h3>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-[#D32F2F] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#B71C1C] transition-colors"
        >
          {showAdd ? 'Cancel' : '+ Log New Expense'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#D32F2F] dark:border-red-900 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Category</label>
            <select 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
              value={newExpense.category}
              onChange={e => setNewExpense({...newExpense, category: e.target.value})}
            >
              <option value="Housing">Housing</option>
              <option value="Food_Groceries">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Description</label>
            <input 
              type="text" 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" 
              placeholder="e.g. Lunch"
              value={newExpense.subcategory}
              onChange={e => setNewExpense({...newExpense, subcategory: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Amount Spent</label>
            <input 
              type="number" 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" 
              placeholder="0.00"
              value={newExpense.actual}
              onChange={e => setNewExpense({...newExpense, actual: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-slate-500 mb-1">Priority</label>
            <select 
              className="w-full p-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
              value={newExpense.priority}
              onChange={e => setNewExpense({...newExpense, priority: e.target.value as any})}
            >
              <option value="Essential">Essential</option>
              <option value="Important">Important</option>
              <option value="Discretionary">Discretionary</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full p-2 bg-[#D32F2F] text-white rounded-lg text-sm font-semibold shadow-lg shadow-red-100 dark:shadow-none">Log Purchase</button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-6 uppercase tracking-wider">Budget vs Actual by Category</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDarkMode ? '#1e293b' : '#f0f0f0'} />
              <XAxis type="number" {...axisStyle} />
              <YAxis type="category" dataKey="name" {...axisStyle} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                  borderColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                  borderRadius: '12px'
                }} 
              />
              <Bar dataKey="budgeted" fill={isDarkMode ? '#1e293b' : '#e2e8f0'} name="Budgeted" barSize={20} radius={[0, 4, 4, 0]} />
              <Bar dataKey="actual" name="Actual" barSize={20} radius={[0, 4, 4, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.actual > entry.budgeted && entry.budgeted > 0 ? '#D32F2F' : '#388E3C'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-500 uppercase mb-2">Budget Adherence</p>
          <div className="relative w-32 h-32">
             <svg className="w-full h-full" viewBox="0 0 36 36">
               <path className="text-gray-100 dark:text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               <path className="text-green-500" strokeDasharray="94, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center font-semibold text-2xl text-gray-800 dark:text-white">
               94%
             </div>
          </div>
          <p className="mt-4 text-[10px] text-gray-400 dark:text-slate-500 font-normal text-center">Tracking {data.expenses.length} transactions</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm md:col-span-2">
           <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 uppercase tracking-wider">Priority Distribution</h4>
           <div className="space-y-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 dark:bg-red-900/30 dark:text-red-400">Essential</div>
                  <div className="text-right text-xs font-semibold text-gray-600 dark:text-slate-400">{Math.round((data.expenses.filter((e:any) => e.priority === 'Essential').length / data.expenses.length) * 100)}%</div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100 dark:bg-slate-800">
                  <div style={{ width: `${(data.expenses.filter((e:any) => e.priority === 'Essential').length / data.expenses.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400">Important</div>
                  <div className="text-right text-xs font-semibold text-gray-600 dark:text-slate-400">{Math.round((data.expenses.filter((e:any) => e.priority === 'Important').length / data.expenses.length) * 100)}%</div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-100 dark:bg-slate-800">
                  <div style={{ width: `${(data.expenses.filter((e:any) => e.priority === 'Important').length / data.expenses.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">Discretionary</div>
                  <div className="text-right text-xs font-semibold text-gray-600 dark:text-slate-400">{Math.round((data.expenses.filter((e:any) => e.priority === 'Discretionary').length / data.expenses.length) * 100)}%</div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100 dark:bg-slate-800">
                  <div style={{ width: `${(data.expenses.filter((e:any) => e.priority === 'Discretionary').length / data.expenses.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Subcategory</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3 text-right">Actual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800 font-normal">
            {data.expenses.map((exp: any) => (
              <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 dark:text-slate-400">{exp.date}</td>
                <td className="px-6 py-4 dark:text-white">{exp.subcategory.replace(/_/g, ' ')}</td>
                <td className="px-6 py-4">
                   <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase ${
                     exp.priority === 'Essential' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                   }`}>
                    {exp.priority}
                   </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-red-600 dark:text-red-400">K {exp.actual.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseDeepDive;
