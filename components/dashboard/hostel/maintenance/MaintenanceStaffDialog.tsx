"use client";

import Modal from "@/components/shared/Modal";

interface MaintenanceStaffDialogProps {
  open: boolean;
  onClose: () => void;
}

const STAFF = [
  { name: "Ramesh Kumar", role: "Plumber", contact: "+91 98765 43210", block: "Block A" },
  { name: "Suresh Yadav", role: "Electrician", contact: "+91 98765 43211", block: "Block B" },
  { name: "Mahesh Verma", role: "General Maintenance", contact: "+91 98765 43212", block: "Block C" },
  { name: "Amit Singh", role: "Carpenter", contact: "+91 98765 43213", block: "Block D" },
];

export default function MaintenanceStaffDialog({ open, onClose }: MaintenanceStaffDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Maintenance Staff" maxWidth="max-w-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Assigned Block</th>
            </tr>
          </thead>
          <tbody>
            {STAFF.map((staff, idx) => (
              <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-700">{staff.name}</td>
                <td className="px-4 py-3 text-slate-600">{staff.role}</td>
                <td className="px-4 py-3 text-slate-600">{staff.contact}</td>
                <td className="px-4 py-3 text-slate-600">{staff.block}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
