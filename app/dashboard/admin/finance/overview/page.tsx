"use client";

import { useState } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import FinanceOverviewPageHeader from "@/components/dashboard/finance/FinanceOverviewPageHeader";
import FinanceSummaryCards from "@/components/dashboard/finance/FinanceSummaryCards";
import FinanceFilters from "@/components/dashboard/finance/FinanceFilters";
import FeeCollectionSummaryChart from "@/components/dashboard/finance/FeeCollectionSummaryChart";
import IncomeExpenseChart from "@/components/dashboard/finance/IncomeExpenseChart";
import FeeCollectionByTypeChart from "@/components/dashboard/finance/FeeCollectionByTypeChart";
import RecentTransactionsTable from "@/components/dashboard/finance/RecentTransactionsTable";
import OutstandingFeeSummary from "@/components/dashboard/finance/OutstandingFeeSummary";
import FinanceQuickActions from "@/components/dashboard/finance/FinanceQuickActions";
import FinanceBalanceCards from "@/components/dashboard/finance/FinanceBalanceCards";
import AddTransactionDialog from "@/components/dashboard/finance/AddTransactionDialog";
import TransactionDetailsDialog from "@/components/dashboard/finance/TransactionDetailsDialog";
import FinanceActionDialog from "@/components/dashboard/finance/FinanceActionDialog";
import {
  SUMMARY_CARDS,
  BALANCE_CARDS,
  FINANCE_TRANSACTIONS,
  OUTSTANDING_SUMMARY,
  QUICK_ACTIONS,
} from "@/lib/fixtures/finance-overview-reference-fixture";
import type { FinanceTransaction } from "@/lib/fixtures/finance-overview-reference-fixture";

export default function FinanceOverviewPage() {
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(FINANCE_TRANSACTIONS);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewTransaction, setViewTransaction] = useState<FinanceTransaction | null>(null);
  const [actionDialog, setActionDialog] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: "",
    message: "",
  });
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const handleAddTransaction = (newTx: FinanceTransaction) => {
    setTransactions((prev) => [newTx, ...prev]);
    setAddDialogOpen(false);
    showToast("Transaction added successfully");
  };

  const handleViewDetails = (tx: FinanceTransaction) => {
    setViewTransaction(tx);
  };

  const handleQuickAction = (action: string) => {
    setActionDialog({
      open: true,
      title: action,
      message: `The "${action}" workflow will be connected to the backend in the integration phase.`,
    });
  };

  const handleMoreOptions = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Additional finance management options will be available here in a future update.",
    });
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <FinanceOverviewPageHeader
            onAddTransaction={() => setAddDialogOpen(true)}
            onMoreOptions={handleMoreOptions}
          />

          <FinanceSummaryCards cards={SUMMARY_CARDS} />

          <FinanceFilters />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <FeeCollectionSummaryChart />
            <IncomeExpenseChart />
            <FeeCollectionByTypeChart />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <RecentTransactionsTable
                rows={transactions}
                onView={handleViewDetails}
                onViewAll={() =>
                  setActionDialog({
                    open: true,
                    title: "All Transactions",
                    message: "A full transactions list view will be available here in a future update.",
                  })
                }
              />
            </div>
            <div className="space-y-6">
              <OutstandingFeeSummary
                data={OUTSTANDING_SUMMARY}
                onViewAll={() =>
                  setActionDialog({
                    open: true,
                    title: "Outstanding Fees",
                    message: "A detailed outstanding fees report will be available here in a future update.",
                  })
                }
                onSendReminders={() =>
                  setActionDialog({
                    open: true,
                    title: "Send Fee Reminders",
                    message: "Fee reminders have been queued for sending. This will connect to the backend in the integration phase.",
                  })
                }
              />
              <FinanceQuickActions onAction={handleQuickAction} />
            </div>
          </div>

          <FinanceBalanceCards cards={BALANCE_CARDS} />

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

      <TransactionDetailsDialog
        open={!!viewTransaction}
        onClose={() => setViewTransaction(null)}
        transaction={viewTransaction}
      />

      <FinanceActionDialog
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
