// UI PREVIEW DATA ONLY — Timetable-specific local week/date helpers.
// All date logic is computed on the client. No backend calls.

import { WEEK_DAYS, type WeekDay } from "./timetableDisplayTypes";

// Returns the Monday (00:00) of the week containing the given date.
export function getMondayOfCurrentWeek(base: Date = new Date()): Date {
  const date = new Date(base);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay(); // 0 = Sunday ... 6 = Saturday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diffToMonday);
  return date;
}

// Shifts a reference Monday by a number of weeks (negative = past).
export function shiftWeek(monday: Date, weeks: number): Date {
  const next = new Date(monday);
  next.setDate(next.getDate() + weeks * 7);
  return next;
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Formats a week range as "13 Jul 2026 – 19 Jul 2026".
export function formatWeekRange(monday: Date): string {
  const start = new Date(monday);
  const end = new Date(monday);
  end.setDate(end.getDate() + 5); // Saturday
  const startStr = `${start.getDate()} ${MONTHS_SHORT[start.getMonth()]} ${start.getFullYear()}`;
  const endStr = `${end.getDate()} ${MONTHS_SHORT[end.getMonth()]} ${end.getFullYear()}`;
  return `${startStr} – ${endStr}`;
}

// Returns a map of each weekday to its Date object for the given Monday.
export function getWeekDates(monday: Date): Record<WeekDay, Date> {
  const dates = {} as Record<WeekDay, Date>;
  WEEK_DAYS.forEach((day, index) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + index);
    dates[day] = d;
  });
  return dates;
}

// Formats a weekday date as a short label, e.g. "13 Jul".
export function formatDayDate(date: Date): string {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}
