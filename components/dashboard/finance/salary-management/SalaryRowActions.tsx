"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import { Eye, Download, MoreHorizontal } from "lucide-react";
import type { SalaryRow } from "@/lib/fixtures/salary-management-reference-fixture";

interface SalaryRowActionsProps {
  row: SalaryRow;
  onView: (row: SalaryRow) => void;
  onDownload: (row: SalaryRow) => void;
  onMore: (row: SalaryRow) => void;
}

export default function SalaryRowActions({ row, onView, onDownload, onMore }: SalaryRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={() => onView(row)}
        className="p-1.5 rounded-lg bg-purple-50 text-[#7c3aed] hover:bg-purple-100 transition"
        aria-label="View"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDownload(row)}
        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
        aria-label="Download"
      >
        <Download className="h-4 w-4" />
      </button>
      <button
        onClick={() => onMore(row)}
        className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
        aria-label="More"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
