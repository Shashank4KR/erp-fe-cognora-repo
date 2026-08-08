"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import DonutChart from "@/components/shared/charts/DonutChart";
import Dropdown from "@/components/shared/Dropdown";

const FEE_COLLECTION_SEGMENTS_DEFAULT = [
  { label: "Collected", value: 79.1, color: "#10b981" },
  { label: "Outstanding", value: 20.9, color: "#f97316" },
  { label: "Overdue", value: 3.8, color: "#ef4444" },
];

const FEE_COLLECTION_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];

interface FeesCollectionSummaryChartProps {
  segments?: Array<{ label: string; value: number; color: string }>;
  values?: Record<string, string>;
}

export default function FeesCollectionSummaryChart({ segments, values }: FeesCollectionSummaryChartProps) {
  const [period, setPeriod] = useState("This Year");
  const activeSegments = segments || FEE_COLLECTION_SEGMENTS_DEFAULT;

  const defaultValues: Record<string, string> = {
    Collected: "₹ 98,75,000",
    Outstanding: "₹ 26,05,000",
    Overdue: "₹ 4,75,000",
  };

  const getAmountLabel = (label: string) => {
    if (values && values[label] !== undefined) return values[label];
    return defaultValues[label] ?? "₹ 0";
  };

  return (
    <Card className="p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Fee Collection Summary</h3>
        <Dropdown
          value={period}
          options={FEE_COLLECTION_PERIOD_OPTIONS}
          onChange={setPeriod}
          className="w-24"
        />
      </div>

      <div className="flex items-center justify-center mb-4">
        <DonutChart
          segments={activeSegments}
          size={180}
          strokeWidth={14}
        />
      </div>

      <div className="space-y-2.5">
        {activeSegments.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-600">{item.label}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-900">
                {getAmountLabel(item.label)}
              </span>
              <span className="text-xs text-slate-500 ml-1">({item.value}%)</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
