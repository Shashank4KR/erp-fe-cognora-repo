"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";
import {
  TOP_DEPARTMENTS_DATA,
  TOP_DEPARTMENTS_PERIOD_OPTIONS,
} from "@/lib/fixtures/salary-management-reference-fixture";

export default function TopDepartmentsByPayroll() {
  const [period, setPeriod] = useState("This Month");

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Top Departments by Payroll</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-purple-400"
          >
            {TOP_DEPARTMENTS_PERIOD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>
      <div className="space-y-4">
        {TOP_DEPARTMENTS_DATA.map((dept) => (
          <div key={dept.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-md flex items-center justify-center ${dept.iconBg}`}>
                  <span className={`h-3 w-3 rounded-sm ${dept.iconColor}`} style={{ backgroundColor: dept.color }} />
                </span>
                <span className="text-xs font-medium text-slate-700">{dept.label}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-900">{dept.amount}</span>
                <span className="text-[11px] text-slate-500 ml-1">{dept.percentage}%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${dept.percentage}%`, backgroundColor: dept.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
