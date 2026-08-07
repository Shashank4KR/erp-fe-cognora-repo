"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";

const TOP_DEPARTMENTS_DATA = [
  { label: "Computer Science", amount: "₹ 8,75,000", percentage: 30.4, color: "#7c3aed", iconBg: "bg-purple-50", iconColor: "text-[#7c3aed]" },
  { label: "Electronics", amount: "₹ 5,40,000", percentage: 18.8, color: "#10b981", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  { label: "Mechanical", amount: "₹ 4,25,000", percentage: 14.8, color: "#f97316", iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  { label: "Information Tech.", amount: "₹ 3,75,000", percentage: 13.0, color: "#6366f1", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
  { label: "Administration", amount: "₹ 2,60,000", percentage: 9.0, color: "#ec4899", iconBg: "bg-pink-50", iconColor: "text-pink-500" },
  { label: "Others", amount: "₹ 3,00,000", percentage: 10.4, color: "#6366f1", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
];

const TOP_DEPARTMENTS_PERIOD_OPTIONS = ["This Month", "Last Month", "This Quarter", "This Year"];

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
