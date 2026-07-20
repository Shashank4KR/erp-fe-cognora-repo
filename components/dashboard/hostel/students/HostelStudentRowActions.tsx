"use client";

import { Eye, Pencil, MoreVertical } from "lucide-react";

interface HostelStudentRowActionsProps {
  onView: () => void;
  onEdit: () => void;
  onMore: () => void;
}

export default function HostelStudentRowActions({
  onView,
  onEdit,
  onMore,
}: HostelStudentRowActionsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onView}
        aria-label="View student"
        className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit student"
        className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100 transition"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={onMore}
          aria-label="More actions"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 transition"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
