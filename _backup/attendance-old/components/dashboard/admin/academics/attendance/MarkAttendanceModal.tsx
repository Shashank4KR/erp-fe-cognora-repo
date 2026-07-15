"use client";

import { useState, useEffect, useRef, useMemo, type ReactNode } from "react";
import { X, Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";
import DatePicker from "@/components/shared/DatePicker";
import Badge from "@/components/shared/Badge";
import { getClassSubjects, getClassTeachers } from "@/lib/services/classService";
import { listStudents } from "@/lib/services/studentService";
import { toISODate } from "@/lib/utils/attendance";
import type { ClassResponse } from "@/types/entities/class";
import type { AttendanceResponse } from "@/types/entities/attendance";

export type AttendanceStudentRow = {
  id: string;
  rollNo: string;
  name: string;
  status?: "present" | "absent" | "late";
  existing?: boolean;
  attendanceId?: string;
};

export type MarkAttendancePayload = {
  class_id: string;
  subject_id: string;
  teacher_id: string;
  attendance_date: string;
  period_no: number;
  marked_by: string;
  records: { student_id: string; status: "PRESENT" | "ABSENT" | "LATE" }[];
};

interface MarkAttendanceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MarkAttendancePayload) => void;
  onRequestEdit?: (studentId: string) => void;
  token: string;
  classes: ClassResponse[];
  defaultClassId?: string;
  defaultDateISO?: string;
  attendanceRecords?: AttendanceResponse[];
  markedBy: string;
}

const STATUS_LABELS: Record<string, string> = {
  present: "Present",
  absent: "Absent",
  late: "Late",
};

