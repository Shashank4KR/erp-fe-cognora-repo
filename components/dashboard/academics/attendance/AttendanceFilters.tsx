"use client";

import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";

interface AttendanceFiltersProps {
  onSearch: () => void;
  onFilter: () => void;
  academicYearOptions: string[];
  academicYear: string;
  onAcademicYearChange: (value: string) => void;
  academicYearLoading: boolean;
  classOptions: { value: string; label: string }[];
  classGrade: string;
  onClassGradeChange: (value: string) => void;
  classLoading: boolean;
  date: string;
  onDateChange: (value: string) => void;
  viewType: string;
  onViewTypeChange: (value: string) => void;
  subjectOptions: { value: string; label: string }[];
  subject: string;
  onSubjectChange: (value: string) => void;
  subjectLoading: boolean;
}

export default function AttendanceFilters({
  onSearch,
  onFilter,
  academicYearOptions,
  academicYear,
  onAcademicYearChange,
  academicYearLoading,
  classOptions,
  classGrade,
  onClassGradeChange,
  classLoading,
  date,
  onDateChange,
  viewType,
  onViewTypeChange,
  subjectOptions,
  subject,
  onSubjectChange,
  subjectLoading,
}: AttendanceFiltersProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[140px]">
            <Dropdown
              label="Academic Year"
              value={academicYear}
              options={academicYearOptions}
              onChange={onAcademicYearChange}
              disabled={academicYearLoading || academicYearOptions.length === 0}
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <Dropdown
              label="Class / Grade"
              value={classGrade}
              items={classOptions}
              onChange={onClassGradeChange}
              disabled={classLoading || classOptions.length === 0}
            />
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="mb-2 block text-xs font-semibold text-slate-700">Date</label>
            <div className="relative">
              <input
                type="text"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                placeholder="DD MMM YYYY"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium text-slate-700 outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-purple-100 cursor-pointer"
              />
              <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c3aed]" />
            </div>
          </div>
          <div className="flex-1 min-w-[140px]">
            <Dropdown
              label="View Type"
              value={viewType}
              options={["Daily View", "Weekly View", "Monthly View"]}
              onChange={onViewTypeChange}
            />
          </div>
          <div className="flex-1 min-w-[160px]">
            <Dropdown
              label="Subject (Optional)"
              value={subject}
              items={subjectOptions}
              onChange={onSubjectChange}
              disabled={subjectLoading || subjectOptions.length === 0}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSearch}
              className="inline-flex items-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-4 py-2 text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
            <button
              onClick={() => { onFilter(); setFilterPanelOpen((p) => !p); }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-4 py-2 text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
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
            {["Present Only", "Absent Only", "Late Only", "Low Attendance"].map((filter) => (
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
              onClick={() => setFilterPanelOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Reset
            </button>
            <button
              onClick={() => setFilterPanelOpen(false)}
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
