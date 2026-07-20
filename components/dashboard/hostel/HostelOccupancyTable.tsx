"use client";

import { Eye } from "lucide-react";
import Card from "@/components/shared/Card";
import type { OccupancyRow } from "@/lib/fixtures/hostel-management-reference-fixture";

interface HostelOccupancyTableProps {
  rows: OccupancyRow[];
  onView: (row: OccupancyRow) => void;
}

export default function HostelOccupancyTable({ rows, onView }: HostelOccupancyTableProps) {
  return (
    <Card className="flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Hostel Occupancy Overview</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Block Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Rooms</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Beds</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Occupied Beds</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Vacant Beds</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Occupancy %</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.blockName}
                className={`border-b border-slate-50 last:border-0 ${
                  row.isTotal ? "bg-slate-50/80" : "hover:bg-slate-50/50"
                }`}
              >
                <td className={`px-5 py-3 font-medium ${row.isTotal ? "text-slate-900" : "text-slate-700"}`}>
                  {row.blockName}
                </td>
                <td className="px-5 py-3 text-slate-600">{row.totalRooms}</td>
                <td className="px-5 py-3 text-slate-600">{row.totalBeds}</td>
                <td className="px-5 py-3 text-slate-600">{row.occupiedBeds}</td>
                <td className="px-5 py-3 text-slate-600">{row.vacantBeds}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                      <div
                        className={`h-full rounded-full ${row.color}`}
                        style={{ width: `${Math.min(row.occupancyPercent, 100)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${row.isTotal ? "text-slate-900" : "text-slate-600"} min-w-[48px] text-right`}>
                      {row.occupancyPercent.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  {!row.isTotal && (
                    <button
                      type="button"
                      onClick={() => onView(row)}
                      aria-label={`View ${row.blockName} details`}
                      className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
