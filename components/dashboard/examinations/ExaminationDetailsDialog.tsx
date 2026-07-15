"use client";

import Modal from "@/components/shared/Modal";
import { ExaminationRow, EXAM_CODE_COLORS, EXAM_TYPE_COLORS, STATUS_COLORS } from "@/lib/fixtures/examinations-reference-fixture";

interface ExaminationDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  row: ExaminationRow | null;
}

export default function ExaminationDetailsDialog({ open, onClose, row }: ExaminationDetailsDialogProps) {
  if (!row) return null;

  return (
    <Modal open={open} onClose={onClose} title="Examination Details" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${EXAM_CODE_COLORS[row.examCode] || "bg-slate-50 text-slate-700 border-slate-100"}`}>
            {row.examCode}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[row.status] || "bg-slate-50 text-slate-700 border-slate-100"}`}>
            {row.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Examination Name</p>
            <p className="text-sm font-semibold text-slate-900">{row.examName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Type</p>
            <p className="text-sm font-semibold text-slate-900">{row.type}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Class / Grade</p>
            <p className="text-sm font-semibold text-slate-900">{row.classGrade}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Term</p>
            <p className="text-sm font-semibold text-slate-900">{row.term}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Schedule</p>
            <p className="text-sm font-semibold text-slate-900">{row.schedule}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Subjects</p>
            <p className="text-sm font-semibold text-slate-900">{row.subjects}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Students</p>
            <p className="text-sm font-semibold text-slate-900">{row.students}</p>
          </div>
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
