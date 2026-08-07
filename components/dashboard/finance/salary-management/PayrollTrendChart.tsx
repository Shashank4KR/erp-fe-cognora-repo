"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";

const PAYROLL_TREND_DATA = [
  { month: "Dec 2024", payroll: 28, netPayout: 25 },
  { month: "Jan 2025", payroll: 30, netPayout: 27 },
  { month: "Feb 2025", payroll: 27, netPayout: 24 },
  { month: "Mar 2025", payroll: 32, netPayout: 29 },
  { month: "Apr 2025", payroll: 29, netPayout: 26 },
  { month: "May 2025", payroll: 35, netPayout: 31 },
];

const TREND_PERIOD_OPTIONS = ["Last 3 Months", "Last 6 Months", "This Year"];

export default function PayrollTrendChart() {
  const [period, setPeriod] = useState("Last 6 Months");

  const labels = PAYROLL_TREND_DATA.map((d) => d.month);
  const payroll = PAYROLL_TREND_DATA.map((d) => d.payroll);
  const netPayout = PAYROLL_TREND_DATA.map((d) => d.netPayout);

  const allValues = [...payroll, ...netPayout];
  const maxVal = Math.max(...allValues, 1);
  const niceMax = Math.ceil(maxVal / 10) * 10 || 10;
  const yTicks = [0, 10, 20, 30, 40].filter((t) => t <= niceMax);

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

  const payrollPoints = payroll.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");
  const netPayoutPoints = netPayout.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");

  const barWidth = chartWidth / (labels.length * 2.5);
  const barGap = chartWidth / labels.length;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Payroll Trend</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-purple-400"
          >
            {TREND_PERIOD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#7c3aed]" />
          <span className="text-xs font-medium text-slate-600">Payroll</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-600">Net Payout</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
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

        {netPayout.map((v, i) => {
          const x = getX(i) - barWidth / 2;
          const y = getY(v);
          const barHeight = paddingTop + chartHeight - y;
          return (
            <rect
              key={`bar-${i}`}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#10b981"
              fillOpacity="0.7"
              rx="2"
            />
          );
        })}

        <polyline points={payrollPoints} fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {payroll.map((v, i) => (
          <circle key={`payroll-${i}`} cx={getX(i)} cy={getY(v)} r="3.5" fill="#7c3aed" stroke="white" strokeWidth="1.5" />
        ))}

        {labels.map((label, i) => (
          <text key={label} x={getX(i)} y={height - 8} fontSize="10" fill="#64748b" textAnchor="middle">
            {label}
          </text>
        ))}
      </svg>
    </Card>
  );
}
