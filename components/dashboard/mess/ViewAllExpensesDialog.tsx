"use client";

import { X } from "lucide-react";
import type { ExpenseRow } from "@/lib/fixtures/mess-management-reference-fixture";

interface ViewAllExpensesDialogProps {
  open: boolean;
  onClose: () => void;
  rows: ExpenseRow[];
}

export default function ViewAllExpensesDialog({ open, onClose, rows }: ViewAllExpensesDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">All Expenses</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Particulars</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
                <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount (₹)</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Added By</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-2 text-slate-600">{row.date}</td>
                  <td className="px-4 py-2 font-medium text-slate-900">{row.particulars}</td>
                  <td className="px-4 py-2 text-slate-600">{row.category}</td>
                  <td className="px-4 py-2 text-right font-medium text-slate-900 tabular-nums">{row.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-slate-600">{row.addedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
