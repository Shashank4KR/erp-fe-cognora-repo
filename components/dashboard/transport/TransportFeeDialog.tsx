"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import {
  ROUTE_OPTIONS,
  VEHICLE_OPTIONS,
} from "@/lib/fixtures/transport-management-reference-fixture";

interface TransportFeeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    student: string;
    route: string;
    vehicle: string;
    amount: string;
    dueDate: string;
    status: string;
  }) => void;
}

export default function TransportFeeDialog({ open, onClose, onSave }: TransportFeeDialogProps) {
  const [student, setStudent] = useState("");
  const [route, setRoute] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = () => {
    if (!student || !route || !amount || !status) return;
    onSave({ student, route, vehicle, amount, dueDate, status });
    setStudent("");
    setRoute("");
    setVehicle("");
    setAmount("");
    setDueDate("");
    setStatus("");
    onClose();
  };

  const handleClose = () => {
    setStudent("");
    setRoute("");
    setVehicle("");
    setAmount("");
    setDueDate("");
    setStatus("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Transport Fee" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Student</label>
          <Input
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="Student name or ID"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Route</label>
            <Dropdown
              value={route}
              options={ROUTE_OPTIONS.filter((r) => r !== "All Routes")}
              onChange={setRoute}
              placeholder="Select route"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Vehicle</label>
            <Dropdown
              value={vehicle}
              options={VEHICLE_OPTIONS.filter((v) => v !== "All Vehicles")}
              onChange={setVehicle}
              placeholder="Select vehicle"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Amount</label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
              type="number"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Due Date</label>
            <Input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
          <Dropdown
            value={status}
            options={["Pending", "Paid", "Overdue"]}
            onChange={setStatus}
            placeholder="Select status"
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
            Save Fee
          </Button>
        </div>
      </div>
    </Modal>
  );
}
