"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface MealAttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { date: string; meal: string; block: string; present: string; absent: string }) => void;
}

export default function MealAttendanceDialog({ open, onClose, onSave }: MealAttendanceDialogProps) {
  const [date, setDate] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [block, setBlock] = useState("All Blocks");
  const [present, setPresent] = useState("");
  const [absent, setAbsent] = useState("");

  if (!open) return null;

  const handleSave = () => {
    onSave({ date, meal, block, present, absent });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Record Attendance</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Date", value: date, set: setDate, type: "date" },
            { label: "Present", value: present, set: setPresent, type: "number", placeholder: "Number of students present" },
            { label: "Absent", value: absent, set: setAbsent, type: "number", placeholder: "Number of students absent" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Meal</label>
            <select value={meal} onChange={(e) => setMeal(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              {["Breakfast", "Lunch", "Dinner"].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Block</label>
            <select value={block} onChange={(e) => setBlock(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              {["All Blocks", "Block A", "Block B", "Block C", "Block D"].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button type="button" onClick={handleSave} className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d28d9] transition">Save</button>
        </div>
      </div>
    </div>
  );
}
