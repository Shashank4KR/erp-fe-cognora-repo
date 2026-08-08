"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import Dropdown from "@/components/shared/Dropdown";

const FEE_COLLECTION_BY_TYPE_DEFAULT = [
  { label: "Tuition Fee", amount: "₹ 70,20,000", percentage: 71.1, color: "#6366f1" },
  { label: "Transport Fee", amount: "₹ 12,45,000", percentage: 12.6, color: "#8b5cf6" },
  { label: "Admission Fee", amount: "₹ 8,30,000", percentage: 8.4, color: "#3b82f6" },
  { label: "Exam Fee", amount: "₹ 5,40,000", percentage: 5.5, color: "#f97316" },
  { label: "Other Fees", amount: "₹ 2,40,000", percentage: 2.4, color: "#ef4444" },
];

const FEE_TYPE_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];

interface FeeCollectionByTypeCardProps {
  items?: Array<{ label: string; amount: string; percentage: number; color: string }>;
  total?: string;
}

export default function FeeCollectionByTypeCard({ items, total }: FeeCollectionByTypeCardProps) {
  const [period, setPeriod] = useState("This Year");
  const activeItems = items || FEE_COLLECTION_BY_TYPE_DEFAULT;
  const activeTotal = total || "₹ 98,75,000";

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Fee Collection by Fee Type</h3>
        <Dropdown
          value={period}
          options={FEE_TYPE_PERIOD_OPTIONS}
          onChange={setPeriod}
          className="w-24"
        />
      </div>

      <div className="space-y-4">
        {activeItems.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-700">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900">{item.amount}</span>
                <span className="text-xs text-slate-500 w-10 text-right">{item.percentage}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">Total Collected</span>
          <span className="text-xs font-bold text-slate-900">{activeTotal}</span>
        </div>
      </div>
    </Card>
  );
}
