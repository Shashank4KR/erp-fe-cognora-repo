"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";
import type { TopCategory } from "@/lib/fixtures/expenses-management-reference-fixture";

interface TopExpenseCategoriesProps {
  data: TopCategory[];
}

const MAX_BAR_WIDTH = 100;

export default function TopExpenseCategories({ data }: TopExpenseCategoriesProps) {
  const [period, setPeriod] = useState("This Month");

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-900">Top Expense Categories (This Month)</h3>
        <Dropdown
          value={period}
          options={["This Month", "Last Month", "This Quarter", "This Year"]}
          onChange={setPeriod}
        />
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.category}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-slate-700 font-medium">{item.category}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-900">{item.amount}</span>
                <span className="text-xs text-slate-400 w-12 text-right">{item.percentage}</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7c3aed] rounded-full transition-all duration-500"
                style={{ width: `${item.barWidth}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
