"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { TransactionRow } from "@/lib/fixtures/transactions-reference-fixture";

interface TransactionDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  transaction: TransactionRow | null;
}

export default function TransactionDetailsDialog({ open, onClose, transaction }: TransactionDetailsDialogProps) {
  if (!transaction) return null;

  const isExpense = transaction.type === "Expense";

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Transaction Details</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
        <div>
          <div>
            <p>Receipt / Ref No.</p>
            <p>{transaction.receiptRefNo}</p>
          </div>
          <div>
            <p>Date</p>
            <p>{transaction.date}</p>
          </div>
          <div>
            <p>Student / Party Name</p>
            <p>{transaction.studentName}</p>
          </div>
          {transaction.classGrade && (
            <div>
              <p>Class / Grade</p>
              <p>{transaction.classGrade}</p>
            </div>
          )}
          <div>
            <p>Type</p>
            <span className={`inline-flex items-center text-xs font-semibold ${isExpense ? "text-pink-600" : "text-emerald-600"}`}>
              {transaction.type === "Income" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              )}
              {transaction.type}
            </span>
          </div>
          <div>
            <p>Category</p>
            <p>{transaction.category}</p>
          </div>
          <div>
            <p>Payment Mode</p>
            <p>{transaction.paymentMode}</p>
          </div>
          <div>
            <p>Amount</p>
            <p>₹{transaction.amount.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p>Status</p>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
              transaction.status === "Success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
              transaction.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
              "bg-red-50 text-red-700 border-red-200"
            }`}>
              {transaction.status}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={onClose}
           
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

