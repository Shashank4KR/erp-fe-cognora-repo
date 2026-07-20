"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import Card from "@/components/shared/Card";
import Dropdown from "@/components/shared/Dropdown";
import CommunicationDateRangePicker from "./CommunicationDateRangePicker";

interface CommunicationQuickFiltersProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onApply: () => void;
}

export default function CommunicationQuickFilters({
  dateRange,
  onDateRangeChange,
  onApply,
}: CommunicationQuickFiltersProps) {
  const [audience, setAudience] = useState("All");
  const [commType, setCommType] = useState("All");

  return (
    <Card className="p-0 flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">Quick Filters</h2>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Audience</label>
          <Dropdown
            value={audience}
            options={["All", "Students", "Parents", "Teachers", "Staff", "Groups"]}
            onChange={setAudience}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Communication Type</label>
          <Dropdown
            value={commType}
            options={["All", "Message", "Email", "SMS", "Notification", "Announcement", "Circular", "Event"]}
            onChange={setCommType}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date Range</label>
          <CommunicationDateRangePicker value={dateRange} onChange={onDateRangeChange} />
        </div>
        <button
          type="button"
          onClick={onApply}
          className="w-full rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
        >
          Apply Filters
        </button>
      </div>
    </Card>
  );
}
