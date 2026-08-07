"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { StudentFeeRow } from "@/lib/fixtures/fees-management-reference-fixture";

interface StudentFeeDetailsDialogProps {
  student: StudentFeeRow;
  onClose: () => void;
}

export default function StudentFeeDetailsDialog({ student, onClose }: StudentFeeDetailsDialogProps) {
  return (
    <Modal open={!!student} onClose={onClose}>
      <div>
        <h2>Student Fee Details</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
        <div>
          <div>
            <p>Roll No.</p>
            <p>{student.rollNo}</p>
          </div>
          <div>
            <p>Student Name</p>
            <p>{student.studentName}</p>
          </div>
          <div>
            <p>Class / Grade</p>
            <p>{student.classGrade}</p>
          </div>
          <div>
            <p>Status</p>
            <p>{student.status}</p>
          </div>
          <div>
            <p>Total Fee (₹)</p>
            <p>₹ {student.totalFee.toLocaleString()}</p>
          </div>
          <div>
            <p>Paid (₹)</p>
            <p>₹ {student.paid.toLocaleString()}</p>
          </div>
          <div>
            <p>Outstanding (₹)</p>
            <p>₹ {student.outstanding.toLocaleString()}</p>
          </div>
          <div>
            <p>Due Date</p>
            <p>{student.dueDate}</p>
          </div>
        </div>
        <div>
          <div>
            <div
             
              style={{ width: `${student.totalFee > 0 ? (student.paid / student.totalFee) * 100 : 0}%` }}
            />
          </div>
          <div>
            <span>Payment Progress</span>
            <span>
              {student.totalFee > 0 ? Math.round((student.paid / student.totalFee) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

