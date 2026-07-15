// WARNING: This file is a UI-only reference fixture for the Examinations module.
// Do NOT use this data for any backend logic, API integration, or production behavior.
// It exists solely to render the Examinations page consistently while APIs are pending.

export interface ExaminationRow {
  examCode: string;
  examName: string;
  type: string;
  classGrade: string;
  term: string;
  schedule: string;
  subjects: string;
  students: number;
  status: "Upcoming" | "Ongoing" | "Completed";
}

export const EXAMINATION_ROWS: ExaminationRow[] = [
  {
    examCode: "EX-001",
    examName: "Mid-Term Examination",
    type: "Half Yearly",
    classGrade: "Class 10 - A",
    term: "Term 1",
    schedule: "15 Jul 2025 - 22 Jul 2025",
    subjects: "Math, Science, English",
    students: 45,
    status: "Completed",
  },
  {
    examCode: "EX-002",
    examName: "Final Examination",
    type: "Final",
    classGrade: "Class 10 - A",
    term: "Term 2",
    schedule: "10 Mar 2025 - 18 Mar 2025",
    subjects: "Math, Science, English, Social",
    students: 45,
    status: "Completed",
  },
  {
    examCode: "EX-003",
    examName: "Unit Test - I",
    type: "Unit Test",
    classGrade: "Class 9 - B",
    term: "Term 1",
    schedule: "05 Aug 2025 - 06 Aug 2025",
    subjects: "Math, Science",
    students: 38,
    status: "Upcoming",
  },
  {
    examCode: "EX-004",
    examName: "Periodic Assessment",
    type: "Periodic Test",
    classGrade: "Class 8 - A",
    term: "Term 2",
    schedule: "20 Feb 2025 - 21 Feb 2025",
    subjects: "English, Social",
    students: 42,
    status: "Ongoing",
  },
  {
    examCode: "EX-005",
    examName: "Pre-Final Examination",
    type: "Pre Final",
    classGrade: "Class 10 - B",
    term: "Term 2",
    schedule: "25 Feb 2025 - 04 Mar 2025",
    subjects: "All Subjects",
    students: 40,
    status: "Upcoming",
  },
  {
    examCode: "EX-006",
    examName: "Annual Examination",
    type: "Annual",
    classGrade: "Class 9 - A",
    term: "Annual",
    schedule: "12 Mar 2025 - 20 Mar 2025",
    subjects: "All Subjects",
    students: 44,
    status: "Upcoming",
  },
  {
    examCode: "EX-007",
    examName: "Unit Test - II",
    type: "Unit Test",
    classGrade: "Class 8 - B",
    term: "Term 2",
    schedule: "18 Aug 2025 - 19 Aug 2025",
    subjects: "Math, Science, English",
    students: 39,
    status: "Ongoing",
  },
  {
    examCode: "EX-008",
    examName: "Half-Yearly Examination",
    type: "Half Yearly",
    classGrade: "Class 9 - A",
    term: "Term 1",
    schedule: "20 Sep 2025 - 28 Sep 2025",
    subjects: "All Subjects",
    students: 44,
    status: "Completed",
  },
  {
    examCode: "EX-009",
    examName: "Final Examination",
    type: "Final",
    classGrade: "Class 8 - A",
    term: "Term 2",
    schedule: "05 Mar 2025 - 12 Mar 2025",
    subjects: "All Subjects",
    students: 42,
    status: "Completed",
  },
  {
    examCode: "EX-010",
    examName: "Practice Test",
    type: "Others",
    classGrade: "Class 7 - A",
    term: "Term 1",
    schedule: "30 Jul 2025 - 30 Jul 2025",
    subjects: "Math",
    students: 35,
    status: "Completed",
  },
];

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
  "EX-001": "bg-purple-50 text-purple-700 border-purple-100",
  "EX-002": "bg-blue-50 text-blue-700 border-blue-100",
  "EX-003": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "EX-004": "bg-amber-50 text-amber-700 border-amber-100",
  "EX-005": "bg-orange-50 text-orange-700 border-orange-100",
  "EX-006": "bg-teal-50 text-teal-700 border-teal-100",
  "EX-007": "bg-pink-50 text-pink-700 border-pink-100",
  "EX-008": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "EX-009": "bg-cyan-50 text-cyan-700 border-cyan-100",
  "EX-010": "bg-lime-50 text-lime-700 border-lime-100",
};

export const STATUS_COLORS: Record<string, string> = {
  Upcoming: "bg-orange-50 text-orange-700 border-orange-100",
  Ongoing: "bg-blue-50 text-blue-700 border-blue-100",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export const EXAM_TYPES_DATA = [
  { label: "Unit Test", value: 8, color: "#6366f1" },
  { label: "Periodic Test", value: 6, color: "#10b981" },
  { label: "Half Yearly", value: 2, color: "#0ea5e9" },
  { label: "Pre Final", value: 1, color: "#f97316" },
  { label: "Final", value: 2, color: "#ef4444" },
  { label: "Annual", value: 2, color: "#0ea5e9" },
  { label: "Others", value: 7, color: "#8b5cf6" },
];

export const UPCOMING_EXAMS = [
  { name: "Unit Test - I", class: "Class 9 - B", date: "05 Aug" },
  { name: "Periodic Assessment", class: "Class 8 - A", date: "20 Feb" },
  { name: "Pre-Final Examination", class: "Class 10 - B", date: "25 Feb" },
  { name: "Annual Examination", class: "Class 9 - A", date: "12 Mar" },
  { name: "Unit Test - II", class: "Class 8 - B", date: "18 Aug" },
];

export const EXAMINATION_OVERVIEW_DATA = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1800 },
  { label: "Mar", value: 2400 },
  { label: "Apr", value: 1600 },
  { label: "May", value: 2000 },
  { label: "Jun", value: 2800 },
];

export const RESULTS_STATUS_DATA = [
  { label: "Pass", value: 78, color: "#10b981" },
  { label: "Fail", value: 12, color: "#ef4444" },
  { label: "Pending", value: 10, color: "#f59e0b" },
];

export const STUDENTS_APPEARED_DATA = {
  total: "1,245",
  boys: 642,
  girls: 603,
};

export const TOP_SUBJECTS_DATA = [
  { name: "Mathematics", avgScore: 78, color: "#6366f1" },
  { name: "Science", avgScore: 72, color: "#10b981" },
  { name: "English", avgScore: 65, color: "#0ea5e9" },
  { name: "Social Studies", avgScore: 58, color: "#f59e0b" },
  { name: "Hindi", avgScore: 82, color: "#ef4444" },
];

export const EXAMINATION_QUICK_ACTIONS = [
  { label: "Create Examination", icon: "Plus" },
  { label: "Schedule Exam", icon: "CalendarClock" },
  { label: "Enter Results", icon: "FileText" },
  { label: "Generate Report", icon: "BarChart3" },
  { label: "Publish Results", icon: "CheckCircle" },
  { label: "Print Admit Cards", icon: "FileText" },
  { label: "Send Notifications", icon: "MessageSquare" },
  { label: "View Analytics", icon: "BarChart3" },
];

export const ACADEMIC_YEAR_OPTIONS = ["2025-26", "2024-25", "2023-24"];
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
