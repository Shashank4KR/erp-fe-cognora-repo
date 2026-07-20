"use client";

import Card from "@/components/shared/Card";
import {
  Users,
  CheckCircle,
  Bus,
  Bell,
} from "lucide-react";
import type { OverviewSummaryCard } from "@/lib/fixtures/transport-overview-reference-fixture";

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  if (!data || data.length === 0) return null;
  const width = 80;
  const height = 28;
  const max = Math.max(...data, 0);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="mt-1 flex-shrink-0">
      <defs>
        <linearGradient id={`grad-to-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-to-${color.replace("#", "")})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const iconMap: Record<string, React.ReactNode> = {
  "users-route": <Users className="h-5 w-5" />,
  "clock-check": <CheckCircle className="h-5 w-5" />,
  "bus-check": <Bus className="h-5 w-5" />,
  "alert-bell": <Bell className="h-5 w-5" />,
};

interface TransportOverviewSummaryCardsProps {
  cards: OverviewSummaryCard[];
}

export default function TransportOverviewSummaryCards({ cards }: TransportOverviewSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.title} className="p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide leading-tight">
              {card.title}
            </span>
            <div className={`${card.iconBg} p-2 rounded-lg flex-shrink-0`}>
              <span className={card.iconColor}>{iconMap[card.icon]}</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{card.value}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-500">{card.footer}</p>
            <Sparkline data={card.sparkline} color={card.sparkColor} />
          </div>
        </Card>
      ))}
    </div>
  );
}
