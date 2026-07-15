"use client";

import DonutChart from "@/components/shared/charts/DonutChart";

interface AttendanceOverviewChartProps {
  average: number | null;
  present: { percentage: number; days: number } | null;
  absent: { percentage: number; days: number } | null;
  late: { percentage: number; days: number } | null;
}

export default function AttendanceOverviewChart({ average, present, absent, late }: AttendanceOverviewChartProps) {
  const hasData = present !== null && absent !== null && late !== null && average !== null;

  if (!hasData) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Attendance Overview (This Month)</h3>
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-sm text-slate-500">No attendance data available for this month.</p>
        </div>
      </div>
    );
  }

  const segments = [
    { label: "Present", value: present.percentage, color: "#10b981" },
    { label: "Absent", value: absent.percentage, color: "#ef4444" },
    { label: "Late", value: late.percentage, color: "#f59e0b" },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Attendance Overview (This Month)</h3>
      <div className="flex flex-col items-center">
        <DonutChart
          segments={segments}
          size={140}
          value={`${average}%`}
          label="Average"
          strokeWidth={14}
        />
        <div className="w-full mt-4 space-y-2.5">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2.5 text-xs">
              <span className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-slate-600 flex-1">{seg.label}</span>
              <span className="text-slate-500">
                {seg.value}% ({seg.label === "Present" ? present.days : seg.label === "Absent" ? absent.days : late.days} days)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
