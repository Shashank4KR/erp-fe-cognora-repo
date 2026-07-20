"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import { Button } from "@/components/ui/button";

interface RoomTransferDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { student: string; fromRoom: string; toRoom: string; block: string; reason: string }) => void;
}

const BLOCK_OPTIONS = ["Block A (Boys)", "Block B (Boys)", "Block C (Girls)", "Block D (Girls)"];
const ROOM_MAP: Record<string, string[]> = {
  "Block A (Boys)": ["A-101", "A-102", "A-103", "A-104"],
  "Block B (Boys)": ["B-201", "B-202", "B-203"],
  "Block C (Girls)": ["C-301", "C-302", "C-303"],
  "Block D (Girls)": ["D-401", "D-402"],
};

export default function RoomTransferDialog({ open, onClose, onSave }: RoomTransferDialogProps) {
  const [student, setStudent] = useState("");
  const [fromRoom, setFromRoom] = useState("");
  const [toRoom, setToRoom] = useState("");
  const [block, setBlock] = useState(BLOCK_OPTIONS[0]);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableRooms = ROOM_MAP[block] || [];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!student.trim()) newErrors.student = "Student name is required";
    if (!fromRoom.trim()) newErrors.fromRoom = "From room is required";
    if (!toRoom.trim()) newErrors.toRoom = "To room is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ student, fromRoom, toRoom, block, reason });
    handleClose();
  };

  const handleClose = () => {
    setStudent("");
    setFromRoom("");
    setToRoom("");
    setBlock(BLOCK_OPTIONS[0]);
    setReason("");
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Transfer Room" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Student Name</label>
          <Input
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="Student Name"
            className={errors.student ? "border-red-300" : ""}
          />
          {errors.student && <p className="mt-1 text-xs text-red-600">{errors.student}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">From Room</label>
          <Input
            value={fromRoom}
            onChange={(e) => setFromRoom(e.target.value)}
            placeholder="From Room"
            className={errors.fromRoom ? "border-red-300" : ""}
          />
          {errors.fromRoom && <p className="mt-1 text-xs text-red-600">{errors.fromRoom}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">To Room</label>
          <Dropdown
            value={toRoom}
            options={availableRooms}
            onChange={setToRoom}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Block</label>
          <Dropdown
            value={block}
            options={BLOCK_OPTIONS}
            onChange={(v) => {
              setBlock(v);
              setToRoom(ROOM_MAP[v]?.[0] || "");
            }}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for transfer"
            rows={3}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={handleClose}
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
