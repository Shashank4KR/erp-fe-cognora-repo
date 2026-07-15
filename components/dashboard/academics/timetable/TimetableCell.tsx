"use client";

import { Plus } from "lucide-react";
import { getSubjectColor } from "./timetableColors";
import type { PreviewTimetableEntry, TimeSlot, WeekDay } from "./timetableDisplayTypes";

interface TimetableCellProps {
  entry?: PreviewTimetableEntry;
  day: WeekDay;
  slot: TimeSlot;
  onOpenEntry: (entry: PreviewTimetableEntry) => void;
  onAddPeriod: (day: WeekDay, slot: TimeSlot) => void;
}

export default function TimetableCell({
  entry,
  day,
  slot,
  onOpenEntry,
  onAddPeriod,
}: TimetableCellProps) {
  if (entry) {
    const color = getSubjectColor(entry.subject);
    return (
      <button
        type="button"
        onClick={() => onOpenEntry(entry)}
        aria-label={`${entry.subject} with ${entry.teacher}, ${entry.periodLabel}`}
        className={`flex h-full w-full flex-col items-start justify-center rounded-lg border ${color.bg} ${color.border} ${color.text} px-2.5 py-2 text-left transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400`}
      >
        <span className="text-[12px] font-semibold leading-tight">{entry.subject}</span>
        <span className="mt-0.5 text-[10.5px] font-medium opacity-80">{entry.teacher}</span>
        {entry.room && (
          <span className="mt-0.5 text-[10px] font-medium opacity-70">{entry.room}</span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onAddPeriod(day, slot)}
      aria-label={`Add period for ${slot.label} on ${day}`}
      title="Add timetable period"
      className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-slate-200 text-slate-300 transition hover:border-purple-300 hover:bg-purple-50/40 hover:text-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
    >
      <Plus className="h-4 w-4" />
    </button>
  );
}
