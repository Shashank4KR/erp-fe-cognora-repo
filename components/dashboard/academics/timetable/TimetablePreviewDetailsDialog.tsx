"use client";

import Modal from "@/components/shared/Modal";
import { Loader2, Pencil, Trash2, X } from "lucide-react";
import { type PreviewTimetableEntry } from "./timetableDisplayTypes";

interface TimetablePreviewDetailsDialogProps {
  open: boolean;
  entry: PreviewTimetableEntry | null;
  loading?: boolean;
  onClose: () => void;
  onEdit: (entry: PreviewTimetableEntry) => void;
  onRemove: (entry: PreviewTimetableEntry) => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2 text-sm">
      <span className="font-medium text-slate-400">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

export default function TimetablePreviewDetailsDialog({
  open,
  entry,
  loading = false,
  onClose,
  onEdit,
  onRemove,
}: TimetablePreviewDetailsDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Timetable Period" maxWidth="max-w-lg">
      {loading || !entry ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#6d28d9]" aria-label="Loading timetable period" />
        </div>
      ) : (
        <div>
          <DetailRow label="Subject" value={entry.subject} />
          <DetailRow label="Teacher" value={entry.teacher} />
          <DetailRow label="Class" value={entry.classGrade || "—"} />
          <DetailRow label="Section" value={entry.section || "—"} />
          <DetailRow label="Academic Year" value={entry.academicYear || "—"} />
          <DetailRow label="Day" value={entry.day} />
          <DetailRow label="Period" value={entry.periodLabel} />
          <DetailRow label="Time" value={`${entry.startTime} – ${entry.endTime}`} />
          <DetailRow label="Room" value={entry.room ?? "—"} />

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
              Close
            </button>
            <button
              type="button"
              onClick={() => onRemove(entry)}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            <button
              type="button"
              onClick={() => onEdit(entry)}
              className="flex items-center gap-1.5 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
