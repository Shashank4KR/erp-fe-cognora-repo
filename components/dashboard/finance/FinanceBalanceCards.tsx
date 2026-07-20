"use client";

import Card from "@/components/shared/Card";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { BalanceCard } from "@/lib/fixtures/finance-overview-reference-fixture";

interface FinanceBalanceCardsProps {
  cards: BalanceCard[];
}

export default function FinanceBalanceCards({ cards }: FinanceBalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.title} className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{card.title}</h3>
            <div className="p-2 rounded-lg bg-slate-50">
              <Wallet className="h-4 w-4 text-slate-600" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900">{card.value}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" />
            <ArrowUpRight className="h-3.5 w-3.5 text-red-600" />
            <span className="text-xs text-slate-500 ml-1">{card.footer}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
