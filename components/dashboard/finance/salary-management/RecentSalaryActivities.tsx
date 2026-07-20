"use client";

import { CheckCircle2, FileText, Building2 } from "lucide-react";
import Card from "@/components/shared/Card";
import type { RecentActivityItem } from "@/lib/fixtures/salary-management-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  check: <CheckCircle2 className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
  structure: <Building2 className="h-4 w-4" />,
};

interface RecentSalaryActivitiesProps {
  items: RecentActivityItem[];
  onViewAll?: () => void;
}

export default function RecentSalaryActivities({ items, onViewAll }: RecentSalaryActivitiesProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Salary Activities</h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg flex-shrink-0 ${item.iconBg}`}>
              <span className={item.iconColor}>{iconMap[item.icon]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900 truncate">{item.text}</p>
              <p className="text-[11px] text-slate-500">{item.secondary}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-semibold text-slate-900">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="mt-4 text-xs font-semibold text-[#7c3aed] hover:underline flex items-center gap-1"
        >
          View All Activities
          <span className="text-sm">→</span>
        </button>
      )}
    </Card>
  );
}
