"use client";

import Modal from "@/components/shared/Modal";
import type { MaintenanceRequest } from "@/lib/fixtures/maintenance-management-reference-fixture";

const MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: "MR2025O518-001",
    requestedBy: "Aditya Sharma",
    blockRoom: "Block A / A-101",
    issueType: "Fan Not Working",
    priority: "High",
    status: "Open",
    requestedOn: "18/05/2025 09:15 AM",
    category: "Electrical",
    description: "Ceiling fan in room A-101 is not working.",
    requestedDate: "18/05/2025",
    requestedTime: "09:15 AM",
  },
  {
    id: "MR2025O518-002",
    requestedBy: "Ananya Gupta",
    blockRoom: "Block A / A-102",
    issueType: "Water Leakage",
    priority: "High",
    status: "In Progress",
    requestedOn: "18/05/2025 10:30 AM",
    category: "Plumbing",
    description: "Water leakage from bathroom tap.",
    requestedDate: "18/05/2025",
    requestedTime: "10:30 AM",
  },
  {
    id: "MR2025O518-003",
    requestedBy: "Rohan Verma",
    blockRoom: "Block A / A-103",
    issueType: "Light Not Working",
    priority: "Medium",
    status: "Open",
    requestedOn: "18/05/2025 11:20 AM",
    category: "Electrical",
    description: "Tube light in room A-103 not working.",
    requestedDate: "18/05/2025",
    requestedTime: "11:20 AM",
  },
  {
    id: "MR2025O518-004",
    requestedBy: "Sneha Patel",
    blockRoom: "Block B / B-201",
    issueType: "Door Lock Issue",
    priority: "Medium",
    status: "In Progress",
    requestedOn: "17/05/2025 04:45 PM",
    category: "Furniture",
    description: "Room door lock is jammed.",
    requestedDate: "17/05/2025",
    requestedTime: "04:45 PM",
  },
  {
    id: "MR2025O517-005",
    requestedBy: "Vikram Singh",
    blockRoom: "Block B / B-202",
    issueType: "Geyser Not Working",
    priority: "High",
    status: "Completed",
    requestedOn: "17/05/2025 09:10 AM",
    category: "Appliance",
    description: "Geyser not heating water.",
    requestedDate: "17/05/2025",
    requestedTime: "09:10 AM",
  },
  {
    id: "MR2025O517-006",
    requestedBy: "Meera Nair",
    blockRoom: "Block C / C-301",
    issueType: "Plug Point Issue",
    priority: "Low",
    status: "Completed",
    requestedOn: "17/05/2025 10:05 AM",
    category: "Electrical",
    description: "Plug point not working in C-301.",
    requestedDate: "17/05/2025",
    requestedTime: "10:05 AM",
  },
  {
    id: "MR2025O516-007",
    requestedBy: "Pooja Iyer",
    blockRoom: "Block C / C-302",
    issueType: "Bathroom Tap Leakage",
    priority: "Medium",
    status: "Completed",
    requestedOn: "16/05/2025 02:15 PM",
    category: "Plumbing",
    description: "Tap in bathroom is leaking.",
    requestedDate: "16/05/2025",
    requestedTime: "02:15 PM",
  },
  {
    id: "MR2025O516-008",
    requestedBy: "Arjun Das",
    blockRoom: "Block D / D-401",
    issueType: "AC Not Cooling",
    priority: "High",
    status: "Completed",
    requestedOn: "16/05/2025 03:30 PM",
    category: "Appliance",
    description: "Air conditioner not cooling properly.",
    requestedDate: "16/05/2025",
    requestedTime: "03:30 PM",
  },
];

interface RequestHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  onView: (request: MaintenanceRequest) => void;
}

export default function RequestHistoryDialog({ open, onClose, onView }: RequestHistoryDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Request History" maxWidth="max-w-3xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Request ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Requested By</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Issue Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Requested On</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {MAINTENANCE_REQUESTS.map((request) => (
              <tr key={request.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-xs font-medium text-[#7c3aed]">{request.id}</td>
                <td className="px-4 py-3 text-slate-600">{request.requestedBy}</td>
                <td className="px-4 py-3 text-slate-600">{request.issueType}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    request.status === "Open" ? "bg-blue-50 text-blue-600" :
                    request.status === "In Progress" ? "bg-orange-50 text-orange-600" :
                    request.status === "Completed" ? "bg-green-50 text-green-600" :
                    "bg-red-50 text-red-600"
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{request.requestedOn}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onView(request)}
                    className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
