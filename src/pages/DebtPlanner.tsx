import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Analytics01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
  Wallet01Icon,
  SparklesIcon,
  ArrowUpRight01Icon,
  InformationCircleIcon
} from '@hugeicons/core-free-icons';

export const DebtPlanner = () => {
  const { debts } = useDashboard();
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('snowball');

  const totalDebt = debts.reduce((acc, d) => acc + d.balance, 0);
  const avgInterest = debts.reduce((acc, d) => acc + d.interestRate, 0) / debts.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 animate-in fade-in duration-700">
      {/* Refined Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Debt Optimization</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Data-driven strategies for your financial freedom.
          </p>
        </div>
        
        <div className="inline-flex p-1 bg-secondary/50 rounded-2xl border border-border/50">
          <button 
            onClick={() => setStrategy('snowball')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${strategy === 'snowball' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Snowball
          </button>
          <button 
            onClick={() => setStrategy('avalanche')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${strategy === 'avalanche' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Avalanche
          </button>
        </div>
      </div>

      {/* Balanced Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border/50 rounded-3xl overflow-hidden relative group">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Total Balance</CardDescription>
            <CardTitle className="text-3xl font-bold mt-1">${totalDebt.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
               <HugeiconsIcon icon={Wallet01Icon} size={12} className="text-primary" />
               Across {debts.length} active accounts
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 rounded-3xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Avg Interest Rate</CardDescription>
            <CardTitle className="text-3xl font-bold mt-1">{avgInterest.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                <HugeiconsIcon icon={Analytics01Icon} size={12} className="text-primary" />
                Weighted average APR
             </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-none rounded-3xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-wider opacity-70">Freedom Date</CardDescription>
            <CardTitle className="text-3xl font-bold mt-1">Oct 2028</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-1.5 text-[10px] font-medium opacity-80">
                <HugeiconsIcon icon={Calendar01Icon} size={12} />
                Ahead by 4 months
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Debt List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {debts.map((debt) => (
            <Card key={debt.id} className="rounded-3xl border-border/50 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm">
               <div className="h-1 w-full opacity-50" style={{ backgroundColor: debt.color }} />
               <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div 
                           className="h-10 w-10 rounded-xl flex items-center justify-center text-white"
                           style={{ backgroundColor: debt.color }}
                         >
                            <HugeiconsIcon icon={Wallet01Icon} size={18} />
                         </div>
                         <div>
                            <CardTitle className="text-lg font-bold">{debt.name}</CardTitle>
                            <Badge variant="outline" className="h-4 text-[8px] uppercase font-medium tracking-wider px-1.5 border-border/50">
                                {debt.category}
                            </Badge>
                         </div>
                  </div>
                     <div className="text-right">
                        <div className="text-[10px] font-bold text-rose-500">{debt.interestRate}% <span className="opacity-50 font-medium">APR</span></div>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-end justify-between">
                     <div>
                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Balance</p>
                        <p className="text-2xl font-bold">${debt.balance.toLocaleString()}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Min. Pay</p>
                        <p className="text-sm font-bold">${debt.minPayment}<span className="text-[10px] opacity-40">/mo</span></p>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <div className="flex justify-between items-center text-[9px] font-bold uppercase text-muted-foreground">
                        <span>Progress</span>
                        <span className="text-primary">45%</span>
                     </div>
                     <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: '45%' }} />
                     </div>
                  </div>

                  <button className="w-full h-10 rounded-xl bg-secondary/50 hover:bg-secondary text-[11px] font-bold flex items-center justify-center gap-2 transition-all">
                     <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="text-primary" />
                     Amortization Details
                  </button>
               </CardContent>
            </Card>
         ))}

         <button className="rounded-3xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center p-8 bg-secondary/20 hover:bg-secondary/30 transition-all min-h-[200px] group">
            <div className="h-12 w-12 rounded-2xl border border-dashed border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors mb-3">
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="rotate-[-45deg]" />
            </div>
            <p className="text-sm font-bold">Consolidate Debt</p>
            <p className="text-[10px] text-muted-foreground mt-1 text-center">Add a new credit line or loan</p>
         </button>
      </div>

      {/* Simplified Recommendation Card */}
      <Card className="bg-foreground text-background rounded-3xl p-6 lg:p-8 overflow-hidden relative border-none">
         <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-background/10 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
               <HugeiconsIcon icon={SparklesIcon} size={10} className="text-primary" />
               FinAI Recommendation
            </div>
            
            <div className="space-y-2">
               <h3 className="text-2xl font-bold leading-tight">
                 Optimization: <span className="opacity-60">{strategy} strategy</span>
               </h3>
               <p className="text-background/70 text-sm leading-relaxed font-medium">
                   Focus any extra liquidity on <span className="text-background font-bold border-b border-primary">{debts[0]?.name || 'the smallest balance'}</span>. 
                   This triggers immediate emotional momentum and simplifies your mental overhead.
               </p>
            </div>

            <div className="flex gap-4 pt-2">
               <div className="bg-background/5 p-3 rounded-2xl border border-background/10 min-w-[120px]">
                   <p className="text-[8px] uppercase font-bold opacity-50 mb-1">Time Saved</p>
                   <p className="text-xl font-bold">14 <span className="text-xs font-medium">mos</span></p>
               </div>
               <div className="bg-background/5 p-3 rounded-2xl border border-background/10 min-w-[120px]">
                   <p className="text-[8px] uppercase font-bold opacity-50 mb-1">Savings</p>
                   <p className="text-xl font-bold">$3,120</p>
               </div>
            </div>
         </div>
         
         <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden md:block">
            <div className="bg-primary px-6 py-4 rounded-3xl text-primary-foreground text-center">
               <p className="text-[8px] font-bold uppercase tracking-widest mb-1">Success Prob.</p>
               <p className="text-4xl font-bold">94%</p>
               <HugeiconsIcon icon={InformationCircleIcon} size={14} className="mx-auto mt-2 opacity-60" />
            </div>
         </div>
      </Card>
    </div>
  );
};


