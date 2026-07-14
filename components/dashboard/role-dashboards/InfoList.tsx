"use client";

import Badge from "@/components/shared/Badge";
import type { InfoRow } from "@/lib/dashboard/role-dashboards/types";

interface InfoListProps {
  items: InfoRow[];
  showIcon?: boolean;
}

export default function InfoList({ items, showIcon = true }: InfoListProps) {
  return (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex items-start gap-4 border-b border-slate-100 py-3 last:border-0"
          >
            {showIcon && (Icon || item.iconBg) && (
              <div
                className={`${
                  item.iconBg ?? "bg-slate-100"
                } p-2.5 rounded-lg flex-shrink-0`}
              >
                {Icon && (
                  <Icon
                    className={`${item.iconColor ?? "text-slate-600"} w-4 h-4`}
                  />
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">
                {item.title}
              </p>
              {item.description && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.description}
                </p>
              )}
              {item.time && (
                <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
              )}
            </div>
            {item.meta && (
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                {item.meta}
              </span>
            )}
            {item.badge && (
              <Badge variant={item.badge.variant}>{item.badge.label}</Badge>
            )}
          </div>
        );
      })}
    </div>
  );
}
