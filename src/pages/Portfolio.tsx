import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ArrowUp01Icon, 
  ArrowDown01Icon, 
  Wallet01Icon, 
  Analytics01Icon
} from '@hugeicons/core-free-icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const Portfolio = () => {
  const { portfolio } = useDashboard();

  const totalValue = portfolio.reduce((acc, item) => acc + item.amount * item.currentPrice, 0);
  const totalCost = portfolio.reduce((acc, item) => acc + item.amount * item.avgPrice, 0);
  const totalProfit = totalValue - totalCost;
  const profitPercentage = (totalProfit / totalCost) * 100;

  const chartData = portfolio.map(item => ({
    name: item.name,
    value: item.amount * item.currentPrice,
    color: item.color
  }));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Track your assets, performance, and allocation across all markets.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-2 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
                <HugeiconsIcon icon={Analytics01Icon} size={200} />
            </div>
            <CardHeader>
                <CardDescription className="text-slate-400 font-medium tracking-wide uppercase text-xs">Total Portfolio Value</CardDescription>
                <CardTitle className="text-3xl sm:text-4xl font-black">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${totalProfit >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {totalProfit >= 0 ? <HugeiconsIcon icon={ArrowUp01Icon} size={14} /> : <HugeiconsIcon icon={ArrowDown01Icon} size={14} />}
                        {profitPercentage.toFixed(2)}% (${Math.abs(totalProfit).toLocaleString()})
                    </div>
                    <span className="text-xs text-slate-500">All-time P/L</span>
                </div>
            </CardContent>
        </Card>

        <Card className="flex flex-col justify-center items-center p-6 border-slate-200 dark:border-slate-800">
            <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={50}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-2">Asset Allocation</p>
        </Card>

        <Card className="bg-indigo-600 text-white border-none flex flex-col justify-center p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <HugeiconsIcon icon={Analytics01Icon} size={20} />
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold opacity-70">Market Status</p>
                   <p className="text-sm font-bold">Bullish Trend</p>
                </div>
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
                Most of your assets are currently outperforming the S&P 500 by <span className="font-bold underline">4.2%</span> this week.
            </p>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="text-lg">Your Assets</CardTitle>
          <CardDescription>Real-time performance of your holdings</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto custom-scrollbar">
          <div className="min-w-[800px] md:min-w-full">
            <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Holdings</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead className="text-right pr-6">Profit / Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.map((item) => {
                const itemValue = item.amount * item.currentPrice;
                const itemProfit = (item.currentPrice - item.avgPrice) * item.amount;
                const itemProfitPct = ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100;

                return (
                  <TableRow key={item.id} className="group cursor-pointer">
                    <TableCell className="pl-6 font-medium">
                      <div className="flex items-center gap-3">
                        <div 
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase">{item.symbol}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize text-[10px] font-bold tracking-wider">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{item.amount} {item.symbol}</p>
                      <p className="text-[10px] text-slate-500">${itemValue.toLocaleString()}</p>
                    </TableCell>
                    <TableCell className="text-slate-500">${item.avgPrice.toLocaleString()}</TableCell>
                    <TableCell className="font-bold">${item.currentPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right pr-6">
                      <div className={`flex flex-col items-end ${itemProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        <span className="text-sm font-bold flex items-center gap-1">
                          {itemProfit >= 0 ? '+' : ''}${Math.abs(itemProfit).toLocaleString()}
                        </span>
                        <span className="text-[10px] opacity-70">
                          {itemProfit >= 0 ? '▲' : '▼'} {Math.abs(itemProfitPct).toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
