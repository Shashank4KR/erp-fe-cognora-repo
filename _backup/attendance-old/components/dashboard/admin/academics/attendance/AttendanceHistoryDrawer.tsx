"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Loader2, Trash2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import {
  getAttendanceByStudent,
  getStudentAttendanceSummary,
  getStudentAttendanceReport,
  deleteAttendance,
} from "@/lib/services/attendanceService";
import { shortId } from "@/lib/utils/id";
import { startOfMonthISO, endOfMonthISO, todayISO } from "@/lib/utils/attendance";
import type {
  AttendanceResponse,
  StudentAttendanceSummary,
  StudentAttendanceReport,
} from "@/types/entities/attendance";
import type { StudentResponse } from "@/types/entities/student";

interface AttendanceHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  token: string;
  student: StudentResponse | null;
  classId: string;
  dateISO?: string;
  subjectMap: Map<string, string>;
  teacherMap: Map<string, string>;
  onChanged: () => void;
}

const studentName = (s: StudentResponse) =>
  `${s.first_name || ""} ${s.last_name || ""}`.trim() || s.admission_no || "Unknown";

const statusVariant = (s: string) =>
  s === "PRESENT" ? "success" : s === "ABSENT" ? "error" : "warning";

type Tab = "History" | "Summary" | "Report";

export default function AttendanceHistoryDrawer({
  open,
  onClose,
  token,
  student,
  classId,
  dateISO,
  subjectMap,
  teacherMap,
  onChanged,
}: AttendanceHistoryDrawerProps) {
  const [tab, setTab] = useState<Tab>("History");
  const [history, setHistory] = useState<AttendanceResponse[]>([]);
  const [summary, setSummary] = useState<StudentAttendanceSummary | null>(null);
  const [report, setReport] = useState<StudentAttendanceReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportStart, setReportStart] = useState("");
  const [reportEnd, setReportEnd] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  const defaultStart = useMemo(
    () => (dateISO ? startOfMonthISO(dateISO) : startOfMonthISO(todayISO())),
    [dateISO],
  );
  const defaultEnd = useMemo(
    () => (dateISO ? endOfMonthISO(dateISO) : endOfMonthISO(todayISO())),
    [dateISO],
  );

  const loadAll = async () => {
    if (!student) return;
    setLoading(true);
    setError(null);
    try {
      const [hist, sum] = await Promise.all([
        getAttendanceByStudent(token, student.id),
        getStudentAttendanceSummary(token, student.id).catch(() => null),
      ]);
      setHistory(hist.filter((r) => r.class_id === classId));
      setSummary(sum);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  const loadReport = async () => {
    if (!student || !reportStart || !reportEnd) return;
    if (reportStart > reportEnd) {
      setError("Start Date cannot be after End Date.");
      return;
    }
    setReportLoading(true);
    setError(null);
    try {
      const data = await getStudentAttendanceReport(token, student.id, reportStart, reportEnd);
      setReport(data);
    } catch (err) {
      setReport(null);
      const msg = err instanceof Error ? err.message : "Failed to load report.";
      if (/field required|query\.|validation/i.test(msg)) {
        setError("Unable to load the attendance report. Please try again.");
      } else {
        setError(msg);
      }
    } finally {
      setReportLoading(false);
    }
  };

  useEffect(() => {
    if (open && student) {
      setReportStart(defaultStart);
      setReportEnd(defaultEnd);
      setReport(null);
      setError(null);
    }
  }, [open, student, defaultStart, defaultEnd]);

  const handleApplyReportRange = () => {
    if (reportStart > reportEnd) {
      setError("Start Date cannot be after End Date.");
      return;
    }
    loadReport();
  };

  useEffect(() => {
    if (open && student) {
      setTab("History");
      loadAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, student]);

  useEffect(() => {
    if (open && student && tab === "Report" && reportStart && reportEnd) {
      loadReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, student, tab, reportStart, reportEnd]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAttendance(token, id);
      setHistory((prev) => prev.filter((r) => r.id !== id));
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete record.");
    }
  };

  const tabs: Tab[] = ["History", "Summary", "Report"];

  return (
    <Modal open={open} onClose={onClose} title="Student Attendance History" maxWidth="max-w-2xl">
      {student && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-900">{studentName(student)}</p>
          <p className="text-xs text-slate-500">{student.admission_no}</p>
        </div>
      )}

      <div className="flex gap-2 mb-4 border-b border-slate-100">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition ${
              tab === t
                ? "border-[#6d28d9] text-[#6d28d9]"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

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
      ) : (
        <div className="max-h-[55vh] overflow-y-auto">
          {tab === "History" &&
            (history.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-400">No attendance history.</p>
            ) : (
              <div className="space-y-2">
                {history.map((r) => (
                  <div key={r.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                    <div className="flex items-center gap-3">
                      <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                      <span className="text-sm text-slate-700">{subjectMap.get(r.subject_id) || shortId(r.subject_id)}</span>
                      <span className="text-xs text-slate-500">{r.attendance_date} · P{r.period_no}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ))}

          {tab === "Summary" &&
            (summary ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Stat label="Total Classes" value={summary.total_classes} />
                <Stat label="Present" value={summary.present} color="text-green-600" />
                <Stat label="Absent" value={summary.absent} color="text-red-600" />
                <Stat label="Late" value={summary.late} color="text-amber-600" />
                <Stat label="Percentage" value={`${summary.attendance_percentage}%`} color="text-[#6d28d9]" />
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-slate-400">No summary available.</p>
            ))}

          {tab === "Report" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Start Date</label>
                  <input
                    type="date"
                    value={reportStart}
                    onChange={(e) => setReportStart(e.target.value)}
                    className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">End Date</label>
                  <input
                    type="date"
                    value={reportEnd}
                    onChange={(e) => setReportEnd(e.target.value)}
                    min={reportStart || undefined}
                    className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  onClick={handleApplyReportRange}
                  disabled={reportLoading || !reportStart || !reportEnd}
                  className="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-70"
                >
                  {reportLoading ? "Loading…" : "Apply"}
                </button>
              </div>

              {reportLoading ? (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
                  <Loader2 className="h-5 w-5 animate-spin text-[#6d28d9]" />
                  Loading…
                </div>
              ) : report && report.records.length > 0 ? (
                <div className="space-y-2">
                  {report.records
                    .filter((r) => r.class_id === classId)
                    .map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                        <div className="flex items-center gap-3">
                          <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                          <span className="text-sm text-slate-700">{subjectMap.get(r.subject_id) || shortId(r.subject_id)}</span>
                          <span className="text-xs text-slate-500">{r.attendance_date} · P{r.period_no}</span>
                        </div>
                        <span className="text-xs text-slate-400">{teacherMap.get(r.teacher_id) || shortId(r.teacher_id)}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="py-10 text-center text-sm text-slate-400">No report records are available for the selected period.</p>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function Stat({ label, value, color = "text-slate-900" }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
