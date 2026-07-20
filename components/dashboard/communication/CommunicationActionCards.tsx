"use client";

import { Send, Mail, MessageCircle, Bell, Megaphone, FileText } from "lucide-react";
import type { QuickAction } from "@/lib/fixtures/communications-announcements-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  "send-message": <Send className="h-5 w-5" />,
  "send-email": <Mail className="h-5 w-5" />,
  "send-sms": <MessageCircle className="h-5 w-5" />,
  "send-notification": <Bell className="h-5 w-5" />,
  "create-announcement": <Megaphone className="h-5 w-5" />,
  "create-circular": <FileText className="h-5 w-5" />,
};

const colorMap: Record<string, string> = {
  "send-message": "text-[#7c3aed]",
  "send-email": "text-emerald-500",
  "send-sms": "text-blue-500",
  "send-notification": "text-orange-500",
  "create-announcement": "text-[#7c3aed]",
  "create-circular": "text-rose-500",
};

interface CommunicationActionCardsProps {
  items: QuickAction[];
  onAction: (actionId: string) => void;
}

export default function CommunicationActionCards({ items, onAction }: CommunicationActionCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onAction(item.id)}
          className="flex flex-col items-start gap-2 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition text-left"
        >
          <div className={`${item.iconBg} p-2 rounded-lg flex-shrink-0`}>
            <span className={colorMap[item.icon as string] || "text-slate-400"}>
              {iconMap[item.icon as string]}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 leading-tight">{item.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
