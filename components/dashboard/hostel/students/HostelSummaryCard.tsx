"use client";

import { Users, Building2, Bed, CheckCircle, Home, PieChart } from "lucide-react";

interface HostelSummaryCardProps {}

const summaryItems = [
  { label: "Total Hostel Students", value: "286", icon: Users, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  { label: "Total Rooms", value: "48", icon: Building2, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { label: "Total Beds", value: "286", icon: Bed, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { label: "Occupied Beds", value: "265", icon: CheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { label: "Vacant Beds", value: "21", icon: Home, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  { label: "Occupancy", value: "92.53%", icon: PieChart, iconBg: "bg-pink-50", iconColor: "text-pink-500" },
];

export default function HostelSummaryCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Hostel Summary</h3>
      <div className="space-y-3">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`${item.iconBg} p-2 rounded-lg flex-shrink-0`}>
                  <Icon className={`h-4 w-4 ${item.iconColor}`} />
                </div>
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
