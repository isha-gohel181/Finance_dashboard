import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Transaction, Role, TransactionType, Budget, PortfolioItem, Subscription, Debt } from '../types';
import { initialTransactions } from '../data/mockData';

interface DashboardContextType {
  transactions: Transaction[];
  role: Role;
  searchQuery: string;
  filterType: TransactionType | 'all';
  setRole: (role: Role) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: TransactionType | 'all') => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updatedTransaction: Partial<Transaction>) => void;
  budgets: Budget[];
  updateBudget: (id: string, limit: number) => void;
  portfolio: PortfolioItem[];
  addInvestmentAmount: (id: string, amount: number) => void;
  subscriptions: Subscription[];
  toggleSubscriptionStatus: (id: string) => void;
  debts: Debt[];
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const initialDebts: Debt[] = [
  { id: '1', name: 'Credit Card A', balance: 4500, interestRate: 18.9, minPayment: 120, category: 'Credit Card', color: '#f43f5e' },
  { id: '2', name: 'Car Loan', balance: 12000, interestRate: 4.5, minPayment: 350, category: 'Loan', color: '#3b82f6' },
  { id: '3', name: 'Student Loan', balance: 25000, interestRate: 3.8, minPayment: 200, category: 'Loan', color: '#8b5cf6' },
];

const initialSubscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', amount: 15.99, billingCycle: 'monthly', nextBillingDate: '2026-04-20', category: 'Entertainment', color: '#E50914', status: 'active' },
  { id: '2', name: 'Spotify', amount: 9.99, billingCycle: 'monthly', nextBillingDate: '2026-04-15', category: 'Music', color: '#1DB954', status: 'active' },
  { id: '3', name: 'Claude AI', amount: 20.00, billingCycle: 'monthly', nextBillingDate: '2026-05-01', category: 'Productivity', color: '#D97757', status: 'active' },
  { id: '4', name: 'Amazon Prime', amount: 139.00, billingCycle: 'annually', nextBillingDate: '2027-01-12', category: 'Shopping', color: '#FF9900', status: 'active' },
  { id: '5', name: 'Gym Membership', amount: 45.00, billingCycle: 'monthly', nextBillingDate: '2026-04-28', category: 'Health', color: '#000000', status: 'active' },
];

const initialPortfolio: PortfolioItem[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 0.25, avgPrice: 45000, currentPrice: 62000, type: 'crypto', color: '#f7931a' },
  { id: '2', name: 'Apple Inc.', symbol: 'AAPL', amount: 15, avgPrice: 150, currentPrice: 185, type: 'stock', color: '#555555' },
  { id: '3', name: 'S&P 500 ETF', symbol: 'VOO', amount: 20, avgPrice: 380, currentPrice: 445, type: 'index', color: '#0035ad' },
  { id: '4', name: 'Ethereum', symbol: 'ETH', amount: 2.1, avgPrice: 2200, currentPrice: 3450, type: 'crypto', color: '#627eea' },
];

const initialBudgets: Budget[] = [
  { id: '1', category: 'Food', limit: 500, spent: 0, color: '#f87171' },
  { id: '2', category: 'Transport', limit: 200, spent: 0, color: '#60a5fa' },
  { id: '3', category: 'Rent', limit: 1200, spent: 0, color: '#c084fc' },
  { id: '4', category: 'Entertain', limit: 300, spent: 0, color: '#fbbf24' },
  { id: '5', category: 'Utilities', limit: 250, spent: 0, color: '#4ade80' },
];

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('userRole');
    return (saved as Role) || 'admin';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : initialBudgets;
  });

  useEffect(() => {
    // Recalculate 'spent' based on transactions
    const updatedBudgets = budgets.map(budget => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === budget.category)
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...budget, spent };
    });
    
    // Only update if spent values actually changed to avoid infinite loop
    const hasChanged = JSON.stringify(updatedBudgets) !== JSON.stringify(budgets);
    if (hasChanged) {
      setBudgets(updatedBudgets);
    }
  }, [transactions, budgets]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('portfolio');
    return saved ? JSON.parse(saved) : initialPortfolio;
  });

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : initialSubscriptions;
  });

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem('debts');
    return saved ? JSON.parse(saved) : initialDebts;
  });

  useEffect(() => {
    localStorage.setItem('debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        role,
        searchQuery,
        filterType,
        setRole,
        setSearchQuery,
        setFilterType,
        addTransaction,
        deleteTransaction,
        editTransaction,
        budgets,
        updateBudget: (id: string, limit: number) => {
          setBudgets(prev => prev.map(b => b.id === id ? { ...b, limit } : b));
        },
        portfolio,
        addInvestmentAmount: (id: string, extraAmount: number) => {
          setPortfolio(prev => prev.map(item => 
            item.id === id ? { ...item, amount: item.amount + extraAmount } : item
          ));
        },
        subscriptions,
        toggleSubscriptionStatus: (id: string) => {
            setSubscriptions(prev => prev.map(sub => 
                sub.id === id ? { ...sub, status: sub.status === 'active' ? 'paused' : 'active' } : sub
            ));
        },
        debts,
        theme,
        setTheme
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
