import React, { type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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
  children?: ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { role, setRole } = useDashboard();

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50/50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:flex-row md:overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="flex h-16 items-center px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <HugeiconsIcon icon={Wallet01Icon} size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">FinanceHub</span>
          </div>
        </div>

        <nav className="grid grid-cols-3 gap-2 p-4 md:flex md:flex-1 md:flex-col md:gap-1">
          <NavItem to="/" end icon={<HugeiconsIcon icon={DashboardSquare01Icon} size={20} />} label="Overview" />
          <NavItem to="/reports" icon={<HugeiconsIcon icon={PieChart01Icon} size={20} />} label="Reports" />
          <NavItem to="/settings" icon={<HugeiconsIcon icon={Settings01Icon} size={20} />} label="Settings" />
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
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  to,
  end,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  end?: boolean;
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:text-sm md:justify-start md:gap-3 md:px-4 ${
        isActive
          ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-indigo-500/10'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);
