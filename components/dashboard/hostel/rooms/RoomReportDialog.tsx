"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";

interface RoomReportDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function RoomReportDialog({ open, onClose }: RoomReportDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Room Report" maxWidth="max-w-lg">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">Room Report preview would be generated here. This will be connected to backend during integration.</p>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
