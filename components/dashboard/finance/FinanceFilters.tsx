"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import FinanceDateRangePicker from "@/components/dashboard/finance/FinanceDateRangePicker";

const ACADEMIC_YEAR_OPTIONS = ["2024-25", "2025-26"];
const CLASS_GRADE_OPTIONS = [
  "All Classes",
  "VIII - A",
  "VI - B",
  "IX - A",
  "VII - C",
  "VIII - B",
  "IX - B",
  "VI - A",
  "V - B",
];
const FEE_TYPE_OPTIONS = ["All Fee Types", "Tuition Fee", "Transport Fee", "Admission Fee", "Exam Fee", "Other Fees"];
const PAYMENT_STATUS_OPTIONS = ["All Status", "Paid", "Pending", "Failed", "Refunded"];

interface FinanceFiltersProps {
  academicYear: string;
  onAcademicYearChange: (value: string) => void;
  classGrade: string;
  onClassGradeChange: (value: string) => void;
  feeType: string;
  onFeeTypeChange: (value: string) => void;
  paymentStatus: string;
  onPaymentStatusChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function FinanceFilters({
  academicYear,
  onAcademicYearChange,
  classGrade,
  onClassGradeChange,
  feeType,
  onFeeTypeChange,
  paymentStatus,
  onPaymentStatusChange,
  dateRange,
  onDateRangeChange,
  onFilter,
  onReset,
}: FinanceFiltersProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 items-end gap-3">
          <Dropdown
            label="Academic Year"
            value={academicYear}
            options={ACADEMIC_YEAR_OPTIONS}
            onChange={onAcademicYearChange}
          />
          <Dropdown
            label="Class / Grade"
            value={classGrade}
            options={CLASS_GRADE_OPTIONS}
            onChange={onClassGradeChange}
          />
          <Dropdown
            label="Fee Type"
            value={feeType}
            options={FEE_TYPE_OPTIONS}
            onChange={onFeeTypeChange}
          />
          <Dropdown
            label="Payment Status"
            value={paymentStatus}
            options={PAYMENT_STATUS_OPTIONS}
            onChange={onPaymentStatusChange}
          />
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Date Range</label>
            <FinanceDateRangePicker value={dateRange} onChange={onDateRangeChange} />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                setFilterPanelOpen((open) => !open);
              }}
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
