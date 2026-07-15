"use client";

import { TOP_SUBJECTS_DATA } from "@/lib/fixtures/examinations-reference-fixture";

export default function TopSubjectsCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Subjects</h3>
      <div className="space-y-3">
        {TOP_SUBJECTS_DATA.map((subject, idx) => (
          <div key={subject.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-medium text-slate-700">{subject.name}</span>
              </div>
              <span className="text-xs font-semibold text-slate-900">{subject.avgScore}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${subject.avgScore}%`, backgroundColor: subject.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
