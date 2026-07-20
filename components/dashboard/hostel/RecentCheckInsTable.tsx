"use client";

import { Eye } from "lucide-react";
import Card from "@/components/shared/Card";
import type { CheckInRow } from "@/lib/fixtures/hostel-management-reference-fixture";

interface RecentCheckInsTableProps {
  rows: CheckInRow[];
  onView: (row: CheckInRow) => void;
  onViewAll: () => void;
}

export default function RecentCheckInsTable({ rows, onView, onViewAll }: RecentCheckInsTableProps) {
  return (
    <Card className="flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Recent Check-Ins</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Roll No.</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Room No.</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Block</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Check-In Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                      {row.initials}
                    </div>
                    <span className="font-medium text-slate-700">{row.studentName}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600">{row.rollNo}</td>
                <td className="px-5 py-3 text-slate-600">{row.roomNo}</td>
                <td className="px-5 py-3 text-slate-600">{row.block}</td>
                <td className="px-5 py-3 text-slate-600">{row.checkInDate}</td>
                <td className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() => onView(row)}
                    aria-label={`View ${row.studentName} details`}
                    className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3">
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-semibold text-[#7c3aed] hover:text-[#6d28d9] transition inline-flex items-center gap-1"
        >
          View All Check-Ins
          <span className="text-[#7c3aed]">→</span>
        </button>
      </div>
    </Card>
  );
}
