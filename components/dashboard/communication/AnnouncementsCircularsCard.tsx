"use client";

import { useState, useMemo } from "react";
import { Megaphone, Bell, FileText, Calendar } from "lucide-react";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import type { Announcement } from "@/lib/fixtures/communications-announcements-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  megaphone: <Megaphone className="h-5 w-5" />,
  bell: <Bell className="h-5 w-5" />,
  circular: <FileText className="h-5 w-5" />,
  calendar: <Calendar className="h-5 w-5" />,
};

interface AnnouncementsCircularsCardProps {
  announcements: Announcement[];
  onViewAnnouncement: (announcement: Announcement) => void;
  onViewAll: () => void;
}

type AnnouncementTab = "All" | "Announcements" | "Circulars" | "Events";

export default function AnnouncementsCircularsCard({
  announcements,
  onViewAnnouncement,
  onViewAll,
}: AnnouncementsCircularsCardProps) {
  const [activeTab, setActiveTab] = useState<AnnouncementTab>("All");

  const filtered = useMemo(() => {
    if (activeTab === "All") return announcements;
    return announcements.filter((a) => a.badge === activeTab.slice(0, -1));
  }, [announcements, activeTab]);

  const badgeClassMap: Record<string, string> = {
    "Announcement": "bg-emerald-50 text-emerald-700",
    "Circular": "bg-red-50 text-red-600",
    "Event": "bg-purple-50 text-purple-700",
  };

  const iconColorClassMap: Record<string, string> = {
    "Announcement": "text-emerald-600",
    "Circular": "text-red-600",
    "Event": "text-purple-600",
  };

  return (
    <Card className="p-0 flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">Announcements & Circulars</h2>
      </div>
      <div className="px-6 pt-4">
        <div className="flex items-center gap-4 border-b border-slate-200">
          {(["All", "Announcements", "Circulars", "Events"] as AnnouncementTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-[#7c3aed] border-[#7c3aed]"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-slate-200">
        {filtered.slice(0, 4).map((announcement) => (
          <button
            key={announcement.id}
            type="button"
            onClick={() => onViewAnnouncement(announcement)}
            className="w-full flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition text-left"
          >
            <div className={`${announcement.iconBg} p-2 rounded-lg flex-shrink-0`}>
              <span className={iconColorClassMap[announcement.badge] || "text-slate-600"}>
                {iconMap[announcement.icon] || <Bell className="h-5 w-5" />}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-slate-900 truncate">{announcement.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${badgeClassMap[announcement.badge] || "bg-slate-100 text-slate-700"}`}>{announcement.badge}</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{announcement.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-400">{announcement.date}</span>
                <span className="text-xs text-slate-400">By {announcement.author}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-slate-200">
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-[#7c3aed] hover:underline inline-flex items-center gap-1"
        >
          View All Announcements
          <span className="text-[#7c3aed]">→</span>
        </button>
      </div>
    </Card>
  );
}
