"use client";

import DonutChart from "@/components/shared/charts/DonutChart";
import Card from "@/components/shared/Card";
import { CircleCheck } from "lucide-react";

export default function FeeCollectionByTypeChart() {
  const totalFeeRevenue = 2280000;
  const feeChartData = [
    { label: "Hostel Fees", value: 45, color: "#7c3aed" },
    { label: "Mess Fees", value: 22, color: "#0ea5e9" },
    { label: "Exam Fees", value: 18, color: "#3b82f6" },
    { label: "Scholarship", value: 10, color: "#6366f1" },
    { label: "Other", value: 5, color: "#f59e0b" },
  ];

  const recentPayments = [
    { student: "Aarav Sharma", status: "Complete" as const, amount: "₹45,000" },
    { student: "Diya Patel", status: "Pending" as const, amount: "₹32,000" },
    { student: "Krishna Iyer", status: "Complete" as const, amount: "₹28,000" },
    { student: "Riya Nair", status: "Pending" as const, amount: "₹19,500" },
  ];

  return (
    <Card className="p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Fee Collection by Type</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
          <CircleCheck className="h-3.5 w-3.5" />
          +8.2%
        </span>
      </div>

      <div className="flex items-center justify-center mb-3">
        <DonutChart
          segments={feeChartData}
          size={150}
        />
      </div>

      <div className="space-y-1.5 mb-4">
        {feeChartData.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-600">{item.label}</span>
            </div>
            <span className="text-xs font-semibold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-700 mb-2">Recent Payments</p>
        <div className="space-y-2">
          {recentPayments.map((item) => (
            <div key={item.student} className="flex items-center justify-between">
              <p className="text-xs text-slate-900">{item.student}</p>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900">{item.amount}</p>
                <span className={`text-[10px] font-medium ${
                  item.status === "Complete" ? "text-emerald-600" : "text-amber-600"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
