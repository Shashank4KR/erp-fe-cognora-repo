"use client";

import { Wallet, MinusCircle, Clock, CreditCard } from "lucide-react";
import Card from "@/components/shared/Card";
import { MONTHLY_SUMMARY_CARDS } from "@/lib/fixtures/salary-management-reference-fixture";const iconMap: Record<string, React.ReactNode> = {
  wallet: <Wallet className="h-5 w-5" />,
  deduct: <MinusCircle className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  card: <CreditCard className="h-5 w-5" />,
};

export default function MonthlySalarySummaryCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {MONTHLY_SUMMARY_CARDS.map((card) => (
        <Card key={card.title} className="p-4">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{card.title}</span>
            <div className={`${card.iconBg} p-2 rounded-lg`}>
              <span className={card.iconColor}>{iconMap[card.icon]}</span>
            </div>
          </div>
          <p className="text-lg font-bold text-slate-900">{card.value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{card.footer}</p>
        </Card>
      ))}
    </div>
  );
}
