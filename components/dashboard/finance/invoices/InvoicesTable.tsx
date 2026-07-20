"use client";

import { useState } from "react";
import { Eye, Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import type { InvoiceRow } from "@/lib/fixtures/invoices-reference-fixture";

interface InvoiceRowActionsProps {
  invoice: InvoiceRow;
  onView: (invoice: InvoiceRow) => void;
  onDownload: (invoice: InvoiceRow) => void;
  onMore: (invoice: InvoiceRow) => void;
}

export function InvoiceRowActions({ invoice, onView, onDownload, onMore }: InvoiceRowActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onView(invoice)}
        className="p-1.5 rounded-md bg-purple-50 text-[#7c3aed] hover:bg-purple-100 transition"
        aria-label="View invoice"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDownload(invoice)}
        className="p-1.5 rounded-md bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
        aria-label="Download invoice"
      >
        <Download className="h-4 w-4" />
      </button>
      <div className="relative">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="p-1.5 rounded-md bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
            <button
              onClick={() => { onMore(invoice); setMenuOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Edit Invoice
            </button>
            <button
              onClick={() => { onMore(invoice); setMenuOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Print Invoice
            </button>
            <button
              onClick={() => { onMore(invoice); setMenuOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Record Payment
            </button>
            <button
              onClick={() => { onMore(invoice); setMenuOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Duplicate Invoice
            </button>
            <button
              onClick={() => { onMore(invoice); setMenuOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Cancel Invoice
            </button>
            <button
              onClick={() => { onMore(invoice); setMenuOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Delete Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface InvoicesTableProps {
  rows: InvoiceRow[];
  onView: (invoice: InvoiceRow) => void;
  onDownload: (invoice: InvoiceRow) => void;
  onMore: (invoice: InvoiceRow) => void;
}

export default function InvoicesTable({ rows, onView, onDownload, onMore }: InvoicesTableProps) {
  const statusVariantMap: Record<string, "success" | "warning" | "error" | "default"> = {
    Paid: "success",
    Partial: "warning",
    Overdue: "error",
    Pending: "default",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs">Invoice No.</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs">Invoice Date</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs">Student / Party Name</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs">Class / Grade</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs">Invoice Type</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs">Due Date</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs text-right">Amount (₹)</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs text-right">Paid (₹)</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs text-right">Balance (₹)</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs">Status</th>
            <th className="pb-3 pt-1 px-4 font-semibold text-slate-600 text-xs text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
              <td className="py-3 px-4">
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-semibold text-[#7c3aed]">
                  {row.invoiceNo}
                </span>
              </td>
              <td className="py-3 px-4 text-slate-700">{row.invoiceDate}</td>
              <td className="py-3 px-4">
                <div className="font-medium text-slate-900">{row.studentName}</div>
                <div className="text-xs text-slate-500">{row.studentId}</div>
              </td>
              <td className="py-3 px-4 text-slate-700">{row.classGrade}</td>
              <td className="py-3 px-4 text-slate-700">{row.invoiceType}</td>
              <td className="py-3 px-4 text-slate-700">{row.dueDate}</td>
              <td className="py-3 px-4 text-right text-slate-700 font-medium">{row.amount.toLocaleString("en-IN")}</td>
              <td className="py-3 px-4 text-right text-slate-700">{row.paid.toLocaleString("en-IN")}</td>
              <td className={`py-3 px-4 text-right font-medium ${row.balance > 0 ? "text-red-600" : "text-slate-900"}`}>
                {row.balance.toLocaleString("en-IN")}
              </td>
              <td className="py-3 px-4">
                <Badge variant={statusVariantMap[row.status] || "default"}>{row.status}</Badge>
              </td>
              <td className="py-3 px-4">
                <InvoiceRowActions invoice={row} onView={onView} onDownload={onDownload} onMore={onMore} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface InvoicesTableHeaderProps {
  total: number;
}

export function InvoicesTableHeader({ total }: InvoicesTableHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-slate-900">Invoices List</h3>
      <span className="text-xs text-slate-500">Showing 1 to 10 of {total.toLocaleString()} invoices</span>
    </div>
  );
}
