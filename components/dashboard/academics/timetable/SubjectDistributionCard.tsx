"use client";

import Card from "@/components/shared/Card";
import DonutChart from "@/components/shared/charts/DonutChart";
import type { PreviewDonutSegment } from "./timetableDisplayTypes";

function Legend({ segments }: { segments: PreviewDonutSegment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  return (
    <ul className="space-y-2">
      {segments.map((s) => {
        const pct = (s.value / total) * 100;
        return (
          <li key={s.label} className="flex items-center gap-2 text-xs">
            <span
              className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
              aria-hidden="true"
            />
            <span className="flex-1 truncate text-slate-600">{s.label}</span>
            <span className="font-semibold text-slate-800">{s.value}</span>
            <span className="w-12 text-right font-medium text-slate-400">
              {pct.toFixed(1)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function SubjectDistributionCard({
  segments,
}: {
  segments: PreviewDonutSegment[];
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const chartSegments = segments.map((s) => ({
    label: s.label,
    value: total > 0 ? (s.value / total) * 100 : 0,
    color: s.color,
  }));

  return (
    <Card className="flex h-full flex-col p-5 print:hidden">
      <h3 className="text-sm font-semibold text-slate-900">Subjects Distribution</h3>
      <p className="mt-0.5 text-[11px] text-slate-400">Periods by subject category</p>
      {total === 0 ? (
        <div className="flex flex-1 items-center justify-center py-8 text-xs font-medium text-slate-400">
          No timetable data yet.
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <div className="flex-shrink-0">
            <DonutChart segments={chartSegments} value={total} label="Periods" size={120} strokeWidth={14} />
          </div>
          <div className="w-full flex-1">
            <Legend segments={segments} />
          </div>
        </div>
      )}
    </Card>
  );
}
