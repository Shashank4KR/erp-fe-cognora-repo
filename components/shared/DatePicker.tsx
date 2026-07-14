"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import Calendar from "./Calendar";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const formatDisplay = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const parseDisplay = (s: string): Date => {
  const d = new Date(s);
  return isNaN(d.getTime()) ? new Date(2025, 4, 21) : d;
};

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date>(parseDisplay(value));
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

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 transition hover:border-purple-300"
      >
        <CalendarIcon className="h-4 w-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">{value}</span>
        <ChevronDown className="h-4 w-4 text-slate-600" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
          <Calendar
            initialDate={selected}
            selectedDate={selected}
            onSelect={(d) => {
              setSelected(d);
              onChange(formatDisplay(d));
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
