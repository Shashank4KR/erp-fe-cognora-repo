"use client";

import Card from "@/components/shared/Card";
import type { RoleStat } from "@/lib/dashboard/role-dashboards/types";

interface StatGridProps {
  stats: RoleStat[];
  columns?: 2 | 3 | 4 | 5;
}

const columnClass: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
};

export default function StatGrid({ stats, columns = 4 }: StatGridProps) {
  return (
    <div className={`grid grid-cols-1 ${columnClass[columns]} gap-4 mb-8`}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} hover>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-600">
                  {stat.label}
                </span>
                <div className={`${stat.iconBg} p-2 rounded-lg`}>
                  <Icon className={`${stat.iconColor} w-5 h-5`} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </span>
              </div>
              {typeof stat.progress === "number" && (
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              )}
              {stat.change && (
                <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
