"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";
import DonutChart from "@/components/shared/charts/DonutChart";
import { Users, Lock } from "lucide-react";

const PAYROLL_SUMMARY_DATA = {
  totalPayroll: "₹ 28,75,000",
  paidAmount: "₹ 24,60,000",
  paidPercentage: "85.7%",
  pendingAmount: "₹ 4,15,000",
  pendingPercentage: "14.3%",
  totalDeductions: "₹ 2,85,000",
  deductionsPercentage: "9.9%",
  netPayout: "₹ 25,90,000",
  netPayoutPercentage: "90.1%",
  employeesPaid: "109 / 128",
  pendingPayments: "19 / 128",
};

const PAYROLL_PERIOD_OPTIONS = ["This Month", "Last Month", "This Quarter", "This Year"];

export default function PayrollSummaryChart() {
  const [period, setPeriod] = useState("This Month");

  const segments = [
    { label: "Paid Amount", value: 85.7, color: "#10b981" },
    { label: "Pending Amount", value: 14.3, color: "#f97316" },
  ];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Payroll Summary (May 2025)</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-purple-400"
          >
            {PAYROLL_PERIOD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <DonutChart
          segments={segments}
          size={160}
          strokeWidth={14}
          label="Total Payroll"
          value={PAYROLL_SUMMARY_DATA.totalPayroll}
        />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-600">Paid Amount</span>
          </div>
          <span className="text-xs font-semibold text-slate-900">₹ 24,60,000 (85.7%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-xs text-slate-600">Pending Amount</span>
          </div>
          <span className="text-xs font-semibold text-slate-900">₹ 4,15,000 (14.3%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
            <span className="text-xs text-slate-600">Total Deductions</span>
          </div>
          <span className="text-xs font-semibold text-slate-900">₹ 2,85,000 (9.9%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-600">Net Payout</span>
          </div>
          <span className="text-xs font-semibold text-slate-900">₹ 25,90,000 (90.1%)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
          <Users className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-xs text-slate-500">Employees Paid</p>
            <p className="text-sm font-semibold text-slate-900">109 / 128</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3">
          <Lock className="h-5 w-5 text-orange-600" />
          <div>
            <p className="text-xs text-slate-500">Pending Payments</p>
            <p className="text-sm font-semibold text-slate-900">19 / 128</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
