"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";
import {
  CLASS_GRADE_OPTIONS,
  FEE_TYPE_OPTIONS,
  INSTALLMENT_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/fixtures/fees-management-reference-fixture";

interface AddFeeCollectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (fee: {
    id: string;
    studentName: string;
    classGrade: string;
    feeType: string;
    installment: string;
    totalAmount: string;
    amountPaid: string;
    paymentMode: string;
    paymentDate: string;
    receiptNumber: string;
    status: string;
    notes: string;
  }) => void;
}

export default function AddFeeCollectionDialog({ open, onClose, onSave }: AddFeeCollectionDialogProps) {
  const [form, setForm] = useState({
    studentName: "",
    classGrade: "All Classes",
    feeType: "Tuition Fee",
    installment: "All Installments",
    totalAmount: "",
    amountPaid: "",
    paymentMode: "Cash",
    paymentDate: new Date().toISOString().split("T")[0],
    receiptNumber: "",
    status: "Paid",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.studentName.trim()) newErrors.studentName = "Student name is required";
    if (!form.classGrade) newErrors.classGrade = "Class / Grade is required";
    if (!form.feeType) newErrors.feeType = "Fee Type is required";
    if (!form.installment) newErrors.installment = "Installment is required";
    if (!form.totalAmount || Number(form.totalAmount) <= 0) newErrors.totalAmount = "Total Amount is required";
    if (!form.amountPaid || Number(form.amountPaid) < 0) newErrors.amountPaid = "Amount Paid is required";
    if (!form.paymentMode) newErrors.paymentMode = "Payment Mode is required";
    if (!form.paymentDate) newErrors.paymentDate = "Payment Date is required";
    if (!form.receiptNumber.trim()) newErrors.receiptNumber = "Receipt Number is required";
    if (!form.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      id: crypto.randomUUID(),
      ...form,
    });
    setForm({
      studentName: "",
      classGrade: "All Classes",
      feeType: "Tuition Fee",
      installment: "All Installments",
      totalAmount: "",
      amountPaid: "",
      paymentMode: "Cash",
      paymentDate: new Date().toISOString().split("T")[0],
      receiptNumber: "",
      status: "Paid",
      notes: "",
    });
    setErrors({});
    setToast({ open: true, message: "Fee collection added successfully" });
    setTimeout(() => {
      setToast({ open: false, message: "" });
      onClose();
    }, 1500);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent";

  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-2xl">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Add Fee Collection</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Student</label>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className={inputClass}
              placeholder="Enter student name"
            />
            {errors.studentName && <p className="text-xs text-red-500 mt-1">{errors.studentName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Class / Grade</label>
            <Dropdown
              label=""
              value={form.classGrade}
              options={CLASS_GRADE_OPTIONS}
              onChange={(v) => setForm({ ...form, classGrade: v })}
            />
            {errors.classGrade && <p className="text-xs text-red-500 mt-1">{errors.classGrade}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fee Type</label>
            <Dropdown
              label=""
              value={form.feeType}
              options={FEE_TYPE_OPTIONS}
              onChange={(v) => setForm({ ...form, feeType: v })}
            />
            {errors.feeType && <p className="text-xs text-red-500 mt-1">{errors.feeType}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Installment</label>
            <Dropdown
              label=""
              value={form.installment}
              options={INSTALLMENT_OPTIONS}
              onChange={(v) => setForm({ ...form, installment: v })}
            />
            {errors.installment && <p className="text-xs text-red-500 mt-1">{errors.installment}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Amount (₹)</label>
            <input
              type="number"
              value={form.totalAmount}
              onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
            {errors.totalAmount && <p className="text-xs text-red-500 mt-1">{errors.totalAmount}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Amount Paid (₹)</label>
            <input
              type="number"
              value={form.amountPaid}
              onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
            {errors.amountPaid && <p className="text-xs text-red-500 mt-1">{errors.amountPaid}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Payment Mode</label>
            <select
              value={form.paymentMode}
              onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}
              className={inputClass}
            >
              <option>Cash</option>
              <option>Online</option>
              <option>UPI</option>
              <option>Cheque</option>
              <option>Bank Transfer</option>
            </select>
            {errors.paymentMode && <p className="text-xs text-red-500 mt-1">{errors.paymentMode}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Payment Date</label>
            <input
              type="date"
              value={form.paymentDate}
              onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
              className={inputClass}
            />
            {errors.paymentDate && <p className="text-xs text-red-500 mt-1">{errors.paymentDate}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Receipt Number</label>
            <input
              type="text"
              value={form.receiptNumber}
              onChange={(e) => setForm({ ...form, receiptNumber: e.target.value })}
              className={inputClass}
              placeholder="RCPT-XXXX"
            />
            {errors.receiptNumber && <p className="text-xs text-red-500 mt-1">{errors.receiptNumber}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
            <Dropdown
              label=""
              value={form.status}
              options={STATUS_OPTIONS}
              onChange={(v) => setForm({ ...form, status: v })}
            />
            {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={inputClass}
              rows={3}
              placeholder="Optional notes..."
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
            Save
          </button>
        </div>
      </form>
      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl">
          {toast.message}
        </div>
      )}
    </Modal>
  );
}
