"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Calendar from "@/components/shared/Calendar";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface TransactionDateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TransactionDateRangePicker({
  value,
  onChange,
}: TransactionDateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [viewMonth, setViewMonth] = useState(new Date(2025, 4, 1));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatDate = (d: Date) =>
    `${MONTHS[d.getMonth()]} ${d.getDate().toString().padStart(2, "0")}, ${d.getFullYear()}`;

  const handleSelect = (d: Date) => {
    if (selecting === "start") {
      setStartDate(d);
      setEndDate(undefined);
      setSelecting("end");
      setViewMonth(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    } else {
      setEndDate(d);
      if (d < (startDate ?? d)) {
        setStartDate(d);
        setEndDate(startDate);
      }
      setSelecting("start");
      if (startDate && d) {
        onChange(`${formatDate(startDate)} - ${formatDate(d)}`);
        setOpen(false);
      }
    }
  };

  const handleClear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onChange("");
    setOpen(false);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onChange(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-purple-300 w-full"
      >
        <CalendarIcon className="h-4 w-4 text-[#7c3aed] flex-shrink-0" />
        <span className="truncate">{value || "Select date range"}</span>
        <ChevronRight className="h-4 w-4 text-slate-400 ml-auto rotate-90 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[580px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-slate-900">
              {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
            </span>
            <button
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2">
                {selecting === "start" ? "Start Date" : startDate ? "End Date" : "Start Date"}
              </p>
              <Calendar
                initialDate={viewMonth}
                selectedDate={selecting === "start" ? startDate : endDate}
                onSelect={handleSelect}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2">
                {selecting === "end" ? "End Date" : endDate ? "End Date" : "Start Date"}
              </p>
              <Calendar
                initialDate={viewMonth}
                selectedDate={selecting === "end" ? endDate : startDate}
                onSelect={handleSelect}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={handleClear}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
