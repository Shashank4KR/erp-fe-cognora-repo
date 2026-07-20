"use client";

import Card from "@/components/shared/Card";
import type { PaymentModeRow } from "@/lib/fixtures/transactions-reference-fixture";

interface PaymentModeSummaryProps {
  rows: PaymentModeRow[];
}

export default function PaymentModeSummary({ rows }: PaymentModeSummaryProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Payment Mode Summary</h3>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-700 w-24 flex-shrink-0">{row.label}</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${row.percentage}%` }}
              />
            </div>
            <div className="text-right w-28 flex-shrink-0">
              <span className="text-xs font-semibold text-slate-900">{row.amount}</span>
              <span className="text-[11px] text-slate-500 ml-1">({row.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
