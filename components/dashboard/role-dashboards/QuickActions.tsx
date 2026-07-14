"use client";

import Card from "@/components/shared/Card";
import type { RoleQuickAction } from "@/lib/dashboard/role-dashboards/types";

interface QuickActionsProps {
  actions: RoleQuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            const content = (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 mb-3">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {action.label}
                </span>
              </>
            );

            return action.href ? (
              <a
                key={action.id}
                href={action.href}
                className="flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 transition"
              >
                {content}
              </a>
            ) : (
              <button
                key={action.id}
                type="button"
                className="flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 transition text-left"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
