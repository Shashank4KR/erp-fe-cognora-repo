"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";

interface HostelStudentsReportDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function HostelStudentsReportDialog({ open, onClose }: HostelStudentsReportDialogProps) {
  const [reportType, setReportType] = useState("Student Register");

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal open={open} onClose={onClose} title="Hostel Reports" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Report Type</label>
          <div className="space-y-2">
            {["Student Register", "Room Allocation Report", "Check-In Report", "Vacancy Report"].map(
              (type) => (
                <label
                  key={type}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${
                    reportType === type
                      ? "border-purple-300 bg-purple-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={type}
                    checked={reportType === type}
                    onChange={(e) => setReportType(e.target.value)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-700">{type}</span>
                </label>
              )
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
          >
            Print / Export
          </Button>
        </div>
      </div>
    </Modal>
  );
}
