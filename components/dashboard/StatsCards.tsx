"use client";

import { statsCards } from "@/lib/dashboard/dashboard-data";
import Card from "@/components/shared/Card";
import {
  Users,
  GraduationCap,
  BookOpen,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const iconMap: { [key: string]: LucideIcon } = {
  Users,
  GraduationCap,
  BookOpen,
  Wallet,
};

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statsCards.map((card) => {
        const IconComponent = iconMap[card.icon as keyof typeof iconMap];

        return (
          <Card key={card.id} hover>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-600">
                  {card.title}
                </span>
                {IconComponent && (
                  <div className={`${card.backgroundColor} p-2 rounded-lg`}>
                    <IconComponent className={`${card.iconColor} w-5 h-5`} />
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  {card.value}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{card.change}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
