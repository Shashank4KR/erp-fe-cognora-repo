// UI PREVIEW DATA ONLY — Timetable-specific local display types.
// These types describe how the Phase 1 Timetable UI is rendered.
// They are NOT backend API types and must NOT be mixed with services.
// Real API types will be introduced in Phase 2.

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const WEEK_DAYS: WeekDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type ViewType = "Weekly View" | "Daily View" | "Teacher View" | "Room View";

export const VIEW_TYPES: ViewType[] = [
  "Weekly View",
  "Daily View",
  "Teacher View",
  "Room View",
];

// View types that are only UI preview placeholders in Phase 1.
export const PENDING_VIEW_TYPES: ViewType[] = [
  "Daily View",
  "Teacher View",
  "Room View",
];

// A single row in the timetable matrix (a period or a break).
export interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  isBreak: boolean;
}

// A timetable entry placed inside a matrix cell. Human-readable fields are
// resolved from backend IDs for display; the raw backend references are kept
// so the entry can be edited/deleted against the API.
export interface PreviewTimetableEntry {
  id: string;
  subject: string;
  teacher: string;
  room?: string;
  day: WeekDay;
  periodLabel: string;
  startTime: string;
  endTime: string;
  academicYear: string;
  classGrade: string;
  section: string;
  // Backend source references (Phase 2 integration).
  classId?: string;
  subjectId?: string;
  teacherId?: string;
  periodNo?: number | null;
  unmatched?: boolean;
}

// A single upcoming-change preview entry.
export interface PreviewUpcomingChange {
  id: string;
  day: number;
  month: string;
  title: string;
  context: string;
}

// Donut chart segment used by the bottom analytics cards.
export interface PreviewDonutSegment {
  label: string;
  value: number;
  color: string;
}

// Quick action descriptor used by the Quick Actions card.
export interface QuickActionItem {
  id: string;
  label: string;
  icon: string; // lucide icon name resolved by the component
  colorKey: SubjectColorKey | "purple" | "blue" | "green" | "orange" | "pink";
  pending?: boolean;
  tooltip: string;
}

// Subject color palette keys.
export type SubjectColorKey =
  | "Mathematics"
  | "English"
  | "Science"
  | "Social Science"
  | "Hindi"
  | "Computer"
  | "Physical Education"
  | "Art & Craft"
  | "Library"
  | "Value Education"
  | "Others";

// Filter state owned by the Timetable page.
export interface TimetableFilterState {
  academicYear: string;
  classGrade: string;
  section: string;
  viewType: ViewType;
  subject: string;
  teacher: string;
  day: string;
  period: string;
  room: string;
}
