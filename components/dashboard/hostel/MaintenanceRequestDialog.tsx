"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import { BLOCK_OPTIONS } from "@/lib/fixtures/hostel-management-reference-fixture";

interface MaintenanceRequestDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    block: string;
    roomNo: string;
    issueType: string;
    description: string;
    priority: string;
    reportedBy: string;
  }) => void;
}

export default function MaintenanceRequestDialog({ open, onClose, onSave }: MaintenanceRequestDialogProps) {
  const [block, setBlock] = useState(BLOCK_OPTIONS[0]);
  const [roomNo, setRoomNo] = useState("");
  const [issueType, setIssueType] = useState("Electrical");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [reportedBy, setReportedBy] = useState("");

  const handleSave = () => {
    if (!roomNo || !description) return;
    onSave({ block, roomNo, issueType, description, priority, reportedBy });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setBlock(BLOCK_OPTIONS[0]);
    setRoomNo("");
    setIssueType("Electrical");
    setDescription("");
    setPriority("Medium");
    setReportedBy("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Maintenance Request" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Hostel Block</label>
            <Dropdown value={block} options={BLOCK_OPTIONS.filter((b) => b !== "All Blocks")} onChange={setBlock} placeholder="Select block" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room No.</label>
            <Input value={roomNo} onChange={(e) => setRoomNo(e.target.value)} placeholder="Room number" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Issue Type</label>
            <Dropdown
              value={issueType}
              options={["Electrical", "Plumbing", "Furniture", "Wi-Fi / Network", "Other"]}
              onChange={setIssueType}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Priority</label>
            <Dropdown value={priority} options={["Low", "Medium", "High", "Urgent"]} onChange={setPriority} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
              rows={3}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Reported By</label>
            <Input value={reportedBy} onChange={(e) => setReportedBy(e.target.value)} placeholder="Reporter name" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <Button
            onClick={handleSave}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Submit Request
          </Button>
        </div>
      </div>
    </Modal>
  );
}
