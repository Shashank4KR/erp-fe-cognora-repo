"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import ExpensesPageHeader from "@/components/dashboard/finance/expenses/ExpensesPageHeader";
import ExpenseSummaryCards from "@/components/dashboard/finance/expenses/ExpenseSummaryCards";
import ExpenseFilters from "@/components/dashboard/finance/expenses/ExpenseFilters";
import ExpensesList from "@/components/dashboard/finance/expenses/ExpensesList";
import TopExpenseCategories from "@/components/dashboard/finance/expenses/TopExpenseCategories";
import BudgetVsActual from "@/components/dashboard/finance/expenses/BudgetVsActual";
import ExpensePaymentModeChart from "@/components/dashboard/finance/expenses/ExpensePaymentModeChart";
import RecentExpenseActivities from "@/components/dashboard/finance/expenses/RecentExpenseActivities";
import ExpenseQuickActions from "@/components/dashboard/finance/expenses/ExpenseQuickActions";
import AddExpenseDialog from "@/components/dashboard/finance/expenses/AddExpenseDialog";
import ImportExpensesDialog from "@/components/dashboard/finance/expenses/ImportExpensesDialog";
import ExpenseDetailsDialog from "@/components/dashboard/finance/expenses/ExpenseDetailsDialog";
import ExpenseActionDialog from "@/components/dashboard/finance/expenses/ExpenseActionDialog";
import {
  EXPENSES,
  SUMMARY_CARDS,
  TOP_EXPENSE_CATEGORIES,
  BUDGET_VS_ACTUAL,
  BUDGET_UTILIZATION,
  PAYMENT_MODE_SEGMENTS,
  PAYMENT_MODE_TOTAL,
  RECENT_ACTIVITIES,
  EXPENSE_QUICK_ACTIONS,
  TOTAL_EXPENSES_COUNT,
} from "@/lib/fixtures/expenses-management-reference-fixture";
import type { Expense } from "@/lib/fixtures/expenses-management-reference-fixture";

