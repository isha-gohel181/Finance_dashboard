import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Transaction, Role, TransactionType } from '../types';
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
}

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

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

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
