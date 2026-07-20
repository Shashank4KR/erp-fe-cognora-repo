"use client";

import { UtensilsCrossed, Users, Receipt, Wallet, FileText } from "lucide-react";
import type { QuickActionItem } from "@/lib/fixtures/mess-management-reference-fixture";

interface MessQuickActionsCardProps {
  actions: QuickActionItem[];
  onAction: (action: QuickActionItem) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Receipt: <Receipt className="w-5 h-5" />,
  Wallet: <Wallet className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

export default function MessQuickActionsCard({ actions, onAction }: MessQuickActionsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full">
      <h2 className="text-base font-bold text-slate-900 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => onAction(action)}
            className={`inline-flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition hover:shadow-sm ${action.bgColor} ${action.borderColor}`}
          >
            <span className={`${action.color} flex-shrink-0`}>{iconMap[action.icon]}</span>
            <span className={`text-sm font-semibold truncate ${action.color}`}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
