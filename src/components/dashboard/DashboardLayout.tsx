import React, { type ReactNode } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Settings01Icon, 
  DashboardSquare01Icon, 
  Wallet01Icon, 
  PieChart01Icon
} from '@hugeicons/core-free-icons';
import { Switch } from '../ui/switch';

interface LayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { role, setRole } = useDashboard();

  return (
    <div className="flex h-screen w-full bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-screen">
        <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <HugeiconsIcon icon={Wallet01Icon} size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">FinanceHub</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          <NavItem icon={<HugeiconsIcon icon={DashboardSquare01Icon} size={20} />} label="Overview" active />
          <NavItem icon={<HugeiconsIcon icon={PieChart01Icon} size={20} />} label="Transactions" />
          <NavItem icon={<HugeiconsIcon icon={Settings01Icon} size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Current Role</span>
              <div className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
                {role.toUpperCase()}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">Viewer</span>
              <Switch 
                checked={role === 'admin'} 
                onCheckedChange={(checked) => setRole(checked ? 'admin' : 'viewer')} 
              />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
    active 
    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-indigo-500/10' 
    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
  }`}>
    {icon}
    {label}
  </button>
);
