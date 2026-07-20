"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import TransactionsPageHeader from "@/components/dashboard/finance/TransactionsPageHeader";
import TransactionSummaryCards from "@/components/dashboard/finance/TransactionSummaryCards";
import TransactionFilters from "@/components/dashboard/finance/TransactionFilters";
import TransactionsTable from "@/components/dashboard/finance/TransactionsTable";
import TransactionPagination from "@/components/dashboard/finance/TransactionPagination";
import TransactionSummaryChart from "@/components/dashboard/finance/TransactionSummaryChart";
import PaymentModeSummary from "@/components/dashboard/finance/PaymentModeSummary";
import TransactionsQuickActions from "@/components/dashboard/finance/TransactionsQuickActions";
import IncomeExpenseTrendChart from "@/components/dashboard/finance/IncomeExpenseTrendChart";
import TopIncomeCategories from "@/components/dashboard/finance/TopIncomeCategories";
import RecentActivity from "@/components/dashboard/finance/RecentActivity";
import AddTransactionDialog from "@/components/dashboard/finance/AddTransactionDialog";
import ImportTransactionsDialog from "@/components/dashboard/finance/ImportTransactionsDialog";
import TransactionDetailsDialog from "@/components/dashboard/finance/TransactionDetailsDialog";
import TransactionActionDialog from "@/components/dashboard/finance/TransactionActionDialog";
import {
  TRANSACTIONS,
  TRANSACTION_SUMMARY_CARDS,
  PAYMENT_MODE_SUMMARY,
  QUICK_ACTIONS,
  RECENT_ACTIVITY,
} from "@/lib/fixtures/transactions-reference-fixture";
import type { TransactionRow } from "@/lib/fixtures/transactions-reference-fixture";

const ITEMS_PER_PAGE = 10;

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionRow[]>(TRANSACTIONS);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [viewTransaction, setViewTransaction] = useState<TransactionRow | null>(null);
  const [actionDialog, setActionDialog] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: "",
    message: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionType, setTransactionType] = useState("All Types");
  const [paymentMode, setPaymentMode] = useState("All Modes");
  const [dateRange, setDateRange] = useState("12 May 2025 - 18 May 2025");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (transactionType !== "All Types") {
      result = result.filter((t) => t.type === transactionType);
    }
    if (paymentMode !== "All Modes") {
      result = result.filter((t) => t.paymentMode === paymentMode);
    }
    if (status !== "All Status") {
      result = result.filter((t) => t.status === status);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) =>
        t.receiptRefNo.toLowerCase().includes(q) ||
        t.studentName.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.paymentMode.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      );
    }

    const totalPages = Math.max(1, Math.ceil(result.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    const paginated = result.slice(start, start + ITEMS_PER_PAGE);

    return { paginated, totalPages, total: result.length, originalTotal: 2584 };
  }, [transactions, transactionType, paymentMode, status, search, currentPage]);

  const handleAddTransaction = (newTx: TransactionRow) => {
    setTransactions((prev) => [newTx, ...prev]);
    setAddDialogOpen(false);
    showToast("Transaction added successfully");
    setCurrentPage(1);
  };

  const handleViewDetails = (tx: TransactionRow) => {
    setViewTransaction(tx);
  };

  const handleDownload = (tx: TransactionRow) => {
    showToast(`Receipt ${tx.receiptRefNo} downloaded`);
  };

  const handleMoreOptions = (tx: TransactionRow) => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: `Actions for ${tx.receiptRefNo}: Edit Transaction, Print Receipt, Duplicate, Mark Pending, or Delete.`,
    });
  };

  const handlePageAction = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, filteredTransactions.totalPages)));
  };

  const handleQuickAction = (label: string) => {
    setActionDialog({
      open: true,
      title: label,
      message: `The "${label}" workflow will be connected to the backend in the integration phase.`,
    });
  };

  const handleThreeDotMenu = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Export Current View, Print Transactions, and Transaction Settings will be available here.",
    });
  };

  const handleImport = (file: File) => {
    showToast(`${file.name} imported successfully`);
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <TransactionsPageHeader
            onAddTransaction={() => setAddDialogOpen(true)}
            onImportTransactions={() => setImportDialogOpen(true)}
            onMoreOptions={handleThreeDotMenu}
          />

          <TransactionSummaryCards cards={TRANSACTION_SUMMARY_CARDS} />

          <TransactionFilters
            transactionType={transactionType}
            onTransactionTypeChange={setTransactionType}
            paymentMode={paymentMode}
            onPaymentModeChange={setPaymentMode}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            status={status}
            onStatusChange={setStatus}
            search={search}
            onSearchChange={setSearch}
            onFilter={() => showToast("Filters applied")}
            onReset={() => {
              setTransactionType("All Types");
              setPaymentMode("All Modes");
              setStatus("All Status");
              setSearch("");
              setDateRange("12 May 2025 - 18 May 2025");
              setCurrentPage(1);
            }}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2 space-y-6">
              <TransactionsTable
                rows={filteredTransactions.paginated}
                onView={handleViewDetails}
                onDownload={handleDownload}
                onMore={handleMoreOptions}
              />
              <TransactionPagination
                currentPage={currentPage}
                totalPages={filteredTransactions.totalPages}
                onPageChange={handlePageAction}
                totalItems={filteredTransactions.originalTotal}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
            <div className="space-y-6">
              <TransactionSummaryChart
                incomeAmount="₹ 1,24,80,000"
                incomePercentage="64.9%"
                expenseAmount="₹ 67,45,000"
                expensePercentage="35.1%"
                totalAmount="₹ 1,92,25,000"
              />
              <PaymentModeSummary rows={PAYMENT_MODE_SUMMARY} />
              <TransactionsQuickActions actions={QUICK_ACTIONS} onAction={handleQuickAction} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <IncomeExpenseTrendChart />
            </div>
            <div>
              <TopIncomeCategories />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-3">
              <RecentActivity
                items={RECENT_ACTIVITY}
                onViewAll={() =>
                  setActionDialog({
                    open: true,
                    title: "All Activities",
                    message: "A full activity history view will be available here in a future update.",
                  })
                }
              />
            </div>
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddTransactionDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddTransaction}
      />

      <ImportTransactionsDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
      />

      <TransactionDetailsDialog
        open={!!viewTransaction}
        onClose={() => setViewTransaction(null)}
        transaction={viewTransaction}
      />

      <TransactionActionDialog
        open={actionDialog.open}
        onClose={() => setActionDialog({ open: false, title: "", message: "" })}
        title={actionDialog.title}
        message={actionDialog.message}
        onConfirm={() => {
          showToast("Action completed successfully");
          setActionDialog({ open: false, title: "", message: "" });
        }}
      />

      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl">
          {toast.message}
        </div>
      )}
    </MainLayout>
  );
}
