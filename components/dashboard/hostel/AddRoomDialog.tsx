"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import {
  ROOM_TYPE_OPTIONS,
  ADD_ROOM_STATUS_OPTIONS,
  ROOM_GENDER_OPTIONS,
  BLOCK_OPTIONS,
} from "@/lib/fixtures/hostel-management-reference-fixture";

interface AddRoomDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    roomNumber: string;
    block: string;
    roomType: string;
    totalBeds: string;
    gender: string;
    floor: string;
    warden: string;
    status: string;
    notes: string;
  }) => void;
}

export default function AddRoomDialog({ open, onClose, onSave }: AddRoomDialogProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [block, setBlock] = useState(BLOCK_OPTIONS[0]);
  const [roomType, setRoomType] = useState(ROOM_TYPE_OPTIONS[0]);
  const [totalBeds, setTotalBeds] = useState("");
  const [gender, setGender] = useState(ROOM_GENDER_OPTIONS[0]);
  const [floor, setFloor] = useState("");
  const [warden, setWarden] = useState("");
  const [status, setStatus] = useState(ADD_ROOM_STATUS_OPTIONS[0]);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!roomNumber || !totalBeds) return;
    onSave({
      roomNumber,
      block,
      roomType,
      totalBeds,
      gender,
      floor,
      warden,
      status,
      notes,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setRoomNumber("");
    setBlock(BLOCK_OPTIONS[0]);
    setRoomType(ROOM_TYPE_OPTIONS[0]);
    setTotalBeds("");
    setGender(ROOM_GENDER_OPTIONS[0]);
    setFloor("");
    setWarden("");
    setStatus(ADD_ROOM_STATUS_OPTIONS[0]);
    setNotes("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add Room" maxWidth="max-w-2xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room Number</label>
            <Input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="e.g. A-101" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Hostel Block</label>
            <Dropdown value={block} options={BLOCK_OPTIONS.filter((b) => b !== "All Blocks")} onChange={setBlock} placeholder="Select block" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room Type</label>
            <Dropdown value={roomType} options={ROOM_TYPE_OPTIONS.filter((r) => r !== "All Types")} onChange={setRoomType} placeholder="Select type" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Total Beds</label>
            <Input value={totalBeds} onChange={(e) => setTotalBeds(e.target.value)} placeholder="e.g. 4" type="number" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
            <Dropdown value={gender} options={ROOM_GENDER_OPTIONS} onChange={setGender} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Floor</label>
            <Input value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="e.g. 1" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Warden</label>
            <Input value={warden} onChange={(e) => setWarden(e.target.value)} placeholder="Warden name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
            <Dropdown value={status} options={ADD_ROOM_STATUS_OPTIONS} onChange={setStatus} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
            rows={3}
          />
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
            Save Room
          </Button>
        </div>
      </div>
    </Modal>
  );
}
