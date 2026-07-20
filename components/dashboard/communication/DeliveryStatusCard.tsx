"use client";

import Card from "@/components/shared/Card";
import type { DeliveryStat } from "@/lib/fixtures/communication-statistics-reference-fixture";

interface DeliveryStatusCardProps {
  data: DeliveryStat[];
  total: number;
}

export default function DeliveryStatusCard({
  data,
  total,
}: DeliveryStatusCardProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card className="p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">
        Delivery Status
      </h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-700 font-medium">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-900">
                  {item.value.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 w-12 text-right">
                  {item.percentage}
                </span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
        <div className="pt-3 mt-1 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">Total</span>
            <span className="text-sm font-bold text-slate-900">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
