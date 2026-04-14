import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Analytics01Icon, 
  ArrowUp01Icon, 
  ArrowDown01Icon,
  Wallet01Icon,
  AiChat01Icon,
  Tick01Icon
} from '@hugeicons/core-free-icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const NetWorth = () => {
    const { transactions, portfolio, debts } = useDashboard();

    // Assets
    const cashBalance = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
    const portfolioValue = portfolio.reduce((acc, item) => acc + item.amount * item.currentPrice, 0);
    const totalAssets = cashBalance + portfolioValue;

    // Liabilities
    const totalLiabilities = debts.reduce((acc, d) => acc + d.balance, 0);

    // Net Worth
    const netWorth = totalAssets - totalLiabilities;

    const chartData = [
        { name: 'Liquid Cash', value: cashBalance, color: '#4f46e5' },
        { name: 'Investments', value: portfolioValue, color: '#8b5cf6' },
        { name: 'Liabilities', value: totalLiabilities, color: '#f43f5e' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Net Worth Command Center</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    A holistic view of your entire financial empire.
                </p>
            </div>

            <Card className="rounded-4xl bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden p-8">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <HugeiconsIcon icon={Analytics01Icon} size={300} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Total Net Worth</p>
                        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                             <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                                <HugeiconsIcon icon={ArrowUp01Icon} size={14} />
                                +4.2% This Month
                             </div>
                             <span className="text-xs text-slate-500">Wealth Velocity: High</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Assets</p>
                            <p className="text-xl font-bold">${totalAssets.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Liabilities</p>
                            <p className="text-xl font-bold text-rose-400">${totalLiabilities.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid gap-8 lg:grid-cols-2">
                <Card className="rounded-4xl border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 overflow-hidden">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800 p-6">
                        <CardTitle className="text-xl">Asset Distribution</CardTitle>
                        <CardDescription>Where your wealth is currently held</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-8">
                        <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap sm:flex-col gap-4 justify-center sm:justify-start w-full sm:w-auto sm:pr-8">
                             {chartData.map((item) => (
                                <div key={item.name} className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-500 uppercase">{item.name}</p>
                                        <p className="text-sm font-black">${item.value.toLocaleString()}</p>
                                    </div>
                                </div>
                             ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="rounded-4xl bg-indigo-600 text-white border-none p-8 relative overflow-hidden group">
                         <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                             <HugeiconsIcon icon={AiChat01Icon} size={150} />
                         </div>
                         <CardTitle className="text-2xl font-black mb-4">FinAI Wealth Advisor</CardTitle>
                         <div className="space-y-4 relative z-10">
                            <p className="text-sm text-indigo-100 leading-relaxed font-medium">
                                "Your current asset-to-debt ratio is <span className="text-white font-black">{(totalAssets / (totalLiabilities || 1)).toFixed(1)}x</span>. 
                                By focusing on paying off your high-interest credit card debt, you could increase your wealth velocity by <span className="text-white font-black underline">12%</span> by year-end."
                            </p>
                            <div className="flex gap-2">
                                <Badge className="bg-white/20 text-white border-none">Debt Payoff Plan Ready</Badge>
                                <Badge className="bg-white/20 text-white border-none">Investment Alert</Badge>
                            </div>
                         </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-4xl border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-center items-center text-center hover:border-indigo-500 transition-colors group cursor-pointer">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                                <HugeiconsIcon icon={Tick01Icon} size={24} />
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Debt to Asset Ratio</p>
                            <p className="text-2xl font-black">{((totalLiabilities / totalAssets) * 100).toFixed(1)}%</p>
                        </Card>

                         <Card className="rounded-4xl border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-center items-center text-center hover:border-emerald-500 transition-colors group cursor-pointer">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                                <HugeiconsIcon icon={Wallet01Icon} size={24} />
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Liquid Ratio</p>
                            <p className="text-2xl font-black">{((cashBalance / totalAssets) * 100).toFixed(1)}%</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${className}`}>
        {children}
    </span>
);
