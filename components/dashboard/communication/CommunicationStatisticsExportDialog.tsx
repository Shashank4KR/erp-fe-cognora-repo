"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";
const PERIOD_OPTIONS = ["This Week", "This Month", "This Quarter", "This Year"];

const CHANNEL_OPTIONS = ["All Channels", "Email", "SMS", "In-App"];

const AUDIENCE_OPTIONS = ["All Audiences", "Students", "Parents", "Staff"];

const COMMUNICATION_TYPE_OPTIONS = [
  "All Types",
  "Announcement",
  "Circular",
  "Event",
  "Reminder",
  "General Communication",
  "Exam Related",
  "Attendance Alert",
];

const FILE_FORMAT_OPTIONS = ["PDF", "CSV", "XLSX"];

interface CommunicationStatisticsExportDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: () => void;
}

export default function CommunicationStatisticsExportDialog({
  open,
  onClose,
  onExport,
}: CommunicationStatisticsExportDialogProps) {
  const [period, setPeriod] = useState(PERIOD_OPTIONS[1]);
  const [channel, setChannel] = useState(CHANNEL_OPTIONS[0]);
  const [audience, setAudience] = useState(AUDIENCE_OPTIONS[0]);
  const [commType, setCommType] = useState(COMMUNICATION_TYPE_OPTIONS[0]);
  const [fileFormat, setFileFormat] = useState(FILE_FORMAT_OPTIONS[0]);

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Export Report</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Report Period
          </label>
          <Dropdown
            value={period}
            options={PERIOD_OPTIONS}
            onChange={setPeriod}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Channel
          </label>
          <Dropdown
            value={channel}
            options={CHANNEL_OPTIONS}
            onChange={setChannel}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Audience
          </label>
          <Dropdown
            value={audience}
            options={AUDIENCE_OPTIONS}
            onChange={setAudience}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Communication Type
          </label>
          <Dropdown
            value={commType}
            options={COMMUNICATION_TYPE_OPTIONS}
            onChange={setCommType}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            File Format
          </label>
          <Dropdown
            value={fileFormat}
            options={FILE_FORMAT_OPTIONS}
            onChange={setFileFormat}
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onExport();
              onClose();
            }}
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Export
          </button>
        </div>
      </div>
    </Modal>
  );
}
