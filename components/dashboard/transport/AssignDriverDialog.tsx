"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import {
  VEHICLE_OPTIONS,
  DRIVER_OPTIONS,
  ROUTE_OPTIONS,
} from "@/lib/fixtures/transport-management-reference-fixture";

interface AssignDriverDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { vehicle: string; driver: string; route: string }) => void;
}

export default function AssignDriverDialog({ open, onClose, onSave }: AssignDriverDialogProps) {
  const [vehicle, setVehicle] = useState("");
  const [driver, setDriver] = useState("");
  const [route, setRoute] = useState("");

  const handleSave = () => {
    if (!vehicle || !driver || !route) return;
    onSave({ vehicle, driver, route });
    setVehicle("");
    setDriver("");
    setRoute("");
    onClose();
  };

  const handleClose = () => {
    setVehicle("");
    setDriver("");
    setRoute("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Assign Driver" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Vehicle</label>
          <Dropdown
            value={vehicle}
            options={VEHICLE_OPTIONS.filter((v) => v !== "All Vehicles")}
            onChange={setVehicle}
            placeholder="Select vehicle"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Driver</label>
          <Dropdown
            value={driver}
            options={DRIVER_OPTIONS.filter((d) => d !== "All Drivers")}
            onChange={setDriver}
            placeholder="Select driver"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Route</label>
          <Dropdown
            value={route}
            options={ROUTE_OPTIONS.filter((r) => r !== "All Routes")}
            onChange={setRoute}
            placeholder="Select route"
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
            Assign Driver
          </Button>
        </div>
      </div>
    </Modal>
  );
}
