"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RoomCheckOutDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { room: string; student: string; checkOutDate: string; reason: string }) => void;
}

export default function RoomCheckOutDialog({ open, onClose, onSave }: RoomCheckOutDialogProps) {
  const [room, setRoom] = useState("");
  const [student, setStudent] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSave = () => {
    if (!room || !student || !checkOutDate) return;
    onSave({ room, student, checkOutDate, reason });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Check-Out" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Room No.</label>
          <Input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room number" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Student Name</label>
          <Input value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Student name" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Check-Out Date</label>
          <Input value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} placeholder="DD/MM/YYYY" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Check-out reason..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
            rows={3}
          />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <Button onClick={handleSave} className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg px-4 py-2 text-sm font-semibold">
            Check Out
          </Button>
        </div>
      </div>
    </Modal>
  );
}
