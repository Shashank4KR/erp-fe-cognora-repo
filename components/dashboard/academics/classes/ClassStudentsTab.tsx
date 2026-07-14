"use client";

import { useState, useMemo } from "react";

export default function ClassStudentsTab({
  students,
  classOptions,
}: {
  students: { id: string; admission_no: string; first_name: string | null; last_name: string | null; roll_no: string | null; class_id: string }[];
  classOptions: { id: string; label: string }[];
}) {
  const [search, setSearch] = useState("");

  const classById = useMemo(() => {
    const map = new Map<string, string>();
    classOptions.forEach((c) => map.set(String(c.id), c.label));
    return map;
  }, [classOptions]);

  const classLabel = (classId: string): string => {
    if (!classId) return "—";
    return classById.get(String(classId)) ?? "—";
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return students.filter((s) => {
      if (!term) return true;
      const name = `${s.first_name || ""} ${s.last_name || ""}`.toLowerCase();
      return (
        name.includes(term) ||
        s.admission_no.toLowerCase().includes(term) ||
        (s.roll_no && s.roll_no.toLowerCase().includes(term))
      );
    });
  }, [students, search]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search students..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 py-8 text-center">No students found in this class.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase">
                <th className="px-4 py-3">Admission No.</th>
                <th className="px-4 py-3">Roll No.</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Class</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                  <td className="px-4 py-3 font-mono text-xs">{s.admission_no}</td>
                  <td className="px-4 py-3">{s.roll_no || "—"}</td>
                  <td className="px-4 py-3 font-medium">
                    {s.first_name || ""} {s.last_name || ""}
                  </td>
                  <td className="px-4 py-3">{classLabel(s.class_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
