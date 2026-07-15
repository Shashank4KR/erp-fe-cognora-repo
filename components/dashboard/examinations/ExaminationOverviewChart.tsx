"use client";

import BarChart from "@/components/shared/charts/BarChart";
import { EXAMINATION_OVERVIEW_DATA } from "@/lib/fixtures/examinations-reference-fixture";

export default function ExaminationOverviewChart() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Examination Overview</h3>
      <div className="h-[200px] w-full">
        <BarChart data={EXAMINATION_OVERVIEW_DATA} color="#7c3aed" unit="number" />
      </div>
    </div>
  );
}
