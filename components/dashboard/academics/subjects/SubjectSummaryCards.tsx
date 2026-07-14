"use client";

import { BookOpen, Layers, Grid2X2, Activity } from "lucide-react";
import Card from "@/components/shared/Card";
import type { SubjectResponse } from "@/types/entities/subject";

function Sparkline({ color = "#6d28d9" }: { color?: string }) {
  const points = [20, 35, 25, 45, 30, 50, 40, 55, 45, 60];
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

export default function SubjectSummaryCards({ items }: { items: SubjectResponse[] }) {
  const totalSubjects = items.length;
  const coreSubjects = "—";
  const electiveSubjects = "—";
  const activeSubjects = "—";

  const stats = [
    {
      label: "Total Subjects",
      value: totalSubjects,
      subtitle: "All subjects",
      icon: BookOpen,
      color: "#6d28d9",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      sparkColor: "#6d28d9",
    },
    {
      label: "Core Subjects",
      value: coreSubjects,
      subtitle: "Not available",
      icon: Layers,
      color: "#10b981",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      sparkColor: "#10b981",
      unavailable: true,
      tooltip: "Subject Type is not available in the current backend.",
    },
    {
      label: "Elective Subjects",
      value: electiveSubjects,
      subtitle: "Not available",
      icon: Grid2X2,
      color: "#3b82f6",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      sparkColor: "#3b82f6",
      unavailable: true,
      tooltip: "Subject Type is not available in the current backend.",
    },
    {
      label: "Active Subjects",
      value: activeSubjects,
      subtitle: "Not available",
      icon: Activity,
      color: "#f97316",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      sparkColor: "#f97316",
      unavailable: true,
      tooltip: "Status is not available in the current backend.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} hover className="relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor} ${stat.textColor} flex-shrink-0`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900 leading-tight mt-0.5">{stat.value}</p>
              {stat.unavailable && (
                <p className="text-[10px] text-slate-400 mt-0.5" title={stat.tooltip}>
                  {stat.subtitle}
                </p>
              )}
            </div>
            <div className="opacity-60 flex-shrink-0">
              <Sparkline color={stat.sparkColor} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
