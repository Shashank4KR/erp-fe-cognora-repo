"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import Calendar from "@/components/shared/Calendar";

const formatDisplay = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

interface TransportDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
}

export default function TransportDatePicker({
  value,
  onChange,
  label,
}: TransportDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date>(new Date());
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

  const handleToggle = () => {
    if (!open && value !== "Select Date") {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        setSelected(parsed);
      }
    }
    setOpen((o) => !o);
  };

  const handleApply = () => {
    onChange(formatDisplay(selected));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setSelected(new Date());
    onChange("Select Date");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <label className="mb-2 block text-xs font-semibold text-slate-700">{label}</label>
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:border-purple-300 transition"
      >
        <CalendarIcon className="h-4 w-4 text-slate-600" />
        <span className="flex-1 text-left truncate">{value}</span>
        <ChevronDown className="h-4 w-4 text-slate-600 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-purple-100 bg-white p-3 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Select Date</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handleApply}
                className="text-xs font-medium text-[#7c3aed] hover:text-[#6d28d9] px-2 py-1 rounded hover:bg-purple-50 transition"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-50 transition"
              >
                Reset
              </button>
            </div>
          </div>
          <Calendar
            initialDate={selected}
            selectedDate={selected}
            onSelect={(d) => setSelected(d)}
          />
        </div>
      )}
    </div>
  );
}
