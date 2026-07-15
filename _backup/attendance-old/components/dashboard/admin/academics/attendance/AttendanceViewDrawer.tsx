"use client";

import { useEffect, useState } from "react";
import { X, Trash2, Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import {
  getAttendanceByStudent,
  deleteAttendance,
} from "@/lib/services/attendanceService";
import { formatDateTime, shortId } from "@/lib/utils/id";
import type { AttendanceResponse } from "@/types/entities/attendance";
import type { StudentResponse } from "@/types/entities/student";

interface AttendanceViewDrawerProps {
  open: boolean;
  onClose: () => void;
  token: string;
  student: StudentResponse | null;
  classId: string;
  dateISO?: string;
  subjectId?: string;
  subjectMap: Map<string, string>;
  teacherMap: Map<string, string>;
  onChanged: () => void;
}

const statusVariant = (s: string) =>
  s === "PRESENT" ? "success" : s === "ABSENT" ? "error" : "warning";

const studentName = (s: StudentResponse) =>
  `${s.first_name || ""} ${s.last_name || ""}`.trim() || s.admission_no || "Unknown";

export default function AttendanceViewDrawer({
  open,
  onClose,
  token,
  student,
  classId,
  dateISO,
  subjectId,
  subjectMap,
  teacherMap,
  onChanged,
}: AttendanceViewDrawerProps) {
  const [records, setRecords] = useState<AttendanceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    if (!student) return;
    setLoading(true);
    setError(null);
    try {
      const all = await getAttendanceByStudent(token, student.id);
      const filtered = all.filter(
        (r) =>
          r.class_id === classId &&
          (!dateISO || r.attendance_date === dateISO) &&
          (!subjectId || r.subject_id === subjectId),
      );
      setRecords(filtered);
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

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAttendance(token, id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete record.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Attendance Details" maxWidth="max-w-2xl">
      {student && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-900">{studentName(student)}</p>
          <p className="text-xs text-slate-500">
            {student.admission_no} · Roll {student.roll_no || "—"}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-[#6d28d9]" />
          Loading…
        </div>
      ) : records.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-400">
          No attendance records for the selected scope.
        </div>
      ) : (
        <div className="space-y-3 max-h-[55vh] overflow-y-auto">
          {records.map((r) => (
            <div key={r.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                  <span className="text-sm font-medium text-slate-800">
                    {subjectMap.get(r.subject_id) || shortId(r.subject_id)}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={deletingId === r.id}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
                  title="Delete record"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>Date: {r.attendance_date}</span>
                <span>Period: {r.period_no}</span>
                <span>Teacher: {teacherMap.get(r.teacher_id) || shortId(r.teacher_id)}</span>
                <span>Marked by: {shortId(r.marked_by)}</span>
                <span>Created: {formatDateTime(r.created_at)}</span>
                <span>Updated: {formatDateTime(r.updated_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
