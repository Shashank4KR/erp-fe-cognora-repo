"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Modal from "@/components/shared/Modal";
import type { InvoiceRow } from "@/lib/fixtures/invoices-reference-fixture";

interface InvoiceDetailsCardProps {
  invoice: InvoiceRow | null;
}

export default function InvoiceDetailsCard({ invoice }: InvoiceDetailsCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!invoice) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Invoice Details</h3>
        <p className="text-sm text-slate-500">Select an invoice to view details</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Invoice Details</h3>
        <Badge variant="success">{invoice.status}</Badge>
      </div>
      <div className="mb-4">
        <h4 className="text-xl font-bold text-[#7c3aed]">{invoice.invoiceNo}</h4>
        <p className="text-sm text-slate-600">{invoice.invoiceType}</p>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Student Name</span>
          <span className="text-sm font-medium text-slate-900">{invoice.studentName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Class / Grade</span>
          <span className="text-sm font-medium text-slate-900">{invoice.classGrade}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Invoice Date</span>
          <span className="text-sm font-medium text-slate-900">{invoice.invoiceDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Due Date</span>
          <span className="text-sm font-medium text-slate-900">{invoice.dueDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Payment Mode</span>
          <span className="text-sm font-medium text-slate-900">Online</span>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-4 mb-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Amount Details</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Total Amount</span>
            <span className="text-sm font-medium text-slate-900">₹ {invoice.amount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Paid Amount</span>
            <span className="text-sm font-medium text-slate-900">₹ {invoice.paid.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Balance (Balance Fees)</span>
            <span className={`text-sm font-medium ${invoice.balance > 0 ? "text-red-600" : "text-slate-900"}`}>
              ₹ {invoice.balance.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full gap-2 border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50"
          onClick={() => setPreviewOpen(true)}
        >
          <Eye className="h-4 w-4" />
          View Invoice
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => alert("Invoice downloaded")}
        >
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
      </div>
      {previewOpen && (
        <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} className="w-full max-w-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Invoice Preview</h3>
              <button
                onClick={() => setPreviewOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
              >
                ×
              </button>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-[#7c3aed]">{invoice.invoiceNo}</h4>
                  <p className="text-sm text-slate-600">{invoice.invoiceType}</p>
                </div>
                <Badge variant={invoice.status === "Paid" ? "success" : invoice.status === "Partial" ? "warning" : "error"}>
                  {invoice.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Student Name</p>
                  <p className="text-sm font-medium text-slate-900">{invoice.studentName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Class / Grade</p>
                  <p className="text-sm font-medium text-slate-900">{invoice.classGrade}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Invoice Date</p>
                  <p className="text-sm font-medium text-slate-900">{invoice.invoiceDate}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Due Date</p>
                  <p className="text-sm font-medium text-slate-900">{invoice.dueDate}</p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Total Amount</span>
                  <span className="text-sm font-medium text-slate-900">₹ {invoice.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Paid Amount</span>
                  <span className="text-sm font-medium text-slate-900">₹ {invoice.paid.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Balance</span>
                  <span className="text-sm font-medium text-red-600">₹ {invoice.balance.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
