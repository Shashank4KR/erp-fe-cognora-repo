"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/shared/Modal";
import { EXAM_TYPE_COLORS, STATUS_COLORS } from "@/lib/fixtures/examinations-reference-fixture";
import { getExamById } from "@/lib/services/examService";
import { Loader2, RefreshCw } from "lucide-react";
import type { ExaminationRow } from "@/lib/fixtures/examinations-reference-fixture";

interface ExaminationDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  row: ExaminationRow | null;
  token: string | null;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ExaminationDetailsDialog({ open, onClose, row, token }: ExaminationDetailsDialogProps) {
  const [detail, setDetail] = useState<ExaminationRow | null>(row);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!open) {
      setDetail(row);
      setLoading(false);
      setError(null);
      setNotFound(false);
      return;
    }
    if (!row?.id || !token) {
      setDetail(row);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    setNotFound(false);
    getExamById(token, row.id)
      .then((res) => {
        if (cancelled) return;
        const exam = res;
        const now = new Date();
        const start = new Date(exam.start_date);
        const end = new Date(exam.end_date);
        let status: "Upcoming" | "Ongoing" | "Completed";
        if (now < start) status = "Upcoming";
        else if (now > end) status = "Completed";
        else status = "Ongoing";
        setDetail({
          id: exam.id,
          displayCode: `EXAM-${exam.id.slice(0, 6).toUpperCase()}`,
          examName: exam.exam_name,
          type: exam.exam_type,
          classGrade: "",
          classId: exam.class_id,
          term: "",
          schedule: `${formatDate(exam.start_date)} - ${formatDate(exam.end_date)}`,
          subjects: "",
          students: 0,
          status,
          startDate: exam.start_date,
          endDate: exam.end_date,
          maxMarks: exam.max_marks,
          createdAt: exam.created_at,
          updatedAt: exam.updated_at,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Failed to load examination details.";
        if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
          setNotFound(true);
        } else {
          setError(msg);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, row?.id, token]);

  if (!detail && !loading && !error && !notFound) return null;

  return (
    <Modal open={open} onClose={onClose} title="Examination Details" maxWidth="max-w-lg">
      <div className="space-y-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-[#7c3aed]" />
            <p className="text-xs text-slate-500">Loading examination details...</p>
          </div>
        )}
        {notFound && (
          <div className="text-center py-8">
            <p className="text-sm text-slate-600 mb-3">Examination not found.</p>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        )}
        {error && !notFound && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                if (row?.id && token) {
                  getExamById(token, row.id)
                    .then((res) => {
                      const exam = res;
                      const now = new Date();
                      const start = new Date(exam.start_date);
                      const end = new Date(exam.end_date);
                      let status: "Upcoming" | "Ongoing" | "Completed";
                      if (now < start) status = "Upcoming";
                      else if (now > end) status = "Completed";
                      else status = "Ongoing";
                      setDetail({
                        id: exam.id,
                        displayCode: `EXAM-${exam.id.slice(0, 6).toUpperCase()}`,
                        examName: exam.exam_name,
                        type: exam.exam_type,
                        classGrade: "",
                        classId: exam.class_id,
                        term: "",
                        schedule: `${formatDate(exam.start_date)} - ${formatDate(exam.end_date)}`,
                        subjects: "",
                        students: 0,
                        status,
                        startDate: exam.start_date,
                        endDate: exam.end_date,
                        maxMarks: exam.max_marks,
                        createdAt: exam.created_at,
                        updatedAt: exam.updated_at,
                      });
                    })
                    .catch((err) => {
                      const msg = err instanceof Error ? err.message : "Failed to load examination details.";
                      if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
                        setNotFound(true);
                      } else {
                        setError(msg);
                      }
                    })
                    .finally(() => setLoading(false));
                }
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}
        {detail && !loading && !notFound && (
          <>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-purple-50 text-purple-700 border-purple-100">
                {detail.displayCode}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[detail.status] || "bg-slate-50 text-slate-700 border-slate-100"}`}>
                {detail.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Examination Name</p>
                <p className="text-sm font-semibold text-slate-900">{detail.examName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Type</p>
                <p className="text-sm font-semibold text-slate-900">{detail.type}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Class / Grade</p>
                <p className="text-sm font-semibold text-slate-900">{detail.classGrade || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Term</p>
                <p className="text-sm font-semibold text-slate-900">{detail.term || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Exam Period Start</p>
                <p className="text-sm font-semibold text-slate-900">{formatDate(detail.startDate)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Exam Period End</p>
                <p className="text-sm font-semibold text-slate-900">{formatDate(detail.endDate)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Maximum Marks</p>
                <p className="text-sm font-semibold text-slate-900">{detail.maxMarks}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Schedule</p>
                <p className="text-sm font-semibold text-slate-900">{detail.schedule}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Subjects</p>
                <p className="text-sm font-semibold text-slate-900">{detail.subjects || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Students</p>
                <p className="text-sm font-semibold text-slate-900">{detail.students || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Created</p>
                <p className="text-sm font-semibold text-slate-900">{formatDateTime(detail.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Updated</p>
                <p className="text-sm font-semibold text-slate-900">{formatDateTime(detail.updatedAt)}</p>
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
          </>
        )}
      </div>
    </Modal>
  );
}
