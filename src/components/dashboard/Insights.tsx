import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon, AnalyticsUpIcon as TrendingUp, AnalyticsDownIcon as TrendingDown, CalculatorIcon } from '@hugeicons/core-free-icons';

export const Insights: React.FC = () => {
    const { transactions } = useDashboard();

    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : '0';

    const spendingByCategory = expenses
        .reduce((acc: Record<string, number>, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    const highestSpendingCategory = Object.entries(spendingByCategory)
        .sort(([, a], [, b]) => b - a)[0];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-12">
            <InsightItem 
                icon={<HugeiconsIcon icon={SparklesIcon} className="text-amber-500" />} 
                title="Highest Spending" 
                value={highestSpendingCategory ? highestSpendingCategory[0] : 'N/A'} 
                description={`Total: $${highestSpendingCategory ? highestSpendingCategory[1].toLocaleString() : '0'}`}
            />
            <InsightItem 
                icon={<HugeiconsIcon icon={TrendingUp} className="text-emerald-500" />} 
                title="Savings Rate" 
                value={`${savingsRate}%`} 
                description="Of total income saved"
            />
            <InsightItem 
                icon={<HugeiconsIcon icon={TrendingDown} className="text-rose-500" />} 
                title="Monthly Burn" 
                value={`$${totalExpenses.toLocaleString()}`} 
                description="Total monthly overhead"
            />
            <InsightItem 
                icon={<HugeiconsIcon icon={CalculatorIcon} className="text-indigo-500" />} 
                title="Avg Transaction" 
                value={`$${(expenses.length > 0 ? totalExpenses / expenses.length : 0).toFixed(0)}`} 
                description="Per expense transaction"
            />
        </div>
    );
};

const InsightItem = ({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) => (
    <Card className="shadow-md border-none bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4">
        <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">{title}</p>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-[10px] text-slate-400 mt-1">{description}</p>
            </div>
        </div>
    </Card>
);
