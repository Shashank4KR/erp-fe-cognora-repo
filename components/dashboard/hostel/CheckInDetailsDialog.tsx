"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { CheckInRow } from "@/lib/fixtures/hostel-management-reference-fixture";

interface CheckInDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  row: CheckInRow | null;
}

export default function CheckInDetailsDialog({ open, onClose, row }: CheckInDetailsDialogProps) {
  if (!row) return null;

  return (
    <Modal open={open} onClose={onClose} title="Check-In Details" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Student Name</p>
            <p className="text-sm font-semibold text-slate-900">{row.studentName}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Roll No.</p>
            <p className="text-sm font-semibold text-slate-900">{row.rollNo}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Room No.</p>
            <p className="text-sm font-semibold text-slate-900">{row.roomNo}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500 mb-1">Block</p>
            <p className="text-sm font-semibold text-slate-900">{row.block}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 col-span-2">
            <p className="text-xs text-slate-500 mb-1">Check-In Date</p>
            <p className="text-sm font-semibold text-slate-900">{row.checkInDate}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
