"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import Calendar from "@/components/shared/Calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FinanceDateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

function formatDate(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`;
}

export default function FinanceDateRangePicker({
  value,
  onChange,
}: FinanceDateRangePickerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !date && "text-slate-500"
        )}
        onClick={() => setIsOpen((open) => !open)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value || "Select date range"}
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 rounded-md border border-slate-200 bg-white shadow-lg">
          <Calendar
            selectedDate={date}
            onSelect={(newDate) => {
              setDate(newDate);
              if (newDate) {
                onChange(formatDate(newDate));
                setIsOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
