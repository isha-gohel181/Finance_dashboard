import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const AddTransactionModal: React.FC = () => {
    const { addTransaction, role } = useDashboard();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense' as 'income' | 'expense',
        date: new Date().toISOString().split('T')[0],
    });

    if (role !== 'admin') return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTransaction({
            ...formData,
            amount: parseFloat(formData.amount),
        });
        setFormData({
            description: '',
            amount: '',
            category: 'Food',
            type: 'expense',
            date: new Date().toISOString().split('T')[0],
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-8 right-8 h-12 px-6 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 transition-all gap-2 z-50 text-white">
                    <span className="text-xl font-bold">+</span>
                    Add Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Add Transaction</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new transaction.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <Input 
                            id="description" 
                            required 
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="e.g. Grocery shopping" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                             <label htmlFor="amount" className="text-sm font-medium">Amount ($)</label>
                             <Input 
                                id="amount" 
                                type="number" 
                                required 
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="0.00" 
                             />
                        </div>
                        <div className="grid gap-2">
                             <label htmlFor="type" className="text-sm font-medium">Type</label>
                             <Select value={formData.type} onValueChange={(v: any) => setFormData({ ...formData, type: v })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="grid gap-2">
                             <label htmlFor="category" className="text-sm font-medium">Category</label>
                             <Select value={formData.category} onValueChange={(v: any) => setFormData({ ...formData, category: v })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formData.type === 'income' ? (
                                        <>
                                            <SelectItem value="Salary">Salary</SelectItem>
                                            <SelectItem value="Freelance">Freelance</SelectItem>
                                            <SelectItem value="Invest">Invest</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="Food">Food</SelectItem>
                                            <SelectItem value="Rent">Rent</SelectItem>
                                            <SelectItem value="Bills">Bills</SelectItem>
                                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                                            <SelectItem value="Transport">Transport</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                             </Select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="date" className="text-sm font-medium">Date</label>
                            <Input 
                                id="date" 
                                type="date" 
                                required 
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Transaction</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
