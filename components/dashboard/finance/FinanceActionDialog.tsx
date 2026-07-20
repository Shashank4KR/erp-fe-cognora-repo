"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";

interface FinanceActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
}

export default function FinanceActionDialog({ open, onClose, title, message, onConfirm }: FinanceActionDialogProps) {
  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-slate-600 mb-6">{message}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
}
