"use client";

import Modal from "@/components/shared/Modal";

interface ExaminationActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function ExaminationActionDialog({ open, onClose, title, message }: ExaminationActionDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">{message}</p>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
          No backend API is connected in this phase.
        </div>
        <div className="flex items-center justify-end">
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
