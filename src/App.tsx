import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './pages/Overview';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Budgets } from './pages/Budgets';
import { Portfolio } from './pages/Portfolio';
import { Subscriptions } from './pages/Subscriptions';
import { Calculators } from './pages/Calculators';
import { DebtPlanner } from './pages/DebtPlanner';
import { NetWorth } from './pages/NetWorth';

export function App() {
  return (
    <DashboardProvider>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="reports" element={<Reports />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="debt-planner" element={<DebtPlanner />} />
          <Route path="net-worth" element={<NetWorth />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </DashboardProvider>
  );
}

export default App;
