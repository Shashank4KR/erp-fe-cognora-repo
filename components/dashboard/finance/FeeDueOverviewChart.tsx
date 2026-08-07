"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import DonutChart from "@/components/shared/charts/DonutChart";
import Dropdown from "@/components/shared/Dropdown";

const FEE_DUE_SEGMENTS = [
  { label: "Current Due", value: 76.1, color: "#f97316" },
  { label: "Overdue (1-30 days)", value: 16.3, color: "#f59e0b" },
  { label: "Overdue (31-60 days)", value: 4.6, color: "#84cc16" },
  { label: "Overdue (60+ days)", value: 3.0, color: "#ef4444" },
];

const FEE_DUE_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];

export default function FeeDueOverviewChart() {
  const [period, setPeriod] = useState("This Year");

  const values: Record<string, string> = {
    "Current Due": "₹ 19,80,000",
    "Overdue (1-30 days)": "₹ 4,25,000",
    "Overdue (31-60 days)": "₹ 1,20,000",
    "Overdue (60+ days)": "₹ 80,000",
  };

  return (
    <Card className="p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Fee Due Overview</h3>
        <Dropdown
          value={period}
          options={FEE_DUE_PERIOD_OPTIONS}
          onChange={setPeriod}
          className="w-24"
        />
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <DonutChart
            segments={FEE_DUE_SEGMENTS}
            size={160}
            strokeWidth={14}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-slate-500 font-medium">Total Due</span>
            <span className="text-sm font-bold text-slate-900">₹ 26,05,000</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {FEE_DUE_SEGMENTS.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-600 truncate">{item.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-900">{values[item.label]}</span>
              <span className="text-xs text-slate-500 w-10 text-right">({item.value}%)</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
