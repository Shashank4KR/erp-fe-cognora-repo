"use client";

import { type ReactNode } from "react";
import { Sparkles, CalendarDays, Users, UserCheck, UserX, Clock } from "lucide-react";
import Card from "@/components/shared/Card";

export type SummaryCardItem = {
  title: string;
  value: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  trend?: string;
  sparkline?: number[];
};

interface AttendanceSummaryCardsProps {
  cards: SummaryCardItem[];
}

const Sparkline = ({ data, color = "#6d28d9" }: { data: number[]; color?: string }) => {
  if (!data || data.length === 0) return null;
  const width = 120;
  const height = 32;
  const max = Math.max(...data, 0);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} className="mt-2">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function AttendanceSummaryCards({ cards }: AttendanceSummaryCardsProps) {
  if (cards.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-3">
          <div className="p-5 text-sm text-slate-400">
            Select a Class to view attendance summary.
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card key={index} hover>
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">{card.title}</span>
              <div className={`${card.iconBg} p-2 rounded-lg`}>
                <span className={card.iconColor}>{card.icon}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{card.value}</span>
            </div>
            {card.sparkline && card.sparkline.length > 0 && (
              <Sparkline
                data={card.sparkline}
                color={card.iconColor.includes("purple") || card.iconColor.includes("#6d28d9") ? "#6d28d9" : card.iconColor.match(/\w+-\d+/)?.[0] || "#6d28d9"}
              />
            )}
            {card.trend && <p className="text-xs text-slate-500 mt-1">{card.trend}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
}
