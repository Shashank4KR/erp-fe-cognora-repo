"use client";

import { useState } from "react";
import { Search, Filter, CalendarIcon, X } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";

interface ExaminationFiltersProps {
  onSearch: () => void;
  onFilter: () => void;
  academicYear: string;
  onAcademicYearChange: (value: string) => void;
  examType: string;
  onExamTypeChange: (value: string) => void;
  classGrade: string;
  onClassGradeChange: (value: string) => void;
  term: string;
  onTermChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export default function ExaminationFilters({
  onSearch,
  onFilter,
  academicYear,
  onAcademicYearChange,
  examType,
  onExamTypeChange,
  classGrade,
  onClassGradeChange,
  term,
  onTermChange,
  status,
  onStatusChange,
  searchQuery,
  onSearchQueryChange,
}: ExaminationFiltersProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-[repeat(8,minmax(0,1fr))] items-end gap-3">
          <div className="col-span-1">
            <Dropdown
              label="Academic Year"
              value={academicYear}
              options={["2025-26", "2024-25", "2023-24"]}
              onChange={onAcademicYearChange}
            />
          </div>
          <div className="col-span-1">
            <Dropdown
              label="Exam Type"
              value={examType}
              options={[
                "Unit Test",
                "Periodic Test",
                "Half Yearly",
                "Pre Final",
                "Final",
                "Annual",
                "Others",
              ]}
              onChange={onExamTypeChange}
            />
          </div>
          <div className="col-span-1">
            <Dropdown
              label="Class / Grade"
              value={classGrade}
              options={[
                "Class 7 - A",
                "Class 7 - B",
                "Class 8 - A",
                "Class 8 - B",
                "Class 9 - A",
                "Class 9 - B",
                "Class 10 - A",
                "Class 10 - B",
              ]}
              onChange={onClassGradeChange}
            />
          </div>
          <div className="col-span-1">
            <Dropdown
              label="Term"
              value={term}
              options={["Term 1", "Term 2", "Annual"]}
              onChange={onTermChange}
            />
          </div>
          <div className="col-span-1">
            <Dropdown
              label="Status"
              value={status}
              options={["Upcoming", "Ongoing", "Completed"]}
              onChange={onStatusChange}
            />
          </div>
          <div className="col-span-1">
            <label className="mb-2 block text-xs font-semibold text-slate-700">Date Range</label>
            <div className="relative">
              <input
                type="text"
                placeholder="DD MMM YYYY - DD MMM YYYY"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium text-slate-700 outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-purple-100"
              />
              <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c3aed]" />
            </div>
          </div>
          <div className="col-span-1">
            <button
              onClick={onSearch}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-3 py-2 text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition whitespace-nowrap h-10"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={onFilter}
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
            {["High Scoring", "Low Attendance", "Practical Only", "Theory Only"].map((filter) => (
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
