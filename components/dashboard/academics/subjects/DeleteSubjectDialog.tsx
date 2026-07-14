"use client";

import Modal from "@/components/shared/Modal";
import { Loader2, AlertTriangle } from "lucide-react";
import type { SubjectResponse } from "@/types/entities/subject";

export default function DeleteSubjectDialog({
  open,
  onClose,
  onConfirm,
  submitting,
  formError,
  item,
  classCount = 0,
  teacherCount = 0,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  submitting: boolean;
  formError: string | null;
  item: SubjectResponse | null;
  classCount?: number;
  teacherCount?: number;
}) {
  if (!item) return null;

  return (
    <Modal open={open} onClose={onClose} title="Delete Confirmation" maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete the subject{" "}
              <span className="font-semibold text-slate-900">{item.subject_name}</span>{" "}
              (<span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">{item.subject_code}</span>)?
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm text-amber-800">
            This subject is linked to{" "}
            <span className="font-semibold">{classCount}</span>{" "}
            {classCount === 1 ? "class" : "classes"} and{" "}
            <span className="font-semibold">{teacherCount}</span>{" "}
            {teacherCount === 1 ? "teacher" : "teachers"}.
          </p>
          <p className="text-xs text-amber-700 mt-1">
            If deletion fails, remove the assignments first and try again.
          </p>
        </div>

        {formError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 active:scale-[0.98] transition disabled:opacity-70"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete Subject"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
