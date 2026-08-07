"use client";

import { useState, useCallback } from "react";
import { X } from "lucide-react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";

import MessManagementPageHeader from "@/components/dashboard/mess/MessManagementPageHeader";
import MessManagementSummaryCards from "@/components/dashboard/mess/MessManagementSummaryCards";
import MessManagementFilters from "@/components/dashboard/mess/MessManagementFilters";
import TodaysMenuCard from "@/components/dashboard/mess/TodaysMenuCard";
import MealsServedTodayChart from "@/components/dashboard/mess/MealsServedTodayChart";
import RecentMessExpensesCard from "@/components/dashboard/mess/RecentMessExpensesCard";
import RecentMessCollectionsCard from "@/components/dashboard/mess/RecentMessCollectionsCard";
import MessMonthlySummaryCard from "@/components/dashboard/mess/MessMonthlySummaryCard";
import TopExpenseHeadsCard from "@/components/dashboard/mess/TopExpenseHeadsCard";
import MessQuickActionsCard from "@/components/dashboard/mess/MessQuickActionsCard";
import WeeklyMenuPlan from "@/components/dashboard/mess/WeeklyMenuPlan";
import AddMenuDialog from "@/components/dashboard/mess/AddMenuDialog";
import MealAttendanceDialog from "@/components/dashboard/mess/MealAttendanceDialog";
import MessExpenseDialog from "@/components/dashboard/mess/MessExpenseDialog";
import CollectionEntryDialog from "@/components/dashboard/mess/CollectionEntryDialog";
import MessReportDialog from "@/components/dashboard/mess/MessReportDialog";
import FullMenuPlanDialog from "@/components/dashboard/mess/FullMenuPlanDialog";
import MealDetailsDialog from "@/components/dashboard/mess/MealDetailsDialog";
import ViewAllExpensesDialog from "@/components/dashboard/mess/ViewAllExpensesDialog";
import ViewAllCollectionsDialog from "@/components/dashboard/mess/ViewAllCollectionsDialog";

import type { MealRow, QuickActionItem, WeeklyMenuDay } from "@/lib/fixtures/mess-management-reference-fixture";

