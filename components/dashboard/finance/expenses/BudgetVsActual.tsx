"use client";

import { useState } from "react";
import Dropdown from "@/components/shared/Dropdown";
import type { BudgetVsActualItem } from "@/lib/fixtures/expenses-management-reference-fixture";

interface BudgetVsActualProps {
  data: BudgetVsActualItem[];
  utilization: string;
}

export default function BudgetVsActual({ data, utilization }: BudgetVsActualProps) {
  const [period, setPeriod] = useState("This Month");
  const maxAmount = Math.max(...data.map((d) => d.amountNum));

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-900">Budget vs Actual (This Month)</h3>
        <Dropdown
          value={period}
          options={["This Month", "Last Month", "This Quarter", "This Year"]}
          onChange={setPeriod}
        />
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-slate-700 font-medium">{item.label}</span>
              <span className="text-sm font-semibold text-slate-900">{item.value}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(item.amountNum / maxAmount) * 100}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Budget Utilization</span>
        <span className="text-sm font-bold text-slate-900">{utilization}</span>
      </div>
    </div>
  );
}
