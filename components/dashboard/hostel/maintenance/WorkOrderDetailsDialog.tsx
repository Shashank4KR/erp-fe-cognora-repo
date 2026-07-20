"use client";

import Modal from "@/components/shared/Modal";
import type { WorkOrder } from "@/lib/fixtures/maintenance-management-reference-fixture";

interface WorkOrderDetailsDialogProps {
  workOrder: WorkOrder | null;
  open: boolean;
  onClose: () => void;
}

export default function WorkOrderDetailsDialog({
  workOrder,
  open,
  onClose,
}: WorkOrderDetailsDialogProps) {
  if (!workOrder) return null;

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-slate-800">{value || "-"}</span>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="Work Order Details" maxWidth="max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow label="Work Order ID" value={workOrder.id} />
        <InfoRow label="Related Request" value={workOrder.relatedRequest} />
        <InfoRow label="Issue Type" value={workOrder.issueType} />
        <InfoRow label="Assigned To" value={workOrder.assignedTo} />
        <InfoRow label="Status" value={workOrder.status} />
        <InfoRow label="Scheduled Date" value={workOrder.scheduledDate} />
        <div className="sm:col-span-2">
          <InfoRow label="Notes" value={workOrder.notes || "-"} />
        </div>
      </div>
    </Modal>
  );
}
