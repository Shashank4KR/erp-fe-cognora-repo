"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { ReportRow } from "@/lib/fixtures/communication-statistics-reference-fixture";

interface CommunicationStatisticsReportDialogProps {
  open: boolean;
  onClose: () => void;
  period: string;
  rows: ReportRow[];
}

export default function CommunicationStatisticsReportDialog({
  open,
  onClose,
  period,
  rows,
}: CommunicationStatisticsReportDialogProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Notification Summary Report
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
          Period
        </p>
        <p className="text-sm font-medium text-slate-700 mb-4">{period}</p>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
            <span className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Category
            </span>
            <span className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
              Sent Count
            </span>
            <span className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
              Percentage
            </span>
          </div>
          {rows.map((row) => (
            <div
              key={row.category}
              className="grid grid-cols-3 border-b border-slate-100 last:border-b-0"
            >
              <span className="px-4 py-2.5 text-sm font-medium text-slate-700">
                {row.category}
              </span>
              <span className="px-4 py-2.5 text-sm font-semibold text-slate-900 text-right">
                {row.count.toLocaleString()}
              </span>
              <span className="px-4 py-2.5 text-sm text-slate-500 text-right">
                {row.percentage}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Export
          </button>
        </div>
      </div>
    </Modal>
  );
}
