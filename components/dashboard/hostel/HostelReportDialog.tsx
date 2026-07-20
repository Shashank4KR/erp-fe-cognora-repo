"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";

interface HostelReportDialogProps {
  open: boolean;
  onClose: () => void;
}

const REPORT_TYPES = [
  "Occupancy Report",
  "Fee Collection Report",
  "Check-In / Check-Out Report",
  "Maintenance Report",
  "Visitor Log Report",
];

export default function HostelReportDialog({ open, onClose }: HostelReportDialogProps) {
  const [reportType, setReportType] = useState(REPORT_TYPES[0]);
  const [block, setBlock] = useState("All Blocks");

  const handleExport = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Hostel Reports" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Report Type</label>
            <Dropdown value={reportType} options={REPORT_TYPES} onChange={setReportType} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Block</label>
            <Dropdown value={block} options={["All Blocks", "Block A", "Block B", "Block C"]} onChange={setBlock} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <Button
            onClick={handleExport}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Export Report
          </Button>
        </div>
      </div>
    </Modal>
  );
}
