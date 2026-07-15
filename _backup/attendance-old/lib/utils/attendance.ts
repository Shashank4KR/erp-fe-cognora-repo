import type { AttendanceResponse } from "@/types/entities/attendance";

const ATTENDANCE_DUP_KEY = (
  r: Pick<
    AttendanceResponse,
    "student_id" | "class_id" | "subject_id" | "attendance_date" | "period_no"
  >,
) => `${r.student_id}|${r.class_id}|${r.subject_id}|${r.attendance_date}|${r.period_no}`;

export type AttendanceSessionInput = {
  student_id: string;
  class_id: string;
  subject_id: string;
  attendance_date: string;
  period_no: number | string;
};

export const ATTENDANCE_SESSION_FIELDS = [
  "student_id",
  "class_id",
  "subject_id",
  "attendance_date",
  "period_no",
] as const;

export function attendanceSessionKey(input: AttendanceSessionInput): string {
  return `${input.student_id}|${input.class_id}|${input.subject_id}|${input.attendance_date}|${input.period_no}`;
}

export function findExactAttendance(
  records: AttendanceResponse[],
  session: AttendanceSessionInput,
): AttendanceResponse | undefined {
  const target = attendanceSessionKey(session);
  const matches = records.filter((r) => attendanceSessionKey(r) === target);
  if (matches.length === 0) return undefined;
  return matches.reduce((latest, r) =>
    (r.updated_at ?? "") >= (latest.updated_at ?? "") ? r : latest,
  );
}

export type DuplicateSession = {
  key: string;
  ids: string[];
  displayRecordId: string;
};

export function findDuplicateSessions(
  records: AttendanceResponse[],
): DuplicateSession[] {
  const groups = new Map<string, AttendanceResponse[]>();
  for (const r of records) {
    const key = attendanceSessionKey(r);
    const arr = groups.get(key);
    if (arr) arr.push(r);
    else groups.set(key, [r]);
  }
  const duplicates: DuplicateSession[] = [];
  for (const [key, arr] of groups) {
    if (arr.length > 1) {
      const display = arr.reduce((latest, r) =>
        (r.updated_at ?? "") >= (latest.updated_at ?? "") ? r : latest,
      );
      duplicates.push({
        key,
        ids: arr.map((r) => r.id),
        displayRecordId: display.id,
      });
    }
  }
  return duplicates;
}

export function dedupeAttendance(records: AttendanceResponse[]): AttendanceResponse[] {
  const latest = new Map<string, AttendanceResponse>();
  for (const r of records) {
    const key = ATTENDANCE_DUP_KEY(r);
    const existing = latest.get(key);
    if (!existing || (r.updated_at ?? "") >= (existing.updated_at ?? "")) {
      latest.set(key, r);
    }
  }
  return Array.from(latest.values());
}

export function toISODate(display: string): string {
  const d = new Date(display);
  if (Number.isNaN(d.getTime())) return display;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromISODate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function todayISO(): string {
  return toISODate(new Date().toLocaleDateString("en-US"));
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function startOfMonthISO(iso: string): string {
  return `${iso.slice(0, 7)}-01`;
}

export function endOfMonthISO(iso: string): string {
  const [y, m] = iso.slice(0, 7).split("-").map(Number);
  const last = new Date(y, m, 0).getDate();
  return `${y}-${String(m).padStart(2, "0")}-${String(last).padStart(2, "0")}`;
}

export function formatAttendanceClassLabel(className: string, section: string): string {
  const rawName = (className ?? "").trim();
  const name = rawName.replace(/^grade\s+/i, "").trim() || rawName;
  const gradePart = `Grade ${name}`;
  const sec = (section ?? "").trim();
  return sec ? `${gradePart} — ${sec}` : gradePart;
}
