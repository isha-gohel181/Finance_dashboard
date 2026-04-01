import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const SpendingPieChart: React.FC = () => {
    const { transactions } = useDashboard();

    const spendingByCategory = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc: any[], t) => {
            const index = acc.findIndex(cat => cat.name === t.category);
            if (index !== -1) {
                acc[index].value += t.amount;
            } else {
                acc.push({ name: t.category, value: t.amount });
            }
            return acc;
        }, []);

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

    return (
        <Card className="shadow-lg border-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    Spending by Category
                    <span className="text-xs font-normal text-slate-400">Total breakdown</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={spendingByCategory}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            animationDuration={1000}
                        >
                            {spendingByCategory.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#fff', 
                                border: 'none', 
                                borderRadius: '12px', 
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
