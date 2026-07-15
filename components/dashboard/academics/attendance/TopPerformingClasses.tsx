"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";

interface TopPerformingClassesProps {
  comingSoon?: boolean;
}

export default function TopPerformingClasses({ comingSoon = true }: TopPerformingClassesProps) {
  const [viewAllOpen, setViewAllOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Top Performing Classes</h3>
        <button
          onClick={() => setViewAllOpen(true)}
          className="text-xs font-semibold text-[#7c3aed] hover:text-purple-700 transition"
        >
          View All
        </button>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-sm text-slate-500">Class performance rankings will be available soon.</p>
        <p className="text-xs text-slate-400 mt-1">This feature requires a dedicated summary endpoint.</p>
      </div>

      <Modal open={viewAllOpen} onClose={() => setViewAllOpen(false)} title="Top Performing Classes" maxWidth="max-w-md">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Top performing classes data will be populated from the backend in a future update.
          </p>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setViewAllOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
