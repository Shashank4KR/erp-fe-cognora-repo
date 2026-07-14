"use client";

import { useState } from "react";
import { activities, allActivities } from "@/lib/dashboard/dashboard-data";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import Modal from "@/components/shared/Modal";
import {
  Users,
  CheckCircle,
  Calendar,
  FileText,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const iconMap: { [key: string]: LucideIcon } = {
  Users,
  CheckCircle,
  Calendar,
  FileText,
  BookOpen,
};

const textColorMap: { [key: string]: string } = {
  "bg-purple-100": "text-purple-600",
  "bg-green-100": "text-green-600",
  "bg-yellow-100": "text-yellow-600",
  "bg-red-100": "text-red-600",
  "bg-blue-100": "text-blue-600",
};

export default function RecentActivities() {
  const [open, setOpen] = useState(false);

  const renderItem = (activity: (typeof activities)[number], key: string) => {
    const IconComponent = iconMap[activity.icon as keyof typeof iconMap];
    const textColor = textColorMap[activity.iconBg] || "text-gray-600";

    return (
      <div
        key={key}
        className="flex items-start gap-4 border-b border-slate-100 py-3 last:border-0"
      >
        <div className={`${activity.iconBg} p-2.5 rounded-lg flex-shrink-0`}>
          {IconComponent && (
            <IconComponent className={`${textColor} w-4 h-4`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900">
            {activity.description}
          </p>
          <p className="text-xs text-slate-500 mt-1">{activity.timeAgo}</p>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <div className="p-6">
        <SectionHeader
          title="Recent Activities"
          action={
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-purple-600 transition hover:bg-purple-50 hover:text-purple-700"
            >
              View All
            </button>
          }
        />

        <div className="space-y-4">
          {activities.map((activity) => renderItem(activity, activity.id))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="All Recent Activities"
      >
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {allActivities.map((activity) => renderItem(activity, activity.id))}
        </div>
      </Modal>
    </Card>
  );
}
