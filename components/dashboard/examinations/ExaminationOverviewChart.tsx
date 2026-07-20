"use client";

import { useMemo } from "react";
import BarChart from "@/components/shared/charts/BarChart";

interface ExaminationOverviewChartProps {
  exams?: { start_date: string; end_date: string }[];
  comingSoon?: boolean;
}

export default function ExaminationOverviewChart({ exams = [], comingSoon }: ExaminationOverviewChartProps) {
  const data = useMemo(() => {
    if (!exams.length) return [];
    const map = new Map<string, number>();
    exams.forEach((e) => {
      const d = new Date(e.start_date);
      if (Number.isNaN(d.getTime())) return;
      const key = d.toLocaleDateString("en-US", { month: "short" });
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([label, value]) => ({ label, value }));
  }, [exams]);

  if (comingSoon || data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Examination Overview</h3>
        <div className="h-[200px] w-full flex items-center justify-center">
          <p className="text-xs text-slate-500">Examination overview analytics will be available in a future update.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Examination Overview</h3>
      <div className="h-[200px] w-full">
        <BarChart data={data} color="#7c3aed" unit="number" />
      </div>
    </div>
  );
}
