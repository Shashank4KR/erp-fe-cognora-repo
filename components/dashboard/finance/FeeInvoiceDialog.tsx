"use client";

import { X, Download } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { StudentFeeRow } from "@/lib/fixtures/fees-management-reference-fixture";

interface FeeInvoiceDialogProps {
  student: StudentFeeRow;
  onClose: () => void;
}

export default function FeeInvoiceDialog({ student, onClose }: FeeInvoiceDialogProps) {
  return (
    <Modal open={!!student} onClose={onClose} className="w-full max-w-md">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Fee Invoice</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">EdTech Smart Campus</p>
              <p className="text-xs text-slate-500">Invoice</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Date</p>
              <p className="text-sm font-medium text-slate-900">18 May 2025</p>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Student</span>
              <span className="font-medium text-slate-900">{student.studentName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Roll No.</span>
              <span className="font-medium text-slate-900">{student.rollNo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Class</span>
              <span className="font-medium text-slate-900">{student.classGrade}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total Fee</span>
              <span className="font-medium text-slate-900">₹ {student.totalFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Paid</span>
              <span className="font-medium text-emerald-600">₹ {student.paid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Outstanding</span>
              <span className="font-medium text-orange-600">₹ {student.outstanding.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          <Download className="h-4 w-4" />
          Download Invoice
        </button>
      </div>
    </Modal>
  );
}
