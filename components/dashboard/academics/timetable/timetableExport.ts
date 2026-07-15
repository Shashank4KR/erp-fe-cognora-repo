// Timetable CSV export helper. Exports the currently visible timetable rows
// (loaded from the backend) to a downloadable CSV file.

import { WEEK_DAYS } from "./timetableDisplayTypes";
import type { PreviewTimetableEntry } from "./timetableDisplayTypes";

interface ExportMeta {
  classGrade: string;
  academicYear: string;
  weekRange: string;
}

function toCsvCell(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Builds and triggers download of a CSV containing the visible preview rows.
export function exportTimetableCSV(
  entries: PreviewTimetableEntry[],
  meta: ExportMeta,
): { ok: boolean; message: string } {
  if (entries.length === 0) {
    return {
      ok: false,
      message: "No timetable data is available to download.",
    };
  }

  const headers = [
    "Day",
    "Period",
    "Start Time",
    "End Time",
    "Subject",
    "Teacher",
    "Room",
    "Class",
    "Section",
    "Academic Year",
  ];

  const rows = entries.map((e) =>
    [
      e.day,
      e.periodLabel,
      e.startTime,
      e.endTime,
      e.subject,
      e.teacher,
      e.room ?? "",
      e.classGrade,
      e.section,
      e.academicYear,
    ]
      .map(toCsvCell)
      .join(","),
  );

  const metaLines = [
    `# Timetable Export`,
    `# Class: ${toCsvCell(meta.classGrade)}`,
    `# Academic Year: ${toCsvCell(meta.academicYear)}`,
    `# Week: ${toCsvCell(meta.weekRange)}`,
    `# Generated: ${new Date().toLocaleString()}`,
  ];

  const csv = [...metaLines, headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Timetable.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { ok: true, message: "Timetable exported as CSV." };
}

// Returns preview subjects present in the visible entries (for the legend).
export function getRepresentedSubjects(entries: PreviewTimetableEntry[]): string[] {
  const set = new Set<string>();
  entries.forEach((e) => set.add(e.subject));
  return Array.from(set);
}

// Ensures the weekday order is respected when building exports/legends.
export { WEEK_DAYS };
