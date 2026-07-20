"use client";

import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import Card from "@/components/shared/Card";
import type { RecentActivityItem } from "@/lib/fixtures/transactions-reference-fixture";

interface RecentActivityProps {
  items: RecentActivityItem[];
  onViewAll: () => void;
}

export default function RecentActivity({ items, onViewAll }: RecentActivityProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg flex-shrink-0 ${
              item.type === "Income" ? "bg-emerald-50" : "bg-pink-50"
            }`}>
              {item.type === "Income" ? (
                <ArrowDownCircle className="h-4 w-4 text-emerald-600" />
              ) : (
                <ArrowUpCircle className="h-4 w-4 text-pink-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900 truncate">{item.text}</p>
              <p className="text-[11px] text-slate-500">{item.secondary}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-semibold text-slate-900">{item.amount}</p>
              <p className="text-[10px] text-slate-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onViewAll}
        className="mt-4 text-xs font-semibold text-[#7c3aed] hover:underline flex items-center gap-1"
      >
        View All Activities
        <span className="text-sm">→</span>
      </button>
    </Card>
  );
}
