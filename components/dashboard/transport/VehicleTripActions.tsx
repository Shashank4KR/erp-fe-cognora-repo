"use client";

import { MapPin, Eye } from "lucide-react";

interface VehicleTripActionsProps {
  onLocation: () => void;
  onView: () => void;
}

export default function VehicleTripActions({
  onLocation,
  onView,
}: VehicleTripActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onLocation}
        aria-label="View location"
        className="inline-flex items-center justify-center rounded-lg bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
        title="Location"
      >
        <MapPin className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onView}
        aria-label="View details"
        className="inline-flex items-center justify-center rounded-lg bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
        title="View"
      >
        <Eye className="w-4 h-4" />
      </button>
    </div>
  );
}
