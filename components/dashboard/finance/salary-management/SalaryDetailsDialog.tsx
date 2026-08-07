"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { SalaryRow } from "@/lib/fixtures/salary-management-reference-fixture";

interface SalaryDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  salary: SalaryRow | null;
}

export default function SalaryDetailsDialog({ open, onClose, salary }: SalaryDetailsDialogProps) {
  if (!salary) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Salary Details</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
        <div>
          <div>
            <p>Employee ID</p>
            <p>{salary.employeeId}</p>
          </div>
          <div>
            <p>Employee Name</p>
            <p>{salary.employeeName}</p>
          </div>
          <div>
            <p>Department</p>
            <p>{salary.department}</p>
          </div>
          <div>
            <p>Designation</p>
            <p>{salary.designation}</p>
          </div>
          <div>
            <p>Basic Salary</p>
            <p>₹ {salary.basicSalary.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p>Net Salary</p>
            <p>₹ {salary.netSalary.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p>Status</p>
            <p>{salary.status}</p>
          </div>
          <div>
            <p>Employee Type</p>
            <p>{salary.employeeType}</p>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={onClose}
         
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

