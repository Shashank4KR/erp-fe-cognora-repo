"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import Dropdown from "@/components/shared/Dropdown";

const COLLECTION_TREND_MONTHLY = {
  expected: [20, 25, 30, 45, 55, 60, 75, 80, 85, 100, 105, 110],
  collected: [5, 10, 15, 25, 35, 45, 55, 60, 65, 80, 90, 98],
};

const TREND_PERIOD_OPTIONS = ["Monthly", "Quarterly", "Yearly"];

export default function CollectionTrendChart() {
  const [period, setPeriod] = useState("Monthly");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = COLLECTION_TREND_MONTHLY;
  const labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const width = 400;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = [...data.expected, ...data.collected];
  const maxValue = Math.max(...allValues, 120);
  const minValue = 0;

  const xStep = chartWidth / (data.expected.length - 1);

  const getX = (i: number) => padding.left + i * xStep;
  const getY = (v: number) => padding.top + chartHeight - ((v - minValue) / (maxValue - minValue)) * chartHeight;

  const yTicks = [0, 20, 40, 60, 80, 100, 120];

  const expectedPoints = data.expected.map((v, i) => ({ x: getX(i), y: getY(v) }));
  const collectedPoints = data.collected.map((v, i) => ({ x: getX(i), y: getY(v) }));

  const expectedLine = expectedPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const collectedLine = collectedPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const collectedArea = `0,${padding.top + chartHeight} ${collectedPoints.map((p) => `${p.x},${p.y}`).join(" ")} ${getX(data.collected.length - 1)},${padding.top + chartHeight}`;

  return (
    <Card className="p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Collection Trend</h3>
        <Dropdown
          value={period}
          options={TREND_PERIOD_OPTIONS}
          onChange={setPeriod}
          className="w-24"
        />
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <svg width="20" height="3" className="text-[#7c3aed]">
            <line x1="0" y1="1.5" x2="20" y2="1.5" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
          <span className="text-xs text-slate-600">Expected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="20" height="3" className="text-emerald-500">
            <line x1="0" y1="1.5" x2="20" y2="1.5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-xs text-slate-600">Collected</span>
        </div>
      </div>

      <div className="flex-1 min-h-[200px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Grid lines */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                <text x={padding.left - 8} y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">
                  {tick === 120 ? "120L" : tick === 100 ? "100L" : tick === 80 ? "80L" : tick === 60 ? "60L" : tick === 40 ? "40L" : tick === 20 ? "20L" : "0"}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <polygon points={collectedArea} fill="#10b981" fillOpacity="0.08" />

          {/* Expected line */}
          <polyline points={expectedLine} fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Collected line */}
          <polyline points={collectedLine} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Collected points */}
          {collectedPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 6 : 4}
              fill={hoverIndex === i ? "#10b981" : "white"}
              stroke="#10b981"
              strokeWidth="2"
              className="transition-all"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}

          {/* X-axis labels */}
          {labels.map((label, i) => (
            <text key={label} x={getX(i)} y={height - 8} fontSize="10" fill="#64748b" textAnchor="middle">
              {label}
            </text>
          ))}

          {/* Tooltip */}
          {hoverIndex !== null && (
            <g>
              <rect x={collectedPoints[hoverIndex].x - 30} y={collectedPoints[hoverIndex].y - 50} width="60" height="40" fill="#1e293b" rx="4" />
              <text x={collectedPoints[hoverIndex].x} y={collectedPoints[hoverIndex].y - 35} fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
                {labels[hoverIndex]}
              </text>
              <text x={collectedPoints[hoverIndex].x} y={collectedPoints[hoverIndex].y - 20} fontSize="9" fill="#10b981" textAnchor="middle">
                ₹ {data.collected[hoverIndex]}L
              </text>
              <text x={collectedPoints[hoverIndex].x} y={collectedPoints[hoverIndex].y - 8} fontSize="9" fill="#7c3aed" textAnchor="middle">
                ₹ {data.expected[hoverIndex]}L
              </text>
            </g>
          )}
        </svg>
      </div>
    </Card>
  );
}
