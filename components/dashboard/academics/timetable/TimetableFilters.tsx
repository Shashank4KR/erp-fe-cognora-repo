"use client";

import { useState, useRef, useEffect } from "react";
import Dropdown from "@/components/shared/Dropdown";
import Card from "@/components/shared/Card";
import { Calendar, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { PREVIEW_VIEW_TYPES } from "./timetablePreviewData";
import type { TimetableFilterState } from "./timetableDisplayTypes";

interface TimetableFiltersProps {
  filters: TimetableFilterState;
  onAcademicYearChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onSectionChange: (value: string) => void;
  onViewTypeChange: (value: string) => void;
  onWeekChange: (patch: Partial<TimetableFilterState>) => void;
  weekRange: string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  academicYearOptions: string[];
  classOptions: string[];
  sectionOptions: string[];
  subjectOptions: string[];
  teacherOptions: string[];
  dayOptions: string[];
  periodOptions: string[];
  roomOptions: string[];
}

export default function TimetableFilters({
  filters,
  onAcademicYearChange,
  onClassChange,
  onSectionChange,
  onViewTypeChange,
  onWeekChange,
  weekRange,
  onPrevWeek,
  onNextWeek,
  academicYearOptions,
  classOptions,
  sectionOptions,
  subjectOptions,
  teacherOptions,
  dayOptions,
  periodOptions,
  roomOptions,
}: TimetableFiltersProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [local, setLocal] = useState({
    subject: filters.subject,
    teacher: filters.teacher,
    day: filters.day,
    period: filters.period,
    room: filters.room,
  });

  useEffect(() => {
    setLocal({
      subject: filters.subject,
      teacher: filters.teacher,
      day: filters.day,
      period: filters.period,
      room: filters.room,
    });
  }, [filters.subject, filters.teacher, filters.day, filters.period, filters.room]);

  useEffect(() => {
    if (!popoverOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopoverOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [popoverOpen]);

  const applyFilters = () => {
    onWeekChange(local);
    setPopoverOpen(false);
  };

  const clearFilters = () => {
    const cleared = { subject: "All Subjects", teacher: "All Teachers", day: "All Days", period: "All Periods", room: "All Rooms" };
    setLocal(cleared);
    onWeekChange(cleared);
  };

  return (
    <Card className="mb-6 print:hidden">
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="min-w-[150px] flex-1">
          <Dropdown
            label="Academic Year"
            value={filters.academicYear}
            options={academicYearOptions}
            onChange={onAcademicYearChange}
            className="w-full"
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <Dropdown
            label="Class / Grade"
            value={filters.classGrade}
            options={classOptions}
            onChange={onClassChange}
            className="w-full"
          />
        </div>
        <div className="min-w-[120px] flex-1">
          <Dropdown
            label="Section"
            value={filters.section}
            options={sectionOptions}
            onChange={onSectionChange}
            className="w-full"
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <Dropdown
            label="View Type"
            value={filters.viewType}
            options={PREVIEW_VIEW_TYPES as string[]}
            onChange={onViewTypeChange}
            className="w-full"
          />
        </div>

        {/* Week date range + navigation */}
        <div className="min-w-[230px] flex-1">
          <span className="mb-2 block text-xs font-semibold text-slate-700">Week</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevWeek}
              aria-label="Previous week"
              title="Previous week"
              className="flex h-[38px] w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex h-[38px] flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="whitespace-nowrap">{weekRange}</span>
            </div>
            <button
              type="button"
              onClick={onNextWeek}
              aria-label="Next week"
              title="Next week"
              className="flex h-[38px] w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filters button + popover */}
        <div className="relative min-w-[120px]" ref={popoverRef}>
          <span className="mb-2 block text-xs font-semibold text-slate-700">&nbsp;</span>
          <button
            type="button"
            onClick={() => setPopoverOpen((o) => !o)}
            aria-haspopup="dialog"
            aria-expanded={popoverOpen}
            className="flex h-[38px] w-full items-center justify-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-3 text-sm font-semibold text-[#7c3aed] transition hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
          {popoverOpen && (
            <div
              role="dialog"
              aria-label="Filter timetable"
              className="absolute right-0 z-50 mt-2 w-[300px] rounded-xl border border-slate-200 bg-white p-4 shadow-2xl"
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Refine timetable
              </p>
              <div className="space-y-3">
                <Dropdown label="Subject" value={local.subject} options={subjectOptions} onChange={(v) => setLocal((s) => ({ ...s, subject: v }))} className="w-full" />
                <Dropdown label="Teacher" value={local.teacher} options={teacherOptions} onChange={(v) => setLocal((s) => ({ ...s, teacher: v }))} className="w-full" />
                <Dropdown label="Day" value={local.day} options={dayOptions} onChange={(v) => setLocal((s) => ({ ...s, day: v }))} className="w-full" />
                <Dropdown label="Period" value={local.period} options={periodOptions} onChange={(v) => setLocal((s) => ({ ...s, period: v }))} className="w-full" />
                <Dropdown label="Room" value={local.room} options={roomOptions} onChange={(v) => setLocal((s) => ({ ...s, room: v }))} className="w-full" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyFilters}
                  className="flex-1 rounded-lg bg-[#7c3aed] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear Filters
                </button>
              </div>
              <button
                type="button"
                onClick={() => setPopoverOpen(false)}
                className="mt-2 w-full rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
