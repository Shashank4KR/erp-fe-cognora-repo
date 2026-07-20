"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import type { VehicleTrip } from "@/lib/fixtures/transport-management-reference-fixture";

interface TripDetailsDialogProps {
  trip: VehicleTrip | null;
  open: boolean;
  onClose: () => void;
}

export default function TripDetailsDialog({ trip, open, onClose }: TripDetailsDialogProps) {
  if (!trip) return null;

  return (
    <Modal open={open} onClose={onClose} title="Trip Details" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Route ID</p>
            <p className="text-sm font-semibold text-[#7c3aed]">{trip.routeId}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Status</p>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                trip.status === "Running"
                  ? "bg-emerald-50 text-emerald-700"
                  : trip.status === "Completed"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-orange-50 text-orange-600"
              }`}
            >
              {trip.status}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Route Name</p>
            <p className="text-sm font-semibold text-slate-900">{trip.routeName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Stops</p>
            <p className="text-sm text-slate-700">{trip.stops}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Vehicle No.</p>
            <p className="text-sm text-slate-700">{trip.vehicleNo}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Driver Name</p>
            <p className="text-sm text-slate-700">{trip.driverName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Pickup Time</p>
            <p className="text-sm text-slate-700">{trip.pickupTime}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Drop Time</p>
            <p className="text-sm text-slate-700">{trip.dropTime}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Students</p>
            <p className="text-sm text-slate-700">{trip.students}</p>
          </div>
        </div>
        <div className="flex items-center justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
