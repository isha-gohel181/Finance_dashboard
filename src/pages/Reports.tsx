import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { useDashboard } from '../context/DashboardContext';

const reportCards = [
  {
    title: 'Monthly Profit & Loss',
    description: 'Revenue, expenses, and net income by month.',
    cadence: 'Last updated 2 hours ago',
    status: 'Ready',
  },
  {
    title: 'Cash Flow Snapshot',
    description: 'Operational cash movement for the last 90 days.',
    cadence: 'Scheduled every Monday',
    status: 'Scheduled',
  },
  {
    title: 'Category Spend Review',
    description: 'Breakdown by category with variance tracking.',
    cadence: 'Last updated yesterday',
    status: 'Ready',
  },
];

const highlights = [
  { label: 'Net margin', value: '18.4%', trend: '+2.1%' },
  { label: 'Operating cash', value: '$124.2k', trend: '+6.4%' },
  { label: 'Top category', value: 'Marketing', trend: '-4.8%' },
];

export function Reports() {
  const { transactions } = useDashboard();

  const handleExport = (reportTitle: string) => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map((item) => [
      item.date,
      item.description,
      item.category,
      item.type,
      item.amount.toString(),
    ]);

    const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => escapeCell(cell)).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTitle = reportTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    link.href = url;
    link.download = `${safeTitle || 'report'}-transactions.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Reports</h1>
          <Badge variant="secondary">Beta</Badge>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Generate focused reports for leadership reviews and monthly closes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {highlights.map((item) => (
          <Card key={item.label} size="sm">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-wide">
                {item.label}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {item.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="outline">{item.trend} vs last period</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportCards.map((report) => (
          <Card key={report.title}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {report.title}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {report.cadence}
              </div>
              <Badge variant={report.status === 'Ready' ? 'secondary' : 'outline'}>
                {report.status}
              </Badge>
            </CardContent>
            <CardFooter className="flex flex-row flex-nowrap items-center gap-2">
              <Button size="sm">View report</Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExport(report.title)}
              >
                Export CSV
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
