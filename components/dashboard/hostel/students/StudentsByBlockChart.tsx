"use client";

import { ChevronDown } from "lucide-react";
import DonutChart from "@/components/shared/charts/DonutChart";
import Dropdown from "@/components/shared/Dropdown";
import { BLOCK_SEGMENTS, BLOCK_FILTER_OPTIONS } from "@/lib/fixtures/hostel-students-reference-fixture";

interface StudentsByBlockChartProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export default function StudentsByBlockChart({
  filter,
  onFilterChange,
}: StudentsByBlockChartProps) {
  const filteredSegments =
    filter === "Boys Blocks"
      ? BLOCK_SEGMENTS.filter((s) => s.label.includes("Boys"))
      : filter === "Girls Blocks"
        ? BLOCK_SEGMENTS.filter((s) => s.label.includes("Girls"))
        : BLOCK_SEGMENTS;

  const total = filteredSegments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Students by Block</h3>
        <Dropdown
          value={filter}
          options={BLOCK_FILTER_OPTIONS}
          onChange={onFilterChange}
          className="w-32"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <DonutChart
            value={total}
            label="Total"
            segments={filteredSegments.map((s) => ({
              label: s.label,
              value: Math.round((s.value / total) * 100),
              color: s.color,
            }))}
            size={140}
            strokeWidth={14}
          />
        </div>
        <div className="flex-1 space-y-3 w-full">
          {filteredSegments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-xs font-medium text-slate-600">{segment.label}</span>
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {segment.value} ({((segment.value / total) * 100).toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
