# 💰 FinanceHub - Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS. Track your income, expenses, and financial insights with an intuitive user interface.

---

## ✨ Features

### 📊 Dashboard Overview
- **Total Balance Card** - Real-time balance calculation (Income - Expenses)
- **Income Card** - Total earnings for the period
- **Expenses Card** - Total spending for the period

### 📈 Charts & Analytics
- **Balance Trend Chart** - Line/Area chart showing balance progression over time
- **Spending by Category** - Donut chart visualizing expense breakdown by category

### 💾 Transaction Management
- **Transaction Table** with columns: Date, Amount, Category, Type
- **Search Functionality** - Filter transactions by description and category
- **Filter Options** - View All, Income only, or Expenses only
- **Sort Capability** - Sort by Date and Amount with ascending/descending toggle
- **Empty State** - Helpful message when no transactions match filters

### 👥 Role-Based Access Control
- **Viewer Mode** - Read-only access to view financial data
- **Admin Mode** - Full access including:
  - Add new transactions
  - Delete existing transactions
  - Edit transaction details
- **Role Toggle** - Easy switching between Viewer and Admin roles in sidebar

### 💡 Insights Section
- **Highest Spending Category** - Identifies top spending category
- **Savings Rate** - Percentage of income saved
- **Monthly Burn Rate** - Total monthly expenses
- **Average Transaction** - Average expense amount

### 🎨 UI/UX Features
- **Responsive Design** - Mobile-first, works on all screen sizes
- **Dark Mode Support** - Full dark theme compatibility
- **Smooth Animations** - Chart animations and page transitions
- **Modern Components** - Clean, professional interface with icons
- **State Persistence** - Data stored in localStorage

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charting**: Recharts
- **Icons**: Hugeicons
- **Build Tool**: Vite
- **State Management**: React Context API
- **UI Components**: Custom components + shadcn/ui inspired design

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx        # Main layout with sidebar
│   │   ├── SummaryCards.tsx           # Balance, Income, Expenses cards
│   │   ├── BalanceChart.tsx           # Balance trend line/area chart
│   │   ├── SpendingPieChart.tsx       # Category spending donut chart
│   │   ├── TransactionsTable.tsx      # Transaction list with search/filter/sort
│   │   ├── Insights.tsx               # Analytics insights cards
│   │   └── AddTransactionModal.tsx    # Modal for adding transactions
│   ├── ui/                            # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   └── badge.tsx
│   └── theme-provider.tsx             # Dark mode provider
├── context/
│   └── DashboardContext.tsx           # Global state management
├── data/
│   └── mockData.ts                    # Sample transaction data
├── types/
│   └── index.ts                       # TypeScript types & interfaces
├── lib/
│   └── utils.ts                       # Utility functions
├── App.tsx                            # Root component
└── main.tsx                           # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to project directory**
   ```bash
   cd financial-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Build for Production
```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

---

## 💻 Usage

### Viewing Data
1. Dashboard loads with default **Viewer** role
2. View all summary cards, charts, and transaction history
3. Use search bar to find specific transactions
4. Filter by Income/Expense using the dropdown
5. Click column headers to sort transactions

### Managing Transactions (Admin Only)
1. Toggle to **Admin** role in the sidebar
2. Click **+ Add Transaction** button to add new entries
3. Fill in transaction details (Date, Amount, Category, Type)
4. Click delete icon on any transaction row to remove it
5. Transactions are instantly saved to localStorage

### Viewing Insights
- Scroll down to see key financial insights
- Cards display:
  - Highest spending category
  - Overall savings rate
  - Total monthly expenses
  - Average transaction amount

---

## 📝 Mock Data

The dashboard comes with 7 sample transactions demonstrating:
- Income transactions (salary, bonus)
- Various expense categories (Food, Transport, Entertainment, etc.)
- Different dates and amounts

Sample data is loaded from `src/data/mockData.ts`.

---

## 💾 Data Persistence

All transaction data and user preferences are stored in **localStorage**:
- Transactions persist across sessions
- User role preference is remembered
- Data survives page refreshes

---

## 🎯 Component Guide

### DashboardLayout
Main layout component with:
- Left sidebar with navigation
- Role switcher toggle
- Main content area for children

### SummaryCards
Three cards showing:
- Total Balance (gradient blue background)
- Income (green indicator)
- Expenses (red indicator)

### BalanceChart
Area chart tracking balance over time with:
- Smooth animations
- Gradient fill
- Responsive sizing

### SpendingPieChart
Donut chart showing spending by category with:
- Color-coded segments
- Legend with percentages
- Interactive tooltips

### TransactionsTable
Full-featured table with:
- Column-based sorting
- Inline search
- Type filtering
- Action buttons (delete for admin)
- Responsive horizontal scroll on mobile

### Insights
Four insight cards displaying:
- Highest spending category
- Savings percentage
- Monthly burn rate
- Average transaction value

---

## 🔐 Role-Based Features

### Viewer
- ✅ View all data
- ✅ Search & filter transactions
- ✅ View charts and insights
- ❌ Cannot add transactions
- ❌ Cannot delete transactions

### Admin
- ✅ View all data
- ✅ Search & filter transactions
- ✅ View charts and insights
- ✅ Add new transactions
- ✅ Delete transactions
- ✅ Edit transactions

---

## 🌓 Dark Mode

The dashboard automatically adapts to your system theme preference using Tailwind's `dark:` classes. All components support both light and dark modes.

---

## 📱 Responsive Breakpoints

- **Mobile**: Full-width stack layout
- **Tablet** (`md:`): 2-column grid for some sections
- **Desktop** (`lg:`): 3-column grid and side-by-side layouts

---

## 🐛 Known Limitations

- Loading states not explicitly shown during async operations
- Chart animations are static-based (not real API data)
- Edit transaction functionality exists in context but not fully UI-integrated

---

## 🚀 Future Enhancements

- [ ] Bar chart for spending trends over time
- [ ] Export transactions to CSV/PDF
- [ ] Budget planning and alerts
- [ ] Multi-account support
- [ ] Transaction categories customization
- [ ] Real API integration
- [ ] User authentication
- [ ] Multi-currency support

---

## 📄 License

This project is part of an internship training program.

---

## 👨‍💻 Developer Notes

- Built with React 18 and TypeScript for type safety
- Uses Context API for state management (scalable to Redux if needed)
- Tailwind CSS for rapid, consistent styling
- Recharts for accessible, responsive charts
- Follows component-based architecture for maintainability

---

## 🤝 Contributing

For improvements or bug fixes, please update the relevant component files and test thoroughly.

---

**Happy tracking your finances! 💰**
