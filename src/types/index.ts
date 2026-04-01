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
