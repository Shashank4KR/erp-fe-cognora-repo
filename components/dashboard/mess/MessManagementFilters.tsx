"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarIcon, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  STATUS_FILTER_OPTIONS as FILTER_STATUSES,
  MEAL_TYPE_OPTIONS as FILTER_MEAL_TYPES,
  MENU_TYPE_OPTIONS as FILTER_MENU_TYPES,
  BLOCK_FILTER_OPTIONS as FILTER_BLOCKS,
} from "@/lib/fixtures/mess-management-reference-fixture";

export type FilterState = {
  date: string;
  mealType: string;
  menuType: string;
  block: string;
  status: string;
};

interface MessManagementFiltersProps {
  date: string;
  mealType: string;
  menuType: string;
  block: string;
  status: string;
  onDateChange: (date: string) => void;
  onMealTypeChange: (value: string) => void;
  onMenuTypeChange: (value: string) => void;
  onBlockChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function MessManagementFilters({
  date,
  mealType,
  menuType,
  block,
  status,
  onDateChange,
  onMealTypeChange,
  onMenuTypeChange,
  onBlockChange,
  onStatusChange,
  onFilter,
  onReset,
}: MessManagementFiltersProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState<{ month: number; year: number }>({ month: 4, year: 2025 });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.year, currentMonth.month, 1).getDay();
  const today = new Date();
  const todayStr = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;

  const handlePrevMonth = () => {
    if (currentMonth.month === 0) {
      setCurrentMonth({ month: 11, year: currentMonth.year - 1 });
    } else {
      setCurrentMonth({ month: currentMonth.month - 1, year: currentMonth.year });
    }
  };

  const handleNextMonth = () => {
    if (currentMonth.month === 11) {
      setCurrentMonth({ month: 0, year: currentMonth.year + 1 });
    } else {
      setCurrentMonth({ month: currentMonth.month + 1, year: currentMonth.year });
    }
  };

  const handleDateSelect = (day: number) => {
    const m = (currentMonth.month + 1).toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    onDateChange(`${d}/${m}/${currentMonth.year}`);
    setCalendarOpen(false);
  };

  const handleClearDate = () => {
    onDateChange("");
    setCalendarOpen(false);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const renderCalendarDays = () => {
    const cells: (number | null)[] = Array(firstDayOfWeek).fill(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);
    return cells;
  };

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth.month === today.getMonth() && currentMonth.year === today.getFullYear();
  };

  const isSelected = (day: number) => {
    if (!date) return false;
    const [d, m, y] = date.split("/").map(Number);
    return day === d && currentMonth.month + 1 === m && currentMonth.year === y;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-end gap-4">
        {/* Date */}
        <div className="flex flex-col gap-1.5 min-w-[170px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</label>
          <div className="relative" ref={calendarRef}>
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="flex items-center gap-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:border-purple-300 transition"
            >
              <CalendarIcon className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
              <span className="flex-1 text-left text-slate-700">{date || "Select date"}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            {calendarOpen && (
              <div className="absolute left-0 z-50 mt-1 w-[300px] rounded-xl border border-purple-200 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <button type="button" onClick={handlePrevMonth} className="p-1 rounded hover:bg-slate-100">
                    <span className="text-slate-500 text-sm">&lt;</span>
                  </button>
                  <span className="text-sm font-semibold text-slate-900">
                    {monthNames[currentMonth.month]} {currentMonth.year}
                  </span>
                  <button type="button" onClick={handleNextMonth} className="p-1 rounded hover:bg-slate-100">
                    <span className="text-slate-500 text-sm">&gt;</span>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {renderCalendarDays().map((day, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={day === null}
                      onClick={() => day && handleDateSelect(day)}
                      className={`py-1.5 text-sm rounded-lg transition ${
                        day === null
                          ? "invisible"
                          : isSelected(day)
                            ? "bg-[#7c3aed] text-white font-semibold"
                            : isToday(day)
                              ? "border border-[#7c3aed] text-[#7c3aed] font-semibold"
                              : "text-slate-700 hover:bg-purple-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleClearDate}
                    className="text-xs text-[#7c3aed] font-medium hover:underline"
                  >
                    Clear
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCalendarOpen(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalendarOpen(false)}
                      className="px-3 py-1.5 rounded-lg bg-[#7c3aed] text-white text-xs font-medium hover:bg-[#6d28d9]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meal Type */}
        <div className="flex flex-col gap-1.5 min-w-[140px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => onMealTypeChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {FILTER_MEAL_TYPES.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Menu Type */}
        <div className="flex flex-col gap-1.5 min-w-[140px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Menu Type</label>
          <select
            value={menuType}
            onChange={(e) => onMenuTypeChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {FILTER_MENU_TYPES.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Block */}
        <div className="flex flex-col gap-1.5 min-w-[150px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Block</label>
          <select
            value={block}
            onChange={(e) => onBlockChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {FILTER_BLOCKS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5 min-w-[140px]">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {FILTER_STATUSES.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Filter Button */}
        <Button
          onClick={onFilter}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg h-10 px-5 text-sm font-semibold shadow-sm"
        >
          Filter
        </Button>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="outline"
          className="border-purple-200 text-[#7c3aed] hover:bg-purple-50 rounded-lg h-10 px-5 text-sm font-semibold"
        >
          <RotateCcw className="w-4 h-4 mr-1.5" />
          Reset
        </Button>
      </div>
    </div>
  );
}
