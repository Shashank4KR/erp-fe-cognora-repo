"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddMenuDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    date: string;
    mealType: string;
    menuType: string;
    menuItems: string;
    startTime: string;
    endTime: string;
    block: string;
    status: string;
    notes: string;
  }) => void;
}

export default function AddMenuDialog({ open, onClose, onSave }: AddMenuDialogProps) {
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [menuType, setMenuType] = useState("Regular");
  const [menuItems, setMenuItems] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [block, setBlock] = useState("All Blocks");
  const [status, setStatus] = useState("Scheduled");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!date) newErrors.date = "Date is required";
    if (!menuItems.trim()) newErrors.menuItems = "Menu items are required";
    if (!startTime) newErrors.startTime = "Start time is required";
    if (!endTime) newErrors.endTime = "End time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ date, mealType, menuType, menuItems, startTime, endTime, block, status, notes });
    handleClose();
  };

  const handleClose = () => {
    setDate("");
    setMealType("Breakfast");
    setMenuType("Regular");
    setMenuItems("");
    setStartTime("");
    setEndTime("");
    setBlock("All Blocks");
    setStatus("Scheduled");
    setNotes("");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Add Menu</h3>
          <button onClick={handleClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {[
            { label: "Date", type: "date", value: date, set: setDate, error: errors.date },
            { label: "Start Time", type: "time", value: startTime, set: setStartTime, error: errors.startTime },
            { label: "End Time", type: "time", value: endTime, set: setEndTime, error: errors.endTime },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${field.error ? "border-red-300" : "border-slate-200"}`}
              />
              {field.error && <p className="text-xs text-red-500 mt-1">{field.error}</p>}
            </div>
          ))}
          {[
            { label: "Meal Type", value: mealType, set: setMealType, options: ["Breakfast", "Lunch", "Dinner"] },
            { label: "Menu Type", value: menuType, set: setMenuType, options: ["Regular", "Special", "Festival", "Diet"] },
            { label: "Block", value: block, set: setBlock, options: ["All Blocks", "Block A", "Block B", "Block C", "Block D"] },
            { label: "Status", value: status, set: setStatus, options: ["Scheduled", "Served", "Upcoming", "Cancelled"] },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
              <select
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Menu Items</label>
            <textarea
              value={menuItems}
              onChange={(e) => setMenuItems(e.target.value)}
              rows={3}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${errors.menuItems ? "border-red-300" : "border-slate-200"}`}
              placeholder="Enter menu items..."
            />
            {errors.menuItems && <p className="text-xs text-red-500 mt-1">{errors.menuItems}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Optional notes..."
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button type="button" onClick={handleClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button type="button" onClick={handleSave} className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d28d9] transition">Save</button>
        </div>
      </div>
    </div>
  );
}
