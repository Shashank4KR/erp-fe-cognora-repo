"use client";

import Card from "@/components/shared/Card";
import {
  Plus,
  UserPlus,
  Clock,
  DoorOpen,
  Copy,
  Send,
  Printer,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";
import { PREVIEW_QUICK_ACTIONS } from "./timetablePreviewData";
import type { QuickActionItem } from "./timetableDisplayTypes";

const ICONS: Record<string, LucideIcon> = {
  Plus,
  UserPlus,
  Clock,
  DoorOpen,
  Copy,
  Send,
  Printer,
  FileBarChart,
};

const COLOR_CLASSES: Record<string, string> = {
  purple: "bg-purple-50 text-purple-600",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-600",
  pink: "bg-pink-50 text-pink-600",
};

interface TimetableQuickActionsProps {
  onCreate: () => void;
  onAssignTeachers: () => void;
  onManagePeriods: () => void;
  onRoomAllocation: () => void;
  onCopy: () => void;
  onPublish: () => void;
  onPrint: () => void;
  onReport: () => void;
}

export default function TimetableQuickActions({
  onCreate,
  onAssignTeachers,
  onManagePeriods,
  onRoomAllocation,
  onCopy,
  onPublish,
  onPrint,
  onReport,
}: TimetableQuickActionsProps) {
  const handlers: Record<string, () => void> = {
    qa1: onCreate,
    qa2: onAssignTeachers,
    qa3: onManagePeriods,
    qa4: onRoomAllocation,
    qa5: onCopy,
    qa6: onPublish,
    qa7: onPrint,
    qa8: onReport,
  };

  return (
    <Card className="flex h-full flex-col p-5 print:hidden">
      <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
      <p className="mt-0.5 text-[11px] text-slate-400">Common timetable tasks</p>
      <div className="mt-4 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
        {PREVIEW_QUICK_ACTIONS.map((action: QuickActionItem) => {
          const Icon = ICONS[action.icon] ?? Plus;
          const colorClass = COLOR_CLASSES[action.colorKey] ?? COLOR_CLASSES.purple;
          const disabled = !!action.pending;
          return (
            <button
              key={action.id}
              type="button"
              disabled={disabled}
              aria-label={action.label}
              title={action.tooltip}
              onClick={() => handlers[action.id]?.()}
              className={`group flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 p-3 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : "hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-sm hover:bg-slate-50"
              }`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-medium leading-tight text-slate-600">{action.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
