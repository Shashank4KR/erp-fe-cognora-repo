"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/shared/Card";
import DonutChart from "@/components/shared/charts/DonutChart";
const CATEGORY_CHART_SEGMENTS = [
  { label: "Electrical", value: 46, color: "#3b82f6" },
  { label: "Plumbing", value: 32, color: "#10b981" },
  { label: "Furniture", value: 20, color: "#f97316" },
  { label: "Appliance", value: 16, color: "#6366f1" },
  { label: "Others", value: 14, color: "#ef4444" },
];

const TOTAL_REQUESTS_COUNT = 128;

const PERIOD_OPTIONS = ["All Categories", "Electrical", "Plumbing", "Furniture", "Appliance", "Others"];

export default function RequestsByCategoryChart() {
  const [period, setPeriod] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);

  const total = CATEGORY_CHART_SEGMENTS.reduce((sum, s) => sum + s.value, 0);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900">Requests by Category</h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            {period}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 min-w-max overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              {PERIOD_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setPeriod(option);
                    setIsOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-purple-50 ${
                    option === period ? "font-semibold text-purple-700" : "text-slate-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <DonutChart value={TOTAL_REQUESTS_COUNT} label="Total" segments={CATEGORY_CHART_SEGMENTS} size={140} />
        </div>
        <div className="flex-1 w-full space-y-2.5">
          {CATEGORY_CHART_SEGMENTS.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: segment.color }} />
                <span className="text-sm text-slate-600">{segment.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">{segment.value}</span>
                <span className="text-xs text-slate-400 w-10 text-right">
                  {((segment.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
