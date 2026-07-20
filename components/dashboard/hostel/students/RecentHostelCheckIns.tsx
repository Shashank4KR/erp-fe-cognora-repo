"use client";

import Card from "@/components/shared/Card";
import type { CheckInRow } from "@/lib/fixtures/hostel-students-reference-fixture";

interface RecentHostelCheckInsProps {
  rows: CheckInRow[];
  onViewAll: () => void;
}

export default function RecentHostelCheckIns({ rows, onViewAll }: RecentHostelCheckInsProps) {
  return (
    <Card>
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Recent Check-Ins</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Student Name
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Room No.
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Block
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Check-In Date
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Guardian Name
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Contact No.
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-3 font-medium text-slate-700">{row.studentName}</td>
                <td className="px-5 py-3 text-slate-600">{row.roomNo}</td>
                <td className="px-5 py-3 text-slate-600">{row.block}</td>
                <td className="px-5 py-3 text-slate-600">{row.checkInDate}</td>
                <td className="px-5 py-3 text-slate-600">{row.guardianName}</td>
                <td className="px-5 py-3 text-slate-600">{row.contactNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end px-5 py-3">
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-semibold text-[#7c3aed] hover:text-[#6d28d9] transition flex items-center gap-1"
        >
          View All Check-Ins
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Card>
  );
}
