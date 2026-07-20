"use client";

import { Eye, Download, MoreHorizontal } from "lucide-react";
import type { TransactionRow } from "@/lib/fixtures/transactions-reference-fixture";

interface TransactionsTableProps {
  rows: TransactionRow[];
  onView: (row: TransactionRow) => void;
  onDownload: (row: TransactionRow) => void;
  onMore: (row: TransactionRow) => void;
}

const typeIndicator = (type: string) => {
  if (type === "Income") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        Income
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-pink-600">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
      Expense
    </span>
  );
};

const receiptBadge = (refNo: string) => {
  const isExpense = refNo.startsWith("EXP");
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono font-medium ${
      isExpense ? "bg-pink-50 text-pink-600" : "bg-emerald-50 text-emerald-600"
    }`}>
      {refNo}
    </span>
  );
};

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Failed: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

export default function TransactionsTable({ rows, onView, onDownload, onMore }: TransactionsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">Transactions List</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Receipt / Ref No.</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student / Party Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Mode</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount (₹)</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-5 py-3">{receiptBadge(row.receiptRefNo)}</td>
                <td className="px-5 py-3 text-xs text-slate-600 whitespace-nowrap">{row.date}</td>
                <td className="px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{row.studentName}</p>
                    {row.classGrade && (
                      <p className="text-xs text-slate-500">{row.classGrade}</p>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3">{typeIndicator(row.type)}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{row.category}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{row.paymentMode}</td>
                <td className="px-5 py-3 text-right text-sm font-semibold text-slate-900">
                  {row.amount.toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-3">{statusBadge(row.status)}</td>
                <td className="px-5 py-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
