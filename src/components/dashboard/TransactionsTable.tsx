import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, FilterIcon, Delete01Icon, MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { Button } from '../ui/button';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const TransactionsTable: React.FC = () => {
    const { 
        transactions, 
        role, 
        searchQuery, 
        setSearchQuery, 
        filterType, 
        setFilterType, 
        deleteTransaction 
    } = useDashboard();

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [sortKey, setSortKey] = useState<'date' | 'amount'>('date');

    const filteredTransactions = transactions
        .filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 t.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = filterType === 'all' || t.type === filterType;
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            if (sortKey === 'date') {
                return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
            } else {
                return (a.amount - b.amount) * order;
            }
        });

    return (
        <Card className="shadow-lg border-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    Recent Transactions
                    <span className="text-xs font-normal text-slate-400">Total: {filteredTransactions.length}</span>
                </CardTitle>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full md:w-64">
                         <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                             <HugeiconsIcon icon={Search01Icon} size={16} />
                         </div>
                         <Input 
                            placeholder="Search description or category..." 
                            className="pl-10 h-10 border-slate-200 dark:border-slate-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                         />
                    </div>
                    
                    <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
                        <SelectTrigger className="w-32 h-10 border-slate-200 dark:border-slate-800">
                            <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value="all">All types</SelectItem>
                             <SelectItem value="income">Income</SelectItem>
                             <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[400px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                                <TableHead className="font-semibold uppercase text-xs text-slate-500 tracking-wider w-32 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => {
                                    setSortKey('date');
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                }}>
                                    Date {sortKey === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </TableHead>
                                <TableHead className="font-semibold uppercase text-xs text-slate-500 tracking-wider">Description</TableHead>
                                <TableHead className="font-semibold uppercase text-xs text-slate-500 tracking-wider">Category</TableHead>
                                <TableHead className="font-semibold uppercase text-xs text-slate-500 tracking-wider text-right cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => {
                                    setSortKey('amount');
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                }}>
                                    Amount {sortKey === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </TableHead>
                                {role === 'admin' && <TableHead className="w-16"></TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={role === 'admin' ? 5 : 4} className="h-48 text-center">
                                       <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                                            <HugeiconsIcon icon={FilterIcon} size={48} className="opacity-20" />
                                            <p className="font-medium">No transactions found</p>
                                            <p className="text-xs">Try adjusting your filters or search query.</p>
                                       </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTransactions.map((t) => (
                                    <TableRow key={t.id} className="border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <TableCell className="text-sm font-mono text-slate-500 dark:text-slate-400">
                                            {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </TableCell>
                                        <TableCell className="font-medium">{t.description}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-none font-normal">
                                                {t.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={`text-right font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                                        </TableCell>
                                        {role === 'admin' && (
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                            <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-900/10 cursor-pointer" onClick={() => deleteTransaction(t.id)}>
                                                            <HugeiconsIcon icon={Delete01Icon} className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};
