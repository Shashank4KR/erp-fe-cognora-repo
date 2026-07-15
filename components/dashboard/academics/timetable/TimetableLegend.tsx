"use client";

import { Download } from "lucide-react";
import { getSubjectColor } from "./timetableColors";

interface TimetableLegendProps {
  subjects: string[];
  hasData: boolean;
  onDownload: () => void;
  downloadMessage?: string | null;
}

export default function TimetableLegend({
  subjects,
  hasData,
  onDownload,
  downloadMessage,
}: TimetableLegendProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
      <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-2">
        {subjects.length === 0 ? (
          <span className="text-xs font-medium text-slate-400">No subjects to show yet.</span>
        ) : (
          subjects.map((subject) => {
            const color = getSubjectColor(subject);
            return (
              <span key={subject} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color.dot }}
                  aria-hidden="true"
                />
                {subject}
              </span>
            );
          })
        )}
      </div>

      <div className="flex flex-col items-start gap-1 sm:items-end">
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-4 py-2 text-sm font-semibold text-[#7c3aed] transition hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          <Download className="h-4 w-4" />
          Download Timetable
        </button>
        {!hasData && (
          <span className="text-[11px] font-medium text-slate-400">
            No timetable data is available to download.
          </span>
        )}
        {hasData && downloadMessage && (
          <span className="text-[11px] font-medium text-green-600">{downloadMessage}</span>
        )}
      </div>
    </div>
  );
}
