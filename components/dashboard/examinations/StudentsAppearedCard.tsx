"use client";

import { STUDENTS_APPEARED_DATA } from "@/lib/fixtures/examinations-reference-fixture";

export default function StudentsAppearedCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Students Appeared</h3>
      <div className="flex items-center justify-center mb-4">
        <div className="w-24 h-24 rounded-full border-4 border-[#7c3aed] flex items-center justify-center">
          <span className="text-xl font-bold text-slate-900">{STUDENTS_APPEARED_DATA.total}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Boys</p>
          <p className="text-lg font-bold text-slate-900">{STUDENTS_APPEARED_DATA.boys}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Girls</p>
          <p className="text-lg font-bold text-slate-900">{STUDENTS_APPEARED_DATA.girls}</p>
        </div>
      </div>
    </div>
  );
}
