"use client";

import { useState } from "react";
import { Eye, Pencil, MoreVertical } from "lucide-react";
import Card from "@/components/shared/Card";
import type { RoomRow } from "@/lib/fixtures/rooms-management-reference-fixture";

interface RoomListTableProps {
  rows: RoomRow[];
  onView: (row: RoomRow) => void;
  onEdit: (row: RoomRow) => void;
  onMore: (row: RoomRow) => void;
}

export default function RoomListTable({ rows, onView, onEdit, onMore }: RoomListTableProps) {
  return (
    <Card className="flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Room List</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Room No.</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Block</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Floor</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Room Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Capacity (Beds)</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Occupied Beds</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Vacant Beds</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Occupancy %</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <RoomRow key={row.id} row={row} onView={() => onView(row)} onEdit={() => onEdit(row)} onMore={() => onMore(row)} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

interface RoomRowProps {
  row: RoomRow;
  onView: () => void;
  onEdit: () => void;
  onMore: () => void;
}

function RoomRow({ row, onView, onEdit, onMore }: RoomRowProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const occupancyColor =
    row.occupancyPercent === 100
      ? "bg-emerald-500"
      : row.occupancyPercent === 0
        ? "bg-rose-500"
        : "bg-orange-400";

  const statusBadge =
    row.status === "Occupied"
      ? "bg-blue-50 text-blue-700"
      : row.status === "Partially Vacant"
        ? "bg-orange-50 text-orange-600"
        : row.status === "Vacant"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600";

  return (
    <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
      <td className="px-5 py-3 font-medium text-slate-700">{row.roomNumber}</td>
      <td className="px-5 py-3 text-slate-600">{row.block}</td>
      <td className="px-5 py-3 text-slate-600">{row.floor}</td>
      <td className="px-5 py-3 text-slate-600">{row.roomType}</td>
      <td className="px-5 py-3 text-slate-600">{row.capacity}</td>
      <td className="px-5 py-3 text-slate-600">{row.occupiedBeds}</td>
      <td className="px-5 py-3 text-slate-600">{row.vacantBeds}</td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
            <div
              className={`h-full rounded-full ${occupancyColor}`}
              style={{ width: `${Math.min(row.occupancyPercent, 100)}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-600 min-w-[48px] text-right">
            {row.occupancyPercent.toFixed(2)}%
          </span>
        </div>
      </td>
      <td className="px-5 py-3">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge}`}>
          {row.status}
        </span>
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onView}
            aria-label={`View room ${row.roomNumber}`}
            className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit room ${row.roomNumber}`}
            className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100 transition"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((o) => !o)}
              aria-label={`More actions for room ${row.roomNumber}`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 transition"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
            {moreOpen && (
              <>
                <div className="fixed inset-0 z-[90]" onClick={() => setMoreOpen(false)} />
                <div className="absolute right-0 z-[100] mt-1 min-w-max overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                  {["Allocate Student", "Transfer Student", "Mark Maintenance", "View Occupants", "Check-Out All", "Delete Room"].map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setMoreOpen(false);
                          onMore();
                        }}
                        className="block w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-purple-50 transition"
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
