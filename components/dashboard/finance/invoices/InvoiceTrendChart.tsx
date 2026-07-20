"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";
import { INVOICE_TREND_DATA, INVOICE_TREND_PERIOD_OPTIONS } from "@/lib/fixtures/invoices-reference-fixture";

interface InvoiceTrendChartProps {
  className?: string;
}

export default function InvoiceTrendChart({ className }: InvoiceTrendChartProps) {
  const [period, setPeriod] = useState("Monthly");
  const data = INVOICE_TREND_DATA[period.toLowerCase() as keyof typeof INVOICE_TREND_DATA] || INVOICE_TREND_DATA.monthly;

  const width = 400;
  const height = 160;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height;
  const allValues = [...data.invoiced, ...data.paid];
  const maxValue = Math.max(...allValues, 0);
  const niceMax = maxValue > 0 ? Math.ceil(maxValue / 200000) * 200000 : 1;
  const step = data.labels.length > 1 ? chartWidth / (data.labels.length - 1) : 0;

  const getY = (value: number) => padding + chartHeight - (value / niceMax) * chartHeight;
  const getX = (index: number) => padding + index * step;

  const invoicedPoints = data.invoiced.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");
  const paidPoints = data.paid.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");

  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Invoice Trend</h3>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white px-3 py-1.5 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-[#7c3aed] focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            {INVOICE_TREND_PERIOD_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-[#7c3aed]"></span>
          <span className="text-xs text-slate-600">Invoiced Amount</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-emerald-500"></span>
          <span className="text-xs text-slate-600">Paid Amount</span>
        </div>
      </div>
      <div className="relative w-full" style={{ height: `${height + padding}px` }}>
        <svg viewBox={`0 0 ${width} ${height + padding}`} className="w-full h-full">
          {yTicks.map((tick) => {
            const y = padding + chartHeight - tick * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x={padding - 8}
                  y={y + 4}
                  fontSize="11"
                  fill="#94a3b8"
                  textAnchor="end"
                >
                  {tick === 0 ? "0" : tick === 0.25 ? "20L" : tick === 0.5 ? "40L" : tick === 0.75 ? "60L" : "80L"}
                </text>
              </g>
            );
          })}
          <polyline
            points={invoicedPoints}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={paidPoints}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.invoiced.map((_, i) => (
            <circle key={`inv-${i}`} cx={getX(i)} cy={getY(data.invoiced[i])} r={3} fill="#7c3aed" />
          ))}
          {data.paid.map((_, i) => (
            <circle key={`paid-${i}`} cx={getX(i)} cy={getY(data.paid[i])} r={3} fill="#10b981" />
          ))}
          {data.labels.map((label, i) => (
            <text
              key={label}
              x={getX(i)}
              y={height + padding - 10}
              fontSize="11"
              fill="#64748b"
              textAnchor="middle"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </Card>
  );
}
