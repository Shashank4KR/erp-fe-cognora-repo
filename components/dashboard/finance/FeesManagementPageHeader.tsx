"use client";

import { ChevronRight, Plus, MoreVertical, ChevronDown } from "lucide-react";

interface FeesManagementPageHeaderProps {
  onAddCollection: () => void;
  onMoreOptions: () => void;
}

export default function FeesManagementPageHeader({
  onAddCollection,
  onMoreOptions,
}: FeesManagementPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fees Management</h1>
        <nav className="flex items-center gap-1.5 mt-1 text-xs">
          <span className="text-[#7c3aed] font-medium">Dashboard</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#7c3aed] font-medium">Finance</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-500 font-medium">Fees Management</span>
        </nav>
      </div>
      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        <button
          onClick={onAddCollection}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
        >
          <Plus className="h-4 w-4" />
          Add Fee Collection
          <ChevronDown className="h-4 w-4 ml-0.5" />
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
