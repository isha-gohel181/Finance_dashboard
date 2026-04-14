import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Settings01Icon, 
  Tick01Icon, 
  Cancel01Icon,
  Wallet01Icon,
  ArrowUp01Icon
} from '@hugeicons/core-free-icons';

export const Budgets = () => {
  const { budgets, updateBudget } = useDashboard();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const percentage = (totalSpent / totalBudget) * 100;

  const handleEdit = (id: string, limit: number) => {
    setEditingId(id);
    setEditValue(limit.toString());
  };

  const handleSave = (id: string) => {
    updateBudget(id, parseFloat(editValue) || 0);
    setEditingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your monthly spending limits and track your progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-indigo-600 text-white border-none shadow-xl shadow-indigo-500/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-indigo-100 font-medium">Total Monthly Budget</CardDescription>
            <CardTitle className="text-3xl">${totalBudget.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-indigo-100">
              <HugeiconsIcon icon={Wallet01Icon} size={14} />
              Planned for this month
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Spent</CardDescription>
            <CardTitle className="text-3xl">${totalSpent.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span>{percentage.toFixed(1)}% of total budget</span>
                <span className={percentage > 90 ? 'text-red-500' : 'text-slate-500'}>
                  ${(totalBudget - totalSpent).toLocaleString()} left
                </span>
              </div>
              <Progress value={percentage} indicatorColor={percentage > 90 ? 'bg-red-500' : 'bg-indigo-600'} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-slate-200 dark:border-slate-800 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <HugeiconsIcon icon={Wallet01Icon} size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">FinAI Insight</CardDescription>
            <CardTitle className="text-lg">Budget Health: {percentage > 90 ? 'Critical' : percentage > 70 ? 'Warning' : 'Good'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-300 leading-relaxed">
              {percentage > 90 
                ? "You've almost exhausted your total budget. Consider cutting back on non-essential categories for the rest of the week."
                : "Your spending is well within limits. You're on track to save approximately 15% of your income this month!"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const budgetPct = (budget.spent / budget.limit) * 100;
          const isEditing = editingId === budget.id;

          return (
            <Card key={budget.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: budget.color }}
                    >
                      <HugeiconsIcon icon={Wallet01Icon} size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <CardDescription>
                        {budgetPct > 100 ? 'Over budget' : `${(100 - budgetPct).toFixed(0)}% remaining`}
                      </CardDescription>
                    </div>
                  </div>
                  {!isEditing ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(budget.id, budget.limit)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HugeiconsIcon icon={Settings01Icon} size={16} />
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleSave(budget.id)} className="text-green-600">
                        <HugeiconsIcon icon={Tick01Icon} size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setEditingId(null)} className="text-red-500">
                        <HugeiconsIcon icon={Cancel01Icon} size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500">Spent</p>
                    <p className="text-2xl font-bold">${budget.spent.toLocaleString()}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-medium text-slate-500">Limit</p>
                    {isEditing ? (
                      <Input 
                        type="number" 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8 w-24 text-right"
                        autoFocus
                      />
                    ) : (
                      <p className="text-xl font-semibold text-slate-400">${budget.limit.toLocaleString()}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={Math.min(budgetPct, 100)} 
                    className="h-2.5"
                    indicatorColor={budgetPct > 100 ? 'bg-red-500' : 'bg-indigo-600'}
                  />
                  {budgetPct > 85 && (
                    <p className="text-[10px] font-medium text-red-500 flex items-center gap-1 animate-pulse">
                       <HugeiconsIcon icon={ArrowUp01Icon} size={10} />
                       Spending threshold alert
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
