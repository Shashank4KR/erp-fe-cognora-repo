"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Calendar from "@/components/shared/Calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatDate(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`;
}

interface FeesDateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FeesDateRangePicker({ value, onChange }: FeesDateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
      const formatted = `${formatDate(startDate)} - ${formatDate(date)}`;
      onChange(formatted);
      setIsOpen(false);
    }
  };

  const displayValue = value || (startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : "Select date range");

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal text-xs",
          !displayValue && "text-slate-500"
        )}
        onClick={() => setIsOpen((open) => !open)}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-[#7c3aed]" />
        <span className="truncate">{displayValue}</span>
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 rounded-md border border-slate-200 bg-white shadow-lg p-3">
          <Calendar
            selectedDate={startDate}
            onSelect={handleDateSelect}
          />
          {startDate && !endDate && (
            <p className="text-xs text-slate-500 mt-2 text-center">Select end date</p>
          )}
          {startDate && endDate && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                  onChange("");
                }}
                className="flex-1 rounded-md border border-slate-200 px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  onChange(displayValue);
                  setIsOpen(false);
                }}
                className="flex-1 rounded-md bg-[#7c3aed] px-2 py-1.5 text-xs font-medium text-white hover:brightness-110 transition"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
