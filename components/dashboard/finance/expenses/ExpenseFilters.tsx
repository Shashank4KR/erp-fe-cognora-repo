"use client";

import { useState } from "react";
import { Filter, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import ExpenseDateRangePicker from "@/components/dashboard/finance/expenses/ExpenseDateRangePicker";

const FINANCIAL_YEAR_OPTIONS = ["2024-25", "2025-26"];
const DEPARTMENT_OPTIONS = ["All Departments", "Administration", "Computer Science", "Electronics", "Mechanical", "Management", "NSS"];
const EXPENSE_CATEGORY_OPTIONS = ["All Categories", "Academic Expenses", "Office Expenses", "Utilities", "Maintenance", "Other Expenses"];
const PAYMENT_MODE_OPTIONS = ["All Modes", "UPI", "Bank Transfer", "Net Banking", "Cash"];
const STATUS_OPTIONS = ["All Status", "Approved", "Pending", "Rejected"];

interface ExpenseFiltersProps {
  financialYear: string;
  onFinancialYearChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  paymentMode: string;
  onPaymentModeChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function ExpenseFilters({
  financialYear,
  onFinancialYearChange,
  department,
  onDepartmentChange,
  category,
  onCategoryChange,
  paymentMode,
  onPaymentModeChange,
  dateRange,
  onDateRangeChange,
  search,
  onSearchChange,
  onFilter,
  onReset,
}: ExpenseFiltersProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 items-end gap-3">
          <Dropdown
            label="Financial Year"
            value={financialYear}
            options={FINANCIAL_YEAR_OPTIONS}
            onChange={onFinancialYearChange}
          />
          <Dropdown
            label="Department"
            value={department}
            options={DEPARTMENT_OPTIONS}
            onChange={onDepartmentChange}
          />
          <Dropdown
            label="Expense Category"
            value={category}
            options={EXPENSE_CATEGORY_OPTIONS}
            onChange={onCategoryChange}
          />
          <Dropdown
            label="Payment Mode"
            value={paymentMode}
            options={PAYMENT_MODE_OPTIONS}
            onChange={onPaymentModeChange}
          />
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Date Range</label>
            <ExpenseDateRangePicker value={dateRange} onChange={onDateRangeChange} />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by expense name, ref no..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setFilterPanelOpen((open) => !open)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-3 py-2 text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition whitespace-nowrap h-10 w-full"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {filterPanelOpen && (
        <div className="mt-3 bg-white rounded-lg border border-slate-200 p-4 relative">
          <button
            type="button"
            onClick={() => setFilterPanelOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-xs font-semibold text-slate-700 mb-3">Additional Filters</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">Status</label>
              <Dropdown
                value="All Status"
                options={STATUS_OPTIONS}
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">Department</label>
              <Dropdown
                value={department}
                options={DEPARTMENT_OPTIONS}
                onChange={onDepartmentChange}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">Payment Mode</label>
              <Dropdown
                value={paymentMode}
                options={PAYMENT_MODE_OPTIONS}
                onChange={onPaymentModeChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterPanelOpen(false);
                onFilter();
              }}
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
