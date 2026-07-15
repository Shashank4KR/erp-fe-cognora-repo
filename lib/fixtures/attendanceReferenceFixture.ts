/**
 * UI reference fixture only — replace with backend API data in the integration phase.
 *
 * This file exists solely for visual implementation against the approved Attendance
 * reference screenshot. It must not be treated as production data, must not be mixed
 * into API services, and must not be used to create an Attendance service in this phase.
 */

export interface AttendanceStudent {
  rollNo: number;
  name: string;
  initials: string;
  statusSummary: {
    present: number;
    absent: number;
    late?: number;
    percentage: number;
  };
  subjects: {
    english: "present" | "absent" | "late";
    mathematics: "present" | "absent" | "late";
    science: "present" | "absent" | "late";
    socialScience: "present" | "absent" | "late";
    hindi: "present" | "absent" | "late";
    computer: "present" | "absent" | "late";
  };
  overall: number;
}

export interface SummaryCardData {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
}

export interface TopClassData {
  rank: number;
  name: string;
  percentage: number;
}

export const ATTENDANCE_STUDENTS: AttendanceStudent[] = [
  {
    rollNo: 1,
    name: "Aarav Sharma",
    initials: "AS",
    statusSummary: { present: 19, absent: 1, percentage: 95 },
    subjects: {
      english: "present",
      mathematics: "present",
      science: "present",
      socialScience: "present",
      hindi: "present",
      computer: "present",
    },
    overall: 95,
  },
  {
    rollNo: 2,
    name: "Diya Patel",
    initials: "DP",
    statusSummary: { present: 18, absent: 2, percentage: 90 },
    subjects: {
      english: "present",
      mathematics: "present",
      science: "absent",
      socialScience: "present",
      hindi: "present",
      computer: "late",
    },
    overall: 90,
  },
  {
    rollNo: 3,
    name: "Vihaan Kumar",
    initials: "VK",
    statusSummary: { present: 20, absent: 0, percentage: 100 },
    subjects: {
      english: "present",
      mathematics: "present",
      science: "present",
      socialScience: "present",
      hindi: "present",
      computer: "present",
    },
    overall: 100,
  },
  {
    rollNo: 4,
    name: "Ananya Singh",
    initials: "AS",
    statusSummary: { present: 17, absent: 3, percentage: 85 },
    subjects: {
      english: "present",
      mathematics: "absent",
      science: "present",
      socialScience: "present",
      hindi: "absent",
      computer: "present",
    },
    overall: 85,
  },
  {
    rollNo: 5,
    name: "Rohan Verma",
    initials: "RV",
    statusSummary: { present: 19, absent: 1, percentage: 95 },
    subjects: {
      english: "present",
      mathematics: "present",
      science: "present",
      socialScience: "present",
      hindi: "present",
      computer: "present",
    },
    overall: 95,
  },
  {
    rollNo: 6,
    name: "Ishita Gupta",
    initials: "IG",
    statusSummary: { present: 16, absent: 4, percentage: 80 },
    subjects: {
      english: "absent",
      mathematics: "present",
      science: "absent",
      socialScience: "absent",
      hindi: "present",
      computer: "late",
    },
    overall: 80,
  },
  {
    rollNo: 7,
    name: "Arjun Mehta",
    initials: "AM",
    statusSummary: { present: 18, absent: 2, percentage: 90 },
    subjects: {
      english: "present",
      mathematics: "present",
      science: "absent",
      socialScience: "present",
      hindi: "late",
      computer: "late",
    },
    overall: 90,
  },
  {
    rollNo: 8,
    name: "Myra Iyer",
    initials: "MI",
    statusSummary: { present: 20, absent: 0, percentage: 100 },
    subjects: {
      english: "present",
      mathematics: "present",
      science: "present",
      socialScience: "present",
      hindi: "present",
      computer: "present",
    },
    overall: 100,
  },
  {
    rollNo: 9,
    name: "Aditya Raj",
    initials: "AR",
    statusSummary: { present: 17, absent: 3, percentage: 85 },
    subjects: {
      english: "present",
      mathematics: "present",
      science: "present",
      socialScience: "absent",
      hindi: "absent",
      computer: "absent",
    },
    overall: 85,
  },
  {
    rollNo: 10,
    name: "Sara Khan",
    initials: "SK",
    statusSummary: { present: 19, absent: 1, percentage: 95 },
    subjects: {
      english: "present",
      mathematics: "late",
      science: "present",
      socialScience: "present",
      hindi: "present",
      computer: "present",
    },
    overall: 95,
  },
];

export const ATTENDANCE_SUMMARY_CARDS: SummaryCardData[] = [
  {
    title: "Today's Attendance",
    value: "92%",
    footer: "Present: 426 / 462",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [30, 35, 32, 38, 36, 40, 42, 38, 44, 42, 46, 44],
    sparkColor: "#7c3aed",
  },
  {
    title: "This Month Average",
    value: "91.4%",
    footer: "Avg. Present: 91.4%",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [85, 87, 86, 88, 89, 88, 90, 91, 90, 91, 92, 91],
    sparkColor: "#10b981",
  },
  {
    title: "Total Students",
    value: "462",
    footer: "Across all classes",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [],
    sparkColor: "#3b82f6",
  },
  {
    title: "Present Today",
    value: "426",
    footer: "Students Present",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkline: [380, 390, 385, 400, 395, 405, 410, 400, 415, 420, 418, 426],
    sparkColor: "#f97316",
  },
  {
    title: "Absent Today",
    value: "36",
    footer: "Students Absent",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    sparkline: [60, 55, 58, 50, 52, 48, 45, 50, 42, 38, 40, 36],
    sparkColor: "#ef4444",
  },
  {
    title: "Late Today",
    value: "12",
    footer: "Students Late",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    sparkline: [20, 18, 22, 16, 18, 15, 14, 16, 13, 14, 12, 12],
    sparkColor: "#14b8a6",
  },
];

export const ATTENDANCE_TOP_CLASSES: TopClassData[] = [
  { rank: 1, name: "VII - B", percentage: 96.8 },
  { rank: 2, name: "VIII - A", percentage: 95.2 },
  { rank: 3, name: "VI - C", percentage: 94.1 },
  { rank: 4, name: "IX - A", percentage: 93.5 },
  { rank: 5, name: "V - B", percentage: 92.7 },
];

export const ATTENDANCE_TREND_DATA = [
  { label: "1 May", value: 88 },
  { label: "6 May", value: 85 },
  { label: "11 May", value: 90 },
  { label: "16 May", value: 86 },
  { label: "21 May", value: 92 },
  { label: "26 May", value: 88 },
  { label: "31 May", value: 89 },
];

export const ATTENDANCE_OVERVIEW = {
  average: 91.4,
  present: { percentage: 91.4, days: 19 },
  absent: { percentage: 6.2, days: 1.3 },
  late: { percentage: 2.4, days: 0.5 },
};