interface MessSummaryCard {
  title: string;
  value: string;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

const MESS_SUMMARY_CARDS: MessSummaryCard[] = [
  {
    title: "Total Students",
    value: "286",
    footer: "In Mess",
    icon: "UtensilsCrossed",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    tint: "bg-purple-50/60",
  },
  {
    title: "Meals Served Today",
    value: "856",
    footer: "Breakfast: 286 | Lunch: 286 | Dinner: 284",
    icon: "Users",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "Monthly Expenses",
    value: "₹ 2,45,780",
    footer: "May 2025",
    icon: "IndianRupee",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    tint: "bg-pink-50/60",
  },
  {
    title: "Monthly Collection",
    value: "₹ 2,62,500",
    footer: "May 2025",
    icon: "Wallet",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
  {
    title: "Balance",
    value: "₹ 16,720",
    footer: "May 2025",
    icon: "TrendingUp",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
];

const TODAYS_MENU: MealRow[] = [
  {
    id: "1",
    meal: "Breakfast",
    menu: "Idli, Sambar, Coconut Chutney, Tea",
    time: "07:30 AM - 09:00 AM",
    status: "Served",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    mealIcon: "Sun",
  },
  {
    id: "2",
    meal: "Lunch",
    menu: "Rice, Dal, Mixed Vegetable Curry, Curd, Salad",
    time: "12:30 PM - 02:00 PM",
    status: "Served",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    mealIcon: "Flame",
  },
  {
    id: "3",
    meal: "Dinner",
    menu: "Chapathi, Paneer Butter Masala, Rice, Salad",
    time: "07:30 PM - 09:00 PM",
    status: "Upcoming",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    mealIcon: "Moon",
  },
];

const MEALS_SERVED_TODAY = [
  { label: "Breakfast", count: 286, percentage: "33.41%", color: "#7c3aed" },
  { label: "Lunch", count: 286, percentage: "33.41%", color: "#10b981" },
  { label: "Dinner", count: 284, percentage: "33.18%", color: "#f97316" },
];

const MEALS_SERVED_TOTAL = 856;

const RECENT_EXPENSES = [
  {
    id: "1",
    date: "18/05/2025",
    particulars: "Vegetables",
    category: "Groceries",
    amount: 2450,
    addedBy: "Admin",
  },
  {
    id: "2",
    date: "18/05/2025",
    particulars: "Milk & Dairy",
    category: "Milk & Dairy",
    amount: 1860,
    addedBy: "Admin",
  },
  {
    id: "3",
    date: "17/05/2025",
    particulars: "Rice (25kg)",
    category: "Groceries",
    amount: 1950,
    addedBy: "Admin",
  },
  {
    id: "4",
    date: "17/05/2025",
    particulars: "Cooking Oil (5L)",
    category: "Groceries",
    amount: 1250,
    addedBy: "Admin",
  },
  {
    id: "5",
    date: "17/05/2025",
    particulars: "LPG Cylinder",
    category: "LPG / Fuel",
    amount: 1180,
    addedBy: "Admin",
  },
];

const RECENT_COLLECTIONS = [
  {
    id: "1",
    date: "18/05/2025",
    receivedFrom: "Block A (Boys)",
    blockRoom: "Block A",
    amount: 8400,
    receivedBy: "Admin",
  },
  {
    id: "2",
    date: "18/05/2025",
    receivedFrom: "Block B (Boys)",
    blockRoom: "Block B",
    amount: 8400,
    receivedBy: "Admin",
  },
  {
    id: "3",
    date: "17/05/2025",
    receivedFrom: "Block C (Girls)",
    blockRoom: "Block C",
    amount: 8400,
    receivedBy: "Admin",
  },
  {
    id: "4",
    date: "17/05/2025",
    receivedFrom: "Block D (Girls)",
    blockRoom: "Block D",
    amount: 8400,
    receivedBy: "Admin",
  },
  {
    id: "5",
    date: "17/05/2025",
    receivedFrom: "Mess Advance (New)",
    blockRoom: "-",
    amount: 1000,
    receivedBy: "Admin",
  },
];

const MESS_SUMMARY_ROWS = [
  {
    label: "Total Students",
    value: "286",
    icon: "Users",
    iconColor: "text-[#7c3aed]",
  },
  {
    label: "Total Meals Served",
    value: "22,368",
    icon: "UtensilsCrossed",
    iconColor: "text-[#7c3aed]",
  },
  {
    label: "Total Collection",
    value: "₹ 2,62,500",
    icon: "Wallet",
    iconColor: "text-blue-600",
  },
  {
    label: "Total Expenses",
    value: "₹ 2,45,780",
    icon: "IndianRupee",
    iconColor: "text-pink-500",
  },
  {
    label: "Balance",
    value: "₹ 16,720",
    icon: "Wallet",
    iconColor: "text-emerald-600",
  },
];

const TOP_EXPENSE_HEADS = [
  { category: "Groceries", amount: "₹ 1,45,230", amountNum: 145230, barWidth: 100, barColor: "#7c3aed" },
  { category: "Vegetables", amount: "₹ 45,780", amountNum: 45780, barWidth: 31.5, barColor: "#10b981" },
  { category: "LPG / Fuel", amount: "₹ 22,450", amountNum: 22450, barWidth: 15.5, barColor: "#f97316" },
  { category: "Milk & Dairy", amount: "₹ 18,930", amountNum: 18930, barWidth: 13, barColor: "#3b82f6" },
  { category: "Others", amount: "₹ 13,390", amountNum: 13390, barWidth: 9.2, barColor: "#ec4899" },
];

const MESS_QUICK_ACTIONS = [
  {
    label: "Add Menu",
    icon: "UtensilsCrossed",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    label: "Record Attendance",
    icon: "Users",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    label: "Add Expense",
    icon: "Receipt",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Collection Entry",
    icon: "Wallet",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Generate Report",
    icon: "FileText",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

const WEEKLY_MENU_PLAN = {
  title: "18 May - 24 May 2025",
  days: [
    {
      day: "Sun",
      date: "18 May",
      dayNum: 18,
      monthNum: 4,
      year: 2025,
      breakfast: "Idli, Sambar, Tea",
      lunch: "Rice, Dal, Veg Curry",
      dinner: "Chapathi, Paneer Curry",
      isCurrent: true,
    },
    {
      day: "Mon",
      date: "19 May",
      dayNum: 19,
      monthNum: 4,
      year: 2025,
      breakfast: "Pongal, Chutney, Tea",
      lunch: "Jeera Rice, Rajma, Salad",
      dinner: "Chapathi, Mixed Veg",
      isCurrent: false,
    },
    {
      day: "Tue",
      date: "20 May",
      dayNum: 20,
      monthNum: 4,
      year: 2025,
      breakfast: "Upma, Chutney, Tea",
      lunch: "Rice, Sambar, Poriyal, Curd",
      dinner: "Chapathi, Dal Tadka",
      isCurrent: false,
    },
    {
      day: "Wed",
      date: "21 May",
      dayNum: 21,
      monthNum: 4,
      year: 2025,
      breakfast: "Poha, Tea",
      lunch: "Veg Pulao, Raita, Salad",
      dinner: "Chapathi, Chole",
      isCurrent: false,
    },
    {
      day: "Thu",
      date: "22 May",
      dayNum: 22,
      monthNum: 4,
      year: 2025,
      breakfast: "Idli, Sambar, Tea",
      lunch: "Lemon Rice, Curd, Salad",
      dinner: "Veg Noodles",
      isCurrent: false,
    },
    {
      day: "Fri",
      date: "23 May",
      dayNum: 23,
      monthNum: 4,
      year: 2025,
      breakfast: "Paratha, Pickle, Tea",
      lunch: "Rice, Dal Fry, Sabji, Salad",
      dinner: "Chapathi, Aloo Gobi",
      isCurrent: false,
    },
    {
      day: "Sat",
      date: "24 May",
      dayNum: 24,
      monthNum: 4,
      year: 2025,
      breakfast: "Upma, Chutney, Tea",
      lunch: "Veg Biryani, Raita",
      dinner: "Chapathi, Kadai Paneer",
      isCurrent: false,
    },
  ],
};

const MEAL_TYPE_OPTIONS = ["All Meals", "Breakfast", "Lunch", "Dinner"];

const MENU_TYPE_OPTIONS = ["All", "Regular", "Special", "Festival", "Diet"];

const BLOCK_FILTER_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C", "Block D"];

const STATUS_FILTER_OPTIONS = ["All", "Served", "Upcoming", "Scheduled", "Cancelled"];

const MESS_BLOCK_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C", "Block D"];

const ADD_MENU_MEAL_TYPE_OPTIONS = ["Breakfast", "Lunch", "Dinner"];

const ADD_MENU_MENU_TYPE_OPTIONS = ["Regular", "Special", "Festival", "Diet"];

const ADD_MENU_BLOCK_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C", "Block D"];

const ADD_MENU_STATUS_OPTIONS = ["Scheduled", "Served", "Upcoming", "Cancelled"];

const MEAL_TIMEFRAME_OPTIONS = ["Today", "Yesterday", "This Week", "This Month"];

const showToast = (message: string) => {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
};

export default function MessManagementPage() {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [viewMenuPlanOpen, setViewMenuPlanOpen] = useState(false);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [mealDetails, setMealDetails] = useState<MealRow | null>(null);
  const [allExpensesOpen, setAllExpensesOpen] = useState(false);
  const [allCollectionsOpen, setAllCollectionsOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("Today");

  const [filters, setFilters] = useState({
    date: "18/05/2025",
    mealType: "All Meals",
    menuType: "All",
    block: "All Blocks",
    status: "All",
  });

  const handleFilter = useCallback(() => {
    showToast("Filters applied");
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      date: "18/05/2025",
      mealType: "All Meals",
      menuType: "All",
      block: "All Blocks",
      status: "All",
    });
    showToast("Filters reset");
  }, []);

  const handleAddMenuSave = useCallback(
    (data: {
      date: string;
      mealType: string;
      menuType: string;
      menuItems: string;
      startTime: string;
      endTime: string;
      block: string;
      status: string;
      notes: string;
    }) => {
      showToast("Menu added successfully");
    },
    []
  );

  const handleQuickAction = useCallback((action: QuickActionItem) => {
    switch (action.label) {
      case "Add Menu":
        setAddMenuOpen(true);
        break;
      case "Record Attendance":
        setAttendanceOpen(true);
        break;
      case "Add Expense":
        setExpenseOpen(true);
        break;
      case "Collection Entry":
        setCollectionOpen(true);
        break;
      case "Generate Report":
        setReportOpen(true);
        break;
      default:
        showToast(`${action.label} workflow will be connected to the backend in the integration phase.`);
    }
  }, []);

  const handleDayClick = useCallback((day: WeeklyMenuDay) => {
    showToast(`${day.day}, ${day.date} menu selected`);
  }, []);

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <MessManagementPageHeader
            onAddClick={() => setAddMenuOpen(true)}
            onViewMenuPlan={() => setViewMenuPlanOpen(true)}
            onMoreOptions={() => setMoreOptionsOpen(true)}
          />

          <MessManagementSummaryCards cards={MESS_SUMMARY_CARDS} />

          <MessManagementFilters
            date={filters.date}
            mealType={filters.mealType}
            menuType={filters.menuType}
            block={filters.block}
            status={filters.status}
            onDateChange={(date) => setFilters((prev) => ({ ...prev, date }))}
            onMealTypeChange={(mealType) => setFilters((prev) => ({ ...prev, mealType }))}
            onMenuTypeChange={(menuType) => setFilters((prev) => ({ ...prev, menuType }))}
            onBlockChange={(block) => setFilters((prev) => ({ ...prev, block }))}
            onStatusChange={(status) => setFilters((prev) => ({ ...prev, status }))}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
            <div className="xl:col-span-7">
              <TodaysMenuCard rows={TODAYS_MENU} onRowClick={setMealDetails} />
            </div>
            <div className="xl:col-span-5">
              <MealsServedTodayChart
                segments={MEALS_SERVED_TODAY}
                total={MEALS_SERVED_TOTAL}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
            <div className="xl:col-span-6">
              <RecentMessExpensesCard rows={RECENT_EXPENSES} onViewAll={() => setAllExpensesOpen(true)} />
            </div>
            <div className="xl:col-span-6">
              <RecentMessCollectionsCard rows={RECENT_COLLECTIONS} onViewAll={() => setAllCollectionsOpen(true)} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <MessMonthlySummaryCard rows={MESS_SUMMARY_ROWS} month="May 2025" />
            </div>
            <div className="lg:col-span-1">
              <TopExpenseHeadsCard rows={TOP_EXPENSE_HEADS} month="May 2025" />
            </div>
            <div className="lg:col-span-1">
              <MessQuickActionsCard actions={MESS_QUICK_ACTIONS} onAction={handleQuickAction} />
            </div>
          </div>

          <WeeklyMenuPlan plan={WEEKLY_MENU_PLAN} onViewFull={() => setViewMenuPlanOpen(true)} onDayClick={handleDayClick} />

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddMenuDialog open={addMenuOpen} onClose={() => setAddMenuOpen(false)} onSave={handleAddMenuSave} />
      <MealAttendanceDialog open={attendanceOpen} onClose={() => setAttendanceOpen(false)} onSave={() => {}} />
      <MessExpenseDialog open={expenseOpen} onClose={() => setExpenseOpen(false)} onSave={() => {}} />
      <CollectionEntryDialog open={collectionOpen} onClose={() => setCollectionOpen(false)} onSave={() => {}} />
      <MessReportDialog open={reportOpen} onClose={() => setReportOpen(false)} />
      <FullMenuPlanDialog open={viewMenuPlanOpen} onClose={() => setViewMenuPlanOpen(false)} plan={WEEKLY_MENU_PLAN} />
      <MealDetailsDialog open={!!mealDetails} onClose={() => setMealDetails(null)} row={mealDetails} />
      <ViewAllExpensesDialog open={allExpensesOpen} onClose={() => setAllExpensesOpen(false)} rows={RECENT_EXPENSES} />
      <ViewAllCollectionsDialog open={allCollectionsOpen} onClose={() => setAllCollectionsOpen(false)} rows={RECENT_COLLECTIONS} />

      {moreOptionsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMoreOptionsOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">More Options</h3>
              <button
                onClick={() => setMoreOptionsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Mess view exported successfully");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Export Mess View
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Print dialog opened");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Print Current Menu
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Mess Settings coming soon");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Mess Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
