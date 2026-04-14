import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  CalculatorIcon, 
  Analytics01Icon,
  Wallet01Icon
} from '@hugeicons/core-free-icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Calculators = () => {
    // Interest Calculator State
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(10);
    const [compoundData, setCompoundData] = useState<any[]>([]);

    // Emergency Fund State
    const [expenses, setExpenses] = useState(3000);
    const [months, setMonths] = useState(6);

    useEffect(() => {
        const data = [];
        
        for (let i = 0; i <= years; i++) {
            const amount = principal * Math.pow(1 + (rate / 100), i);
            data.push({
                year: `Year ${i}`,
                amount: Math.round(amount),
            });
        }
        setCompoundData(data);
    }, [principal, rate, years]);

    const finalAmount = compoundData.length > 0 ? compoundData[compoundData.length - 1].amount : 0;
    const totalInterest = finalAmount - principal;

    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Financial Calculators</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Plan your future with interactive tools for interest, loans, and emergency savings.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Compound Interest Calculator */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 overflow-hidden group">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800 p-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <HugeiconsIcon icon={Analytics01Icon} size={20} />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Compound Interest</CardTitle>
                                <CardDescription>Visualize your wealth growth over time</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Principal ($)</label>
                                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Annual Rate (%)</label>
                                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Years</label>
                                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                            </div>
                        </div>

                        <div className="h-[200px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={compoundData}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="year" hide />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`$${Number(value || 0).toLocaleString()}`, 'Balance']}
                                    />
                                    <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="text-xs font-medium text-slate-500">Total Balance</p>
                                <p className="text-2xl font-black text-indigo-600">${finalAmount.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-slate-500">Total Interest Earned</p>
                                <p className="text-2xl font-black text-emerald-500">+${totalInterest.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {/* Emergency Fund Calculator */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 overflow-hidden">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800 p-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <HugeiconsIcon icon={Wallet01Icon} size={20} />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Emergency Fund</CardTitle>
                                    <CardDescription>Determine your safety net target</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-500">Monthly Expenses</label>
                                    <Input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-500">Months of Coverage</label>
                                    <Input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Recommended Savings</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">${(expenses * months).toLocaleString()}</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                                    <HugeiconsIcon icon={CalculatorIcon} size={24} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Tips */}
                    <Card className="bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2 text-indigo-900 dark:text-indigo-400">
                                <HugeiconsIcon icon={Analytics01Icon} size={16} />
                                Financial Wisdom
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-indigo-800/70 dark:text-indigo-500/70 leading-relaxed italic">
                                "The best time to plant a tree was 20 years ago. The second best time is now. Compound interest works best when you give it time to grow."
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
