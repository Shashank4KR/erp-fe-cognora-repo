"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Users,
  FileText,
  UserCheck,
  CalendarDays,
  CalendarClock,
  Settings,
  Download,
} from "lucide-react";
import Modal from "@/components/shared/Modal";

const ACTIONS = [
  { label: "Mark Attendance", icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Bulk Attendance", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Attendance Report", icon: FileText, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Student Attendance", icon: UserCheck, color: "text-[#7c3aed]", bg: "bg-purple-50" },
  { label: "Daily Summary", icon: CalendarDays, color: "text-red-500", bg: "bg-red-50" },
  { label: "Monthly Report", icon: CalendarClock, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Attendance Settings", icon: Settings, color: "text-slate-500", bg: "bg-slate-100" },
  { label: "Export Data", icon: Download, color: "text-blue-600", bg: "bg-blue-50" },
];

export default function AttendanceQuickActions() {
  const [openAction, setOpenAction] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => setOpenAction(action.label)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition group"
            >
              <div className={`${action.bg} p-2 rounded-lg group-hover:scale-105 transition-transform`}>
                <Icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <span className="text-[11px] font-medium text-slate-600 text-center leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>

      <Modal
        open={!!openAction}
        onClose={() => setOpenAction(null)}
        title={openAction ?? ""}
        maxWidth="max-w-sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            &quot;{openAction}&quot; is a UI-only quick action. Backend integration will be handled in the next phase.
          </p>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
            No backend API is connected in this phase.
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setOpenAction(null)}
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
