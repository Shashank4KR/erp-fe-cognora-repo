"use client";

import {
  CalendarDays,
  CalendarCheck,
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import Card from "@/components/shared/Card";

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  if (!data || data.length === 0) return null;
  const width = 100;
  const height = 32;
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
    <svg width={width} height={height} className="mt-1 ml-auto">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const iconMap: Record<string, React.ReactNode> = {
  "Today's Attendance": <CalendarDays className="h-5 w-5" />,
  "This Month Average": <CalendarCheck className="h-5 w-5" />,
  "Total Students": <Users className="h-5 w-5" />,
  "Present Today": <UserCheck className="h-5 w-5" />,
  "Absent Today": <UserX className="h-5 w-5" />,
  "Late Today": <Clock className="h-5 w-5" />,
};

interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
}

interface AttendanceSummaryCardsProps {
  cards: SummaryCard[];
}

export default function AttendanceSummaryCards({ cards }: AttendanceSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.title} className="p-4">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{card.title}</span>
            <div className={`${card.iconBg} p-2 rounded-lg`}>
              <span className={card.iconColor}>{iconMap[card.title]}</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{card.footer}</p>
            </div>
            {card.sparkline.length > 0 && (
              <Sparkline data={card.sparkline} color={card.sparkColor} />
            )}
          </div>
          {card.title === "Total Students" && (
            <div className="mt-2 h-1 w-12 rounded-full bg-blue-200" />
          )}
        </Card>
      ))}
    </div>
  );
}
