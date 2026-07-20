"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface MessExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { date: string; particular: string; category: string; amount: string; addedBy: string; notes: string }) => void;
}

export default function MessExpenseDialog({ open, onClose, onSave }: MessExpenseDialogProps) {
  const [date, setDate] = useState("");
  const [particular, setParticular] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [amount, setAmount] = useState("");
  const [addedBy, setAddedBy] = useState("Admin");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  const handleSave = () => {
    onSave({ date, particular, category, amount, addedBy, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Add Expense</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Date", value: date, set: setDate, type: "date" },
            { label: "Amount (₹)", value: amount, set: setAmount, type: "number", placeholder: "Enter amount" },
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
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Particular</label>
            <input
              type="text"
              value={particular}
              onChange={(e) => setParticular(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter particulars"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              {["Groceries", "Milk & Dairy", "LPG / Fuel", "Vegetables", "Others"].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Added By</label>
            <input
              type="text"
              value={addedBy}
              onChange={(e) => setAddedBy(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
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
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button type="button" onClick={handleSave} className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d28d9] transition">Save</button>
        </div>
      </div>
    </div>
  );
}
