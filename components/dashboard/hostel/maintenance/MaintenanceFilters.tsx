"use client";

import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import MaintenanceDateRangePicker from "./MaintenanceDateRangePicker";
import {
  REQUEST_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  HOSTEL_BLOCK_OPTIONS,
} from "@/lib/fixtures/maintenance-management-reference-fixture";

interface MaintenanceFiltersProps {
  requestType: string;
  onRequestTypeChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  priority: string;
  onPriorityChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  hostelBlock: string;
  onHostelBlockChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function MaintenanceFilters({
  requestType,
  onRequestTypeChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
  hostelBlock,
  onHostelBlockChange,
  dateRange,
  onDateRangeChange,
  onFilter,
  onReset,
}: MaintenanceFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3 items-end">
        <Dropdown label="Request Type" value={requestType} options={REQUEST_TYPE_OPTIONS} onChange={onRequestTypeChange} />
        <Dropdown label="Category" value={category} options={CATEGORY_OPTIONS} onChange={onCategoryChange} />
        <Dropdown label="Priority" value={priority} options={PRIORITY_OPTIONS} onChange={onPriorityChange} />
        <Dropdown label="Status" value={status} options={STATUS_OPTIONS} onChange={onStatusChange} />
        <Dropdown label="Hostel Block" value={hostelBlock} options={HOSTEL_BLOCK_OPTIONS} onChange={onHostelBlockChange} />
        <MaintenanceDateRangePicker label="Date Range" value={dateRange} onChange={onDateRangeChange} />
        <Button
          onClick={onFilter}
          className="inline-flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg h-9 px-4 text-sm font-semibold whitespace-nowrap w-full"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="inline-flex items-center justify-center gap-2 bg-white text-[#7c3aed] border-purple-200 hover:bg-purple-50 rounded-lg h-9 px-4 text-sm font-semibold whitespace-nowrap w-full"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
