"use client";

import { Bed, Building2, Home, Users, ClipboardList } from "lucide-react";
import Card from "@/components/shared/Card";
import type { SummaryCardData } from "@/lib/fixtures/rooms-management-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  Bed: <Bed className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  ClipboardList: <ClipboardList className="h-5 w-5" />,
};

interface RoomSummaryCardsProps {
  cards: SummaryCardData[];
}

export default function RoomSummaryCards({ cards }: RoomSummaryCardsProps) {
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
