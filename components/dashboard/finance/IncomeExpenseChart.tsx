"use client";

import LineChart from "@/components/shared/charts/LineChart";
import Card from "@/components/shared/Card";

interface IncomeExpenseChartProps {
  incomeData?: Array<{ label: string; value: number }>;
  expenseData?: Array<{ label: string; value: number }>;
}

export default function IncomeExpenseChart({ incomeData = [], expenseData = [] }: IncomeExpenseChartProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Income vs Expenses</h3>
        <span className="text-xs text-slate-500">Backend series</span>
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
