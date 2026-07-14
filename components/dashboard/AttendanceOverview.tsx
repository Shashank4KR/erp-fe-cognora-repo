"use client";

import { useState } from "react";
import { attendanceData } from "@/lib/dashboard/dashboard-data";
import { TIMEFRAME_OPTIONS } from "@/lib/constants";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import LineChart from "@/components/shared/charts/LineChart";
import DonutChart from "@/components/shared/charts/DonutChart";
import Dropdown from "@/components/shared/Dropdown";

export default function AttendanceOverview() {
  const [timeframe, setTimeframe] = useState("This Week");

  const lineData = attendanceData.map((d) => ({
    label: d.day,
    value: d.percentage,
  }));

  return (
    <Card>
      <div className="p-6">
        <SectionHeader
          title="Attendance Overview"
          action={
            <Dropdown
              value={timeframe}
              options={TIMEFRAME_OPTIONS}
              onChange={setTimeframe}
              className="text-sm"
            />
          }
        />

        <div className="flex gap-8">
          {/* Line Chart */}
          <div className="flex-1">
            <LineChart data={lineData} color="#7c3aed" />
          </div>

          {/* Donut Chart */}
          <div className="flex flex-col items-center justify-center">
            <DonutChart
              segments={[
                { label: "Present", value: 92, color: "#10b981" },
                { label: "Absent", value: 6, color: "#ef4444" },
                { label: "Leave", value: 2, color: "#f59e0b" },
              ]}
              size={120}
            />

            {/* Legend */}
            <div className="space-y-2 text-sm mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-600">Present</span>
                <span className="text-slate-900 font-medium">92%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-slate-600">Absent</span>
                <span className="text-slate-900 font-medium">6%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-slate-600">Leave</span>
                <span className="text-slate-900 font-medium">2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
