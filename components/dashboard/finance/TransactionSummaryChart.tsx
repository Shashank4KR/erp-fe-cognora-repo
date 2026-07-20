"use client";

import Card from "@/components/shared/Card";

interface TransactionSummaryChartProps {
  incomeAmount: string;
  incomePercentage: string;
  expenseAmount: string;
  expensePercentage: string;
  totalAmount: string;
}

export default function TransactionSummaryChart({
  incomeAmount,
  incomePercentage,
  expenseAmount,
  expensePercentage,
  totalAmount,
}: TransactionSummaryChartProps) {
  const incomeValue = parseFloat(incomePercentage);
  const expenseValue = parseFloat(expensePercentage);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const incomeDash = (incomeValue / 100) * circumference;
  const expenseDash = (expenseValue / 100) * circumference;

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Transaction Summary</h3>
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="14"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth="14"
              strokeDasharray={`${incomeDash} ${circumference}`}
              strokeDashoffset={0}
              transform="rotate(-90 70 70)"
              strokeLinecap="round"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#ef4444"
              strokeWidth="14"
              strokeDasharray={`${expenseDash} ${circumference}`}
              strokeDashoffset={-incomeDash}
              transform="rotate(-90 70 70)"
              strokeLinecap="round"
            />
            <text x="70" y="66" textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#64748b" fontWeight="500">
              Total
            </text>
            <text x="70" y="84" textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#0f172a" fontWeight="700">
              {totalAmount}
            </text>
          </svg>
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-600">Income</span>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-900">{incomeAmount}</p>
              <p className="text-[11px] text-slate-500">({incomePercentage})</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-slate-600">Expense</span>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-900">{expenseAmount}</p>
              <p className="text-[11px] text-slate-500">({expensePercentage})</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
