"use client";

import { Eye, Wallet, FileText, Download, BarChart3, Landmark } from "lucide-react";
import Card from "@/components/shared/Card";
import type { QuickAction } from "@/lib/fixtures/transactions-reference-fixture";

interface TransactionsQuickActionsProps {
  actions: QuickAction[];
  onAction: (label: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Eye: <Eye className="h-5 w-5" />,
  Wallet: <Wallet className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Download: <Download className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Landmark: <Landmark className="h-5 w-5" />,
};

export default function TransactionsQuickActions({ actions, onAction }: TransactionsQuickActionsProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => onAction(action.label)}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 transition hover:shadow-sm"
          >
            <div className={`${action.bgColor} p-2 rounded-lg`}>
              <span className={action.color}>{iconMap[action.icon]}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-700 text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
