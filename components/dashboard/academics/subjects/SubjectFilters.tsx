"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Filter, X } from "lucide-react";
import Card from "@/components/shared/Card";

export default function SubjectFilters({
  search,
  onSearchChange,
  classId,
  onClassIdChange,
  classOptions,
  onClear,
  academicYearFilter,
  onAcademicYearChange,
  uniqueAcademicYears,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  classId: string;
  onClassIdChange: (value: string) => void;
  classOptions: { id: string; label: string }[];
  onClear: () => void;
  academicYearFilter: string;
  onAcademicYearChange: (value: string) => void;
  uniqueAcademicYears: string[];
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  const hasFilters = search || classId || academicYearFilter;

  useEffect(() => {
    if (!filtersOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFiltersOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen]);

  const activeCount = [search, classId, academicYearFilter].filter(Boolean).length;

  const selectClass =
    "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100 transition";

  return (
    <Card className="mb-4">
      <div className="p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-1 flex-col min-w-[200px]">
            <label className="mb-1 block text-xs font-medium text-slate-500">Search subjects by name or code</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search subjects by name or code..."
                aria-label="Search subjects by name or code"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>
          </div>

          <div className="flex flex-col min-w-[160px]">
            <label className="mb-1 block text-xs font-medium text-slate-500">Academic Year</label>
            <select
              value={academicYearFilter}
              onChange={(e) => onAcademicYearChange(e.target.value)}
              aria-label="Filter by Academic Year"
              disabled={uniqueAcademicYears.length === 0}
              title={uniqueAcademicYears.length === 0 ? "No academic year data available" : "Filter by Academic Year"}
              className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <option value="">All Academic Years</option>
              {uniqueAcademicYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[160px]">
            <label className="mb-1 block text-xs font-medium text-slate-500">Class / Course</label>
            <select
              value={classId}
              onChange={(e) => onClassIdChange(e.target.value)}
              aria-label="Filter by Class"
              className={selectClass}
            >
              <option value="">All Classes</option>
              {classOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[160px]">
            <label className="mb-1 block text-xs font-medium text-slate-500">Department</label>
            <select
              disabled
              aria-label="Filter by Department"
              title="Not available in the current backend"
              className={`${selectClass} opacity-50 cursor-not-allowed`}
            >
              <option value="">Not available</option>
            </select>
          </div>

          <div className="flex flex-col min-w-[160px]">
            <label className="mb-1 block text-xs font-medium text-slate-500">Subject Type</label>
            <select
              disabled
              aria-label="Filter by Subject Type"
              title="Not available in the current backend"
              className={`${selectClass} opacity-50 cursor-not-allowed`}
            >
              <option value="">Not available</option>
            </select>
          </div>

          <div className="relative" ref={filtersRef}>
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={filtersOpen}
              className="flex h-10 items-center gap-2 rounded-lg border border-[#6d28d9] bg-white px-4 text-sm font-medium text-[#6d28d9] transition hover:bg-purple-50"
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filters
              {activeCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6d28d9] text-[10px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>

            {filtersOpen && (
              <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-900">Advanced Filters</p>
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 transition"
                    aria-label="Close filters"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
                    <select
                      disabled
                      aria-label="Filter by Department"
                      title="Not available in the current backend"
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none opacity-50 cursor-not-allowed"
                    >
                      <option value="">All Departments</option>
                      <option value="">Not available</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-0.5">Subjects are not linked to Departments in the current backend.</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Subject Type</label>
                    <select
                      disabled
                      aria-label="Filter by Subject Type"
                      title="Not available in the current backend"
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none opacity-50 cursor-not-allowed"
                    >
                      <option value="">All Types</option>
                      <option value="">Not available</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-0.5">Subject Type is not available in the current backend.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      onClear();
                      setFiltersOpen(false);
                    }}
                    className="flex-1 h-9 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    Clear Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex-1 h-9 rounded-lg bg-[#6d28d9] text-sm font-medium text-white hover:brightness-110 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              aria-label="Clear all filters"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Clear
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
