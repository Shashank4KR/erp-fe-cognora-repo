"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";

const INCOME_EXPENSE_TREND = {
  monthly: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    income: [25, 45, 38, 55, 50, 68, 62, 70, 65, 75, 72, 80],
    expenses: [10, 22, 18, 30, 25, 38, 32, 40, 35, 45, 38, 50],
  },
  quarterly: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    income: [108, 173, 197, 217],
    expenses: [50, 93, 107, 133],
  },
  yearly: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    income: [180, 220, 260, 310, 360],
    expenses: [90, 130, 160, 190, 240],
  },
};

const TREND_PERIOD_OPTIONS = ["Monthly", "Quarterly", "Yearly"];

interface IncomeExpenseTrendChartProps {
  incomeColor?: string;
  expenseColor?: string;
}

export default function IncomeExpenseTrendChart({
  incomeColor = "#10b981",
  expenseColor = "#ef4444",
}: IncomeExpenseTrendChartProps) {
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const data = INCOME_EXPENSE_TREND[period];
  const labels = data.labels;

  const allValues = [...data.income, ...data.expenses];
  const maxVal = Math.max(...allValues, 1);
  const niceMax = Math.ceil(maxVal / 20) * 20 || 20;
  const yTicks = [0, 20, 40, 60, 80].filter((t) => t <= niceMax);

  const width = 600;
  const height = 220;
  const paddingLeft = 36;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 28;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (i: number) => paddingLeft + (i / (labels.length - 1)) * chartWidth;
  const getY = (v: number) => paddingTop + chartHeight - (v / niceMax) * chartHeight;

  const incomePoints = data.income.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");
  const expensePoints = data.expenses.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");

  const incomeArea = `0,${paddingTop + chartHeight} ${incomePoints} ${getX(labels.length - 1)},${paddingTop + chartHeight}`;
  const expenseArea = `0,${paddingTop + chartHeight} ${expensePoints} ${getX(labels.length - 1)},${paddingTop + chartHeight}`;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Income vs Expense Trend</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as typeof period)}
            className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-purple-400"
          >
            {TREND_PERIOD_OPTIONS.map((opt) => (
              <option key={opt} value={opt.toLowerCase()}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-600">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-xs font-medium text-slate-600">Expense</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Grid lines */}
        {yTicks.map((tick) => {
          const y = getY(tick);
          return (
            <g key={tick}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              <text x={paddingLeft - 6} y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">
                {tick}L
              </text>
            </g>
          );
        })}

        {/* Expense area */}
        <polygon points={expenseArea} fill={expenseColor} fillOpacity="0.08" />
        {/* Income area */}
        <polygon points={incomeArea} fill={incomeColor} fillOpacity="0.08" />

        {/* Expense line */}
        <polyline points={expensePoints} fill="none" stroke={expenseColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Income line */}
        <polyline points={incomePoints} fill="none" stroke={incomeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {data.income.map((v, i) => (
          <circle key={`inc-${i}`} cx={getX(i)} cy={getY(v)} r="3.5" fill={incomeColor} stroke="white" strokeWidth="1.5" />
        ))}
        {data.expenses.map((v, i) => (
          <circle key={`exp-${i}`} cx={getX(i)} cy={getY(v)} r="3.5" fill={expenseColor} stroke="white" strokeWidth="1.5" />
        ))}

        {/* X-axis labels */}
        {labels.map((label, i) => (
          <text key={label} x={getX(i)} y={height - 8} fontSize="10" fill="#64748b" textAnchor="middle">
            {label}
          </text>
        ))}
      </svg>
    </Card>
  );
}
