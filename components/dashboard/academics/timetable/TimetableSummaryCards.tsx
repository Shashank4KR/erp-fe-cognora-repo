"use client";

import { Calendar, CalendarCheck, School, Settings, Clock } from "lucide-react";
import Card from "@/components/shared/Card";

// Decorative sparkline — purely visual, not data-driven.
function Sparkline({ color = "#7c3aed" }: { color?: string }) {
  const points = [20, 32, 26, 40, 30, 48, 38, 52, 44, 58];
  const width = 64;
  const height = 28;
  const step = width / (points.length - 1);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const pathPoints = points
    .map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`)
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        points={pathPoints}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  );
}

export interface TimetableSummaryValues {
  total: number;
  // null when the backend does not expose a status field (no "active" concept).
  active: number | null;
  classesScheduled: number;
  teachersInvolved: number;
  periodsPerWeek: number;
}

interface SummaryStat {
  key: keyof TimetableSummaryValues;
  label: string;
  caption: string;
  icon: typeof Calendar;
  bgColor: string;
  textColor: string;
  sparkColor: string;
}

const STATS: SummaryStat[] = [
  {
    key: "total",
    label: "Total Timetables",
    caption: "All class timetables",
    icon: Calendar,
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    sparkColor: "#7c3aed",
  },
  {
    key: "active",
    label: "Active Timetables",
    caption: "Currently in use",
    icon: CalendarCheck,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    sparkColor: "#10b981",
  },
  {
    key: "classesScheduled",
    label: "Classes Scheduled",
    caption: "This week",
    icon: School,
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    sparkColor: "#3b82f6",
  },
  {
    key: "teachersInvolved",
    label: "Teachers Involved",
    caption: "Across all timetables",
    icon: Settings,
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    sparkColor: "#f97316",
  },
  {
    key: "periodsPerWeek",
    label: "Periods / Week",
    caption: "Total periods",
    icon: Clock,
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    sparkColor: "#ec4899",
  },
];

export default function TimetableSummaryCards({
  values,
}: {
  values: TimetableSummaryValues;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {STATS.map((stat) => {
        const rawValue = values[stat.key];
        const displayValue =
          stat.key === "active"
            ? rawValue == null
              ? "—"
              : (rawValue as number).toLocaleString()
            : (rawValue as number).toLocaleString();
        return (
          <Card key={stat.label} hover className="relative overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor} ${stat.textColor} flex-shrink-0`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide leading-tight">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <p className="text-2xl font-bold text-slate-900 leading-none">
                    {displayValue}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 truncate">{stat.caption}</p>
              </div>
              <div className="opacity-60 flex-shrink-0 hidden sm:block">
                <Sparkline color={stat.sparkColor} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
