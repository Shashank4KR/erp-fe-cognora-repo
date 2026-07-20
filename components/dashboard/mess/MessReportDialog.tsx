"use client";

import { X, Download, Printer } from "lucide-react";

interface MessReportDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function MessReportDialog({ open, onClose }: MessReportDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Generate Report</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          {[
            { label: "Monthly Mess Summary", desc: "Collection, expenses, and balance for May 2025" },
            { label: "Meals Served Report", desc: "Breakfast, lunch, and dinner counts" },
            { label: "Weekly Menu Plan", desc: "This week's full menu schedule" },
            { label: "Expense Breakdown", desc: "Top expense heads and categories" },
          ].map((report) => (
            <button
              key={report.label}
              type="button"
              className="w-full flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left hover:border-purple-300 hover:bg-purple-50/50 transition"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{report.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{report.desc}</p>
              </div>
              <Download className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={() => alert("Print dialog would open here")}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">Close</button>
        </div>
      </div>
    </div>
  );
}
