"use client";

import DonutChart from "@/components/shared/charts/DonutChart";
import type { AttendanceBreakdown } from "@/lib/dashboard/role-dashboards/types";

interface AttendanceDonutProps {
  percentage: number;
  breakdown: AttendanceBreakdown[];
}

export default function AttendanceDonut({
  percentage,
  breakdown,
}: AttendanceDonutProps) {
  const segments = breakdown.map((b) => ({
    label: b.label,
    value: b.value,
    color: b.color,
  }));

  return (
    <div className="flex flex-col items-center justify-center">
      <DonutChart
        segments={segments}
        size={140}
        value={`${percentage}%`}
        label="Attendance"
      />
      <div className="space-y-2 text-sm mt-4 w-full">
        {breakdown.map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: b.color }}
            />
            <span className="text-slate-600">{b.label}</span>
            <span className="text-slate-900 font-medium ml-auto">
              {b.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
