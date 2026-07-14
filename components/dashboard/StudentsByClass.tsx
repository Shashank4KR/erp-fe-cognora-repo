"use client";

import { useState } from "react";
import { studentsByClass } from "@/lib/dashboard/dashboard-data";
import { SESSION_OPTIONS } from "@/lib/constants";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import DonutChart from "@/components/shared/charts/DonutChart";
import Dropdown from "@/components/shared/Dropdown";

export default function StudentsByClass() {
  const [timeframe, setTimeframe] = useState("This Session");
  const total = studentsByClass.reduce((sum, cls) => sum + cls.count, 0);

  const chartSegments = studentsByClass.map((cls) => ({
    label: cls.name,
    value: (cls.count / total) * 100,
    color: cls.color,
  }));

  return (
    <Card>
      <div className="p-6">
        <SectionHeader
          title="Students by Class"
          action={
            <Dropdown
              value={timeframe}
              options={SESSION_OPTIONS}
              onChange={setTimeframe}
              className="text-sm"
            />
          }
        />

        <div className="flex flex-col items-center justify-center">
          {/* Donut Chart */}
          <DonutChart
            segments={chartSegments}
            size={140}
            value={total}
            label="Total Students"
          />

          {/* Legend */}
          <div className="w-full grid grid-cols-2 gap-3 mt-6">
            {studentsByClass.map((cls) => (
              <div key={cls.id} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${cls.color}`}></div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-700">{cls.name}</p>
                  <p className="text-xs text-slate-500">
                    {cls.count} ({Math.round((cls.count / total) * 100)}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
