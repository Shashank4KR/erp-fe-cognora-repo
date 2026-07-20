"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { SalaryRow } from "@/lib/fixtures/salary-management-reference-fixture";

interface SalaryDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  salary: SalaryRow | null;
}

export default function SalaryDetailsDialog({ open, onClose, salary }: SalaryDetailsDialogProps) {
  if (!salary) return null;

  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Salary Details</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Employee ID</p>
            <p className="text-sm font-semibold text-slate-900">{salary.employeeId}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Employee Name</p>
            <p className="text-sm font-semibold text-slate-900">{salary.employeeName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Department</p>
            <p className="text-sm font-semibold text-slate-900">{salary.department}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Designation</p>
            <p className="text-sm font-semibold text-slate-900">{salary.designation}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Basic Salary</p>
            <p className="text-sm font-semibold text-slate-900">₹ {salary.basicSalary.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Net Salary</p>
            <p className="text-sm font-semibold text-slate-900">₹ {salary.netSalary.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Status</p>
            <p className="text-sm font-semibold text-slate-900">{salary.status}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Employee Type</p>
            <p className="text-sm font-semibold text-slate-900">{salary.employeeType}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 px-6 pb-6">
        <button
          onClick={onClose}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
