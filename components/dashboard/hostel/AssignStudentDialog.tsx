"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
const BLOCK_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C"];

interface AssignStudentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    student: string;
    rollNo: string;
    block: string;
    room: string;
    checkInDate: string;
  }) => void;
}

export default function AssignStudentDialog({ open, onClose, onSave }: AssignStudentDialogProps) {
  const [student, setStudent] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [block, setBlock] = useState(BLOCK_OPTIONS[0]);
  const [room, setRoom] = useState("");
  const [checkInDate, setCheckInDate] = useState("");

  const handleSave = () => {
    if (!student || !rollNo || !room) return;
    onSave({ student, rollNo, block, room, checkInDate });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setStudent("");
    setRollNo("");
    setBlock(BLOCK_OPTIONS[0]);
    setRoom("");
    setCheckInDate("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Assign Student" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Student Name</label>
            <Input value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Student name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Roll No.</label>
            <Input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll number" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Hostel Block</label>
            <Dropdown value={block} options={BLOCK_OPTIONS.filter((b) => b !== "All Blocks")} onChange={setBlock} placeholder="Select block" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room No.</label>
            <Input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room number" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Check-In Date</label>
            <Input value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} placeholder="DD/MM/YYYY" />
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
            Assign Student
          </Button>
        </div>
      </div>
    </Modal>
  );
}
