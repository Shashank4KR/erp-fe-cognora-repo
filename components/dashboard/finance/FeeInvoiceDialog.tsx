"use client";

import { X, Download } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { StudentFeeRow } from "@/lib/fixtures/fees-management-reference-fixture";

interface FeeInvoiceDialogProps {
  student: StudentFeeRow;
  onClose: () => void;
}

export default function FeeInvoiceDialog({ student, onClose }: FeeInvoiceDialogProps) {
  return (
    <Modal open={!!student} onClose={onClose}>
      <div>
        <h2>Fee Invoice</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
        <div>
          <div>
            <div>
              <p>EdTech Smart Campus</p>
              <p>Invoice</p>
            </div>
            <div>
              <p>Date</p>
              <p>18 May 2025</p>
            </div>
          </div>
          <div>
            <div>
              <span>Student</span>
              <span>{student.studentName}</span>
            </div>
            <div>
              <span>Roll No.</span>
              <span>{student.rollNo}</span>
            </div>
            <div>
              <span>Class</span>
              <span>{student.classGrade}</span>
            </div>
            <div>
              <span>Total Fee</span>
              <span>₹ {student.totalFee.toLocaleString()}</span>
            </div>
            <div>
              <span>Paid</span>
              <span>₹ {student.paid.toLocaleString()}</span>
            </div>
            <div>
              <span>Outstanding</span>
              <span>₹ {student.outstanding.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button>
          <Download />
          Download Invoice
        </button>
      </div>
    </Modal>
  );
}

