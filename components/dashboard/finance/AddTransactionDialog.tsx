"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { X, ChevronDown } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import {
  TRANSACTION_TYPE_OPTIONS,
  PAYMENT_MODE_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/fixtures/transactions-reference-fixture";
import type { TransactionRow } from "@/lib/fixtures/transactions-reference-fixture";

interface AddTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (tx: TransactionRow) => void;
}

export default function AddTransactionDialog({ open, onClose, onSave }: AddTransactionDialogProps) {
  const [form, setForm] = useState({
    receiptRefNo: "",
    date: new Date().toISOString().split("T")[0],
    studentName: "",
    classGrade: "",
    type: "Income" as "Income" | "Expense",
    category: "",
    paymentMode: "Online",
    amount: "",
    status: "Success" as "Success" | "Pending" | "Failed",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.receiptRefNo) newErrors.receiptRefNo = "Receipt / Reference Number is required";
    if (!form.studentName) newErrors.studentName = "Student / Party Name is required";
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = "Amount must be greater than 0";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const id = crypto.randomUUID();
    const tx: TransactionRow = {
      id,
      receiptRefNo: form.receiptRefNo,
      date: form.date,
      studentName: form.studentName,
      classGrade: form.classGrade,
      type: form.type,
      category: form.category,
      paymentMode: form.paymentMode,
      amount: parseFloat(form.amount),
      status: form.status,
    };
    onSave(tx);
    setForm({
      receiptRefNo: "",
      date: new Date().toISOString().split("T")[0],
      studentName: "",
      classGrade: "",
      type: "Income",
      category: "",
      paymentMode: "Online",
      amount: "",
      status: "Success",
      notes: "",
    });
    setErrors({});
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent";

  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-2xl">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Add Transaction</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Transaction Type</label>
            <Dropdown
              value={form.type}
              options={TRANSACTION_TYPE_OPTIONS.filter((o) => o !== "All Types")}
              onChange={(v) => setForm({ ...form, type: v as "Income" | "Expense" })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Receipt / Reference Number</label>
            <input
              type="text"
              value={form.receiptRefNo}
              onChange={(e) => setForm({ ...form, receiptRefNo: e.target.value })}
              className={inputClass}
              placeholder="e.g. RCP10001"
              required
            />
            {errors.receiptRefNo && <p className="text-xs text-red-500 mt-1">{errors.receiptRefNo}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
              required
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Student / Party Name</label>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className={inputClass}
              placeholder="Enter name"
              required
            />
            {errors.studentName && <p className="text-xs text-red-500 mt-1">{errors.studentName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Class / Grade</label>
            <input
              type="text"
              value={form.classGrade}
              onChange={(e) => setForm({ ...form, classGrade: e.target.value })}
              className={inputClass}
              placeholder="e.g. VIII - A"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              placeholder="e.g. Tuition Fee"
              required
            />
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Payment Mode</label>
            <Dropdown
              value={form.paymentMode}
              options={PAYMENT_MODE_OPTIONS.filter((o) => o !== "All Modes")}
              onChange={(v) => setForm({ ...form, paymentMode: v })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Amount (₹)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={inputClass}
              placeholder="0.00"
              required
            />
            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
            <Dropdown
              value={form.status}
              options={STATUS_OPTIONS.filter((o) => o !== "All Status")}
              onChange={(v) => setForm({ ...form, status: v as "Success" | "Pending" | "Failed" })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={inputClass}
              placeholder="Optional notes..."
              rows={2}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Save Transaction
          </button>
        </div>
      </form>
    </Modal>
  );
}
