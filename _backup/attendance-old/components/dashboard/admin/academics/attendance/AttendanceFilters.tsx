"use client";

import { Search, Filter } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import DatePicker from "@/components/shared/DatePicker";

export type SelectItem = { value: string; label: string };

interface AttendanceFiltersProps {
  academicYear: string;
  academicYearOptions: SelectItem[];
  onAcademicYearChange: (value: string) => void;
  className: string;
  classOptions: SelectItem[];
  onClassChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  viewType: string;
  viewTypeOptions: string[];
  onViewTypeChange: (value: string) => void;
  subject: string;
  subjectOptions: SelectItem[];
  onSubjectChange: (value: string) => void;
  onSearch: () => void;
  onToggleFilters: () => void;
  filterCount?: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function AttendanceFilters({
  academicYear,
  academicYearOptions,
  onAcademicYearChange,
  className,
  classOptions,
  onClassChange,
  date,
  onDateChange,
  viewType,
  viewTypeOptions,
  onViewTypeChange,
  subject,
  subjectOptions,
  onSubjectChange,
  onSearch,
  onToggleFilters,
  filterCount,
  searchQuery,
  onSearchChange,
}: AttendanceFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="min-w-[120px] flex-1">
          <label className="mb-2 block text-xs font-semibold text-slate-700">Academic Year</label>
          <Dropdown
            value={academicYear}
            items={academicYearOptions}
            placeholder="All Years"
            onChange={onAcademicYearChange}
            className="text-sm w-full"
          />
        </div>
        <div className="min-w-[140px] flex-1">
          <label className="mb-2 block text-xs font-semibold text-slate-700">Class / Grade</label>
          <Dropdown
            value={className}
            items={classOptions}
            placeholder="Select Class"
            onChange={onClassChange}
            className="text-sm w-full"
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <label className="mb-2 block text-xs font-semibold text-slate-700">Date</label>
          <DatePicker value={date} onChange={onDateChange} />
        </div>
        <div className="min-w-[120px] flex-1">
          <label className="mb-2 block text-xs font-semibold text-slate-700">View Type</label>
          <Dropdown
            value={viewType}
            options={viewTypeOptions}
            onChange={onViewTypeChange}
            className="text-sm w-full"
          />
        </div>
        <div className="min-w-[140px] flex-1">
          <label className="mb-2 block text-xs font-semibold text-slate-700">Subject (Optional)</label>
          <Dropdown
            value={subject}
            items={subjectOptions}
            placeholder="All Subjects"
            onChange={onSubjectChange}
            className="text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
            placeholder=""
            className="text-sm rounded-lg border border-slate-200 px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={onSearch}
            className="inline-flex items-center justify-center rounded-lg border border-purple-600 bg-white px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 transition"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          <button
            onClick={onToggleFilters}
            className="inline-flex items-center gap-2 rounded-lg border border-purple-600 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 transition"
          >
            <Filter className="h-4 w-4 text-purple-700" />
            Filter
            {filterCount ? (
              <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6d28d9] px-1.5 text-xs font-semibold text-white">
                {filterCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
}
