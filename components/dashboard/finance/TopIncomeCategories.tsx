"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";

const TOP_INCOME_CATEGORIES = [
  { label: "Tuition Fee", amount: "₹ 70,20,000", percentage: 56.3 },
  { label: "Transport Fee", amount: "₹ 12,45,000", percentage: 10.0 },
  { label: "Admission Fee", amount: "₹ 8,30,000", percentage: 6.7 },
  { label: "Exam Fee", amount: "₹ 5,40,000", percentage: 4.3 },
  { label: "Other Fees", amount: "₹ 2,40,000", percentage: 1.9 },
];

const TOP_INCOME_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];

interface TopIncomeCategoriesProps {
  categories?: typeof TOP_INCOME_CATEGORIES;
}

export default function TopIncomeCategories({ categories = TOP_INCOME_CATEGORIES }: TopIncomeCategoriesProps) {
  const [period, setPeriod] = useState("This Year");

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Top Income Categories</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-purple-400"
          >
            {TOP_INCOME_PERIOD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-700">{cat.label}</span>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-900">{cat.amount}</span>
                <span className="text-[11px] text-slate-500 ml-1">{cat.percentage}%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
