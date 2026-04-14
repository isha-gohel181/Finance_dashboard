export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface SummaryStats {
  totalBalance: number;
  income: number;
  expenses: number;
}

export interface ChartData {
  date: string;
  balance: number;
}

export interface CategoryData {
  category: string;
  amount: number;
}

export type Role = 'viewer' | 'admin';

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
}

export interface SpendingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  type: 'stock' | 'crypto' | 'index';
  color: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'annually';
  nextBillingDate: string;
  category: string;
  icon?: string;
  color: string;
  status: 'active' | 'paused';
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
  category: 'Credit Card' | 'Loan' | 'Mortgage' | 'Other';
  color: string;
}
