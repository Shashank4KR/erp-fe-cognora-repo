"use client";

import { ChevronRight, Download, MoreVertical } from "lucide-react";

interface CommunicationStatisticsPageHeaderProps {
  onExportReport: () => void;
  onMoreOptions: () => void;
}

export default function CommunicationStatisticsPageHeader({
  onExportReport,
  onMoreOptions,
}: CommunicationStatisticsPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Communication Statistics
        </h1>
        <nav className="flex items-center gap-1.5 mt-1 text-xs">
          <span className="text-[#7c3aed] font-medium">Dashboard</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#7c3aed] font-medium">Communication</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-500 font-medium">
            Communication Statistics
          </span>
        </nav>
      </div>
      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        <button
          onClick={onExportReport}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
        <button
          onClick={onMoreOptions}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
