"use client";

import {
  Plus,
  CalendarClock,
  FileText,
  BarChart3,
  CheckCircle,
  Printer,
  MessageSquare,
  LineChart,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Plus: <Plus className="h-4 w-4" />,
  CalendarClock: <CalendarClock className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  BarChart3: <BarChart3 className="h-4 w-4" />,
  CheckCircle: <CheckCircle className="h-4 w-4" />,
  Printer: <Printer className="h-4 w-4" />,
  MessageSquare: <MessageSquare className="h-4 w-4" />,
  LineChart: <LineChart className="h-4 w-4" />,
};

interface ExaminationQuickActionsProps {
  onAction: (action: string) => void;
}

export default function ExaminationQuickActions({ onAction }: ExaminationQuickActionsProps) {
  const actions = [
    "Create Examination",
    "Schedule Exam",
    "Enter Results",
    "Generate Report",
    "Publish Results",
    "Print Admit Cards",
    "Send Notifications",
    "View Analytics",
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action}
            onClick={() => onAction(action)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] hover:border-[#7c3aed] transition"
          >
            {iconMap[action]}
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
