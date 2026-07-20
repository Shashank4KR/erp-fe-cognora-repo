"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import { ADD_BLOCK_STATUS_OPTIONS, BLOCK_OPTIONS } from "@/lib/fixtures/hostel-management-reference-fixture";

interface AddBlockDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    blockName: string;
    gender: string;
    totalFloors: string;
    totalRooms: string;
    warden: string;
    contactNumber: string;
    status: string;
    notes: string;
  }) => void;
}

export default function AddBlockDialog({ open, onClose, onSave }: AddBlockDialogProps) {
  const [blockName, setBlockName] = useState("");
  const [gender, setGender] = useState("Boys");
  const [totalFloors, setTotalFloors] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [warden, setWarden] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [status, setStatus] = useState(ADD_BLOCK_STATUS_OPTIONS[0]);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!blockName || !totalFloors || !totalRooms) return;
    onSave({
      blockName,
      gender,
      totalFloors,
      totalRooms,
      warden,
      contactNumber,
      status,
      notes,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setBlockName("");
    setGender("Boys");
    setTotalFloors("");
    setTotalRooms("");
    setWarden("");
    setContactNumber("");
    setStatus(ADD_BLOCK_STATUS_OPTIONS[0]);
    setNotes("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add Block" maxWidth="max-w-2xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Block Name</label>
            <Input value={blockName} onChange={(e) => setBlockName(e.target.value)} placeholder="e.g. Block D" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
            <Dropdown value={gender} options={["Boys", "Girls"]} onChange={setGender} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Total Floors</label>
            <Input value={totalFloors} onChange={(e) => setTotalFloors(e.target.value)} placeholder="e.g. 3" type="number" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Total Rooms</label>
            <Input value={totalRooms} onChange={(e) => setTotalRooms(e.target.value)} placeholder="e.g. 24" type="number" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Warden</label>
            <Input value={warden} onChange={(e) => setWarden(e.target.value)} placeholder="Warden name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Contact Number</label>
            <Input value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact number" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
            <Dropdown value={status} options={ADD_BLOCK_STATUS_OPTIONS} onChange={setStatus} />
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
            Save Block
          </Button>
        </div>
      </div>
    </Modal>
  );
}
