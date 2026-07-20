"use client";

import { Calendar, CheckCircle, FileText, AlertCircle, Tag, Gift } from "lucide-react";
import Card from "@/components/shared/Card";
import type { FooterCard } from "@/lib/fixtures/fees-management-reference-fixture";
import { FOOTER_CARDS } from "@/lib/fixtures/fees-management-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="h-5 w-5" />,
  "calendar-check": <CheckCircle className="h-5 w-5" />,
  pending: <FileText className="h-5 w-5" />,
  "overdue-calendar": <AlertCircle className="h-5 w-5" />,
  tag: <Tag className="h-5 w-5" />,
  gift: <Gift className="h-5 w-5" />,
};

export default function FeesFooterCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {FOOTER_CARDS.map((card) => (
        <Card key={card.title} className="p-4">
          <div className="flex items-start gap-3">
            <div className={`${card.iconBg} p-2 rounded-lg`}>
              <span className={card.iconColor}>{iconMap[card.icon]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{card.title}</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{card.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{card.footer}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
