"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { EXAM_TYPE_OPTIONS, CLASS_GRADE_OPTIONS, TERM_OPTIONS, STATUS_OPTIONS } from "@/lib/fixtures/examinations-reference-fixture";
import { EXAM_TYPE_COLORS, EXAM_CODE_COLORS } from "@/lib/fixtures/examinations-reference-fixture";

interface CreateExaminationDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (row: {
    examCode: string;
    examName: string;
    type: string;
    classGrade: string;
    term: string;
    schedule: string;
    subjects: string;
    students: number;
    status: "Upcoming" | "Ongoing" | "Completed";
  }) => void;
}

export default function CreateExaminationDialog({ open, onClose, onCreate }: CreateExaminationDialogProps) {
  const [examCode, setExamCode] = useState("");
  const [examName, setExamName] = useState("");
  const [type, setType] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [term, setTerm] = useState("");
  const [schedule, setSchedule] = useState("");
  const [subjects, setSubjects] = useState("");
  const [students, setStudents] = useState("");
  const [status, setStatus] = useState<"Upcoming" | "Ongoing" | "Completed">("Upcoming");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!examCode.trim()) next.examCode = "Exam Code is required";
    if (!examName.trim()) next.examName = "Examination Name is required";
    if (!type) next.type = "Type is required";
    if (!classGrade) next.classGrade = "Class / Grade is required";
    if (!term) next.term = "Term is required";
    if (!schedule.trim()) next.schedule = "Schedule is required";
    if (!subjects.trim()) next.subjects = "Subjects are required";
    if (!students.trim() || isNaN(Number(students))) next.students = "Valid student count is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onCreate({
      examCode: examCode.trim(),
      examName: examName.trim(),
      type,
      classGrade,
      term,
      schedule: schedule.trim(),
      subjects: subjects.trim(),
      students: Number(students),
      status,
    });
    handleClose();
  };

  const handleClose = () => {
    setExamCode("");
    setExamName("");
    setType("");
    setClassGrade("");
    setTerm("");
    setSchedule("");
    setSubjects("");
    setStudents("");
    setStatus("Upcoming");
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create Examination" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Exam Code</label>
          <input
            type="text"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            placeholder="e.g., EX-011"
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.examCode ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          />
          {errors.examCode && <p className="text-xs text-red-600 mt-1">{errors.examCode}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Examination Name</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="e.g., Mid-Term Examination"
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.examName ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          />
          {errors.examName && <p className="text-xs text-red-600 mt-1">{errors.examName}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.type ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          >
            <option value="">Select Type</option>
            {EXAM_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Class / Grade</label>
          <select
            value={classGrade}
            onChange={(e) => setClassGrade(e.target.value)}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.classGrade ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          >
            <option value="">Select Class / Grade</option>
            {CLASS_GRADE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.classGrade && <p className="text-xs text-red-600 mt-1">{errors.classGrade}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Term</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.term ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          >
            <option value="">Select Term</option>
            {TERM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.term && <p className="text-xs text-red-600 mt-1">{errors.term}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Schedule</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="e.g., 15 Jul 2025 - 22 Jul 2025"
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.schedule ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          />
          {errors.schedule && <p className="text-xs text-red-600 mt-1">{errors.schedule}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Subjects</label>
          <input
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="e.g., Math, Science, English"
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.subjects ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          />
          {errors.subjects && <p className="text-xs text-red-600 mt-1">{errors.subjects}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Students</label>
          <input
            type="number"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            placeholder="e.g., 45"
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 ${errors.students ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-[#7c3aed]"}`}
          />
          {errors.students && <p className="text-xs text-red-600 mt-1">{errors.students}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Upcoming" | "Ongoing" | "Completed")}
            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7c3aed]"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={handleClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Create Examination
          </button>
        </div>
      </div>
    </Modal>
  );
}
