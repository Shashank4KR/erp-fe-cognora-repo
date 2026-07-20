"use client";

import Link from "next/link";
import Card from "@/components/shared/Card";
import { Truck, MapPin, CalendarDays, FileText } from "lucide-react";
import type { QuickNavItem } from "@/lib/fixtures/transport-overview-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  bus: <Truck className="h-5 w-5" />,
  "map-pin": <MapPin className="h-5 w-5" />,
  "calendar-route": <CalendarDays className="h-5 w-5" />,
  report: <FileText className="h-5 w-5" />,
};

interface TransportQuickNavigationProps {
  items: QuickNavItem[];
  onTracking: () => void;
  onSchedule: () => void;
  onReport: () => void;
}

export default function TransportQuickNavigation({
  items,
  onTracking,
  onSchedule,
  onReport,
}: TransportQuickNavigationProps) {
  const handleClick = (item: QuickNavItem) => {
    if (item.action === "tracking") onTracking();
    else if (item.action === "schedule") onSchedule();
    else if (item.action === "report") onReport();
  };

  return (
    <Card className="p-5">
      <h2 className="text-base font-semibold text-slate-900 mb-4">Quick Navigation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.map((item) => {
          const content = (
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition cursor-pointer group border border-transparent hover:border-slate-100">
              <div className={`${item.iconBg} p-2 rounded-lg flex-shrink-0`}>
                <span className={item.iconColor}>{iconMap[item.icon]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-[#7c3aed] transition">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
              </div>
              <span className="text-slate-300 group-hover:text-[#7c3aed] transition flex-shrink-0 mt-0.5" aria-hidden="true">
                →
              </span>
            </div>
          );

          if (item.href) {
            return (
              <Link key={item.title} href={item.href} className="block">
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => handleClick(item)}
              className="block text-left w-full"
            >
              {content}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
