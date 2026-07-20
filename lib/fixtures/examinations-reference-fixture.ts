// WARNING: This file is a UI-only reference fixture for the Examinations module.
// Do NOT use this data for any backend logic, API integration, or production behavior.
// It exists solely to render the Examinations page consistently while APIs are pending.

export interface ExaminationRow {
  id: string;
  displayCode: string;
  examName: string;
  type: string;
  classGrade: string;
  classId: string;
  term: string;
  schedule: string;
  subjects: string;
  students: number;
  status: "Upcoming" | "Ongoing" | "Completed";
  startDate: string;
  endDate: string;
  maxMarks: number;
  createdAt: string;
  updatedAt: string;
}

export function getDisplayCode(id: string): string {
  if (!id) return "-";
  return `EXAM-${id.slice(0, 6).toUpperCase()}`;
}

export const EXAM_TYPE_COLORS: Record<string, string> = {
  "Unit Test": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Periodic Test": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Half Yearly": "bg-sky-50 text-sky-700 border-sky-100",
  "Pre Final": "bg-orange-50 text-orange-700 border-orange-100",
  "Final": "bg-rose-50 text-rose-700 border-rose-100",
  "Annual": "bg-sky-50 text-sky-700 border-sky-100",
  "Others": "bg-violet-50 text-violet-700 border-violet-100",
};

export const EXAM_CODE_COLORS: Record<string, string> = {
  "EXAM-": "bg-purple-50 text-purple-700 border-purple-100",
};

export const STATUS_COLORS: Record<string, string> = {
  Upcoming: "bg-orange-50 text-orange-700 border-orange-100",
  Ongoing: "bg-blue-50 text-blue-700 border-blue-100",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export const EXAM_TYPE_OPTIONS = [
  "Unit Test",
  "Periodic Test",
  "Half Yearly",
  "Pre Final",
  "Final",
  "Annual",
  "Others",
];
export const CLASS_GRADE_OPTIONS = [
  "Class 7 - A",
  "Class 7 - B",
  "Class 8 - A",
  "Class 8 - B",
  "Class 9 - A",
  "Class 9 - B",
  "Class 10 - A",
  "Class 10 - B",
];
export const TERM_OPTIONS = ["Term 1", "Term 2", "Annual"];
export const STATUS_OPTIONS = ["Upcoming", "Ongoing", "Completed"];
