"use client";

import { useState } from "react";
import { ChevronDown, FileText, User, Receipt, Lock } from "lucide-react";
import Card from "@/components/shared/Card";
import Dropdown from "@/components/shared/Dropdown";

const INVOICE_TYPE_ROWS = [
  {
    label: "Fee Invoice",
    amount: "₹ 98,75,000",
    percentage: 79.1,
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "fee",
  },
  {
    label: "Salary Invoice",
    amount: "₹ 15,60,000",
    percentage: 12.5,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "salary",
  },
  {
    label: "Expense Invoice",
    amount: "₹ 7,25,000",
    percentage: 5.8,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "expense",
  },
  {
    label: "Other Invoice",
    amount: "₹ 1,20,000",
    percentage: 2.6,
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "other",
  },
];

const TOP_INVOICE_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Academic Year"];

const iconMap: Record<string, React.ReactNode> = {
  fee: <FileText className="h-5 w-5" />,
  salary: <User className="h-5 w-5" />,
  expense: <Receipt className="h-5 w-5" />,
  other: <Lock className="h-5 w-5" />,
};

export default function TopInvoiceTypes() {
  const [period, setPeriod] = useState("This Academic Year");

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Top Invoice Types</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white px-3 py-1.5 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-[#7c3aed] focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            {TOP_INVOICE_PERIOD_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
      <div className="space-y-4">
        {INVOICE_TYPE_ROWS.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className={`${row.iconBg} p-1.5 rounded-md`}>
                  <span className={row.iconColor}>{iconMap[row.icon]}</span>
                </div>
                <span className="text-sm font-medium text-slate-900">{row.label}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-slate-900">{row.amount}</span>
                <span className="text-xs text-slate-500 ml-1">({row.percentage}%)</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className="bg-[#7c3aed] h-1.5 rounded-full transition-all"
                style={{ width: `${row.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
