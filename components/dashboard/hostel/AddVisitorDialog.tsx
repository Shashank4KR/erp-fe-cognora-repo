"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
const BLOCK_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C"];

interface AddVisitorDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    visitorName: string;
    studentName: string;
    roomNo: string;
    block: string;
    purpose: string;
    date: string;
    time: string;
  }) => void;
}

export default function AddVisitorDialog({ open, onClose, onSave }: AddVisitorDialogProps) {
  const [visitorName, setVisitorName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [block, setBlock] = useState(BLOCK_OPTIONS[0]);
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    if (!visitorName || !studentName) return;
    onSave({ visitorName, studentName, roomNo, block, purpose, date, time });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setVisitorName("");
    setStudentName("");
    setRoomNo("");
    setBlock(BLOCK_OPTIONS[0]);
    setPurpose("");
    setDate("");
    setTime("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add Visitor" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Visitor Name</label>
            <Input value={visitorName} onChange={(e) => setVisitorName(e.target.value)} placeholder="Visitor name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Student Name</label>
            <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Visiting student" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room No.</label>
            <Input value={roomNo} onChange={(e) => setRoomNo(e.target.value)} placeholder="Room number" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Block</label>
            <Dropdown value={block} options={BLOCK_OPTIONS.filter((b) => b !== "All Blocks")} onChange={setBlock} placeholder="Select block" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Purpose</label>
            <Input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose of visit" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Date</label>
            <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="DD/MM/YYYY" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Time</label>
            <Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 10:00 AM" />
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
            Save Visitor
          </Button>
        </div>
      </div>
    </Modal>
  );
}
