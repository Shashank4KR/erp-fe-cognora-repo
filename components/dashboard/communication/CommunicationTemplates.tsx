"use client";

import { Bell, Plane, CalendarDays, Star, Pencil } from "lucide-react";
import Card from "@/components/shared/Card";
import type { Template } from "@/lib/fixtures/communications-announcements-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  bell: <Bell className="h-5 w-5" />,
  holiday: <Plane className="h-5 w-5" />,
  schedule: <CalendarDays className="h-5 w-5" />,
  event: <Star className="h-5 w-5" />,
};

const colorMap: Record<string, string> = {
  bell: "text-[#7c3aed]",
  holiday: "text-blue-500",
  schedule: "text-emerald-500",
  event: "text-pink-500",
};

interface CommunicationTemplatesProps {
  templates: Template[];
  onUse: (templateId: string) => void;
  onEdit?: (templateId: string) => void;
}

export default function CommunicationTemplates({ templates, onUse, onEdit }: CommunicationTemplatesProps) {
  return (
    <Card className="p-0 flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Templates</h2>
        <button
          type="button"
          className="text-sm font-medium text-[#7c3aed] hover:underline inline-flex items-center gap-1"
        >
          View All
          <span className="text-[#7c3aed]">→</span>
        </button>
      </div>
      <div className="divide-y divide-slate-200">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition"
          >
            <button
              type="button"
              onClick={() => onUse(template.id)}
              className="flex items-center gap-4 flex-1 min-w-0 text-left"
            >
              <div className={`${template.iconBg} p-2 rounded-lg flex-shrink-0`}>
                <span className={colorMap[template.icon] || "text-slate-400"}>
                  {iconMap[template.icon] || <Bell className="h-5 w-5" />}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{template.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{template.channels}</p>
              </div>
            </button>
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(template.id)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition flex-shrink-0"
                aria-label={`Edit ${template.title}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
