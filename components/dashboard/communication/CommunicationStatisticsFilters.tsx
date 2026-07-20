"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import CommunicationDateRangePicker from "./CommunicationDateRangePicker";
import {
  PERIOD_OPTIONS,
  CHANNEL_OPTIONS,
  AUDIENCE_OPTIONS,
  COMMUNICATION_TYPE_OPTIONS,
} from "@/lib/fixtures/communication-statistics-reference-fixture";

interface CommunicationStatisticsFiltersProps {
  period: string;
  onPeriodChange: (value: string) => void;
  channel: string;
  onChannelChange: (value: string) => void;
  audience: string;
  onAudienceChange: (value: string) => void;
  commType: string;
  onCommTypeChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function CommunicationStatisticsFilters({
  period,
  onPeriodChange,
  channel,
  onChannelChange,
  audience,
  onAudienceChange,
  commType,
  onCommTypeChange,
  dateRange,
  onDateRangeChange,
  onFilter,
  onReset,
}: CommunicationStatisticsFiltersProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 items-end gap-3">
          <Dropdown
            label="Period"
            value={period}
            options={PERIOD_OPTIONS}
            onChange={onPeriodChange}
          />
          <Dropdown
            label="Channel"
            value={channel}
            options={CHANNEL_OPTIONS}
            onChange={onChannelChange}
          />
          <Dropdown
            label="Audience"
            value={audience}
            options={AUDIENCE_OPTIONS}
            onChange={onAudienceChange}
          />
          <Dropdown
            label="Communication Type"
            value={commType}
            options={COMMUNICATION_TYPE_OPTIONS}
            onChange={onCommTypeChange}
          />
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">
              Date Range
            </label>
            <CommunicationDateRangePicker
              value={dateRange}
              onChange={onDateRangeChange}
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setFilterPanelOpen((open) => !open)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#7c3aed] bg-white px-3 py-2 text-sm font-semibold text-[#7c3aed] hover:bg-purple-50 transition whitespace-nowrap h-10 w-full"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {filterPanelOpen && (
        <div className="mt-3 bg-white rounded-lg border border-slate-200 p-4 relative">
          <button
            type="button"
            onClick={() => setFilterPanelOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-xs font-semibold text-slate-700 mb-3">
            Additional Filters
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Period
              </label>
              <Dropdown
                value={period}
                options={PERIOD_OPTIONS}
                onChange={onPeriodChange}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Channel
              </label>
              <Dropdown
                value={channel}
                options={CHANNEL_OPTIONS}
                onChange={onChannelChange}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Audience
              </label>
              <Dropdown
                value={audience}
                options={AUDIENCE_OPTIONS}
                onChange={onAudienceChange}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Communication Type
              </label>
              <Dropdown
                value={commType}
                options={COMMUNICATION_TYPE_OPTIONS}
                onChange={onCommTypeChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterPanelOpen(false);
                onFilter();
              }}
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
