import React, { type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Settings01Icon, 
  DashboardSquare01Icon, 
  Wallet01Icon, 
  PieChart01Icon,
  Analytics01Icon,
  CreditCardIcon,
  CalculatorIcon,
  AiChat01Icon,
  Search01Icon,
  Notification03Icon,
  UserCircleIcon,
  PlusSignIcon,
  Moon02Icon,
  Sun01Icon
} from '@hugeicons/core-free-icons';
import { Switch } from '../ui/switch';

interface LayoutProps {
  children?: ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, setTheme } = useDashboard();

  return (
    <div className="flex h-screen w-full flex-col bg-background text-slate-900 dark:text-slate-100 md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <header className="flex md:hidden h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center">
            <HugeiconsIcon icon={Wallet01Icon} size={18} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">FinanceHub</span>
        </div>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
        >
          <HugeiconsIcon icon={theme === 'dark' ? Moon02Icon : Sun01Icon} size={18} />
        </button>
      </header>

      {/* Premium Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-background sticky top-0 h-screen overflow-hidden">
        <div className="flex h-20 items-center px-8 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <HugeiconsIcon icon={Wallet01Icon} size={22} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">FinanceHub</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-4">Menu</p>
           <nav className="flex flex-col gap-1">
            <NavItem to="/" end icon={<HugeiconsIcon icon={DashboardSquare01Icon} size={20} />} label="Overview" />
            <NavItem to="/net-worth" icon={<HugeiconsIcon icon={Analytics01Icon} size={20} />} label="Net Worth" />
            <NavItem to="/reports" icon={<HugeiconsIcon icon={PieChart01Icon} size={20} />} label="Reports" />
            <NavItem to="/budgets" icon={<HugeiconsIcon icon={Wallet01Icon} size={20} />} label="Budgets" />
            <NavItem to="/portfolio" icon={<HugeiconsIcon icon={Analytics01Icon} size={20} />} label="Portfolio" />
            <NavItem to="/subscriptions" icon={<HugeiconsIcon icon={CreditCardIcon} size={20} />} label="Subscriptions" />
            <NavItem to="/calculators" icon={<HugeiconsIcon icon={CalculatorIcon} size={20} />} label="Calculators" />
            <NavItem to="/debt-planner" icon={<HugeiconsIcon icon={AiChat01Icon} size={20} />} label="Debt Planner" />
            <NavItem to="/settings" icon={<HugeiconsIcon icon={Settings01Icon} size={20} />} label="Settings" />
          </nav>
        </div>

        <div className="p-4 mt-auto space-y-2">
           <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-card border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
             <div className="flex items-center gap-2">
               <HugeiconsIcon icon={theme === 'dark' ? Moon02Icon : Sun01Icon} size={18} className="text-slate-400" />
               <span className="text-xs font-bold">Theme</span>
             </div>
             <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
             />
           </div>

          <div className="flex items-center gap-3 p-4 rounded-3xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
             <div className="h-10 w-10 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <HugeiconsIcon icon={UserCircleIcon} size={24} />
             </div>
             <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Isha Gohel</p>
                <p className="text-[10px] text-slate-500 truncate lowercase">isha.gohel181@finance.hub</p>
             </div>
             <HugeiconsIcon icon={Settings01Icon} size={16} className="text-slate-400 group-hover:rotate-90 transition-transform" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar pb-24 md:pb-0">
        <div className="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto w-full">
          {children ?? <Outlet />}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-background/90 border-t border-slate-200 dark:border-slate-800 backdrop-blur-xl z-50 flex items-center justify-around px-4">
        <MobileNavItem to="/" end icon={<HugeiconsIcon icon={DashboardSquare01Icon} size={24} />} label="Home" />
        <MobileNavItem to="/budgets" icon={<HugeiconsIcon icon={Wallet01Icon} size={24} />} label="Budget" />
        <MobileNavItem to="/debt-planner" icon={<HugeiconsIcon icon={AiChat01Icon} size={24} />} label="AI Hub" />
        <MobileNavItem to="/portfolio" icon={<HugeiconsIcon icon={Analytics01Icon} size={24} />} label="Assets" />
        <MobileNavItem to="/settings" icon={<HugeiconsIcon icon={Settings01Icon} size={24} />} label="Prefs" />
      </nav>
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
      `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 translate-x-1'
          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

const MobileNavItem = ({
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
      `flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
        isActive ? 'text-indigo-600 -translate-y-1' : 'text-slate-500'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-indigo-600/10' : ''}`}>
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </>
    )}
  </NavLink>
);
