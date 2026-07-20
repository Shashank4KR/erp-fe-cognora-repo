"use client";

import { useState } from "react";
import { Filter, X, Search } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import TransactionDateRangePicker from "@/components/dashboard/finance/TransactionDateRangePicker";
import {
  TRANSACTION_TYPE_OPTIONS,
  PAYMENT_MODE_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/fixtures/transactions-reference-fixture";

interface TransactionFiltersProps {
  transactionType: string;
  onTransactionTypeChange: (value: string) => void;
  paymentMode: string;
  onPaymentModeChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function TransactionFilters({
  transactionType,
  onTransactionTypeChange,
  paymentMode,
  onPaymentModeChange,
  dateRange,
  onDateRangeChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
  onFilter,
  onReset,
}: TransactionFiltersProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 items-end gap-3">
          <Dropdown
            label="Transaction Type"
            value={transactionType}
            options={TRANSACTION_TYPE_OPTIONS}
            onChange={onTransactionTypeChange}
          />
          <Dropdown
            label="Payment Mode"
            value={paymentMode}
            options={PAYMENT_MODE_OPTIONS}
            onChange={onPaymentModeChange}
          />
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Date Range</label>
            <TransactionDateRangePicker value={dateRange} onChange={onDateRangeChange} />
          </div>
          <Dropdown
            label="Status"
            value={status}
            options={STATUS_OPTIONS}
            onChange={onStatusChange}
          />
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by receipt / ref no., student..."
                className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent"
              />
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
            {["High Value", "Low Value", "Pending", "Failed"].map((filter) => (
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
