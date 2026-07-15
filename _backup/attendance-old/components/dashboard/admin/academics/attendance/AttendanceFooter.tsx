"use client";

import { type ReactNode } from "react";
import { CheckSquare, Upload, FileText, UserCheck, Calendar, BarChart3, Settings, Download } from "lucide-react";
import Card from "@/components/shared/Card";
import LineChart from "@/components/shared/charts/LineChart";
import BarChart from "@/components/shared/charts/BarChart";

interface AttendanceFooterProps {
  trendData?: { label: string; value: number }[];
  classPerformance?: { label: string; value: number }[];
  topClasses?: { name: string; attendance: string }[];
  onQuickAction?: (action: string) => void;
  settingsDisabled?: boolean;
}

const quickActions = [
  { label: "Mark Attendance", icon: CheckSquare, bg: "bg-purple-100", color: "text-[#6d28d9]" },
  { label: "Bulk Attendance", icon: Upload, bg: "bg-blue-100", color: "text-blue-600" },
  { label: "Attendance Report", icon: FileText, bg: "bg-green-100", color: "text-green-600" },
  { label: "Student Attendance", icon: UserCheck, bg: "bg-orange-100", color: "text-orange-600" },
  { label: "Daily Summary", icon: Calendar, bg: "bg-indigo-100", color: "text-indigo-600" },
  { label: "Monthly Report", icon: BarChart3, bg: "bg-pink-100", color: "text-pink-600" },
  { label: "Attendance Settings", icon: Settings, bg: "bg-teal-100", color: "text-teal-600" },
  { label: "Export Data", icon: Download, bg: "bg-slate-100", color: "text-slate-600" },
];

export default function AttendanceFooter({
  trendData,
  classPerformance,
  topClasses,
  onQuickAction,
  settingsDisabled = true,
}: AttendanceFooterProps) {
  const hasAnalytics = (trendData && trendData.length > 0) || (classPerformance && classPerformance.length > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Attendance Overview */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Attendance Overview</h3>
          {trendData && trendData.length > 0 ? (
            <LineChart data={trendData} color="#6d28d9" height={180} />
          ) : (
            <p className="text-sm text-slate-400 py-10 text-center">
              No Attendance analytics are available yet.
            </p>
          )}
        </div>
      </Card>

      {/* Attendance Trend */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Attendance Trend</h3>
          {classPerformance && classPerformance.length > 0 ? (
            <BarChart data={classPerformance} color="#6d28d9" height={180} unit="percent" />
          ) : (
            <p className="text-sm text-slate-400 py-10 text-center">
              No Attendance analytics are available yet.
            </p>
          )}
        </div>
      </Card>

      {/* Top Performing Classes */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Classes</h3>
          {topClasses && topClasses.length > 0 ? (
            <div className="space-y-3">
              {topClasses.map((cls) => (
                <div key={cls.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{cls.name}</span>
                  <span className="text-sm font-semibold text-green-600">{cls.attendance}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 py-6 text-center">
              No Attendance analytics are available yet.
            </p>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              const disabled = action.label === "Attendance Settings" && settingsDisabled;
              return (
                <button
                  key={action.label}
                  type="button"
                  disabled={disabled}
                  title={disabled ? "Attendance Settings backend integration is pending." : action.label}
                  onClick={() => !disabled && onQuickAction?.(action.label)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition hover:shadow-md ${action.bg} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <IconComponent className={`h-6 w-6 ${action.color}`} />
                  <span className="text-xs font-medium text-slate-700 text-center leading-tight">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
