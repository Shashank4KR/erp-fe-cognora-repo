"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";

interface RoomTransferDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { student: string; fromRoom: string; toRoom: string; block: string; reason: string }) => void;
}

export default function RoomTransferDialog({ open, onClose, onSave }: RoomTransferDialogProps) {
  const [student, setStudent] = useState("");
  const [fromRoom, setFromRoom] = useState("");
  const [toRoom, setToRoom] = useState("");
  const [block, setBlock] = useState("");
  const [reason, setReason] = useState("");

  const handleSave = () => {
    if (!student || !fromRoom || !toRoom || !block) return;
    onSave({ student, fromRoom, toRoom, block, reason });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Room Transfer" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Student Name</label>
          <Input value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Student name" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">From Room</label>
          <Input value={fromRoom} onChange={(e) => setFromRoom(e.target.value)} placeholder="Current room" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">To Room</label>
          <Input value={toRoom} onChange={(e) => setToRoom(e.target.value)} placeholder="New room" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Block</label>
          <Input value={block} onChange={(e) => setBlock(e.target.value)} placeholder="Block" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Transfer reason..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
            rows={3}
          />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <Button onClick={handleSave} className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg px-4 py-2 text-sm font-semibold">
            Transfer
          </Button>
        </div>
      </div>
    </Modal>
  );
}
