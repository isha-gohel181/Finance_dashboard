import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const BalanceChart: React.FC = () => {
    const { transactions } = useDashboard();

    // Group transactions by date and calculate balance trends
    const data = transactions
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reduce((acc: any[], t) => {
            const date = new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
            const currentAmount = t.type === 'income' ? t.amount : -t.amount;
            
            acc.push({
                date,
                balance: lastBalance + currentAmount
            });
            return acc;
        }, []);

    return (
        <Card className="shadow-lg border-none bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    Balance Trends
                    <span className="text-xs font-normal text-slate-400">Over time</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip 
                             contentStyle={{ 
                                backgroundColor: '#fff', 
                                border: 'none', 
                                borderRadius: '12px', 
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                            }}
                            cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="balance" 
                            stroke="#4f46e5" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorBalance)" 
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
