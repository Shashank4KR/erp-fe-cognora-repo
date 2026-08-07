"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";
import type { DonutSegment } from "@/lib/fixtures/transport-overview-reference-fixture";

interface TransportSummaryChartProps {
  segments: DonutSegment[];
  total: number;
}

const TRANSPORT_DONUT_SEGMENTS: DonutSegment[] = [
  { label: "Route 1 (Green)", value: 42, color: "#3b82f6" },
  { label: "Route 2 (Blue)", value: 38, color: "#10b981" },
  { label: "Route 3 (Yellow)", value: 35, color: "#eab308" },
  { label: "Route 4 (Red)", value: 40, color: "#ef4444" },
  { label: "Route 5 (Orange)", value: 32, color: "#f97316" },
  { label: "Other Routes", value: 239, color: "#7c3aed" },
];

const TRANSPORT_TOTAL_STUDENTS = 426;
const OVERVIEW_PERIOD_OPTIONS = ["Today", "This Week", "This Month"];

export default function TransportSummaryChart({ segments, total }: TransportSummaryChartProps) {
  const [period, setPeriod] = useState("This Month");
  const [isOpen, setIsOpen] = useState(false);

  const circumference = 2 * Math.PI * 54;
  const gap = 3;
  const totalValue = segments.reduce((sum, s) => sum + s.value, 0);

  const segmentsWithOffset = segments.map((segment, i) => {
    const prevOffset = segments.slice(0, i).reduce((sum, s) => sum + (s.value / totalValue) * circumference, 0);
    return { ...segment, offset: prevOffset };
  });

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900">Transport Summary</h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            {period}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 min-w-max overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              {OVERVIEW_PERIOD_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setPeriod(option);
                    setIsOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-purple-50 ${
                    option === period ? "font-semibold text-purple-700" : "text-slate-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {segmentsWithOffset.map((segment) => {
              const percentage = segment.value / totalValue;
              const dashArrayLength = percentage * circumference - gap;

              return (
                <circle
                  key={segment.label}
                  cx="90"
                  cy="90"
                  r="54"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="16"
                  strokeDasharray={`${dashArrayLength} ${circumference}`}
                  strokeDashoffset={-segment.offset}
                  transform="rotate(-90 90 90)"
                  strokeLinecap="butt"
                />
              );
            })}
            <text x="90" y="82" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold" fill="#0f172a">
              {total.toLocaleString()}
            </text>
            <text x="90" y="104" textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#64748b">
              Total Students
            </text>
          </svg>
        </div>

        <div className="flex-1 w-full space-y-2.5">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: segment.color }} />
                <span className="text-sm text-slate-600">{segment.label}</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{segment.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
