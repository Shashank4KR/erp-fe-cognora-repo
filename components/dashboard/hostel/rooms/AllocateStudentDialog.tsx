"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";

interface AllocateStudentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { student: string; rollNo: string; room: string; block: string; checkInDate: string }) => void;
}

export default function AllocateStudentDialog({ open, onClose, onSave }: AllocateStudentDialogProps) {
  const [student, setStudent] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [room, setRoom] = useState("");
  const [block, setBlock] = useState("");
  const [checkInDate, setCheckInDate] = useState("");

  const handleSave = () => {
    if (!student || !rollNo || !room || !block || !checkInDate) return;
    onSave({ student, rollNo, room, block, checkInDate });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Allocate Student" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Student Name</label>
          <Input value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Student name" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Roll No.</label>
          <Input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll number" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Room No.</label>
          <Input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room number" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Block</label>
          <Input value={block} onChange={(e) => setBlock(e.target.value)} placeholder="Block" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Check-In Date</label>
          <Input value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} placeholder="DD/MM/YYYY" />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <Button onClick={handleSave} className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg px-4 py-2 text-sm font-semibold">
            Allocate
          </Button>
        </div>
      </div>
    </Modal>
  );
}
