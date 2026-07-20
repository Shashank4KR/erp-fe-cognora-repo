"use client";

import Card from "@/components/shared/Card";
import { ArrowUpRight, Eye, Mail, MoreHorizontal } from "lucide-react";

interface OutstandingFeeSummaryProps {
  data: {
    totalStudents: number;
    studentsWithOutstanding: number;
    outstandingPercentage: string;
    totalOutstandingAmount: string;
  };
  onViewAll: () => void;
  onSendReminders: () => void;
}

export default function OutstandingFeeSummary({ data, onViewAll, onSendReminders }: OutstandingFeeSummaryProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Outstanding Fees Summary</h3>
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#7c3aed] hover:underline"
        >
          View All
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="text-2xl font-bold text-slate-900 mb-1">
        {data.totalOutstandingAmount}
      </div>
      <p className="text-xs text-slate-500 mb-4">Total outstanding amount across all students</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">Total Students</span>
          <span className="text-sm font-semibold text-slate-900">{data.totalStudents.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">Students with Outstanding</span>
          <span className="text-sm font-semibold text-slate-900">{data.studentsWithOutstanding.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">Outstanding Percentage</span>
          <span className="text-sm font-semibold text-slate-900">{data.outstandingPercentage}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
        <button
          onClick={onViewAll}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <Eye className="h-4 w-4" />
          View Detailed Report
        </button>
        <button
          onClick={onSendReminders}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
        >
          <Mail className="h-4 w-4" />
          Send Fee Reminders
        </button>
        <button
          className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
