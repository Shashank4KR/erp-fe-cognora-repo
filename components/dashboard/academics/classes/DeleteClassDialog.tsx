"use client";

import Modal from "@/components/shared/Modal";
import { Loader2 } from "lucide-react";
import type { ClassResponse } from "@/types/entities/class";

export default function DeleteClassDialog({
  open,
  onClose,
  onConfirm,
  submitting,
  formError,
  item,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  submitting: boolean;
  formError: string | null;
  item: ClassResponse | null;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Confirmation" maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete the class <span className="font-semibold">{item?.class_name}</span> -{" "}
          <span className="font-semibold">{item?.section}</span>? This action cannot be undone.
        </p>
        <p className="text-xs text-slate-500">
          Deletion may fail if this class is already linked to Students, Timetable, Attendance, Exams, or Subjects.
        </p>
        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </p>
        )}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-70"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
