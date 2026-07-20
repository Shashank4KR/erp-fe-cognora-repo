"use client";

import { X, Calendar } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import type { Expense } from "@/lib/fixtures/expenses-management-reference-fixture";

interface ExpenseDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
}

export default function ExpenseDetailsDialog({ open, onClose, expense }: ExpenseDetailsDialogProps) {
  if (!expense) return null;

  const getStatusBadge = (status: string) => {
    if (status === "Approved") return <Badge variant="success">Approved</Badge>;
    if (status === "Pending") return <Badge variant="warning">Pending</Badge>;
    if (status === "Rejected") return <Badge variant="error">Rejected</Badge>;
    return <Badge>{status}</Badge>;
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Expense Details</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <DetailField label="Expense ID" value={expense.expenseId} />
          <DetailField label="Expense Name" value={expense.expenseName} />
          <DetailField label="Category" value={expense.category} />
          <DetailField label="Department" value={expense.department} />
          <DetailField label="Amount" value={`₹ ${expense.amount.toLocaleString("en-IN")}`} />
          <DetailField label="Payment Mode" value={expense.paymentMode} />
          <DetailField label="Expense Date" value={expense.expenseDate} />
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Status</p>
            {getStatusBadge(expense.status)}
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 flex items-center justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
      <p className="text-sm text-slate-900 font-medium">{value}</p>
    </div>
  );
}
