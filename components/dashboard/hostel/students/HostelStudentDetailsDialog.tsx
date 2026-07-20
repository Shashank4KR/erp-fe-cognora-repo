"use client";

import Modal from "@/components/shared/Modal";
import Card from "@/components/shared/Card";
import { Users, User, Calendar, MapPin, Phone, Home, Bed } from "lucide-react";
import type { HostelStudent } from "@/lib/fixtures/hostel-students-reference-fixture";

interface HostelStudentDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  row: HostelStudent | null;
}

function InfoRow({ label, value, icon: Icon, iconBg }: { label: string; value: string; icon: any; iconBg: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-700">{value}</span>
    </div>
  );
}

export default function HostelStudentDetailsDialog({
  open,
  onClose,
  row,
}: HostelStudentDetailsDialogProps) {
  if (!row) return null;

  return (
    <Modal open={open} onClose={onClose} title="Hostel Student Details" maxWidth="max-w-2xl">
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-bold">
            {row.initials}
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">{row.studentName}</h4>
            <p className="text-xs text-slate-500">{row.admissionNo}</p>
          </div>
        </div>

        <Card className="p-4">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">Personal Information</h5>
          <InfoRow label="Full Name" value={row.studentName} icon={Users} iconBg="bg-purple-50" />
          <InfoRow label="Gender" value={row.gender} icon={User} iconBg="bg-blue-50" />
          <InfoRow label="Date of Birth" value={row.dateOfBirth} icon={Calendar} iconBg="bg-emerald-50" />
          <InfoRow label="Contact No." value={row.contactNo} icon={Phone} iconBg="bg-orange-50" />
        </Card>

        <Card className="p-4">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">Academic Information</h5>
          <InfoRow label="Admission No." value={row.admissionNo} icon={Users} iconBg="bg-purple-50" />
          <InfoRow label="Roll No." value={row.rollNo} icon={Users} iconBg="bg-purple-50" />
          <InfoRow label="Class / Section" value={row.classSection} icon={Users} iconBg="bg-purple-50" />
        </Card>

        <Card className="p-4">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">Room Information</h5>
          <InfoRow label="Room No." value={row.roomNo} icon={Home} iconBg="bg-orange-50" />
          <InfoRow label="Block" value={row.block} icon={MapPin} iconBg="bg-blue-50" />
          <InfoRow label="Check-In Date" value={row.checkInDate} icon={Calendar} iconBg="bg-emerald-50" />
          <InfoRow label="Status" value={row.status} icon={Bed} iconBg="bg-emerald-50" />
        </Card>

        <Card className="p-4">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">Guardian Information</h5>
          <InfoRow label="Guardian Name" value={row.guardianName} icon={Users} iconBg="bg-purple-50" />
          <InfoRow label="Guardian Contact" value={row.guardianContact} icon={Phone} iconBg="bg-orange-50" />
        </Card>

        {row.notes && (
          <Card className="p-4">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Notes</h5>
            <p className="text-sm text-slate-600">{row.notes}</p>
          </Card>
        )}
      </div>
    </Modal>
  );
}
