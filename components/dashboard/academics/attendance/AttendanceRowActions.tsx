"use client";

import { useState } from "react";
import { Eye, Pencil, History } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { AttendanceTableRow } from "./AttendanceTable";

interface AttendanceRowActionsProps {
  student: AttendanceTableRow;
}

export default function AttendanceRowActions({ student }: AttendanceRowActionsProps) {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setViewOpen(true)}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-purple-50 text-[#7c3aed] hover:bg-purple-100 transition"
          aria-label={`View attendance for ${student.name}`}
          title="View"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setEditOpen(true)}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          aria-label={`Edit attendance for ${student.name}`}
          title="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setHistoryOpen(true)}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition"
          aria-label={`View history for ${student.name}`}
          title="History"
        >
          <History className="h-3.5 w-3.5" />
        </button>
      </div>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title={`Attendance — ${student.name}`} maxWidth="max-w-md">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold text-[#7c3aed]">
              {student.initials}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{student.name}</p>
              <p className="text-xs text-slate-500">Roll No. {student.rollNo}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs text-slate-500">Present</p>
              <p className="text-lg font-bold text-emerald-600">{student.presentCount}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs text-slate-500">Absent</p>
              <p className="text-lg font-bold text-red-600">{student.absentCount}</p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-500">Overall Attendance</p>
            <p className="text-2xl font-bold text-slate-900">{student.overall}%</p>
          </div>
        </div>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={`Edit Attendance — ${student.name}`} maxWidth="max-w-md">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This is a UI-only placeholder. Attendance editing form will be connected to the backend in the integration phase.
          </p>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            No backend API is connected in this phase.
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setEditOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={historyOpen} onClose={() => setHistoryOpen(false)} title={`Attendance History — ${student.name}`} maxWidth="max-w-md">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Attendance history will be populated from the backend in the integration phase.
          </p>
          <div className="rounded-lg border border-slate-200 divide-y divide-slate-100">
            {["12 May 2025 — Present", "11 May 2025 — Present", "10 May 2025 — Absent", "9 May 2025 — Present"].map((entry) => (
              <div key={entry} className="px-4 py-2.5 text-sm text-slate-700">{entry}</div>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setHistoryOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
