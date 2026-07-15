"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import {
  getAttendanceByDate,
  getAttendanceByClass,
  getClassAttendanceSummary,
  getSubjectAttendanceSummary,
} from "@/lib/services/attendanceService";
import { monthKey } from "@/lib/utils/attendance";
import type { AttendanceResponse } from "@/types/entities/attendance";

export type ReportMode = "report" | "daily" | "monthly";

interface AttendanceReportDrawerProps {
  open: boolean;
  onClose: () => void;
  token: string;
  mode: ReportMode;
  classId: string;
  dateISO?: string;
  subjects: { id: string; name: string }[];
  classLabel: string;
}

function counts(records: AttendanceResponse[]) {
  const present = records.filter((r) => r.status === "PRESENT").length;
  const absent = records.filter((r) => r.status === "ABSENT").length;
  const late = records.filter((r) => r.status === "LATE").length;
  const total = records.length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  return { present, absent, late, total, percentage };
}

export default function AttendanceReportDrawer({
  open,
  onClose,
  token,
  mode,
  classId,
  dateISO,
  subjects,
  classLabel,
}: AttendanceReportDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<AttendanceResponse[]>([]);
  const [classSummary, setClassSummary] = useState<{
    total_students: number;
    present: number;
    absent: number;
    late: number;
  } | null>(null);
  const [subjectSummaries, setSubjectSummaries] = useState<
    Record<string, { present: number; absent: number; late: number; total_records: number }>
  >({});

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      if (mode === "daily") {
        const all = await getAttendanceByDate(token, dateISO || "");
        setRecords(all.filter((r) => r.class_id === classId));
      } else if (mode === "monthly") {
        const all = await getAttendanceByClass(token, classId);
        const mk = dateISO ? monthKey(dateISO) : monthKey(new Date().toISOString().slice(0, 10));
        setRecords(all.filter((r) => monthKey(r.attendance_date) === mk));
      } else {
        const [cs, subs] = await Promise.all([
          getClassAttendanceSummary(token, classId),
          Promise.all(
            subjects.map((s) =>
              getSubjectAttendanceSummary(token, s.id).then((res) => [s.id, res] as const).catch(() => null),
            ),
          ),
        ]);
        setClassSummary(cs);
        const map: Record<string, { present: number; absent: number; late: number; total_records: number }> = {};
        subs.forEach((entry) => {
          if (entry) map[entry[0]] = entry[1];
        });
        setSubjectSummaries(map);

        const all = await getAttendanceByClass(token, classId);
        setRecords(all);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && classId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode, classId]);

  const title =
    mode === "daily"
      ? `Daily Summary — ${dateISO || ""}`
      : mode === "monthly"
        ? "Monthly Report"
        : "Attendance Report";

  const c = counts(records);

  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-2xl">
      <p className="text-xs text-slate-500 mb-4">{classLabel}</p>

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
        <div className="space-y-4 max-h-[55vh] overflow-y-auto">
          {mode !== "report" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Present" value={c.present} color="text-green-600" />
              <Stat label="Absent" value={c.absent} color="text-red-600" />
              <Stat label="Late" value={c.late} color="text-amber-600" />
              <Stat label="Attendance %" value={`${c.percentage}%`} color="text-[#6d28d9]" />
            </div>
          )}

          {mode === "report" && (
            <>
              {classSummary && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat label="Total Students" value={classSummary.total_students} />
                  <Stat label="Present" value={classSummary.present} color="text-green-600" />
                  <Stat label="Absent" value={classSummary.absent} color="text-red-600" />
                  <Stat label="Late" value={classSummary.late} color="text-amber-600" />
                </div>
              )}
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase">
                      <th className="px-4 py-3">Subject</th>
                      <th className="px-4 py-3">Present</th>
                      <th className="px-4 py-3">Absent</th>
                      <th className="px-4 py-3">Late</th>
                      <th className="px-4 py-3">Records</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">
                          No subjects mapped to this class.
                        </td>
                      </tr>
                    ) : (
                      subjects.map((s) => {
                        const sum = subjectSummaries[s.id];
                        return (
                          <tr key={s.id} className="border-b border-slate-50">
                            <td className="px-4 py-3 text-slate-800">{s.name}</td>
                            <td className="px-4 py-3 text-green-600">{sum?.present ?? 0}</td>
                            <td className="px-4 py-3 text-red-600">{sum?.absent ?? 0}</td>
                            <td className="px-4 py-3 text-amber-600">{sum?.late ?? 0}</td>
                            <td className="px-4 py-3 text-slate-600">{sum?.total_records ?? 0}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {mode !== "report" && records.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">
              No attendance records for this {mode === "daily" ? "date" : "month"}.
            </p>
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
