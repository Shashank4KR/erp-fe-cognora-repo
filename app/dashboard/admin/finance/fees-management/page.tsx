"use client";

import { useState } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import FeesManagementPageHeader from "@/components/dashboard/finance/FeesManagementPageHeader";
import FeesSummaryCards from "@/components/dashboard/finance/FeesSummaryCards";
import FeesManagementFilters from "@/components/dashboard/finance/FeesManagementFilters";
import FeesCollectionSummaryChart from "@/components/dashboard/finance/FeesCollectionSummaryChart";
import CollectionTrendChart from "@/components/dashboard/finance/CollectionTrendChart";
import FeeDueOverviewChart from "@/components/dashboard/finance/FeeDueOverviewChart";
import FeesDetailsTabs from "@/components/dashboard/finance/FeesDetailsTabs";
import FeeCollectionByTypeCard from "@/components/dashboard/finance/FeeCollectionByTypeCard";
import FeesQuickActions from "@/components/dashboard/finance/FeesQuickActions";
import FeesFooterCards from "@/components/dashboard/finance/FeesFooterCards";
import AddFeeCollectionDialog from "@/components/dashboard/finance/AddFeeCollectionDialog";
import FeesActionDialog from "@/components/dashboard/finance/FeesActionDialog";
import {
  SUMMARY_CARDS,
  FEE_COLLECTION_BY_TYPE,
  QUICK_ACTIONS,
} from "@/lib/fixtures/fees-management-reference-fixture";

export default function FeesManagementPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: "",
    message: "",
  });
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const [academicYear, setAcademicYear] = useState("2024-25");
  const [classGrade, setClassGrade] = useState("All Classes");
  const [feeType, setFeeType] = useState("All Fee Types");
  const [installment, setInstallment] = useState("All Installments");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("12 May 2025 - 18 May 2025");

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const handleAddCollection = () => {
    setAddDialogOpen(true);
  };

  const handleSaveCollection = (fee: {
    id: string;
    studentName: string;
    classGrade: string;
    feeType: string;
    installment: string;
    totalAmount: string;
    amountPaid: string;
    paymentMode: string;
    paymentDate: string;
    receiptNumber: string;
    status: string;
    notes: string;
  }) => {
    showToast("Fee collection added successfully");
  };

  const handleMoreOptions = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Additional fees management options will be available here in a future update.",
    });
  };

  const handleQuickAction = (action: string) => {
    setActionDialog({
      open: true,
      title: action,
      message: `The "${action}" workflow will be connected to the backend in the integration phase.`,
    });
  };

  const handleFilter = () => {
    showToast("Filters applied");
  };

  const handleReset = () => {
    setAcademicYear("2024-25");
    setClassGrade("All Classes");
    setFeeType("All Fee Types");
    setInstallment("All Installments");
    setStatus("All Status");
    setDateRange("12 May 2025 - 18 May 2025");
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <FeesManagementPageHeader
            onAddCollection={handleAddCollection}
            onMoreOptions={handleMoreOptions}
          />

          <FeesSummaryCards cards={SUMMARY_CARDS} />

          <FeesManagementFilters
            academicYear={academicYear}
            onAcademicYearChange={setAcademicYear}
            classGrade={classGrade}
            onClassGradeChange={setClassGrade}
            feeType={feeType}
            onFeeTypeChange={setFeeType}
            installment={installment}
            onInstallmentChange={setInstallment}
            status={status}
            onStatusChange={setStatus}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <FeesCollectionSummaryChart />
            <CollectionTrendChart />
            <FeeDueOverviewChart />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <FeesDetailsTabs />
            </div>
            <div className="space-y-6">
              <FeeCollectionByTypeCard />
              <FeesQuickActions onAction={handleQuickAction} />
            </div>
          </div>

          <FeesFooterCards />

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddFeeCollectionDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleSaveCollection}
      />

      <FeesActionDialog
        open={actionDialog.open}
        onClose={() => setActionDialog({ open: false, title: "", message: "" })}
        title={actionDialog.title}
        message={actionDialog.message}
      />

      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl">
          {toast.message}
        </div>
      )}
    </MainLayout>
  );
}
