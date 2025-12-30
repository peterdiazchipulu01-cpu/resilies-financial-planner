
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import StatCard from '../components/StatCard';
import { getFinancialAdvice } from '../geminiService';
import { FamilyProfiles } from '../types';

interface DashboardHomeProps {
  data: any;
  profiles: FamilyProfiles;
  isDarkMode: boolean;
  settings: any;
}

const FINANCIAL_QUOTES = [
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "Someone is sitting in the shade today because someone planted a tree a long time ago.", author: "Warren Buffett" },
  { text: "To win big, you sometimes have to take big risks.", author: "Bill Gates" },
  { text: "Always deliver more than expected.", author: "Larry Page" },
  { text: "The world has enough for everyone's need, but not enough for everyone's greed.", author: "Mahatma Gandhi" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Wealth is the ability to fully experience life.", author: "Henry David Thoreau" },
  { text: "The goal isn't more money. The goal is living life on your terms.", author: "Chris Brogan" }
];

const DashboardHome: React.FC<DashboardHomeProps> = ({ data, profiles, isDarkMode, settings }) => {
  const [advice, setAdvice] = useState<string>("Loading financial insights...");
  const [quote, setQuote] = useState(FINANCIAL_QUOTES[0]);

  const totalIncome = data.incomes.reduce((acc: number, curr: any) => acc + curr.amount, 0);
  const totalExpense = data.expenses.reduce((acc: number, curr: any) => acc + curr.actual, 0);
  const savings = totalIncome - totalExpense;
  const savingsRate = ((savings / totalIncome) * 100).toFixed(1);

  useEffect(() => {
    console.log("DashboardHome component rendered");
    const randomQuote = FINANCIAL_QUOTES[Math.floor(Math.random() * FINANCIAL_QUOTES.length)];
    setQuote(randomQuote);

    const fetchAdvice = async () => {
      console.log("Fetching financial advice...");
      const summary = { totalIncome, totalExpense, savings, savingsRate };
      const result = await getFinancialAdvice(summary);
      console.log("Financial advice received:", result);
      setAdvice(result);
    };
    fetchAdvice();
  }, [totalIncome, totalExpense]);

  const chartData = [
    { name: 'Week 1', income: 15500, expense: 9156 },
    { name: 'Week 2', income: 12800, expense: 3680 },
    { name: 'Week 3', income: 5000, expense: 920 },
    { name: 'Week 4', income: 8500, expense: 11350 },
  ];

  const pieData = [
    { name: profiles.partnerA.name, value: 20000 },
    { name: profiles.partnerB.name, value: 18700 },
    { name: 'Business', value: 3200 },
  ];

  const COLORS = ['#1976D2', '#388E3C', '#F57C00'];
  const recentTransactions = data.expenses.slice(0, 5);

  const axisStyle = {
    stroke: isDarkMode ? '#475569' : '#94a3b8',
    fontSize: 12,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Total Income" value={`K ${totalIncome.toLocaleString()}`} trend="12.3%" isPositive={true} icon="fa-wallet" color="bg-[#388E3C]" />
        <StatCard label="Total Expenses" value={`K ${totalExpense.toLocaleString()}`} trend="8.1%" isPositive={false} icon="fa-receipt" color="bg-[#D32F2F]" />
        <StatCard label="Net Savings" value={`K ${savings.toLocaleString()}`} trend="18.5%" isPositive={true} icon="fa-piggy-bank" color="bg-[#1976D2]" />
        <StatCard label="Savings Rate" value={`${savingsRate}%`} trend="Target: 20%" isPositive={true} icon="fa-chart-pie" color="bg-[#F57C00]" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Quote & AI Advice Banner */}
        <div className="xl:col-span-2 bg-gradient-to-br from-[#1976D2] to-[#1e88e5] p-8 rounded-[40px] text-white flex flex-col md:flex-row items-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-[12rem] pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <i className="fa-solid fa-quote-right"></i>
          </div>
          
          <div className="mb-6 md:mb-0 md:mr-10 bg-white/20 p-6 rounded-[30px] backdrop-blur-md border border-white/20 shadow-inner shrink-0">
            <i className="fa-solid fa-lightbulb text-5xl text-yellow-300 animate-pulse"></i>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div>
              <h3 className="font-bold text-2xl uppercase tracking-tighter mb-1">Smart Financial Strategy</h3>
              <div className="h-1 w-20 bg-yellow-400 rounded-full mb-4"></div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xl font-normal italic tracking-tight text-blue-50 leading-tight">
                "{quote.text}"
              </p>
              <p className="text-sm font-semibold uppercase tracking-widest text-yellow-300">— {quote.author}</p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="text-sm opacity-90 leading-relaxed font-normal bg-black/10 p-4 rounded-2xl border border-white/5">
                <i className="fa-solid fa-wand-magic-sparkles mr-2 text-yellow-200"></i>
                {advice}
              </p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white uppercase tracking-tighter">Family Milestones</h3>
            <i className="fa-solid fa-cake-candles text-pink-500"></i>
          </div>
          <div className="space-y-6">
            <div className="flex items-center p-4 rounded-3xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/50 group">
              <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center font-bold text-xl shadow-lg mr-5">
                {profiles.partnerB.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-normal text-gray-800 dark:text-white">{profiles.partnerB.name}</p>
                <p className="text-[10px] text-pink-700 dark:text-pink-400 font-normal uppercase tracking-widest mt-1">Birthday: June 15</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg mr-5">
                {profiles.partnerA.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-normal text-gray-800 dark:text-white">{profiles.partnerA.name}</p>
                <p className="text-[10px] text-blue-700 dark:text-blue-400 font-normal uppercase tracking-widest mt-1">Turning {profiles.partnerA.age + 1} • Jan 1st</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl transition-colors">
          <h3 className="text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase mb-10 tracking-[0.2em]">Cash Flow Intelligence</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="name" {...axisStyle} tickLine={false} axisLine={false} dy={10} />
                <YAxis {...axisStyle} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                    borderRadius: '24px',
                    border: 'none',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }} 
                />
                <Area type="monotone" dataKey="income" stroke="#388E3C" fill="#388E3C" fillOpacity={0.1} strokeWidth={4} />
                <Area type="monotone" dataKey="expense" stroke="#D32F2F" fill="#D32F2F" fillOpacity={0.1} strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl transition-colors">
          <h3 className="text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase mb-10 tracking-[0.2em]">Asset Allocation</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={105} paddingAngle={10} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '30px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        <div className="px-10 py-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/30 dark:bg-slate-800/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tighter uppercase">Recent Spending</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500 font-semibold uppercase text-[10px] tracking-[0.2em]">
              <tr>
                <th className="px-10 py-5">Date</th>
                <th className="px-10 py-5">Category</th>
                <th className="px-10 py-5">Merchant</th>
                <th className="px-10 py-5 text-right">ZMW Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800 font-normal">
              {recentTransactions.map((tx: any) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all">
                  <td className="px-10 py-6 text-gray-500">{tx.date}</td>
                  <td className="px-10 py-6">
                     <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-[10px] font-semibold text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 uppercase tracking-widest">
                       {tx.category}
                     </span>
                  </td>
                  <td className="px-10 py-6 text-gray-900 dark:text-white">{tx.paidTo}</td>
                  <td className="px-10 py-6 text-right text-red-500 dark:text-red-400 text-xl tracking-tighter">K {tx.actual.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
