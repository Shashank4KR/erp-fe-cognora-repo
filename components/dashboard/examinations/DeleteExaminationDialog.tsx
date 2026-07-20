"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { Loader2 } from "lucide-react";
import type { ExaminationRow } from "@/lib/fixtures/examinations-reference-fixture";

interface DeleteExaminationDialogProps {
  open: boolean;
  onClose: () => void;
  row: ExaminationRow | null;
  onConfirm: () => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function DeleteExaminationDialog({
  open,
  onClose,
  row,
  onConfirm,
  loading = false,
  error = null,
}: DeleteExaminationDialogProps) {
  const [confirming, setConfirming] = useState(false);

  if (!row) return null;

  const handleConfirm = async () => {
    if (confirming) return;
    setConfirming(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setConfirming(false);
    }
  };

  const handleClose = () => {
    if (confirming) return;
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Delete Examination" maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <span className="font-semibold text-slate-900">{row.displayCode} — {row.examName}</span>? This action cannot be undone.
        </p>
        {row.classGrade && (
          <p className="text-xs text-slate-500">Class: {row.classGrade}</p>
        )}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={handleClose}
            disabled={confirming}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50 inline-flex items-center gap-2"
          >
            {confirming && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
