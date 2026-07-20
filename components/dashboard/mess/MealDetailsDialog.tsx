"use client";

import { X } from "lucide-react";
import type { MealRow } from "@/lib/fixtures/mess-management-reference-fixture";

interface MealDetailsDialogProps {
  row: MealRow | null;
  open: boolean;
  onClose: () => void;
}

export default function MealDetailsDialog({ row, open, onClose }: MealDetailsDialogProps) {
  if (!open || !row) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Meal Details</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          {[
            { label: "Meal", value: row.meal },
            { label: "Time", value: row.time },
            { label: "Status", value: row.status },
            { label: "Menu", value: row.menu },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{field.label}</p>
              <p className="text-sm font-semibold text-slate-900 mt-0.5">{field.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Close</button>
        </div>
      </div>
    </div>
  );
}
