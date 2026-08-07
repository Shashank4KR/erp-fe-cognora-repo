"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { X, ChevronDown } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import type { TransactionRow } from "@/lib/fixtures/transactions-reference-fixture";

const TRANSACTION_TYPE_OPTIONS = ["All Types", "Income", "Expense"];
const PAYMENT_MODE_OPTIONS = ["All Modes", "Online", "UPI", "Net Banking", "Cash", "Bank Transfer"];
const STATUS_OPTIONS = ["All Status", "Success", "Pending", "Failed"];

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
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Add Transaction</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Transaction Type</label>
            <Dropdown
              value={form.type}
              options={TRANSACTION_TYPE_OPTIONS.filter((o) => o !== "All Types")}
              onChange={(v) => setForm({ ...form, type: v as "Income" | "Expense" })}
            />
          </div>
          <div>
            <label>Receipt / Reference Number</label>
            <input
              type="text"
              value={form.receiptRefNo}
              onChange={(e) => setForm({ ...form, receiptRefNo: e.target.value })}
              className={inputClass}
              placeholder="e.g. RCP10001"
              required
            />
            {errors.receiptRefNo && <p>{errors.receiptRefNo}</p>}
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
              required
            />
            {errors.date && <p>{errors.date}</p>}
          </div>
          <div>
            <label>Student / Party Name</label>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className={inputClass}
              placeholder="Enter name"
              required
            />
            {errors.studentName && <p>{errors.studentName}</p>}
          </div>
          <div>
            <label>Class / Grade</label>
            <input
              type="text"
              value={form.classGrade}
              onChange={(e) => setForm({ ...form, classGrade: e.target.value })}
              className={inputClass}
              placeholder="e.g. VIII - A"
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              placeholder="e.g. Tuition Fee"
              required
            />
            {errors.category && <p>{errors.category}</p>}
          </div>
          <div>
            <label>Payment Mode</label>
            <Dropdown
              value={form.paymentMode}
              options={PAYMENT_MODE_OPTIONS.filter((o) => o !== "All Modes")}
              onChange={(v) => setForm({ ...form, paymentMode: v })}
            />
          </div>
          <div>
            <label>Amount (₹)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={inputClass}
              placeholder="0.00"
              required
            />
            {errors.amount && <p>{errors.amount}</p>}
          </div>
          <div>
            <label>Status</label>
            <Dropdown
              value={form.status}
              options={STATUS_OPTIONS.filter((o) => o !== "All Status")}
              onChange={(v) => setForm({ ...form, status: v as "Success" | "Pending" | "Failed" })}
            />
          </div>
          <div>
            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={inputClass}
              placeholder="Optional notes..."
              rows={2}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={onClose}
           
          >
            Cancel
          </button>
          <button
            type="submit"
           
          >
            Save Transaction
          </button>
        </div>
      </form>
    </Modal>
  );
}

