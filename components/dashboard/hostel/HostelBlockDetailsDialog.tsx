"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { OccupancyRow } from "@/lib/fixtures/hostel-management-reference-fixture";

interface HostelBlockDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  row: OccupancyRow | null;
}

export default function HostelBlockDetailsDialog({ open, onClose, row }: HostelBlockDetailsDialogProps) {
  if (!row) return null;

  return (
    <Modal open={open} onClose={onClose} title="Block Occupancy Details" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Block</p>
            <p className="text-sm font-semibold text-slate-900">{row.blockName}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Total Rooms</p>
            <p className="text-sm font-semibold text-slate-900">{row.totalRooms}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Total Beds</p>
            <p className="text-sm font-semibold text-slate-900">{row.totalBeds}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Occupied Beds</p>
            <p className="text-sm font-semibold text-slate-900">{row.occupiedBeds}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Vacant Beds</p>
            <p className="text-sm font-semibold text-slate-900">{row.vacantBeds}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Occupancy %</p>
            <p className="text-sm font-semibold text-slate-900">{row.occupancyPercent.toFixed(2)}%</p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-semibold text-slate-700 mb-2">Room Summary</p>
          <p className="text-sm text-slate-600">
            {row.blockName} has {row.totalRooms} rooms with {row.totalBeds} total beds. Currently {row.occupiedBeds} beds are occupied and {row.vacantBeds} beds are vacant.
          </p>
        </div>
      </div>
    </Modal>
  );
}
