"use client";

import Modal from "@/components/shared/Modal";
import { ExaminationRow } from "@/lib/fixtures/examinations-reference-fixture";

interface DeleteExaminationDialogProps {
  open: boolean;
  onClose: () => void;
  row: ExaminationRow | null;
  onConfirm: () => void;
}

export default function DeleteExaminationDialog({ open, onClose, row, onConfirm }: DeleteExaminationDialogProps) {
  if (!row) return null;

  return (
    <Modal open={open} onClose={onClose} title="Delete Examination" maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <span className="font-semibold text-slate-900">{row.examCode} — {row.examName}</span>? This action cannot be undone.
        </p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          No backend API is connected in this phase. This is a UI-only action.
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
