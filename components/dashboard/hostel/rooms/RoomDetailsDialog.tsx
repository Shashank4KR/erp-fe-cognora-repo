"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { RoomRow } from "@/lib/fixtures/rooms-management-reference-fixture";

interface RoomDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  row: RoomRow | null;
}

export default function RoomDetailsDialog({ open, onClose, row }: RoomDetailsDialogProps) {
  if (!row) return null;

  const occupancyColor =
    row.occupancyPercent === 100
      ? "text-emerald-600 bg-emerald-50"
      : row.occupancyPercent === 0
        ? "text-rose-600 bg-rose-50"
        : "text-orange-600 bg-orange-50";

  return (
    <Modal open={open} onClose={onClose} title="Room Details" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Room Number</p>
            <p className="text-sm font-semibold text-slate-900">{row.roomNumber}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Block</p>
            <p className="text-sm font-semibold text-slate-900">{row.block}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Floor</p>
            <p className="text-sm font-semibold text-slate-900">{row.floor}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Room Type</p>
            <p className="text-sm font-semibold text-slate-900">{row.roomType}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Capacity (Beds)</p>
            <p className="text-sm font-semibold text-slate-900">{row.capacity}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Occupied Beds</p>
            <p className="text-sm font-semibold text-slate-900">{row.occupiedBeds}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Vacant Beds</p>
            <p className="text-sm font-semibold text-slate-900">{row.vacantBeds}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Occupancy %</p>
            <p className={`text-sm font-semibold inline-block rounded-full px-2.5 py-0.5 ${occupancyColor}`}>
              {row.occupancyPercent.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Status</p>
            <p className="text-sm font-semibold text-slate-900">{row.status}</p>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
