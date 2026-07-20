"use client";

import { Plus, MoreVertical, ChevronRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaintenanceManagementPageHeaderProps {
  onRaiseRequest: () => void;
  onWorkOrders: () => void;
  onMoreOptions: () => void;
}

export default function MaintenanceManagementPageHeader({
  onRaiseRequest,
  onWorkOrders,
  onMoreOptions,
}: MaintenanceManagementPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Maintenance Management</h1>
        <nav className="flex items-center gap-1.5 mt-1 text-sm" aria-label="Breadcrumb">
          <span className="text-[#7c3aed] font-medium">Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#7c3aed] font-medium">Hostel</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Maintenance</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onRaiseRequest}
          className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg h-9 px-4 text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Raise Request
        </Button>

        <Button
          onClick={onWorkOrders}
          variant="outline"
          className="inline-flex items-center gap-2 bg-white text-[#7c3aed] border-purple-200 hover:bg-purple-50 rounded-lg h-9 px-4 text-sm font-semibold"
        >
          <ClipboardList className="w-4 h-4" />
          Work Orders
        </Button>

        <button
          type="button"
          onClick={onMoreOptions}
          aria-label="More options"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition h-9 w-9"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
