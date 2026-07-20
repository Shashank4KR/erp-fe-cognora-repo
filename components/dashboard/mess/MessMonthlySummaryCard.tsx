"use client";

import { Users, UtensilsCrossed, Wallet, IndianRupee, Receipt } from "lucide-react";
import type { MessSummaryRow } from "@/lib/fixtures/mess-management-reference-fixture";

interface MessMonthlySummaryCardProps {
  rows: MessSummaryRow[];
  month: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-4 h-4" />,
  UtensilsCrossed: <UtensilsCrossed className="w-4 h-4" />,
  Wallet: <Wallet className="w-4 h-4" />,
  IndianRupee: <IndianRupee className="w-4 h-4" />,
  Receipt: <Receipt className="w-4 h-4" />,
};

export default function MessMonthlySummaryCard({ rows, month }: MessMonthlySummaryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full">
      <h2 className="text-base font-bold text-slate-900 mb-3">Mess Summary ({month})</h2>
      <div className="space-y-2.5">
        {rows.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-slate-50 text-slate-600">
                {iconMap[row.icon]}
              </div>
              <span className="text-sm text-slate-700">{row.label}</span>
            </div>
            <span className={`text-sm font-semibold tabular-nums ${row.label === "Balance" ? "text-emerald-600" : "text-slate-900"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
