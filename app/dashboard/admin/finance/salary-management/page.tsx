"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import SalaryManagementPageHeader from "@/components/dashboard/finance/salary-management/SalaryManagementPageHeader";
import SalarySummaryCards from "@/components/dashboard/finance/salary-management/SalarySummaryCards";
import SalaryFilters from "@/components/dashboard/finance/salary-management/SalaryFilters";
import EmployeeSalaryOverview from "@/components/dashboard/finance/salary-management/EmployeeSalaryOverview";
import PayrollSummaryChart from "@/components/dashboard/finance/salary-management/PayrollSummaryChart";
import SalaryComponentsCard from "@/components/dashboard/finance/salary-management/SalaryComponentsCard";
import SalaryQuickActions from "@/components/dashboard/finance/salary-management/SalaryQuickActions";
import PayrollTrendChart from "@/components/dashboard/finance/salary-management/PayrollTrendChart";
import TopDepartmentsByPayroll from "@/components/dashboard/finance/salary-management/TopDepartmentsByPayroll";
import RecentSalaryActivities from "@/components/dashboard/finance/salary-management/RecentSalaryActivities";
import MonthlySalarySummaryCards from "@/components/dashboard/finance/salary-management/MonthlySalarySummaryCards";
import AddSalaryDialog from "@/components/dashboard/finance/salary-management/AddSalaryDialog";
import ImportSalariesDialog from "@/components/dashboard/finance/salary-management/ImportSalariesDialog";
import SalaryDetailsDialog from "@/components/dashboard/finance/salary-management/SalaryDetailsDialog";
import SalaryActionDialog from "@/components/dashboard/finance/salary-management/SalaryActionDialog";
import {
  SALARY_ROWS,
  SALARY_SUMMARY_CARDS,
  RECENT_ACTIVITIES,
} from "@/lib/fixtures/salary-management-reference-fixture";
import type { SalaryRow } from "@/lib/fixtures/salary-management-reference-fixture";

export default function SalaryManagementPage() {
  const [salaries, setSalaries] = useState<SalaryRow[]>(SALARY_ROWS);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [viewSalary, setViewSalary] = useState<SalaryRow | null>(null);
  const [actionDialog, setActionDialog] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: "",
    message: "",
  });
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const [month, setMonth] = useState("May 2025");
  const [department, setDepartment] = useState("All Departments");
  const [employeeType, setEmployeeType] = useState("All Types");
  const [designation, setDesignation] = useState("All Designations");
  const [paymentStatus, setPaymentStatus] = useState("All Status");
  const [search, setSearch] = useState("");

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const handleAddSalary = (newSalary: SalaryRow) => {
    setSalaries((prev) => [newSalary, ...prev]);
    showToast("Salary added successfully");
  };

  const handleViewSalary = (salary: SalaryRow) => {
    setViewSalary(salary);
  };

  const handleDownload = (salary: SalaryRow) => {
    showToast(`Payslip for ${salary.employeeId} downloaded`);
  };

  const handleMoreOptions = (salary: SalaryRow) => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: `Actions for ${salary.employeeId}: Edit Salary, Generate Payslip, Record Payment, Add Allowance, Add Deduction, View Salary History.`,
    });
  };

  const handlePageAction = (action: string) => {
    setActionDialog({
      open: true,
      title: action,
      message: `The "${action}" workflow will be connected to the backend in the integration phase.`,
    });
  };

  const handleQuickAction = (action: string) => {
    setActionDialog({
      open: true,
      title: action,
      message: `The "${action}" workflow will be connected to the backend in the integration phase.`,
    });
  };

  const handleThreeDotMenu = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Export Payroll View, Print Salary Register, and Payroll Settings will be available here.",
    });
  };

  const handleImport = (file: File) => {
    showToast(`${file.name} imported successfully`);
  };

  const handleFilter = () => {
    showToast("Filters applied");
  };

  const handleReset = () => {
    setMonth("May 2025");
    setDepartment("All Departments");
    setEmployeeType("All Types");
    setDesignation("All Designations");
    setPaymentStatus("All Status");
    setSearch("");
  };

  const filteredSalaries = useMemo(() => {
    let result = [...salaries];

    if (department !== "All Departments") {
      result = result.filter((s) => s.department === department);
    }
    if (employeeType !== "All Types") {
      result = result.filter((s) => s.employeeType === employeeType);
    }
    if (designation !== "All Designations") {
      result = result.filter((s) => s.designation === designation);
    }
    if (paymentStatus !== "All Status") {
      result = result.filter((s) => s.status === paymentStatus);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((s) =>
        s.employeeName.toLowerCase().includes(q) ||
        s.employeeId.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.designation.toLowerCase().includes(q) ||
        s.status.toLowerCase().includes(q)
      );
    }

    return result;
  }, [salaries, department, employeeType, designation, paymentStatus, search]);

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <SalaryManagementPageHeader
            onAddSalary={() => setAddDialogOpen(true)}
            onImportSalaries={() => setImportDialogOpen(true)}
            onMoreOptions={handleThreeDotMenu}
          />

          <SalarySummaryCards cards={SALARY_SUMMARY_CARDS} />

          <SalaryFilters
            month={month}
            onMonthChange={setMonth}
            department={department}
            onDepartmentChange={setDepartment}
            employeeType={employeeType}
            onEmployeeTypeChange={setEmployeeType}
            designation={designation}
            onDesignationChange={setDesignation}
            paymentStatus={paymentStatus}
            onPaymentStatusChange={setPaymentStatus}
            search={search}
            onSearchChange={setSearch}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <EmployeeSalaryOverview
                rows={filteredSalaries}
                onView={handleViewSalary}
                onDownload={handleDownload}
                onMore={handleMoreOptions}
                originalTotal={128}
              />
            </div>
            <div className="space-y-6">
              <PayrollSummaryChart />
              <SalaryComponentsCard />
              <SalaryQuickActions onAction={handleQuickAction} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PayrollTrendChart />
            <TopDepartmentsByPayroll />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RecentSalaryActivities items={RECENT_ACTIVITIES} />
            <MonthlySalarySummaryCards />
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddSalaryDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddSalary}
      />

      <ImportSalariesDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
      />

      <SalaryDetailsDialog
        open={!!viewSalary}
        onClose={() => setViewSalary(null)}
        salary={viewSalary}
      />

      <SalaryActionDialog
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
