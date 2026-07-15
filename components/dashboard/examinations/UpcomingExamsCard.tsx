"use client";

import { UPCOMING_EXAMS } from "@/lib/fixtures/examinations-reference-fixture";

interface UpcomingExamsCardProps {
  onViewAll: () => void;
}

export default function UpcomingExamsCard({ onViewAll }: UpcomingExamsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Upcoming Exams</h3>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-[#7c3aed] hover:text-purple-700 transition"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {UPCOMING_EXAMS.map((exam, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-slate-200 flex flex-col items-center justify-center bg-slate-50">
              <span className="text-[10px] font-semibold text-slate-500 uppercase leading-none">{exam.date.split(" ")[1]}</span>
              <span className="text-lg font-bold text-slate-900 leading-tight">{exam.date.split(" ")[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{exam.name}</p>
              <p className="text-xs text-slate-500 truncate">{exam.class}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
