"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import {
  getAttendanceByStudent,
  updateAttendance,
} from "@/lib/services/attendanceService";
import { shortId } from "@/lib/utils/id";
import type { AttendanceResponse } from "@/types/entities/attendance";
import type { StudentResponse } from "@/types/entities/student";

interface AttendanceEditDialogProps {
  open: boolean;
  onClose: () => void;
  token: string;
  student: StudentResponse | null;
  classId: string;
  dateISO?: string;
  subjectId?: string;
  period?: string;
  subjectMap: Map<string, string>;
  onChanged: () => void;
  onMarkAttendance: () => void;
}

const studentName = (s: StudentResponse) =>
  `${s.first_name || ""} ${s.last_name || ""}`.trim() || s.admission_no || "Unknown";

export default function AttendanceEditDialog({
  open,
  onClose,
  token,
  student,
  classId,
  dateISO,
  subjectId,
  period,
  subjectMap,
  onChanged,
  onMarkAttendance,
}: AttendanceEditDialogProps) {
  const [records, setRecords] = useState<AttendanceResponse[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<"PRESENT" | "ABSENT" | "LATE">("PRESENT");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = async () => {
    if (!student) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const all = await getAttendanceByStudent(token, student.id);
      const filtered = all.filter(
        (r) =>
          r.class_id === classId &&
          (!dateISO || r.attendance_date === dateISO) &&
          (!subjectId || r.subject_id === subjectId) &&
          (!period || String(r.period_no) === String(period)),
      );
      setRecords(filtered);
      if (filtered.length > 0) {
        const exact =
          subjectId && dateISO && period
            ? filtered.find(
                (r) =>
                  r.subject_id === subjectId &&
                  r.attendance_date === dateISO &&
                  String(r.period_no) === String(period),
              )
            : undefined;
        const chosen = exact ?? filtered[0];
        setSelectedId(chosen.id);
        setStatus(chosen.status);
      } else {
        setSelectedId(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && student) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, student]);

  const handleSave = async () => {
    if (!selectedId) return;
    setSaving(true);
    setError(null);
    try {
      await updateAttendance(token, selectedId, { status });
      await load();
      onChanged();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update attendance.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Attendance" maxWidth="max-w-lg">
      {student && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-900">{studentName(student)}</p>
          <p className="text-xs text-slate-500">{student.admission_no}</p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-[#6d28d9]" />
          Loading…
        </div>
      ) : records.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-slate-500 mb-4">No Attendance record exists to edit.</p>
          <button
            onClick={onMarkAttendance}
            className="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Mark Attendance
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Record</label>
            <select
              value={selectedId ?? ""}
              onChange={(e) => {
                const rec = records.find((r) => r.id === e.target.value);
                setSelectedId(e.target.value);
                if (rec) setStatus(rec.status);
              }}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#6d28d9]"
            >
              {records.map((r) => (
                <option key={r.id} value={r.id}>
                  {subjectMap.get(r.subject_id) || shortId(r.subject_id)} · {r.attendance_date} · Period {r.period_no}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Status</label>
            <div className="flex items-center gap-4">
              {(["PRESENT", "ABSENT", "LATE"] as const).map((s) => (
                <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="edit-status"
                    checked={status === s}
                    onChange={() => setStatus(s)}
                    className="h-4 w-4 accent-[#6d28d9]"
                  />
                  <span className="text-xs text-slate-600">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !selectedId}
              className="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-70"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
