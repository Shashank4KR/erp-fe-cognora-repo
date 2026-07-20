"use client";

import Modal from "@/components/shared/Modal";
import type { MaintenanceRequest } from "@/lib/fixtures/maintenance-management-reference-fixture";

interface MaintenanceRequestDetailsDialogProps {
  request: MaintenanceRequest | null;
  open: boolean;
  onClose: () => void;
}

export default function MaintenanceRequestDetailsDialog({
  request,
  open,
  onClose,
}: MaintenanceRequestDetailsDialogProps) {
  if (!request) return null;

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-slate-800">{value || "-"}</span>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="Request Details" maxWidth="max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow label="Request ID" value={request.id} />
        <InfoRow label="Requested By" value={request.requestedBy} />
        <InfoRow label="Block / Room" value={request.blockRoom} />
        <InfoRow label="Issue Type" value={request.issueType} />
        <InfoRow label="Category" value={request.category} />
        <InfoRow label="Priority" value={request.priority} />
        <InfoRow label="Status" value={request.status} />
        <InfoRow label="Requested Date" value={request.requestedDate} />
        <InfoRow label="Requested Time" value={request.requestedTime} />
        <InfoRow label="Attachment" value={request.attachment || "-"} />
        <InfoRow label="Assigned Staff" value={request.assignedStaff || "-"} />
        <InfoRow label="Related Work Order" value={request.relatedWorkOrder || "-"} />
        <div className="sm:col-span-2">
          <InfoRow label="Description" value={request.description} />
        </div>
      </div>
    </Modal>
  );
}
