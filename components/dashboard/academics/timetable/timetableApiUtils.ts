// Helpers that translate between backend timetable values and the display /
// form representation used by the Timetable UI.

import { PREVIEW_TIMESLOTS } from "./timetablePreviewData";
import { WEEK_DAYS, type WeekDay } from "./timetableDisplayTypes";

// Non-break period labels, e.g. ["Period 1", ... "Period 7"].
export const PERIOD_LABELS = PREVIEW_TIMESLOTS.filter((s) => !s.isBreak).map(
  (s) => s.label,
);

// Backend times may arrive as "08:00" or "08:00:00". Return "HH:MM" for the
// native time input.
export function toInputTime(value?: string | null): string {
  if (!value) return "";
  const match = value.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return value;
  return `${match[1].padStart(2, "0")}:${match[2]}`;
}

// Native time inputs produce "HH:MM"; most backends expect "HH:MM:SS".
export function toApiTime(value?: string | null): string {
  if (!value) return "";
  return value.length === 5 ? `${value}:00` : value;
}

// Normalize a backend day string to a supported weekday, or null.
export function normalizeDay(raw?: string | null): WeekDay | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  const map: Record<string, WeekDay> = {
    monday: "Monday",
    mon: "Monday",
    tuesday: "Tuesday",
    tue: "Tuesday",
    tues: "Tuesday",
    wednesday: "Wednesday",
    wed: "Wednesday",
    thursday: "Thursday",
    thu: "Thursday",
    thur: "Thursday",
    thurs: "Thursday",
    friday: "Friday",
    fri: "Friday",
    saturday: "Saturday",
    sat: "Saturday",
  };
  return map[key] ?? (WEEK_DAYS.includes(raw as WeekDay) ? (raw as WeekDay) : null);
}

// Parse a numeric period from a label like "Period 3".
export function parsePeriodNo(label: string): number | null {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

// Build a period label from a backend period number.
export function periodLabelFromNo(periodNo?: number | null): string | null {
  if (periodNo == null) return null;
  return `Period ${periodNo}`;
}

// Match a period label using either a period number or a start time.
export function resolvePeriodLabel(
  periodNo?: number | null,
  startTime?: string | null,
): string {
  const fromNo = periodLabelFromNo(periodNo);
  if (fromNo && PERIOD_LABELS.includes(fromNo)) return fromNo;
  if (startTime) {
    const input = toInputTime(startTime);
    const slot = PREVIEW_TIMESLOTS.find(
      (s) => !s.isBreak && s.startTime === input,
    );
    if (slot) return slot.label;
  }
  return fromNo ?? PERIOD_LABELS[0] ?? "Period 1";
}
