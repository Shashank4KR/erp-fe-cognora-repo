"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import type { Announcement } from "@/lib/fixtures/communications-announcements-reference-fixture";

interface AnnouncementDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  announcement: Announcement | null;
}

export default function AnnouncementDetailsDialog({
  open,
  onClose,
  announcement,
}: AnnouncementDetailsDialogProps) {
  if (!announcement) return null;

  const badgeClassMap: Record<string, string> = {
    "Announcement": "bg-emerald-50 text-emerald-700",
    "Circular": "bg-red-50 text-red-600",
    "Event": "bg-purple-50 text-purple-700",
  };

  const iconColorClassMap: Record<string, string> = {
    "Announcement": "text-emerald-600",
    "Circular": "text-red-600",
    "Event": "text-purple-600",
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">{announcement.title}</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`${announcement.iconBg} p-2 rounded-lg flex-shrink-0`}>
            <span className={iconColorClassMap[announcement.badge] || "text-slate-600"}>{announcement.icon}</span>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${badgeClassMap[announcement.badge] || "bg-slate-100 text-slate-700"}`}>{announcement.badge}</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{announcement.description}</p>
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
          <span>{announcement.date}</span>
          <span>By {announcement.author}</span>
        </div>
        <div className="flex items-center justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
