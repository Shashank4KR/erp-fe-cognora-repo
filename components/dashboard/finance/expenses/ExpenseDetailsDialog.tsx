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
      <div>
        <h2>Expense Details</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
        <div>
          <DetailField label="Expense ID" value={expense.expenseId} />
          <DetailField label="Expense Name" value={expense.expenseName} />
          <DetailField label="Category" value={expense.category} />
          <DetailField label="Department" value={expense.department} />
          <DetailField label="Amount" value={`₹ ${expense.amount.toLocaleString("en-IN")}`} />
          <DetailField label="Payment Mode" value={expense.paymentMode} />
          <DetailField label="Expense Date" value={expense.expenseDate} />
          <div>
            <p>Status</p>
            {getStatusBadge(expense.status)}
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={onClose}
         
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
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}

