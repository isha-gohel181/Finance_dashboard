import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
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
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
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
            <div key={item.title} className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </div>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-end">
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
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Manage members</Button>
          <Button>Update workspace</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
