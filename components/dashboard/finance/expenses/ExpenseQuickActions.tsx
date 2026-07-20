"use client";

import { Receipt, UserCheck, FileText, PiggyBank, Tags, Wallet, Download, Settings } from "lucide-react";
import type { QuickActionItem } from "@/lib/fixtures/expenses-management-reference-fixture";

interface ExpenseQuickActionsProps {
  items: QuickActionItem[];
  onAction: (action: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Receipt: <Receipt className="h-5 w-5" />,
  UserCheck: <UserCheck className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  PiggyBank: <PiggyBank className="h-5 w-5" />,
  Tags: <Tags className="h-5 w-5" />,
  Wallet: <Wallet className="h-5 w-5" />,
  Download: <Download className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
};

export default function ExpenseQuickActions({ items, onAction }: ExpenseQuickActionsProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onAction(item.label)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl ${item.bgColor} hover:brightness-95 transition`}
          >
            <span className={item.color}>{iconMap[item.icon]}</span>
            <span className="text-xs font-medium text-slate-700 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
