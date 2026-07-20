"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import Dropdown from "@/components/shared/Dropdown";
import { FEE_COLLECTION_BY_TYPE, FEE_TYPE_PERIOD_OPTIONS } from "@/lib/fixtures/fees-management-reference-fixture";

export default function FeeCollectionByTypeCard() {
  const [period, setPeriod] = useState("This Year");

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Fee Collection by Fee Type</h3>
        <Dropdown
          value={period}
          options={FEE_TYPE_PERIOD_OPTIONS}
          onChange={setPeriod}
          className="w-24"
        />
      </div>

      <div className="space-y-4">
        {FEE_COLLECTION_BY_TYPE.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-700">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900">{item.amount}</span>
                <span className="text-xs text-slate-500 w-10 text-right">{item.percentage}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">Total Collected</span>
          <span className="text-xs font-bold text-slate-900">₹ 98,75,000</span>
        </div>
      </div>
    </Card>
  );
}
