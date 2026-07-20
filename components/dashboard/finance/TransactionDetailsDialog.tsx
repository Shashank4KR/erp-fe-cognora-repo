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
    <Modal open={open} onClose={onClose} className="w-full max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Transaction Details</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Receipt / Ref No.</p>
            <p className="text-sm font-mono font-medium text-slate-900">{transaction.receiptRefNo}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Date</p>
            <p className="text-sm font-medium text-slate-900">{transaction.date}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Student / Party Name</p>
            <p className="text-sm font-medium text-slate-900">{transaction.studentName}</p>
          </div>
          {transaction.classGrade && (
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Class / Grade</p>
              <p className="text-sm font-mono font-medium text-slate-900">{transaction.classGrade}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Type</p>
            <span className={`inline-flex items-center text-xs font-semibold ${isExpense ? "text-pink-600" : "text-emerald-600"}`}>
              {transaction.type === "Income" ? (
                <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              )}
              {transaction.type}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Category</p>
            <p className="text-sm font-medium text-slate-900">{transaction.category}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Payment Mode</p>
            <p className="text-sm font-medium text-slate-900">{transaction.paymentMode}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Amount</p>
            <p className="text-sm font-semibold text-slate-900">₹{transaction.amount.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Status</p>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
              transaction.status === "Success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
              transaction.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
              "bg-red-50 text-red-700 border-red-200"
            }`}>
              {transaction.status}
            </span>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
