"use client";

import { ChevronRight } from "lucide-react";
import type { WeeklyMenuDay } from "@/lib/fixtures/mess-management-reference-fixture";

interface WeeklyMenuDayCardProps {
  day: WeeklyMenuDay;
  onClick: (day: WeeklyMenuDay) => void;
}

export default function WeeklyMenuDayCard({ day, onClick }: WeeklyMenuDayCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(day)}
      className={`flex-1 min-w-[160px] rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
        day.isCurrent
          ? "bg-purple-50/60 border-purple-200 shadow-md shadow-purple-100"
          : "bg-white border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-md"
      }`}
    >
      <div className="mb-2.5">
        <p className="text-sm font-bold text-slate-900">{day.day}</p>
        <p className="text-xs text-slate-500">{day.date}</p>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-xs font-bold text-[#7c3aed]">Breakfast</p>
          <p className="text-xs text-slate-700 leading-relaxed">{day.breakfast}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-[#7c3aed]">Lunch</p>
          <p className="text-xs text-slate-700 leading-relaxed">{day.lunch}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-[#7c3aed]">Dinner</p>
          <p className="text-xs text-slate-700 leading-relaxed">{day.dinner}</p>
        </div>
      </div>
    </button>
  );
}
