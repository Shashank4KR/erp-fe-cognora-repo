"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/shared/Dropdown";
import {
  REQUEST_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  HOSTEL_BLOCK_OPTIONS,
  ROWS_PER_PAGE_OPTIONS,
} from "@/lib/fixtures/maintenance-management-reference-fixture";

interface RaiseMaintenanceRequestDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
}

export default function RaiseMaintenanceRequestDialog({
  open,
  onClose,
  onSave,
}: RaiseMaintenanceRequestDialogProps) {
  const [formData, setFormData] = useState({
    requestType: "Repair",
    category: "Electrical",
    issueTitle: "",
    description: "",
    hostelBlock: "Block A",
    roomNumber: "",
    requestedBy: "",
    priority: "Medium",
    requestedDate: "",
    preferredVisitTime: "",
    attachment: "",
    status: "Open",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.issueTitle.trim()) newErrors.issueTitle = "Issue title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.roomNumber.trim()) newErrors.roomNumber = "Room number is required";
    if (!formData.requestedBy.trim()) newErrors.requestedBy = "Requested by is required";
    if (!formData.requestedDate.trim()) newErrors.requestedDate = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData);
    setFormData({
      requestType: "Repair",
      category: "Electrical",
      issueTitle: "",
      description: "",
      hostelBlock: "Block A",
      roomNumber: "",
      requestedBy: "",
      priority: "Medium",
      requestedDate: "",
      preferredVisitTime: "",
      attachment: "",
      status: "Open",
    });
    setErrors({});
    onClose();
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border ${errors[field] ? "border-red-300" : "border-slate-200"} bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#7c3aed]`;

  return (
    <Modal open={open} onClose={onClose} title="Raise Maintenance Request" maxWidth="max-w-2xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Request Type</label>
            <Dropdown value={formData.requestType} options={REQUEST_TYPE_OPTIONS} onChange={(v) => handleChange("requestType", v)} />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Category</label>
            <Dropdown value={formData.category} options={CATEGORY_OPTIONS} onChange={(v) => handleChange("category", v)} />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Issue Title</label>
          <Input
            value={formData.issueTitle}
            onChange={(e) => handleChange("issueTitle", e.target.value)}
            placeholder="Enter issue title"
            className={inputClass("issueTitle")}
          />
          {errors.issueTitle && <p className="text-xs text-red-500 mt-1">{errors.issueTitle}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the issue"
            rows={3}
            className={`w-full rounded-lg border ${errors.description ? "border-red-300" : "border-slate-200"} bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#7c3aed]`}
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Hostel Block</label>
            <Dropdown value={formData.hostelBlock} options={HOSTEL_BLOCK_OPTIONS} onChange={(v) => handleChange("hostelBlock", v)} />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Room Number</label>
            <Input
              value={formData.roomNumber}
              onChange={(e) => handleChange("roomNumber", e.target.value)}
              placeholder="e.g. A-101"
              className={inputClass("roomNumber")}
            />
            {errors.roomNumber && <p className="text-xs text-red-500 mt-1">{errors.roomNumber}</p>}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Requested By</label>
          <Input
            value={formData.requestedBy}
            onChange={(e) => handleChange("requestedBy", e.target.value)}
            placeholder="Enter requester name"
            className={inputClass("requestedBy")}
          />
          {errors.requestedBy && <p className="text-xs text-red-500 mt-1">{errors.requestedBy}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Priority</label>
            <Dropdown value={formData.priority} options={PRIORITY_OPTIONS.filter((p) => p !== "All Priorities")} onChange={(v) => handleChange("priority", v)} />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Status</label>
            <Dropdown value={formData.status} options={STATUS_OPTIONS.filter((s) => s !== "All Status")} onChange={(v) => handleChange("status", v)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Requested Date</label>
            <Input
              type="date"
              value={formData.requestedDate}
              onChange={(e) => handleChange("requestedDate", e.target.value)}
              className={inputClass("requestedDate")}
            />
            {errors.requestedDate && <p className="text-xs text-red-500 mt-1">{errors.requestedDate}</p>}
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">Preferred Visit Time</label>
            <Input
              type="time"
              value={formData.preferredVisitTime}
              onChange={(e) => handleChange("preferredVisitTime", e.target.value)}
              className={inputClass("preferredVisitTime")}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Attachment</label>
          <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center">
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleChange("attachment", file.name);
              }}
              className="text-sm text-slate-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
          >
            Save Request
          </Button>
        </div>
      </div>
    </Modal>
  );
}
