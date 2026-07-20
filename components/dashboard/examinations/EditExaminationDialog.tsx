"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/shared/Modal";
import { EXAM_TYPE_OPTIONS } from "@/lib/fixtures/examinations-reference-fixture";
import DatePicker from "@/components/shared/DatePicker";
import type { ClassResponse } from "@/types/entities/class";
import type { ExaminationRow } from "@/lib/fixtures/examinations-reference-fixture";

interface EditExaminationDialogProps {
  open: boolean;
  onClose: () => void;
  row: ExaminationRow | null;
  classes: ClassResponse[];
  onSave: (payload: {
    exam_name: string;
    exam_type: string;
    class_id: string;
    start_date: string;
    end_date: string;
    max_marks: number;
  }) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function EditExaminationDialog({
  open,
  onClose,
  row,
  classes,
  onSave,
  loading = false,
  error = null,
}: EditExaminationDialogProps) {
  const [examName, setExamName] = useState("");
  const [type, setType] = useState("");
  const [classId, setClassId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (row) {
      setExamName(row.examName);
      setType(row.type);
      setClassId(row.classId);
      setStartDate(row.startDate);
      setEndDate(row.endDate);
      setMaxMarks(String(row.maxMarks));
      setErrors({});
    }
  }, [row]);

  useEffect(() => {
    if (!open) {
      setErrors({});
    }
  }, [open]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!examName.trim()) next.examName = "Examination Name is required";
    if (!type) next.type = "Type is required";
    if (!classId) next.classId = "Class / Grade is required";
    if (!startDate) next.startDate = "Start Date is required";
    if (!endDate) next.endDate = "End Date is required";
    if (startDate && endDate && endDate < startDate) next.endDate = "End Date cannot be before Start Date";
    if (!maxMarks || Number(maxMarks) <= 0) next.maxMarks = "Max Marks must be greater than 0";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !row) return;
    await onSave({
      exam_name: examName.trim(),
      exam_type: type,
      class_id: classId,
      start_date: startDate,
      end_date: endDate,
      max_marks: Number(maxMarks),
    });
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const classOptions = classes.map((c) => ({ id: c.id, label: `${c.class_name} — ${c.section}` }));

  if (!row) return null;

  return (
    <Modal open={open} onClose={handleClose} title={`Edit Examination — ${row.displayCode}`} maxWidth="max-w-lg">
      <div className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Examination Name</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            disabled={loading}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.examName ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          />
          {errors.examName && <p className="text-xs text-red-600 mt-1">{errors.examName}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={loading}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.type ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          >
            {EXAM_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Class / Grade</label>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            disabled={loading}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.classId ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          >
            {classOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          {errors.classId && <p className="text-xs text-red-600 mt-1">{errors.classId}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Exam Period Start</label>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              open={undefined}
              onOpenChange={undefined}
            />
            {errors.startDate && <p className="text-xs text-red-600 mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Exam Period End</label>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              open={undefined}
              onOpenChange={undefined}
            />
            {errors.endDate && <p className="text-xs text-red-600 mt-1">{errors.endDate}</p>}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Maximum Marks</label>
          <input
            type="number"
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
            disabled={loading}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.maxMarks ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          />
          {errors.maxMarks && <p className="text-xs text-red-600 mt-1">{errors.maxMarks}</p>}
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-50 inline-flex items-center gap-2"
          >
            {loading && <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" /></svg>}
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
