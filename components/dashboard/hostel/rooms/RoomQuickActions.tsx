"use client";

import {
  Bed,
  Users,
  ArrowRightLeft,
  LogOut,
  Wrench,
  FileText,
} from "lucide-react";
import Card from "@/components/shared/Card";
import type { QuickActionData } from "@/lib/fixtures/rooms-management-reference-fixture";

interface RoomQuickActionsProps {
  actions: QuickActionData[];
  onAction: (action: QuickActionData) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Bed: <Bed className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  ArrowRightLeft: <ArrowRightLeft className="w-5 h-5" />,
  LogOut: <LogOut className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

export default function RoomQuickActions({ actions, onAction }: RoomQuickActionsProps) {
  return (
    <Card className="flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
