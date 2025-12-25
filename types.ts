
export type Currency = 'ZMW';

export interface PartnerProfile {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  age: number;
}

export interface FamilyProfiles {
  partnerA: PartnerProfile;
  partnerB: PartnerProfile;
}

export interface IncomeEntry {
  id: string;
  date: string;
  source: string;
  amount: number;
  partner: 'Partner_A' | 'Partner_B' | 'Joint' | 'Business';
  method: string;
  frequency: string;
  category: 'Fixed_Income' | 'Variable_Income' | 'Passive_Income';
  status: 'Received' | 'Pending' | 'Expected';
  notes?: string;
}

export interface ExpenseEntry {
  id: string;
  date: string;
  category: string;
  subcategory: string;
  budgeted: number;
  actual: number;
  method: string;
  recurring: boolean;
  priority: 'Essential' | 'Important' | 'Discretionary';
  paidTo: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  notes?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  targetDate: string;
  startDate: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  notes?: string;
}

export interface HomeBudgetItem {
  id: string;
  category: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  priority: string;
  status: 'Planned' | 'Researching' | 'Budgeted' | 'Purchased' | 'Installed' | 'Completed';
  purchaseDate?: string;
  vendor?: string;
  notes?: string;
}

export interface BusinessTransaction {
  id: string;
  date: string;
  type: 'Revenue' | 'Expense';
  businessName: string;
  category: string;
  amount: number;
  clientVendor: string;
  project: string;
  status: string;
  method: string;
}
