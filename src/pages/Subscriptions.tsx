import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Progress } from '../components/ui/progress';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Calendar01Icon, 
  CreditCardIcon, 
  Clock01Icon,
  AlertCircleIcon,
  Analytics01Icon,
  ArrowRight01Icon,
  Wallet01Icon
} from '@hugeicons/core-free-icons';

export const Subscriptions = () => {
  const { subscriptions, toggleSubscriptionStatus } = useDashboard();

  const monthlyTotal = subscriptions
    .filter(s => s.status === 'active')
    .reduce((acc, s) => acc + (s.billingCycle === 'monthly' ? s.amount : s.amount / 12), 0);

  const annualTotal = monthlyTotal * 12;

  const activeCount = subscriptions.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Manager</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Track and manage all your recurring services and automated payments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-slate-900 text-white border-none shadow-xl relative overflow-hidden">
             <div className="absolute -right-4 -bottom-4 opacity-10">
                <HugeiconsIcon icon={Wallet01Icon} size={120} />
            </div>
            <CardHeader className="pb-2">
                <CardDescription className="text-slate-400">Monthly Burn Rate</CardDescription>
                <CardTitle className="text-3xl">${monthlyTotal.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-slate-500 font-medium">Across {activeCount} active subscriptions</p>
            </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
                <CardDescription>Annual Projected Cost</CardDescription>
                <CardTitle className="text-3xl">${annualTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold">
                     <HugeiconsIcon icon={Analytics01Icon} size={14} />
                     Estimated yearly expense
                </div>
            </CardContent>
        </Card>

        <Card className="bg-indigo-600 border-none text-white">
            <CardHeader className="pb-2">
                <CardDescription className="text-indigo-100 font-medium">Next Major Bill</CardDescription>
                <CardTitle className="text-lg">Amazon Prime</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-black">$139.00</span>
                    <Badge className="bg-white/20 text-white border-none">Jan 12</Badge>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
            <HugeiconsIcon icon={Clock01Icon} size={20} className="text-indigo-600" />
            Active Services
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((sub) => (
                <Card key={sub.id} className={`group border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 ${sub.status === 'paused' ? 'opacity-60 saturate-50' : ''}`}>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div 
                                    className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-black text-xs"
                                    style={{ backgroundColor: sub.color }}
                                >
                                    {sub.name.substring(0, 1)}
                                </div>
                                <div>
                                    <CardTitle className="text-base">{sub.name}</CardTitle>
                                    <CardDescription className="text-[10px] uppercase font-bold tracking-tighter">
                                        {sub.category}
                                    </CardDescription>
                                </div>
                            </div>
                            <Switch 
                                checked={sub.status === 'active'} 
                                onCheckedChange={() => toggleSubscriptionStatus(sub.id)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-2xl font-black">${sub.amount.toFixed(2)}</p>
                                <p className="text-[10px] text-slate-500 font-medium">Billed {sub.billingCycle}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Next Renewal</p>
                                <p className="text-xs font-semibold">{new Date(sub.nextBillingDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {sub.status === 'active' && (
                            <div className="pt-2">
                                <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest text-slate-400">
                                    <span>Usage Intensity</span>
                                    <span>High</span>
                                </div>
                                <Progress value={85} className="h-1" indicatorColor="bg-indigo-500" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}

            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-900/50 group cursor-pointer hover:border-indigo-400 transition-colors">
                <div className="h-12 w-12 rounded-full border-2 border-dashed flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:border-indigo-500 transition-colors mb-2">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={24} className="rotate-[-45deg]" />
                </div>
                <p className="text-sm font-bold text-slate-500 group-hover:text-indigo-600">Track New Subscription</p>
            </Card>
        </div>
      </div>

      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50">
        <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600">
                <HugeiconsIcon icon={AlertCircleIcon} size={20} />
            </div>
            <div>
                <CardTitle className="text-sm font-bold text-amber-900 dark:text-amber-400">Smart Savings Alert</CardTitle>
                <CardDescription className="text-xs text-amber-800/70 dark:text-amber-500/70">
                    You have <span className="font-bold underline">3 subscriptions</span> in the "Entertainment" category. 
                    Merging these could save you approximately <span className="font-bold">$12.40/month</span>.
                </CardDescription>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
