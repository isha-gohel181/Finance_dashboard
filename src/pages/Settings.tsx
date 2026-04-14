import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { useDashboard } from '../context/DashboardContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

const preferences = [
  {
    title: 'Weekly summary email',
    description: 'Receive a Monday morning summary of KPIs.',
    defaultChecked: true,
  },
  {
    title: 'Anomaly alerts',
    description: 'Get notified when spend spikes above thresholds.',
    defaultChecked: true,
  },
  {
    title: 'New report drafts',
    description: 'Auto-generate report drafts after month close.',
    defaultChecked: false,
  },
];

export function Settings() {
  const { role, setRole } = useDashboard();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Adjust report delivery, alerts, and workspace preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          <CardDescription>
            Choose how and when the team receives updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {preferences.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </div>
              </div>
              <Switch defaultChecked={item.defaultChecked} className="self-start sm:self-auto" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-row flex-nowrap items-center justify-end gap-2">
          <Button>Save changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Workspace</CardTitle>
          <CardDescription>
            Manage visibility, access, and default currency settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Default currency
            </div>
            <div className="mt-2 text-lg font-semibold">USD - Dollar</div>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Fiscal year
            </div>
            <div className="mt-2 text-lg font-semibold">Jan - Dec</div>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Access level
            </div>
            <div className="mt-2 text-lg font-semibold">Admin</div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row flex-nowrap items-center justify-end gap-2">
          <Button variant="outline">Manage members</Button>
          <Button>Update workspace</Button>
        </CardFooter>
      </Card>

      {/* Advanced System Roles */}
      <Card className="rounded-4xl border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-lg font-bold">System Roles & Permissions</CardTitle>
          <CardDescription>
            Switch between Viewer and Admin modes to manage dashboard capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
           <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <p className="text-sm font-bold">Full Administrator Access</p>
                <p className="text-xs text-slate-500">Enable advanced features like deleting transactions and modifying budgets.</p>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`text-xs font-black uppercase tracking-widest ${role === 'admin' ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {role === 'admin' ? 'Active' : 'Disabled'}
                 </span>
                 <Switch 
                    checked={role === 'admin'} 
                    onCheckedChange={(checked) => setRole(checked ? 'admin' : 'viewer')} 
                 />
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
