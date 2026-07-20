"use client";

import { UserPlus, Wallet, Building2, FileText, BarChart3, Settings, CircleDollarSign, MinusCircle } from "lucide-react";
import Card from "@/components/shared/Card";
import { QUICK_ACTIONS } from "@/lib/fixtures/salary-management-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  UserPlus: <UserPlus className="h-5 w-5" />,
  Wallet: <Wallet className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
  CircleDollarSign: <CircleDollarSign className="h-5 w-5" />,
  MinusCircle: <MinusCircle className="h-5 w-5" />,
};

interface SalaryQuickActionsProps {
  onAction?: (action: string) => void;
}

export default function SalaryQuickActions({ onAction }: SalaryQuickActionsProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => onAction?.(action.label)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-200 ${action.bgColor} hover:brightness-95 transition`}
          >
            <span className={action.color}>{iconMap[action.icon]}</span>
            <span className="text-xs font-medium text-slate-700">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