export default function MarkAttendanceModal({
  open,
  onClose,
  onSubmit,
  onRequestEdit,
  token,
  classes,
  defaultClassId = "",
  defaultDateISO = "",
  attendanceRecords = [],
  markedBy,
}: MarkAttendanceModalProps) {
  const [classId, setClassId] = useState(defaultClassId);
  const [section, setSection] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [dateDisplay, setDateDisplay] = useState(
    defaultDateISO ? new Date(`${defaultDateISO}T00:00:00`).toLocaleDateString("en-US") : "",
  );

  const [subjects, setSubjects] = useState<{ value: string; label: string }[]>([]);
  const [teachers, setTeachers] = useState<{ value: string; label: string }[]>([]);
  const [students, setStudents] = useState<AttendanceStudentRow[]>([]);

  const [loadingData, setLoadingData] = useState(false);
  const [studentsLoaded, setStudentsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (open) {
      setClassId(defaultClassId);
      setDateDisplay(
        defaultDateISO
          ? new Date(`${defaultDateISO}T00:00:00`).toLocaleDateString("en-US")
          : new Date().toLocaleDateString("en-US"),
      );
      setSubjectId("");
      setTeacherId("");
      setStudents([]);
      setStudentsLoaded(false);
      setError(null);
    }
  }, [open, defaultClassId, defaultDateISO]);

  const selectedClass = classes.find((c) => c.id === classId);

  useEffect(() => {
    if (!open || !classId) {
      setSubjects([]);
      setTeachers([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoadingData(true);
      setError(null);
      try {
        const [subjectData, teacherData] = await Promise.all([
          getClassSubjects(token, classId),
          getClassTeachers(token, classId),
        ]);
        if (cancelled) return;
        setSubjects(
          subjectData.map((s) => ({ value: s.id, label: s.subject_name })),
        );
        setTeachers(
          teacherData.map((t) => ({ value: t.id, label: t.employee_id })),
        );
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load class data.");
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, classId, token]);

  useEffect(() => {
    if (selectedClass) setSection(selectedClass.section);
  }, [selectedClass]);

  const loadStudents = async () => {
    if (!classId) {
      setError("Please select a Class first.");
      return;
    }
    setLoadingData(true);
    setError(null);
    try {
      const all = await listStudents(token);
      const scoped = all.filter((s) => String(s.class_id) === String(classId));
      setStudents(
        scoped.map((s) => ({
          id: s.id,
          rollNo: s.roll_no || s.admission_no || s.id.slice(0, 4),
          name:
            `${s.first_name || ""} ${s.last_name || ""}`.trim() ||
            s.admission_no ||
            "Unknown",
        })),
      );
      setStudentsLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load students.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (open && classId) loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, classId, token]);

  const dateISO = toISODate(dateDisplay);

  const existingByStudent = useMemo(() => {
    const map = new Map<string, AttendanceResponse>();
    for (const r of attendanceRecords) {
      if (
        r.class_id === classId &&
        r.subject_id === subjectId &&
        r.attendance_date === dateISO &&
        Number(r.period_no) === 1
      ) {
        const prev = map.get(r.student_id);
        if (!prev || (r.updated_at ?? "") >= (prev.updated_at ?? "")) {
          map.set(r.student_id, r);
        }
      }
    }
    return map;
  }, [attendanceRecords, classId, subjectId, dateISO]);

  useEffect(() => {
    if (!studentsLoaded) return;
    setStudents((prev) =>
      prev.map((s) => {
        const ex = existingByStudent.get(s.id);
        if (ex) {
          return {
            ...s,
            status: ex.status.toLowerCase() as "present" | "absent" | "late",
            existing: true,
            attendanceId: ex.id,
          };
        }
        return { ...s, existing: false, attendanceId: undefined, status: undefined };
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingByStudent, studentsLoaded]);

  const updateStatus = (id: string, status: "present" | "absent" | "late") => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id || s.existing) return s;
        if (s.status === status) {
          return { ...s, status: undefined };
        }
        return { ...s, status };
      }),
    );
  };

  const markAll = (status: "present" | "absent" | "late") => {
    setStudents((prev) =>
      prev.map((s) => (s.existing ? s : { ...s, status })),
    );
  };

  const editableStudents = students.filter((s) => !s.existing);

  const canSubmit =
    !loadingData &&
    !submitting &&
    !!classId &&
    !!subjectId &&
    !!teacherId &&
    !!dateDisplay &&
    studentsLoaded &&
    students.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const payload: MarkAttendancePayload = {
        class_id: classId,
        subject_id: subjectId,
        teacher_id: teacherId,
        attendance_date: toISODate(dateDisplay),
        period_no: 1,
        marked_by: markedBy,
        records: students
          .filter((s) => !s.existing && s.status)
          .map((s) => ({
            student_id: s.id,
            status: s.status!.toUpperCase() as "PRESENT" | "ABSENT" | "LATE",
          })),
      };
      await onSubmit(payload);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const classOptions = classes.map((c) => ({
    value: c.id,
    label: `Grade ${c.class_name} — ${c.section}`,
  }));

  const statusBadge = (status?: string): ReactNode => {
    if (status === "present")
      return (
        <Badge variant="success" icon={<span className="w-2 h-2 rounded-full bg-green-500" />}>
          Present
        </Badge>
      );
    if (status === "absent")
      return (
        <Badge variant="error" icon={<span className="w-2 h-2 rounded-full bg-red-500" />}>
          Absent
        </Badge>
      );
    if (status === "late")
      return (
        <Badge variant="warning" icon={<span className="w-2 h-2 rounded-full bg-amber-500" />}>
          Late
        </Badge>
      );
    return <span className="text-xs text-slate-400">—</span>;
  };

  return (
    <Modal open={open} onClose={onClose} title="Mark Attendance" maxWidth="max-w-4xl">
      <div className="space-y-5">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Class / Grade</label>
            <Dropdown
              value={classId}
              items={classOptions}
              placeholder="Select Class"
              onChange={(v) => setClassId(v)}
              className="text-sm w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Section</label>
            <input
              type="text"
              value={section}
              readOnly
              placeholder="Auto"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Subject</label>
            <Dropdown
              value={subjectId}
              items={subjects}
              placeholder={loadingData ? "Loading…" : "Select Subject"}
              disabled={!classId || loadingData}
              onChange={(v) => setSubjectId(v)}
              className="text-sm w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Teacher</label>
            <Dropdown
              value={teacherId}
              items={teachers}
              placeholder={loadingData ? "Loading…" : "Select Teacher"}
              disabled={!classId || loadingData}
              onChange={(v) => setTeacherId(v)}
              className="text-sm w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Date</label>
            <DatePicker value={dateDisplay} onChange={setDateDisplay} />
          </div>
        </div>

        {studentsLoaded && students.length === 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            No Students are enrolled in this Class.
          </div>
        )}

        {studentsLoaded && students.length > 0 && (
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-700">
                Students ({students.length})
              </span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => markAll("present")} className="text-xs text-green-600 hover:underline">
                  Mark All Present
                </button>
                <button type="button" onClick={() => markAll("absent")} className="text-xs text-red-600 hover:underline">
                  Mark All Absent
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase">
                    <th className="px-4 py-3">Roll No</th>
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-slate-50">
                      <td className="px-4 py-3 text-slate-700">{student.rollNo}</td>
                      <td className="px-4 py-3 text-slate-900">{student.name}</td>
                      <td className="px-4 py-3">
                        {student.existing ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {statusBadge(student.status)}
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                              Already marked
                            </span>
                            <button
                              type="button"
                              onClick={() => onRequestEdit?.(student.id)}
                              className="text-[10px] font-semibold text-[#6d28d9] hover:underline"
                            >
                              Use Edit to change
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {(["present", "absent", "late"] as const).map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => updateStatus(student.id, status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                  student.status === status
                                    ? status === "present"
                                      ? "bg-green-100 text-green-700 border border-green-300"
                                      : status === "absent"
                                      ? "bg-red-100 text-red-700 border border-red-300"
                                      : "bg-amber-100 text-amber-700 border border-amber-300"
                                    : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                                }`}
                              >
                                {STATUS_LABELS[status]}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(loadingData || (!studentsLoaded && classId)) && (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin text-[#6d28d9]" />
            Loading students…
          </div>
        )}

        {!classId && (
          <div className="text-center py-6 text-sm text-slate-400">
            Select a Class to load Students, Subjects and Teachers.
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
