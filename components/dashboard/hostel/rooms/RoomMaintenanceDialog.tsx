"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";

interface RoomMaintenanceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { room: string; block: string; issueType: string; description: string; priority: string }) => void;
}

export default function RoomMaintenanceDialog({ open, onClose, onSave }: RoomMaintenanceDialogProps) {
  const [room, setRoom] = useState("");
  const [block, setBlock] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSave = () => {
    if (!room || !block || !issueType) return;
    onSave({ room, block, issueType, description, priority });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Room Maintenance" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Room No.</label>
          <Input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room number" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Block</label>
          <Input value={block} onChange={(e) => setBlock(e.target.value)} placeholder="Block" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Issue Type</label>
          <Dropdown
            value={issueType}
            options={["Electrical", "Plumbing", "Furniture", "Cleaning", "Other"]}
            onChange={setIssueType}
            placeholder="Select issue type"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Priority</label>
          <Dropdown
            value={priority}
            options={["Low", "Medium", "High", "Urgent"]}
            onChange={setPriority}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
            rows={3}
          />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <Button onClick={handleSave} className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg px-4 py-2 text-sm font-semibold">
            Submit Request
          </Button>
        </div>
      </div>
    </Modal>
  );
}
