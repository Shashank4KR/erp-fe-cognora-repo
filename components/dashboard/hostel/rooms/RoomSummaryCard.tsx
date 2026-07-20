"use client";

import { Bed, Building2, Home, Users } from "lucide-react";
import Card from "@/components/shared/Card";

const iconMap: Record<string, React.ReactNode> = {
  Bed: <Bed className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
};

interface SummaryItem {
  label: string;
  value: string;
  icon: string;
  iconBg: string;
}

interface RoomSummaryCardProps {
  items: SummaryItem[];
}

export default function RoomSummaryCard({ items }: RoomSummaryCardProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Room Summary</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${item.iconBg} p-2 rounded-lg flex-shrink-0`}>
                {iconMap[item.icon]}
              </div>
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
