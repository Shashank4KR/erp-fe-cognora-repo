"use client";

import LineChart from "@/components/shared/charts/LineChart";
import Card from "@/components/shared/Card";

export default function IncomeExpenseChart() {
  const incomeData = [
    { label: "Jan", value: 1200000 },
    { label: "Feb", value: 1350000 },
    { label: "Mar", value: 1280000 },
    { label: "Apr", value: 1420000 },
    { label: "May", value: 1550000 },
    { label: "Jun", value: 1600000 },
    { label: "Jul", value: 1580000 },
    { label: "Aug", value: 1700000 },
    { label: "Sep", value: 1750000 },
    { label: "Oct", value: 1800000 },
    { label: "Nov", value: 1820000 },
    { label: "Dec", value: 1900000 },
  ];

  const expenseData = [
    { label: "Jan", value: 800000 },
    { label: "Feb", value: 750000 },
    { label: "Mar", value: 850000 },
    { label: "Apr", value: 900000 },
    { label: "May", value: 820000 },
    { label: "Jun", value: 880000 },
    { label: "Jul", value: 950000 },
    { label: "Aug", value: 920000 },
    { label: "Sep", value: 980000 },
    { label: "Oct", value: 1000000 },
    { label: "Nov", value: 950000 },
    { label: "Dec", value: 1050000 },
  ];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Income vs Expenses</h3>
        <span className="text-xs text-slate-500">Monthly Overview</span>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-[#7c3aed] mb-2">Income</p>
          <LineChart data={incomeData} height={120} color="#7c3aed" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#3b82f6] mb-2">Expenses</p>
          <LineChart data={expenseData} height={120} color="#3b82f6" />
        </div>
      </div>
    </Card>
  );
}
