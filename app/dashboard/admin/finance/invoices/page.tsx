"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import InvoicesPageHeader from "@/components/dashboard/finance/invoices/InvoicesPageHeader";
import InvoiceSummaryCards from "@/components/dashboard/finance/invoices/InvoiceSummaryCards";
import InvoiceFilters from "@/components/dashboard/finance/invoices/InvoiceFilters";
import InvoicesTable from "@/components/dashboard/finance/invoices/InvoicesTable";
import InvoicePagination from "@/components/dashboard/finance/invoices/InvoicePagination";
import InvoiceDetailsCard from "@/components/dashboard/finance/invoices/InvoiceDetailsCard";
import BalanceFeesOverview from "@/components/dashboard/finance/invoices/BalanceFeesOverview";
import InvoiceTrendChart from "@/components/dashboard/finance/invoices/InvoiceTrendChart";
import InvoicesByStatusChart from "@/components/dashboard/finance/invoices/InvoicesByStatusChart";
import TopInvoiceTypes from "@/components/dashboard/finance/invoices/TopInvoiceTypes";
import GenerateInvoiceDialog from "@/components/dashboard/finance/invoices/GenerateInvoiceDialog";
import ImportInvoicesDialog from "@/components/dashboard/finance/invoices/ImportInvoicesDialog";
import InvoiceActionDialog from "@/components/dashboard/finance/invoices/InvoiceActionDialog";
import {
  INVOICE_ROWS,
  INVOICE_SUMMARY_CARDS,
  INVOICE_STATUS_DATA,
} from "@/lib/fixtures/invoices-reference-fixture";
import type { InvoiceRow } from "@/lib/fixtures/invoices-reference-fixture";

const ITEMS_PER_PAGE = 10;

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>(INVOICE_ROWS);
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    destructive?: boolean;
  }>({ open: false, title: "", message: "", destructive: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [academicYear, setAcademicYear] = useState("2024-25");
  const [invoiceType, setInvoiceType] = useState("All Types");
  const [classGrade, setClassGrade] = useState("All Classes");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("12 May 2025 - 18 May 2025");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const filteredInvoices = useMemo(() => {
    let result = [...invoices];

    if (invoiceType !== "All Types") {
      result = result.filter((inv) => inv.invoiceType === invoiceType);
    }
    if (classGrade !== "All Classes") {
      result = result.filter((inv) => inv.classGrade === classGrade);
    }
    if (status !== "All Status") {
      result = result.filter((inv) => inv.status === status);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((inv) =>
        inv.invoiceNo.toLowerCase().includes(q) ||
        inv.studentName.toLowerCase().includes(q) ||
        inv.studentId.toLowerCase().includes(q) ||
        inv.invoiceType.toLowerCase().includes(q) ||
        inv.classGrade.toLowerCase().includes(q) ||
        inv.status.toLowerCase().includes(q) ||
        inv.dueDate.toLowerCase().includes(q)
      );
    }

    const totalPages = Math.max(1, Math.ceil(result.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    const paginated = result.slice(start, start + ITEMS_PER_PAGE);

    return { paginated, totalPages, total: result.length, originalTotal: INVOICE_STATUS_DATA.total };
  }, [invoices, invoiceType, classGrade, status, search, currentPage]);

  const handleGenerateInvoice = () => setGenerateDialogOpen(true);
  const handleImportInvoices = () => setImportDialogOpen(true);
  const handleMoreOptions = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Export Current View, Print Invoice Register, and Invoice Settings will be available here.",
    });
  };

  const handleSaveInvoice = (newInvoice: InvoiceRow) => {
    setInvoices((prev) => [newInvoice, ...prev]);
    setSelectedInvoice(newInvoice);
    showToast("Invoice created successfully");
    setCurrentPage(1);
  };

  const handleViewInvoice = (invoice: InvoiceRow) => {
    setSelectedInvoice(invoice);
  };

  const handleDownloadInvoice = (invoice: InvoiceRow) => {
    showToast(`Invoice ${invoice.invoiceNo} downloaded`);
  };

  const handleMoreActions = (invoice: InvoiceRow) => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: `Actions for ${invoice.invoiceNo}: Edit Invoice, Print Invoice, Record Payment, Duplicate Invoice, Cancel Invoice, or Delete Invoice.`,
      destructive: false,
    });
  };

  const handleDeleteInvoice = (invoice: InvoiceRow) => {
    setActionDialog({
      open: true,
      title: "Delete Invoice",
      message: `Are you sure you want to delete invoice ${invoice.invoiceNo}? This action cannot be undone.`,
      destructive: true,
    });
  };

  const handleActionConfirm = () => {
    showToast("Action completed successfully");
    setActionDialog({ open: false, title: "", message: "", destructive: false });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, filteredInvoices.totalPages)));
  };

  const handleFilter = () => {
    showToast("Filters applied");
  };

  const handleReset = () => {
    setAcademicYear("2024-25");
    setInvoiceType("All Types");
    setClassGrade("All Classes");
    setStatus("All Status");
    setDateRange("12 May 2025 - 18 May 2025");
    setSearch("");
    setCurrentPage(1);
  };

  const handleImport = (file: File) => {
    showToast(`${file.name} imported successfully`);
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <InvoicesPageHeader
            onGenerateInvoice={handleGenerateInvoice}
            onImportInvoices={handleImportInvoices}
            onMoreOptions={handleMoreOptions}
          />

          <InvoiceSummaryCards cards={INVOICE_SUMMARY_CARDS} />

          <InvoiceFilters
            academicYear={academicYear}
            onAcademicYearChange={setAcademicYear}
            invoiceType={invoiceType}
            onInvoiceTypeChange={setInvoiceType}
            classGrade={classGrade}
            onClassGradeChange={setClassGrade}
            status={status}
            onStatusChange={setStatus}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            search={search}
            onSearchChange={setSearch}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <InvoicesTable
                  rows={filteredInvoices.paginated}
                  onView={handleViewInvoice}
                  onDownload={handleDownloadInvoice}
                  onMore={handleMoreActions}
                />
                <InvoicePagination
                  currentPage={currentPage}
                  totalPages={filteredInvoices.totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredInvoices.originalTotal}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              </div>
            </div>
            <div className="space-y-6">
              <InvoiceDetailsCard invoice={selectedInvoice} />
              <BalanceFeesOverview />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <InvoiceTrendChart />
            </div>
            <div>
              <InvoicesByStatusChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-3">
              <TopInvoiceTypes />
            </div>
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <GenerateInvoiceDialog
        open={generateDialogOpen}
        onClose={() => setGenerateDialogOpen(false)}
        onSave={handleSaveInvoice}
      />

      <ImportInvoicesDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
      />

      <InvoiceActionDialog
        open={actionDialog.open}
        onClose={() => setActionDialog({ open: false, title: "", message: "", destructive: false })}
        title={actionDialog.title}
        message={actionDialog.message}
        onConfirm={handleActionConfirm}
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
