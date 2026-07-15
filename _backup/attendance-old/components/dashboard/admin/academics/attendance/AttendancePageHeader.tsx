"use client";

import { ChevronDown, MoreVertical } from "lucide-react";

interface AttendancePageHeaderProps {
  onMarkAttendance: () => void;
  onMenuClick?: () => void;
}

export default function AttendancePageHeader({
  onMarkAttendance,
  onMenuClick,
}: AttendancePageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
        <nav className="flex items-center gap-2 mt-1 text-sm">
          <span className="text-[#6d28d9] font-medium">Dashboard</span>
          <span className="text-slate-400">/</span>
          <span className="text-[#6d28d9] font-medium">Academics</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">Attendance</span>
        </nav>
      </div>
      <div className="flex items-center gap-3 mt-4 sm:mt-0">
        <button
          onClick={onMarkAttendance}
          className="inline-flex items-center gap-2 rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
        >
          Mark Attendance
          <ChevronDown className="h-4 w-4" />
        </button>
        <button
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
