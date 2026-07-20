"use client";

import { Wrench, ClipboardCheck, Clock, CheckCircle2, XCircle } from "lucide-react";
import Card from "@/components/shared/Card";
import type { MaintenanceSummaryCard } from "@/lib/fixtures/maintenance-management-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="h-5 w-5" />,
  ClipboardCheck: <ClipboardCheck className="h-5 w-5" />,
  Clock: <Clock className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
  XCircle: <XCircle className="h-5 w-5" />,
};

interface MaintenanceSummaryCardsProps {
  cards: MaintenanceSummaryCard[];
}

export default function MaintenanceSummaryCards({ cards }: MaintenanceSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.title} className={`${card.tint} border-slate-100 p-4`}>
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide leading-tight">{card.title}</span>
            <div className={`${card.iconBg} p-2 rounded-lg flex-shrink-0`}>
              <span className={card.iconColor}>{iconMap[card.icon]}</span>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{card.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{card.footer}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
