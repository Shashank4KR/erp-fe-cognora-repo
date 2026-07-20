"use client";

import { Plus, Megaphone } from "lucide-react";

interface CommunicationOverviewPageHeaderProps {
  onNewMessage: () => void;
  onCreateAnnouncement: () => void;
}

export default function CommunicationOverviewPageHeader({
  onNewMessage,
  onCreateAnnouncement,
}: CommunicationOverviewPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Communication Overview</h1>
        <nav aria-label="Breadcrumb" className="mt-1">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <span className="hover:text-[#7c3aed] cursor-pointer">Dashboard</span>
            </li>
            <li>
              <span className="text-slate-300">/</span>
            </li>
            <li>
              <span className="hover:text-[#7c3aed] cursor-pointer">Communication</span>
            </li>
            <li>
              <span className="text-slate-300">/</span>
            </li>
            <li>
              <span className="text-slate-700 font-medium">Overview</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          type="button"
          onClick={onNewMessage}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          New Message
        </button>
        <button
          type="button"
          onClick={onCreateAnnouncement}
          className="inline-flex items-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-4 py-2 text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        >
          <Megaphone className="h-4 w-4" />
          Create Announcement
        </button>
      </div>
    </div>
  );
}
