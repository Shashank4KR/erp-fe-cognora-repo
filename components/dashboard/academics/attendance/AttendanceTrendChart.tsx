"use client";

import { useState } from "react";

interface AttendanceTrendChartProps {
  comingSoon?: boolean;
}

export default function AttendanceTrendChart({ comingSoon = true }: AttendanceTrendChartProps) {
  const [period, setPeriod] = useState("Daily");

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Attendance Trend (This Month)</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            disabled
            className="h-7 rounded-lg border border-slate-200 bg-slate-50 pl-2.5 pr-6 text-xs font-medium text-slate-400 outline-none cursor-not-allowed appearance-none"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-slate-500">Trend data will be available in a future update.</p>
        <p className="text-xs text-slate-400 mt-1">Daily, Weekly, and Monthly aggregation coming soon.</p>
      </div>
    </div>
  );
}
