"use client";

import { useState } from "react";
import Dropdown from "@/components/shared/Dropdown";
import DonutChart from "@/components/shared/charts/DonutChart";
import type { PaymentModeSegment } from "@/lib/fixtures/expenses-management-reference-fixture";

interface ExpensePaymentModeChartProps {
  segments: PaymentModeSegment[];
  total: string;
}

export default function ExpensePaymentModeChart({ segments, total }: ExpensePaymentModeChartProps) {
  const [period, setPeriod] = useState("This Month");

  const chartSegments = segments.map((s) => ({
    label: s.label,
    value: parseFloat(s.percentage),
    color: s.color,
  }));

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-900">Expense by Payment Mode (This Month)</h3>
        <Dropdown
          value={period}
          options={["This Month", "Last Month", "This Quarter", "This Year"]}
          onChange={setPeriod}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <DonutChart
            segments={chartSegments}
            size={140}
            strokeWidth={14}
          />
          <div className="text-center mt-2">
            <p className="text-xs text-slate-500">Total</p>
            <p className="text-sm font-bold text-slate-900">{total}</p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: segment.color }} />
                <span className="text-sm text-slate-600">{segment.label}</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{segment.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
