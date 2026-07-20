"use client";

import Card from "@/components/shared/Card";
import DonutChart from "@/components/shared/charts/DonutChart";
import { INVOICE_STATUS_DATA } from "@/lib/fixtures/invoices-reference-fixture";

export default function InvoicesByStatusChart() {
  const segments = [
    { label: "Paid", value: INVOICE_STATUS_DATA.paid, color: "#10b981" },
    { label: "Partial", value: INVOICE_STATUS_DATA.partial, color: "#f97316" },
    { label: "Overdue", value: INVOICE_STATUS_DATA.overdue, color: "#ef4444" },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Invoices by Status</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <DonutChart
            segments={segments}
            value={INVOICE_STATUS_DATA.total}
            label="Total"
            size={160}
            strokeWidth={16}
          />
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-slate-700">Paid</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-slate-900">{INVOICE_STATUS_DATA.paid} (71.5%)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span className="text-sm text-slate-700">Partial</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-slate-900">{INVOICE_STATUS_DATA.partial} (20.7%)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="text-sm text-slate-700">Overdue</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-slate-900">{INVOICE_STATUS_DATA.overdue} (7.8%)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