export default function ExpensesManagementPage() {
  const [expenses, setExpenses] = useState<Expense[]>(EXPENSES);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [viewExpense, setViewExpense] = useState<Expense | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    destructive?: boolean;
    showConfirm?: boolean;
  }>({
    open: false,
    title: "",
    message: "",
  });
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const [financialYear, setFinancialYear] = useState("2024-25");
  const [department, setDepartment] = useState("All Departments");
  const [category, setCategory] = useState("All Categories");
  const [paymentMode, setPaymentMode] = useState("All Modes");
  const [dateRange, setDateRange] = useState("12 May 2025 - 18 May 2025");
  const [search, setSearch] = useState("");

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    showToast("Expense added successfully");
  };

  const handleViewExpense = (expense: Expense) => {
    setViewExpense(expense);
  };

  const handleDownload = (expense: Expense) => {
    showToast(`Expense voucher for ${expense.expenseId} generated`);
  };

  const handleMoreOptions = (expense: Expense) => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: `Actions for ${expense.expenseId}: Edit Expense, Submit for Approval, Approve, Reject, Duplicate, Delete.`,
      showConfirm: false,
    });
  };

  const handlePageAction = (action: string) => {
    setActionDialog({
      open: true,
      title: action,
      message: `The "${action}" workflow will be connected to the backend in the integration phase.`,
      showConfirm: false,
    });
  };

  const handleQuickAction = (action: string) => {
    setActionDialog({
      open: true,
      title: action,
      message: `The "${action}" workflow will be connected to the backend in the integration phase.`,
      showConfirm: false,
    });
  };

  const handleThreeDotMenu = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Export Current View, Print Expenses Register, and Expense Settings will be available here.",
      showConfirm: false,
    });
  };

  const handleRowAction = (expense: Expense, action: string) => {
    if (action === "Delete" || action === "Reject") {
      setActionDialog({
        open: true,
        title: action === "Delete" ? "Delete Expense" : "Reject Expense",
        message: `Are you sure you want to ${action.toLowerCase()} expense ${expense.expenseId}?`,
        confirmText: action,
        destructive: action === "Delete",
        showConfirm: true,
        onConfirm: () => {
          if (action === "Delete") {
            setExpenses((prev) => prev.filter((e) => e.id !== expense.id));
            showToast(`Expense ${expense.expenseId} deleted`);
          } else {
            setExpenses((prev) =>
              prev.map((e) => (e.id === expense.id ? { ...e, status: "Rejected" as const } : e))
            );
            showToast(`Expense ${expense.expenseId} rejected`);
          }
        },
      });
    } else if (action === "Edit") {
      setActionDialog({
        open: true,
        title: "Edit Expense",
        message: `Editing expense ${expense.expenseId}. This will connect to the backend in the integration phase.`,
        showConfirm: false,
      });
    } else if (action === "Approve") {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? { ...e, status: "Approved" as const } : e))
      );
      showToast(`Expense ${expense.expenseId} approved`);
    } else if (action === "Submit for Approval") {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? { ...e, status: "Pending" as const } : e))
      );
      showToast(`Expense ${expense.expenseId} submitted for approval`);
    } else if (action === "Duplicate") {
      const duplicated: Expense = {
        ...expense,
        id: crypto.randomUUID(),
        expenseId: `EXP${Date.now().toString().slice(-6)}`,
        status: "Pending",
      };
      setExpenses((prev) => [duplicated, ...prev]);
      showToast(`Expense ${expense.expenseId} duplicated`);
    } else {
      setActionDialog({
        open: true,
        title: action,
        message: `The "${action}" action for ${expense.expenseId} will be connected to the backend in the integration phase.`,
        showConfirm: false,
      });
    }
  };

  const handleImport = (file: File) => {
    showToast(`${file.name} imported successfully`);
  };

  const handleFilter = () => {
    showToast("Filters applied");
  };

  const handleReset = () => {
    setFinancialYear("2024-25");
    setDepartment("All Departments");
    setCategory("All Categories");
    setPaymentMode("All Modes");
    setDateRange("12 May 2025 - 18 May 2025");
    setSearch("");
  };

  const handleViewAllActivities = () => {
    setActionDialog({
      open: true,
      title: "All Activities",
      message: "A full activity history view will be available here in a future update.",
      showConfirm: false,
    });
  };

  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    if (department !== "All Departments") {
      result = result.filter((e) => e.department === department);
    }
    if (category !== "All Categories") {
      result = result.filter((e) => e.category === category);
    }
    if (paymentMode !== "All Modes") {
      result = result.filter((e) => e.paymentMode === paymentMode);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.expenseId.toLowerCase().includes(q) ||
          e.expenseName.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          e.paymentMode.toLowerCase().includes(q) ||
          e.status.toLowerCase().includes(q)
      );
    }

    return result;
  }, [expenses, department, category, paymentMode, search]);

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <ExpensesPageHeader
            onAddExpense={() => setAddDialogOpen(true)}
            onImportExpenses={() => setImportDialogOpen(true)}
            onMoreOptions={handleThreeDotMenu}
          />

          <ExpenseSummaryCards cards={SUMMARY_CARDS} />

          <ExpenseFilters
            financialYear={financialYear}
            onFinancialYearChange={setFinancialYear}
            department={department}
            onDepartmentChange={setDepartment}
            category={category}
            onCategoryChange={setCategory}
            paymentMode={paymentMode}
            onPaymentModeChange={setPaymentMode}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            search={search}
            onSearchChange={setSearch}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <ExpensesList
            expenses={filteredExpenses}
            onView={handleViewExpense}
            onDownload={handleDownload}
            onAction={handleRowAction}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <TopExpenseCategories data={TOP_EXPENSE_CATEGORIES} />
            <BudgetVsActual data={BUDGET_VS_ACTUAL} utilization={BUDGET_UTILIZATION} />
            <ExpensePaymentModeChart segments={PAYMENT_MODE_SEGMENTS} total={PAYMENT_MODE_TOTAL} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RecentExpenseActivities items={RECENT_ACTIVITIES} onViewAll={handleViewAllActivities} />
            <ExpenseQuickActions items={EXPENSE_QUICK_ACTIONS} onAction={handleQuickAction} />
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddExpenseDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddExpense}
      />

      <ImportExpensesDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
      />

      <ExpenseDetailsDialog
        open={!!viewExpense}
        onClose={() => setViewExpense(null)}
        expense={viewExpense}
      />

      <ExpenseActionDialog
        open={actionDialog.open}
        onClose={() =>
          setActionDialog({ open: false, title: "", message: "", showConfirm: false })
        }
        title={actionDialog.title}
        message={actionDialog.message}
        onConfirm={actionDialog.onConfirm}
        confirmText={actionDialog.confirmText}
        showConfirm={actionDialog.showConfirm}
        destructive={actionDialog.destructive}
      />

      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl">
          {toast.message}
        </div>
      )}
    </MainLayout>
  );
}
