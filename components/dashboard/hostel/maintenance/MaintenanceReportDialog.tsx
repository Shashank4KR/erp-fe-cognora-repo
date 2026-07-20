"use client";

import Modal from "@/components/shared/Modal";

interface MaintenanceReportDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function MaintenanceReportDialog({ open, onClose }: MaintenanceReportDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Reports" maxWidth="max-w-2xl">
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Monthly Summary</h4>
          <p className="text-sm text-slate-600">Total Requests: 128 | Completed: 74 | Pending: 54</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Category Breakdown</h4>
          <p className="text-sm text-slate-600">Electrical: 46 | Plumbing: 32 | Furniture: 20 | Appliance: 16 | Others: 14</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Priority Distribution</h4>
          <p className="text-sm text-slate-600">High: 42 | Medium: 56 | Low: 30 | Emergency: 0</p>
        </div>
      </div>
    </Modal>
  );
}
