"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";

interface FeesActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function FeesActionDialog({ open, onClose, title, message }: FeesActionDialogProps) {
  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-md">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-600 mb-4">{message}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
