"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";

interface ExpenseActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  showConfirm?: boolean;
  destructive?: boolean;
}

export default function ExpenseActionDialog({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  showConfirm = true,
  destructive = false,
}: ExpenseActionDialogProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-600 mb-6">{message}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          {showConfirm && (
            <button
              type="button"
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                destructive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#7c3aed] hover:brightness-110"
              }`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
