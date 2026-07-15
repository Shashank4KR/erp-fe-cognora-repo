"use client";

import { Fragment } from "react";
import { CalendarClock } from "lucide-react";
import TimetableCell from "./TimetableCell";
import { PREVIEW_TIMESLOTS } from "./timetablePreviewData";
import { WEEK_DAYS, type PreviewTimetableEntry, type TimeSlot, type WeekDay } from "./timetableDisplayTypes";
import { formatDayDate } from "./timetableDateUtils";

interface WeeklyTimetableGridProps {
  entries: PreviewTimetableEntry[];
  weekDates: Record<WeekDay, Date>;
  onOpenEntry: (entry: PreviewTimetableEntry) => void;
  onAddPeriod: (day: WeekDay, slot: TimeSlot) => void;
}

export default function WeeklyTimetableGrid({
  entries,
  weekDates,
  onOpenEntry,
  onAddPeriod,
}: WeeklyTimetableGridProps) {
  const byCell = new Map<string, PreviewTimetableEntry>();
  entries.forEach((e) => {
    byCell.set(`${e.day}|${e.periodLabel}`, e);
  });

  const GRID = "grid grid-cols-[120px_repeat(6,minmax(132px,1fr))]";

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[860px]">
        {/* Header row */}
        <div className={`${GRID} border-b border-slate-200 bg-slate-50/60`}>
          <div className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Time / Day
          </div>
          {WEEK_DAYS.map((day) => (
            <div key={day} className="px-3 py-3 text-center">
              <p className="text-sm font-semibold text-slate-800">{day}</p>
              <p className="text-[11px] font-medium text-slate-400">{formatDayDate(weekDates[day])}</p>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className={GRID}>
          {PREVIEW_TIMESLOTS.map((slot) =>
            slot.isBreak ? (
              <div
                key={slot.id}
                className="col-span-7 flex items-center justify-center gap-2 border-b border-slate-100 bg-slate-50/70 py-2 text-center"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {slot.label}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {slot.startTime} – {slot.endTime}
                </span>
              </div>
            ) : (
              <Fragment key={slot.id}>
                <div className="flex flex-col justify-center border-b border-r border-slate-100 px-3 py-3">
                  <span className="text-xs font-semibold text-slate-700">{slot.startTime} – {slot.endTime}</span>
                  <span className="text-[11px] font-medium text-slate-400">{slot.label}</span>
                </div>
                {WEEK_DAYS.map((day) => {
                  const entry = byCell.get(`${day}|${slot.label}`);
                  return (
                    <div key={day} className="border-b border-r border-slate-100 p-1.5">
                      <div className="h-[66px]">
                        <TimetableCell
                          entry={entry}
                          day={day}
                          slot={slot}
                          onOpenEntry={onOpenEntry}
                          onAddPeriod={onAddPeriod}
                        />
                      </div>
                    </div>
                  );
                })}
              </Fragment>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

// Compact empty-state banner shown above the matrix when no entries exist.
export function TimetableEmptyHint({ onAddPeriod }: { onAddPeriod: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-amber-50/60 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-amber-700">
        <CalendarClock className="h-4 w-4" />
        No timetable periods have been added yet.
      </div>
      <button
        type="button"
        onClick={onAddPeriod}
        className="rounded-lg bg-[#7c3aed] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#6d28d9]"
      >
        Create Timetable Period
      </button>
    </div>
  );
}
