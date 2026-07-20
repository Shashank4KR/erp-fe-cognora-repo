"use client";

import Card from "@/components/shared/Card";
import DonutChart from "@/components/shared/charts/DonutChart";
import type { DonutSegment } from "@/lib/fixtures/rooms-management-reference-fixture";

interface RoomTypeDistributionChartProps {
  segments: DonutSegment[];
}

export default function RoomTypeDistributionChart({ segments }: RoomTypeDistributionChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Room Type Distribution</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <DonutChart
            segments={segments.map((s) => ({ ...s, value: (s.value / total) * 100 }))}
            size={180}
            strokeWidth={16}
            total={100}
            value={total}
            label="Total Beds"
          />
        </div>
        <div className="flex-1 w-full space-y-2.5">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: segment.color }} />
                <span className="text-sm text-slate-600">{segment.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">{segment.value}</span>
                <span className="text-xs text-slate-400 w-10 text-right">
                  {((segment.value / total) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
