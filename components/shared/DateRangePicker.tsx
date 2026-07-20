"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import Calendar from "./Calendar";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

function parseLocalDate(s: string): Date {
  const parts = s.split("-");
  if (parts.length !== 3) return new Date();
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return new Date();
  return new Date(y, m, d);
}

function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const day = parseInt(parts[2], 10);
  const month = months[parseInt(parts[1], 10) - 1];
  const year = parts[0];
  if (Number.isNaN(day) || !month) return isoDate;
  return `${day} ${month} ${year}`;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
  placeholder = "Select date range",
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [startMonth, setStartMonth] = useState(() => {
    const d = parseLocalDate(startDate);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [endMonth, setEndMonth] = useState(() => {
    const d = parseLocalDate(endDate);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const d = parseLocalDate(startDate);
    setStartMonth(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [startDate]);

  useEffect(() => {
    const d = parseLocalDate(endDate);
    setEndMonth(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [endDate]);

  const displayValue = startDate && endDate
    ? `${formatDate(startDate)} – ${formatDate(endDate)}`
    : startDate
    ? `${formatDate(startDate)} – ...`
    : placeholder;

  const handleStartSelect = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    onStartDateChange(`${y}-${m}-${d}`);
  };

  const handleEndSelect = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    onEndDateChange(`${y}-${m}-${d}`);
  };

  const startParsed: Date | undefined = startDate ? parseLocalDate(startDate) : undefined;
  const endParsed: Date | undefined = endDate ? parseLocalDate(endDate) : undefined;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 pr-4 text-sm font-medium text-slate-700 transition hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
      >
        <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c3aed]" />
        <span className="flex-1 text-left truncate">{displayValue}</span>
        {(startDate || endDate) && onClear && (
          <X
            className="h-4 w-4 flex-shrink-0 text-slate-400 hover:text-slate-600"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-[60] mt-2 w-auto max-w-[640px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-start gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2">Start Date</p>
              <Calendar
                initialDate={startMonth}
                selectedDate={startParsed}
                onSelect={handleStartSelect}
                rangeStart={startParsed}
                rangeEnd={endParsed}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2">End Date</p>
              <Calendar
                initialDate={endMonth}
                selectedDate={endParsed}
                onSelect={handleEndSelect}
                rangeStart={startParsed}
                rangeEnd={endParsed}
              />
            </div>
          </div>
          {(startDate || endDate) && onClear && (
            <div className="mt-3 flex items-center justify-end">
              <button
                type="button"
                onClick={onClear}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Clear Range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
