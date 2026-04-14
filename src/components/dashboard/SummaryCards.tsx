import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import { Wallet01Icon, ArrowUpRight01Icon, ArrowDownLeft01Icon } from '@hugeicons/core-free-icons';

export const SummaryCards: React.FC = () => {
    const { transactions } = useDashboard();

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-all border-none bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Total Balance</CardTitle>
                    <HugeiconsIcon icon={Wallet01Icon} size={20} className="text-white/80" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold font-mono tracking-tighter">
                        {balance < 0 ? '-' : ''}${Math.abs(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
                        Current funds available
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Income</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold font-mono tracking-tighter text-emerald-600 dark:text-emerald-400">
                        +${income.toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Total earning this period
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Expenses</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
                        <HugeiconsIcon icon={ArrowDownLeft01Icon} size={16} className="text-rose-600 dark:text-rose-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold font-mono tracking-tighter text-rose-600 dark:text-rose-400">
                        -${expenses.toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Total spending this period
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
