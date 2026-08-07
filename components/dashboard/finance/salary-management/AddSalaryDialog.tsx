"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/shared/Modal";
import { X, ChevronDown, Calendar } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import CalendarPicker from "@/components/shared/Calendar";
import type { SalaryRow } from "@/lib/fixtures/salary-management-reference-fixture";

const MONTH_OPTIONS = ["May 2025", "April 2025", "March 2025", "February 2025", "January 2025"];
const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Information Tech.",
  "Administration",
  "Accounts",
  "Library",
  "Maintenance",
];
const DESIGNATION_OPTIONS = [
  "All Designations",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Office Manager",
  "Accountant",
  "Librarian",
  "Technician",
];

interface AddSalaryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (salary: SalaryRow) => void;
}

export default function AddSalaryDialog({ open, onClose, onSave }: AddSalaryDialogProps) {
  const [form, setForm] = useState({
    employeeName: "",
    employeeId: "",
    department: DEPARTMENT_OPTIONS[1],
    designation: DESIGNATION_OPTIONS[1],
    month: MONTH_OPTIONS[0],
    basicSalary: "",
    allowances: "",
    deductions: "",
    paymentStatus: "Paid" as "Paid" | "Partial" | "Pending",
    paymentDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm({
        employeeName: "",
        employeeId: "",
        department: DEPARTMENT_OPTIONS[1],
        designation: DESIGNATION_OPTIONS[1],
        month: MONTH_OPTIONS[0],
        basicSalary: "",
        allowances: "",
        deductions: "",
        paymentStatus: "Paid",
        paymentDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
      setErrors({});
      setCalendarOpen(false);
    }
  }, [open]);

  const basic = parseFloat(form.basicSalary) || 0;
  const allowances = parseFloat(form.allowances) || 0;
  const deductions = parseFloat(form.deductions) || 0;
  const netSalary = basic + allowances - deductions;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.employeeName) newErrors.employeeName = "Employee name is required";
    if (!form.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!form.basicSalary || parseFloat(form.basicSalary) <= 0) newErrors.basicSalary = "Basic salary must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const salary: SalaryRow = {
      id: crypto.randomUUID(),
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      department: form.department,
      designation: form.designation,
      basicSalary: basic,
      netSalary: netSalary,
      status: form.paymentStatus,
      employeeType: form.department === "Administration" || form.department === "Accounts" || form.department === "Library" || form.department === "Maintenance" ? "Non-Teaching Staff" : "Teaching Staff",
    };
    onSave(salary);
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent";

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Add Salary</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Employee Name</label>
            <input
              type="text"
              value={form.employeeName}
              onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
              className={inputClass}
              placeholder="Enter employee name"
              required
            />
            {errors.employeeName && <p>{errors.employeeName}</p>}
          </div>
          <div>
            <label>Employee ID</label>
            <input
              type="text"
              value={form.employeeId}
              onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
              className={inputClass}
              placeholder="e.g. EMP009"
              required
            />
            {errors.employeeId && <p>{errors.employeeId}</p>}
          </div>
          <div>
            <label>Department</label>
            <Dropdown
              value={form.department}
              options={DEPARTMENT_OPTIONS.filter((o) => o !== "All Departments")}
              onChange={(v) => setForm({ ...form, department: v })}
            />
          </div>
          <div>
            <label>Designation</label>
            <Dropdown
              value={form.designation}
              options={DESIGNATION_OPTIONS.filter((o) => o !== "All Designations")}
              onChange={(v) => setForm({ ...form, designation: v })}
            />
          </div>
          <div>
            <label>Month</label>
            <Dropdown
              value={form.month}
              options={MONTH_OPTIONS}
              onChange={(v) => setForm({ ...form, month: v })}
            />
          </div>
          <div>
            <label>Basic Salary (₹)</label>
            <input
              type="number"
              value={form.basicSalary}
              onChange={(e) => setForm({ ...form, basicSalary: e.target.value })}
              className={inputClass}
              placeholder="0.00"
              required
            />
            {errors.basicSalary && <p>{errors.basicSalary}</p>}
          </div>
          <div>
            <label>Allowances (₹)</label>
            <input
              type="number"
              value={form.allowances}
              onChange={(e) => setForm({ ...form, allowances: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label>Deductions (₹)</label>
            <input
              type="number"
              value={form.deductions}
              onChange={(e) => setForm({ ...form, deductions: e.target.value })}
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label>Net Salary (₹)</label>
            <input
              type="text"
              value={netSalary.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              readOnly
              className={`${inputClass} bg-slate-50 text-slate-600`}
            />
          </div>
          <div>
            <label>Payment Status</label>
            <Dropdown
              value={form.paymentStatus}
              options={["Paid", "Partial", "Pending"]}
              onChange={(v) => setForm({ ...form, paymentStatus: v as "Paid" | "Partial" | "Pending" })}
            />
          </div>
          <div>
            <label>Payment Date</label>
            <div>
              <input
                type="text"
                value={form.paymentDate}
                readOnly
                onClick={() => setCalendarOpen((o) => !o)}
                className={`${inputClass} cursor-pointer`}
              />
              <Calendar />
              {calendarOpen && (
                <div>
                  <CalendarPicker
                    selectedDate={new Date(form.paymentDate)}
                    onSelect={(d) => {
                      const dateStr = d.toISOString().split("T")[0];
                      setForm({ ...form, paymentDate: dateStr });
                      setCalendarOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
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
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

