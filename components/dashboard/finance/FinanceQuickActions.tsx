"use client";

import Card from "@/components/shared/Card";
import {
  Receipt,
  CalendarX,
  ArrowLeftRight,
  RefreshCw,
  Download,
  Send,
  Settings,
  BarChart3,
  Wallet,
} from "lucide-react";

interface FinanceQuickActionsProps {
  onAction: (action: string) => void;
}

const actions = [
  { label: "New Invoice", icon: Receipt },
  { label: "Refund Processing", icon: RefreshCw },
  { label: "Fee Structure", icon: Settings },
  { label: "Payment Link", icon: ArrowLeftRight },
  { label: "Reports", icon: BarChart3 },
  { label: "Export Data", icon: Download },
  { label: "Send Reminders", icon: Send },
  { label: "Wallet Management", icon: Wallet },
];

export default function FinanceQuickActions({ onAction }: FinanceQuickActionsProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => onAction(action.label)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] hover:border-[#7c3aed] transition"
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
