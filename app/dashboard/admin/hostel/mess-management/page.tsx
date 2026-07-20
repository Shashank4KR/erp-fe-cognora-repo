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

import {
  MESS_SUMMARY_CARDS,
  TODAYS_MENU,
  MEALS_SERVED_TODAY,
  MEALS_SERVED_TOTAL,
  RECENT_EXPENSES,
  RECENT_COLLECTIONS,
  MESS_SUMMARY_ROWS,
  TOP_EXPENSE_HEADS,
  MESS_QUICK_ACTIONS,
  WEEKLY_MENU_PLAN,
} from "@/lib/fixtures/mess-management-reference-fixture";
import type { MealRow, QuickActionItem, WeeklyMenuDay } from "@/lib/fixtures/mess-management-reference-fixture";

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
