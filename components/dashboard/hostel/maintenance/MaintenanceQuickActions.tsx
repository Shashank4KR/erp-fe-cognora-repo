"use client";

import {
  Wrench,
  ClipboardList,
  History,
  HardHat,
  Package,
  FileText,
} from "lucide-react";
import Card from "@/components/shared/Card";
import type { QuickActionItem } from "@/lib/fixtures/maintenance-management-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-5 h-5" />,
  ClipboardList: <ClipboardList className="w-5 h-5" />,
  History: <History className="w-5 h-5" />,
  HardHat: <HardHat className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

interface MaintenanceQuickActionsProps {
  actions: QuickActionItem[];
  onAction: (action: QuickActionItem) => void;
}

export default function MaintenanceQuickActions({ actions, onAction }: MaintenanceQuickActionsProps) {
  return (
    <Card className="p-5 mb-6">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => onAction(action)}
            className={`flex items-center gap-3 rounded-lg border ${action.borderColor} ${action.bgColor} px-4 py-3 text-left transition hover:shadow-sm`}
          >
            <span className={`${action.color} flex-shrink-0`}>
              {iconMap[action.icon]}
            </span>
            <span className={`text-sm font-semibold ${action.color}`}>{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
