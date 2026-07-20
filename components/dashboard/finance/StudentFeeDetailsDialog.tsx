"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { StudentFeeRow } from "@/lib/fixtures/fees-management-reference-fixture";

interface StudentFeeDetailsDialogProps {
  student: StudentFeeRow;
  onClose: () => void;
}

export default function StudentFeeDetailsDialog({ student, onClose }: StudentFeeDetailsDialogProps) {
  return (
    <Modal open={!!student} onClose={onClose} className="w-full max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Student Fee Details</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Roll No.</p>
            <p className="text-sm font-medium text-slate-900">{student.rollNo}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Student Name</p>
            <p className="text-sm font-medium text-slate-900">{student.studentName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Class / Grade</p>
            <p className="text-sm font-medium text-slate-900">{student.classGrade}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</p>
            <p className="text-sm font-medium text-slate-900">{student.status}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Fee (₹)</p>
            <p className="text-sm font-medium text-slate-900">₹ {student.totalFee.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Paid (₹)</p>
            <p className="text-sm font-medium text-slate-900">₹ {student.paid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Outstanding (₹)</p>
            <p className="text-sm font-medium text-slate-900">₹ {student.outstanding.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Due Date</p>
            <p className="text-sm font-medium text-slate-900">{student.dueDate}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-[#7c3aed] h-2 rounded-full transition-all"
              style={{ width: `${student.totalFee > 0 ? (student.paid / student.totalFee) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-500">Payment Progress</span>
            <span className="text-xs font-semibold text-slate-900">
              {student.totalFee > 0 ? Math.round((student.paid / student.totalFee) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
