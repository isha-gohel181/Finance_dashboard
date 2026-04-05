import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { SpendingPieChart } from '../components/dashboard/SpendingPieChart';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { AddTransactionModal } from '../components/dashboard/AddTransactionModal';
import { Insights } from '../components/dashboard/Insights';

export function Overview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back, track your financial performance and spending habits.
        </p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div className="lg:col-span-1">
          <SpendingPieChart />
        </div>
      </div>

      <Insights />

      <div className="mt-12">
        <TransactionsTable />
      </div>

      <AddTransactionModal />
    </div>
  );
}
