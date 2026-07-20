"use client";

import { cn } from "@/lib/utils";

interface ExpenseTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts?: Record<string, number>;
}

const TABS = ["All Expenses", "Pending Approval", "Approved", "Rejected"];

export default function ExpenseTabs({ activeTab, onTabChange, counts }: ExpenseTabsProps) {
  return (
    <div className="border-b border-slate-200 mb-0">
      <div className="flex items-center gap-0 overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          const countLabel = counts?.[tab];
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium whitespace-nowrap transition",
                isActive
                  ? "text-[#7c3aed]"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {tab}
              {countLabel !== undefined && (
                <span className="ml-1.5 text-xs text-slate-400">({countLabel})</span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c3aed] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
