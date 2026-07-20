"use client";

import { useState, useMemo } from "react";
import Card from "@/components/shared/Card";
import Dropdown from "@/components/shared/Dropdown";
import {
  ACTIVITY_DATASETS,
  ACTIVITY_PERIOD_OPTIONS,
  ACTIVITY_7_DAYS,
} from "@/lib/fixtures/communication-overview-reference-fixture";

const PERIOD_TOTALS: Record<string, { sent: number; delivered: number; failed: number }> = {
  "Last 7 Days": { sent: 1245, delivered: 1228, failed: 17 },
  "Last 30 Days": { sent: 4050, delivered: 3970, failed: 80 },
  "This Month": { sent: 1245, delivered: 1215, failed: 30 },
};

export default function CommunicationActivityChart() {
  const [period, setPeriod] = useState("Last 7 Days");

  const datasets = ACTIVITY_DATASETS[period] || ACTIVITY_DATASETS["Last 7 Days"];
  const points = useMemo(() => {
    const data = period === "Last 7 Days" ? ACTIVITY_7_DAYS : [];
    if (!data.length) return { labels: [], maxVal: 1 };
    const labels = data.map((d) => d.day);
    const maxVal = Math.max(
      ...data.flatMap((d) => [d.messagesSent, d.delivered, d.failed]),
      1
    );
    return { labels, maxVal };
  }, [period]);

  const totals = PERIOD_TOTALS[period] || PERIOD_TOTALS["Last 7 Days"];

  const buildPath = (
    data: number[],
    width: number,
    height: number,
    maxVal: number
  ): string => {
    return data
      .map((v, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * width;
        const y = height - (v / maxVal) * (height - 8) - 4;
        return `${x},${y}`;
      })
      .join(" ");
  };

  const chartW = 600;
  const chartH = 160;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900">Communication Activity</h2>
        <Dropdown
          value={period}
          options={ACTIVITY_PERIOD_OPTIONS}
          onChange={setPeriod}
          className="w-36"
        />
      </div>

      <div className="overflow-x-auto -mx-1">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full min-w-[400px]"
          style={{ height: chartH }}
          aria-label="Communication activity chart"
          role="img"
        >
          {datasets.map((ds, idx) => {
            const dataPoints = buildPath(ds.data, chartW, chartH, points.maxVal || 1);
            const areaPoints = `0,${chartH} ${dataPoints} ${chartW},${chartH}`;
            return (
              <g key={ds.label}>
                <polygon
                  points={areaPoints}
                  fill={ds.fillColor}
                />
                <polyline
                  points={dataPoints}
                  fill="none"
                  stroke={ds.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {points.labels.map((label, i) => {
            const x = (i / Math.max(points.labels.length - 1, 1)) * chartW;
            return (
              <text
                key={label}
                x={x}
                y={chartH - 2}
                textAnchor="middle"
                className="text-[10px] fill-slate-400"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed] flex-shrink-0" />
          <span className="text-xs text-slate-500">Messages Sent</span>
          <span className="text-sm font-semibold text-slate-900">
            {totals.sent.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="text-xs text-slate-500">Delivered</span>
          <span className="text-sm font-semibold text-slate-900">
            {totals.delivered.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 flex-shrink-0" />
          <span className="text-xs text-slate-500">Failed</span>
          <span className="text-sm font-semibold text-slate-900">
            {totals.failed.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
}
