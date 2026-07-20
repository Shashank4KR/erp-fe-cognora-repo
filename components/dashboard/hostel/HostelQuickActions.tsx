"use client";

import {
  UserPlus,
  Bed,
  UserPlus as VisitorIcon,
  Utensils,
  Wrench,
  FileText,
} from "lucide-react";
import Card from "@/components/shared/Card";
import type { QuickAction } from "@/lib/fixtures/hostel-management-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  UserPlus: <UserPlus className="w-5 h-5" />,
  Bed: <Bed className="w-5 h-5" />,
  VisitorIcon: <VisitorIcon className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

interface HostelQuickActionsProps {
  actions: QuickAction[];
  onAction: (action: QuickAction) => void;
}

export default function HostelQuickActions({ actions, onAction }: HostelQuickActionsProps) {
  return (
    <Card className="flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
      </div>
    </Card>
  );
}
