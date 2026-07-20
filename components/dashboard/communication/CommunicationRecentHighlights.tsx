"use client";

import Link from "next/link";
import { MessageCircle, Megaphone, FileText } from "lucide-react";
import Card from "@/components/shared/Card";
import type { HighlightItem } from "@/lib/fixtures/communication-overview-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  chat: <MessageCircle className="h-4 w-4" />,
  megaphone: <Megaphone className="h-4 w-4" />,
  "file-text": <FileText className="h-4 w-4" />,
};

interface CommunicationRecentHighlightsProps {
  items: HighlightItem[];
}

export default function CommunicationRecentHighlights({ items }: CommunicationRecentHighlightsProps) {
  return (
    <Card className="p-5 flex flex-col">
      <h2 className="text-base font-semibold text-slate-900 mb-4">Recent Highlights</h2>

      <div className="space-y-3 flex-1">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
          >
            <div className={`${item.iconBg} p-2 rounded-lg flex-shrink-0`}>
              <span className={item.iconColor}>{iconMap[item.icon]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.text}</p>
            </div>
            <span className="text-[11px] text-slate-400 flex-shrink-0 mt-0.5">{item.time}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
        <Link
          href="/dashboard/admin/communication/communications-announcements"
          className="text-xs font-medium text-[#7c3aed] hover:underline inline-flex items-center gap-1"
        >
          View Communications
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/dashboard/admin/communication/communications-announcements"
          className="text-xs font-medium text-[#7c3aed] hover:underline inline-flex items-center gap-1"
        >
          View Announcements
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Card>
  );
}
