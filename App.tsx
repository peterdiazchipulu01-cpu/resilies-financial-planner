
import React, { useState, useEffect, useMemo } from 'react';
import { 
  mockIncomes, 
  mockExpenses, 
  mockSavingsGoals, 
  mockHomeBudget, 
  mockBusinessTransactions 
} from './mockData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './pages/DashboardHome';
import IncomeAnalysis from './pages/IncomeAnalysis';
import ExpenseDeepDive from './pages/ExpenseDeepDive';
import SavingsGoals from './pages/SavingsGoals';
import HomeBudget from './pages/HomeBudget';
import BusinessPerformance from './pages/BusinessPerformance';
import FamilyProfile from './pages/FamilyProfile';
import CalendarView from './pages/CalendarView';
import SettingsPage from './pages/SettingsPage';
import { FamilyProfiles } from './types';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'bill' | 'milestone' | 'info';
  date: string;
  isRead: boolean;
}

export interface UserSettings {
  fontFamily: 'sans' | 'standard';
  boldHeadersOnly: boolean;
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isGoogleSynced, setIsGoogleSynced] = useState(true);
  const [appName, setAppName] = useState('RESILIE');
  const [settings, setSettings] = useState<UserSettings>({
    fontFamily: 'sans',
    boldHeadersOnly: true
  });

  const [profiles, setProfiles] = useState<FamilyProfiles>({
    partnerA: { name: 'Male Partner', gender: 'Male', dob: '1990-01-01', age: 35 },
    partnerB: { name: 'Female Partner', gender: 'Female', dob: '1992-06-15', age: 33 }
  });

  const [data, setData] = useState({
    incomes: [...mockIncomes],
    expenses: [...mockExpenses],
    savings: [...mockSavingsGoals],
    homeBudget: [...mockHomeBudget],
    business: [...mockBusinessTransactions]
  });

  const notifications = useMemo(() => {
    const list: AppNotification[] = [];
    data.expenses.forEach(exp => {
      if (exp.status === 'Overdue') {
        list.push({ id: `exp-${exp.id}`, title: 'Payment Overdue!', message: `${exp.subcategory} was due.`, type: 'bill', date: exp.date, isRead: false });
      }
    });
    data.savings.forEach(goal => {
      const progress = (goal.current / goal.target) * 100;
      if (progress >= 100) {
        list.push({ id: `goal-${goal.id}`, title: 'Goal Achieved!', message: `Target hit for ${goal.name}.`, type: 'milestone', date: new Date().toISOString(), isRead: false });
      }
    });
    return list;
  }, [data]);

  const resetData = () => {
    if (window.confirm("Reset all data to defaults?")) {
      setData({ incomes: [...mockIncomes], expenses: [...mockExpenses], savings: [...mockSavingsGoals], homeBudget: [...mockHomeBudget], business: [...mockBusinessTransactions] });
    }
  };

  const updateData = (key: keyof typeof data, newItem: any) => {
    setData(prev => ({ ...prev, [key]: [newItem, ...prev[key]] }));
  };

  const updateSavingsGoal = (id: string, newAmount: number) => {
    setData(prev => ({ ...prev, savings: prev.savings.map(goal => goal.id === id ? { ...goal, current: newAmount } : goal) }));
  };

  const renderPage = () => {
    const commonProps = { data, updateData, isDarkMode, settings };
    switch(activePage) {
      case 'dashboard': return <DashboardHome data={data} profiles={profiles} isDarkMode={isDarkMode} settings={settings} />;
      case 'income': return <IncomeAnalysis {...commonProps} />;
      case 'expense': return <ExpenseDeepDive {...commonProps} />;
      case 'savings': return <SavingsGoals {...commonProps} updateSavingsGoal={updateSavingsGoal} />;
      case 'home': return <HomeBudget {...commonProps} />;
      case 'business': return <BusinessPerformance {...commonProps} />;
      case 'profile': return <FamilyProfile profiles={profiles} onSave={setProfiles} settings={settings} />;
      case 'calendar': return <CalendarView data={data} profiles={profiles} isSynced={isGoogleSynced} setSynced={setIsGoogleSynced} settings={settings} />;
      case 'settings': return <SettingsPage settings={settings} onUpdateSettings={setSettings} appName={appName} onUpdateAppName={setAppName} />;
      default: return <DashboardHome data={data} profiles={profiles} isDarkMode={isDarkMode} settings={settings} />;
    }
  };

  if (isLocked) {
    return (
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="h-screen w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 p-12 rounded-[40px] shadow-2xl text-center max-w-md w-full mx-4">
            <i className="fa-solid fa-lock text-3xl text-blue-600 mb-8"></i>
            <h1 className="text-2xl font-bold dark:text-white mb-4">Planner Locked</h1>
            <button onClick={() => setIsLocked(false)} className="w-full py-4 bg-[#1976D2] text-white font-bold rounded-2xl">Unlock Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} ${settings.fontFamily === 'standard' ? 'font-serif' : 'font-sans'}`}>
      <div className="flex h-screen bg-[#FAFAFA] dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 w-full max-w-[2000px] mx-auto">
        <Sidebar activePage={activePage} onNavigate={setActivePage} onReset={resetData} onDownload={() => {}} appName={appName} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            activePage={activePage} 
            onToggleFullScreen={() => {}} 
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onLock={() => setIsLocked(true)}
            notifications={notifications}
            isGoogleSynced={isGoogleSynced}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
