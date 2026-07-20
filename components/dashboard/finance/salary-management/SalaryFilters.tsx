"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import {
  MONTH_OPTIONS,
  DEPARTMENT_OPTIONS,
  EMPLOYEE_TYPE_OPTIONS,
  DESIGNATION_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
} from "@/lib/fixtures/salary-management-reference-fixture";

interface SalaryFiltersProps {
  month: string;
  onMonthChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  employeeType: string;
  onEmployeeTypeChange: (value: string) => void;
  designation: string;
  onDesignationChange: (value: string) => void;
  paymentStatus: string;
  onPaymentStatusChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function SalaryFilters({
  month,
  onMonthChange,
  department,
  onDepartmentChange,
  employeeType,
  onEmployeeTypeChange,
  designation,
  onDesignationChange,
  paymentStatus,
  onPaymentStatusChange,
  search,
  onSearchChange,
  onFilter,
  onReset,
}: SalaryFiltersProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 items-end gap-3">
          <Dropdown
            label="Month"
            value={month}
            options={MONTH_OPTIONS}
            onChange={onMonthChange}
          />
          <Dropdown
            label="Department"
            value={department}
            options={DEPARTMENT_OPTIONS}
            onChange={onDepartmentChange}
          />
          <Dropdown
            label="Employee Type"
            value={employeeType}
            options={EMPLOYEE_TYPE_OPTIONS}
            onChange={onEmployeeTypeChange}
          />
          <Dropdown
            label="Designation"
            value={designation}
            options={DESIGNATION_OPTIONS}
            onChange={onDesignationChange}
          />
          <Dropdown
            label="Payment Status"
            value={paymentStatus}
            options={PAYMENT_STATUS_OPTIONS}
            onChange={onPaymentStatusChange}
          />
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Search</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by employee name / ID..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => setFilterPanelOpen((open) => !open)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-3 py-2 text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition whitespace-nowrap h-10"
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
            onClick={() => setFilterPanelOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-xs font-semibold text-slate-700 mb-3">Additional Filters</p>
          <div className="flex flex-wrap gap-3">
            {["High Priority", "Low Balance", "Overdue", "Upcoming"].map((filter) => (
              <button
                key={filter}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-purple-50 hover:text-[#7c3aed] hover:border-[#7c3aed] transition"
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={onReset}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Reset
            </button>
            <button
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
