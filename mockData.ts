
import { IncomeEntry, ExpenseEntry, SavingsGoal, HomeBudgetItem, BusinessTransaction } from './types';

export const mockIncomes: IncomeEntry[] = [
  { id: 'i1', date: '2025-01-01', source: 'Partner_A_Salary', amount: 15500, partner: 'Partner_A', method: 'Bank_Transfer', frequency: 'Monthly', category: 'Fixed_Income', status: 'Received', notes: 'December Salary' },
  { id: 'i2', date: '2025-01-01', source: 'Partner_B_Salary', amount: 12800, partner: 'Partner_B', method: 'Bank_Transfer', frequency: 'Monthly', category: 'Fixed_Income', status: 'Received', notes: 'December Salary' },
  { id: 'i3', date: '2025-01-05', source: 'Business_Revenue', amount: 3200, partner: 'Business', method: 'Mobile_Money', frequency: 'One-Time', category: 'Variable_Income', status: 'Received', notes: 'Client ABC Payment' },
  { id: 'i4', date: '2025-01-12', source: 'Side_Hustle', amount: 1800, partner: 'Partner_B', method: 'Cash', frequency: 'Weekly', category: 'Variable_Income', status: 'Received', notes: 'Tutoring Services Week 1' },
  { id: 'i5', date: '2025-01-19', source: 'Side_Hustle', amount: 2100, partner: 'Partner_B', method: 'Mobile_Money', frequency: 'Weekly', category: 'Variable_Income', status: 'Received' },
  { id: 'i6', date: '2025-01-26', source: 'Side_Hustle', amount: 1900, partner: 'Partner_B', method: 'Cash', frequency: 'Weekly', category: 'Variable_Income', status: 'Received' },
  { id: 'i7', date: '2025-01-28', source: 'Freelance', amount: 4500, partner: 'Partner_A', method: 'Bank_Transfer', frequency: 'One-Time', category: 'Variable_Income', status: 'Received' },
];

export const mockExpenses: ExpenseEntry[] = [
  { id: 'e1', date: '2025-01-01', category: 'Housing', subcategory: 'Rent', budgeted: 8000, actual: 8000, method: 'Bank_Transfer', recurring: true, priority: 'Essential', paidTo: 'ABC Properties', status: 'Paid' },
  { id: 'e2', date: '2025-01-05', category: 'Utilities', subcategory: 'ZESCO_Electricity', budgeted: 800, actual: 756.30, method: 'Mobile_Money', recurring: true, priority: 'Essential', paidTo: 'ZESCO', status: 'Paid' },
  { id: 'e3', date: '2025-01-05', category: 'Utilities', subcategory: 'LWSC_Water', budgeted: 350, actual: 320, method: 'Mobile_Money', recurring: true, priority: 'Essential', paidTo: 'LWSC', status: 'Paid' },
  { id: 'e4', date: '2025-01-08', category: 'Transport', subcategory: 'Fuel', budgeted: 2000, actual: 1850, method: 'Cash', recurring: false, priority: 'Essential', paidTo: 'Various Stations', status: 'Paid' },
  { id: 'e5', date: '2025-01-10', category: 'Food_Groceries', subcategory: 'Shoprite', budgeted: 3500, actual: 3680.50, method: 'Bank_Card', recurring: false, priority: 'Essential', paidTo: 'Shoprite_Arcades', status: 'Paid' },
  { id: 'e6', date: '2025-01-15', category: 'Healthcare', subcategory: 'Medical_Consultation', budgeted: 500, actual: 450, method: 'Cash', recurring: false, priority: 'Important', paidTo: 'Fairview Clinic', status: 'Paid' },
  { id: 'e7', date: '2025-01-20', category: 'Entertainment', subcategory: 'Dining_Out', budgeted: 800, actual: 920, method: 'Bank_Card', recurring: false, priority: 'Discretionary', paidTo: 'Various', status: 'Paid' },
  { id: 'e8', date: '2025-01-25', category: 'Food_Groceries', subcategory: 'Soweto_Market', budgeted: 1000, actual: 850, method: 'Cash', recurring: false, priority: 'Essential', paidTo: 'Soweto_Market', status: 'Paid' },
  { id: 'e9', date: '2025-01-28', category: 'Savings_Transfers', subcategory: 'Emergency_Fund', budgeted: 2500, actual: 2500, method: 'Bank_Transfer', recurring: true, priority: 'Essential', paidTo: 'Savings_Account', status: 'Paid' },
  { id: 'e10', date: '2025-01-28', category: 'Savings_Transfers', subcategory: 'Home_Down_Payment', budgeted: 8000, actual: 8000, method: 'Bank_Transfer', recurring: true, priority: 'Essential', paidTo: 'Savings_Account', status: 'Paid' },
];

export const mockSavingsGoals: SavingsGoal[] = [
  { id: 's1', name: 'Emergency Fund', target: 30000, current: 24900, monthlyContribution: 2500, targetDate: '2025-12-31', startDate: '2024-01-01', priority: 'Critical' },
  { id: 's2', name: 'New Home Down Payment', target: 150000, current: 45000, monthlyContribution: 8000, targetDate: '2026-06-30', startDate: '2024-03-01', priority: 'Critical' },
  { id: 's3', name: 'Furniture Fund', target: 25000, current: 8300, monthlyContribution: 1500, targetDate: '2026-03-31', startDate: '2024-06-01', priority: 'High' },
  { id: 's4', name: 'Family Vacation', target: 15000, current: 3200, monthlyContribution: 1000, targetDate: '2025-08-31', startDate: '2024-10-01', priority: 'Medium' },
  { id: 's5', name: 'Investment Capital', target: 50000, current: 18000, monthlyContribution: 3000, targetDate: '2026-12-31', startDate: '2025-01-01', priority: 'High' },
];

export const mockHomeBudget: HomeBudgetItem[] = [
  { id: 'h1', category: 'Furniture', description: 'Living Room Sofa Set', estimatedCost: 8500, actualCost: 0, priority: '2_High', status: 'Researching', vendor: 'Elangeni_Furnishers' },
  { id: 'h2', category: 'Appliances', description: 'Refrigerator Double Door', estimatedCost: 6200, actualCost: 0, priority: '1_Critical', status: 'Planned', vendor: 'Game_Stores' },
  { id: 'h3', category: 'Kitchen', description: 'Gas Cooker 4 Burner', estimatedCost: 3800, actualCost: 0, priority: '1_Critical', status: 'Planned', vendor: 'Shoprite' },
  { id: 'h4', category: 'Security', description: 'CCTV System 4 Cameras', estimatedCost: 4500, actualCost: 0, priority: '2_High', status: 'Researching', vendor: 'TechZone_Zambia' },
];

export const mockBusinessTransactions: BusinessTransaction[] = [
  { id: 'bt1', date: '2025-01-05', type: 'Revenue', businessName: 'Main_Business', category: 'Service_Revenue', amount: 3200, clientVendor: 'Client_ABC', project: 'Website_Development', status: 'Received', method: 'Mobile_Money' },
  { id: 'bt2', date: '2025-01-12', type: 'Revenue', businessName: 'Side_Hustle_1', category: 'Service_Revenue', amount: 1800, clientVendor: 'Private_Client', project: 'Mathematics_Tutoring', status: 'Received', method: 'Cash' },
  { id: 'bt3', date: '2025-01-15', type: 'Expense', businessName: 'Main_Business', category: 'Marketing', amount: 500, clientVendor: 'Facebook_Ads', project: 'Online_Campaign', status: 'Paid', method: 'Bank_Card' },
];
