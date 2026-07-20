"use client";

import { CheckCircle2, Clock, XCircle, ChevronRight } from "lucide-react";
import type { ActivityItem } from "@/lib/fixtures/expenses-management-reference-fixture";

interface RecentExpenseActivitiesProps {
  items: ActivityItem[];
  onViewAll: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  approved: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  pending: <Clock className="h-5 w-5 text-orange-500" />,
  rejected: <XCircle className="h-5 w-5 text-red-500" />,
};

const bgColorMap: Record<string, string> = {
  approved: "bg-emerald-50",
  pending: "bg-orange-50",
  rejected: "bg-red-50",
};

export default function RecentExpenseActivities({ items, onViewAll }: RecentExpenseActivitiesProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Expense Activities</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${bgColorMap[item.type]} flex items-center justify-center`}>
              {iconMap[item.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900 font-medium leading-snug">{item.text}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.subText}</p>
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">{item.date}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#7c3aed] hover:underline"
      >
        View All Activities
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
