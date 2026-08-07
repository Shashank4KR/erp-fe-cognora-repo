"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";

const CLASS_GRADE_OPTIONS = [
  "All Classes",
  "VIII - A",
  "VI - B",
  "IX - A",
  "VIII - B",
  "IX - B",
  "VI - A",
  "V - B",
  "VIII - C",
];
const FEE_TYPE_OPTIONS = ["All Fee Types", "Tuition Fee", "Transport Fee", "Admission Fee", "Exam Fee", "Other Fees"];
const INSTALLMENT_OPTIONS = ["All Installments", "Installment 1", "Installment 2", "Installment 3", "Full Payment"];
const STATUS_OPTIONS = ["All Status", "Paid", "Partial", "Overdue", "Pending"];

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
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Add Fee Collection</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Student</label>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className={inputClass}
              placeholder="Enter student name"
            />
            {errors.studentName && <p>{errors.studentName}</p>}
          </div>
          <div>
            <label>Class / Grade</label>
            <Dropdown
              label=""
              value={form.classGrade}
              options={CLASS_GRADE_OPTIONS}
              onChange={(v) => setForm({ ...form, classGrade: v })}
            />
            {errors.classGrade && <p>{errors.classGrade}</p>}
          </div>
          <div>
            <label>Fee Type</label>
            <Dropdown
              label=""
              value={form.feeType}
              options={FEE_TYPE_OPTIONS}
              onChange={(v) => setForm({ ...form, feeType: v })}
            />
            {errors.feeType && <p>{errors.feeType}</p>}
          </div>
          <div>
            <label>Installment</label>
            <Dropdown
              label=""
              value={form.installment}
              options={INSTALLMENT_OPTIONS}
              onChange={(v) => setForm({ ...form, installment: v })}
            />
            {errors.installment && <p>{errors.installment}</p>}
          </div>
          <div>
            <label>Total Amount (₹)</label>
            <input
              type="number"
              value={form.totalAmount}
              onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
            {errors.totalAmount && <p>{errors.totalAmount}</p>}
          </div>
          <div>
            <label>Amount Paid (₹)</label>
            <input
              type="number"
              value={form.amountPaid}
              onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
            {errors.amountPaid && <p>{errors.amountPaid}</p>}
          </div>
          <div>
            <label>Payment Mode</label>
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
            {errors.paymentMode && <p>{errors.paymentMode}</p>}
          </div>
          <div>
            <label>Payment Date</label>
            <input
              type="date"
              value={form.paymentDate}
              onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
              className={inputClass}
            />
            {errors.paymentDate && <p>{errors.paymentDate}</p>}
          </div>
          <div>
            <label>Receipt Number</label>
            <input
              type="text"
              value={form.receiptNumber}
              onChange={(e) => setForm({ ...form, receiptNumber: e.target.value })}
              className={inputClass}
              placeholder="RCPT-XXXX"
            />
            {errors.receiptNumber && <p>{errors.receiptNumber}</p>}
          </div>
          <div>
            <label>Status</label>
            <Dropdown
              label=""
              value={form.status}
              options={STATUS_OPTIONS}
              onChange={(v) => setForm({ ...form, status: v })}
            />
            {errors.status && <p>{errors.status}</p>}
          </div>
          <div>
            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={inputClass}
              rows={3}
              placeholder="Optional notes..."
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
            Save
          </button>
        </div>
      </form>
      {toast.open && (
        <div>
          {toast.message}
        </div>
      )}
    </Modal>
  );
}

