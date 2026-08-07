"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import type { InvoiceRow } from "@/lib/fixtures/invoices-reference-fixture";

const INVOICE_TYPE_OPTIONS = ["All Types", "Fee Invoice", "Salary Invoice", "Expense Invoice", "Other Invoice"];
const STATUS_OPTIONS = ["All Status", "Paid", "Partial", "Overdue", "Pending"];

interface GenerateInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (invoice: InvoiceRow) => void;
}

export default function GenerateInvoiceDialog({ open, onClose, onSave }: GenerateInvoiceDialogProps) {
  const [form, setForm] = useState({
    studentName: "",
    studentId: "",
    classGrade: "",
    invoiceType: "Fee Invoice" as "Fee Invoice" | "Salary Invoice" | "Expense Invoice" | "Other Invoice",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    amount: "",
    paid: "",
    paymentMode: "Online",
    status: "Pending" as "Paid" | "Partial" | "Overdue" | "Pending",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setForm({
        studentName: "",
        studentId: "",
        classGrade: "",
        invoiceType: "Fee Invoice",
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: "",
        amount: "",
        paid: "",
        paymentMode: "Online",
        status: "Pending",
        notes: "",
      });
      setErrors({});
    }
  }, [open]);

  const balance = (parseFloat(form.amount) || 0) - (parseFloat(form.paid) || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.studentName) newErrors.studentName = "Student / Party Name is required";
    if (!form.invoiceDate) newErrors.invoiceDate = "Invoice Date is required";
    if (!form.dueDate) newErrors.dueDate = "Due Date is required";
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = "Amount must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const id = crypto.randomUUID();
    const invoice: InvoiceRow = {
      id,
      invoiceNo: `INV${Date.now()}`,
      invoiceDate: form.invoiceDate,
      studentName: form.studentName,
      studentId: form.studentId || "TEMP",
      classGrade: form.classGrade || "-",
      invoiceType: form.invoiceType,
      dueDate: form.dueDate,
      amount: parseFloat(form.amount),
      paid: parseFloat(form.paid) || 0,
      balance: balance > 0 ? balance : 0,
      status: form.status,
    };
    onSave(invoice);
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent";

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Generate Invoice</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Invoice Type</label>
            <Dropdown
              value={form.invoiceType}
              options={INVOICE_TYPE_OPTIONS.filter((o) => o !== "All Types")}
              onChange={(v) => setForm({ ...form, invoiceType: v as any })}
            />
          </div>
          <div>
            <label>Student / Party</label>
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
            <label>Invoice Date</label>
            <input
              type="date"
              value={form.invoiceDate}
              onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })}
              className={inputClass}
              required
            />
            {errors.invoiceDate && <p>{errors.invoiceDate}</p>}
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className={inputClass}
              required
            />
            {errors.dueDate && <p>{errors.dueDate}</p>}
          </div>
          <div>
            <label>Fee Type / Category</label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={inputClass}
              placeholder="e.g. Tuition Fee"
            />
          </div>
          <div>
            <label>Total Amount (₹)</label>
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
            <label>Paid Amount (₹)</label>
            <input
              type="number"
              value={form.paid}
              onChange={(e) => setForm({ ...form, paid: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label>Balance (₹)</label>
            <input
              type="text"
              value={balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              readOnly
              className={`${inputClass} bg-slate-50`}
            />
          </div>
          <div>
            <label>Payment Mode</label>
            <Dropdown
              value={form.paymentMode}
              options={["Online", "Cash", "UPI", "Net Banking", "Bank Transfer"]}
              onChange={(v) => setForm({ ...form, paymentMode: v })}
            />
          </div>
          <div>
            <label>Status</label>
            <Dropdown
              value={form.status}
              options={STATUS_OPTIONS.filter((o) => o !== "All Status")}
              onChange={(v) => setForm({ ...form, status: v as any })}
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
            Save Invoice
          </button>
        </div>
      </form>
    </Modal>
  );
}

