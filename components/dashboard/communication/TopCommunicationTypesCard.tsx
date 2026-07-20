"use client";

import { ArrowRight } from "lucide-react";
import Card from "@/components/shared/Card";
import type { TopCommunicationType } from "@/lib/fixtures/communication-statistics-reference-fixture";

interface TopCommunicationTypesCardProps {
  items: TopCommunicationType[];
  onViewAll: () => void;
}

export default function TopCommunicationTypesCard({
  items,
  onViewAll,
}: TopCommunicationTypesCardProps) {
  return (
    <Card className="p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Top Communication Types
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#7c3aed] hover:underline"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-0">
        <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-100 mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Type
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
            Messages Sent
          </span>
        </div>
        {items.map((item) => (
          <div
            key={item.type}
            className="grid grid-cols-2 gap-4 py-2.5 border-b border-slate-50 last:border-b-0"
          >
            <span className="text-sm font-medium text-slate-700 truncate">
              {item.type}
            </span>
            <span className="text-sm font-semibold text-slate-900 text-right">
              {item.messages.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
