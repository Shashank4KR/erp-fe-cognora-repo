"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { feesData } from "@/lib/dashboard/dashboard-data";
import { TIMEFRAME_OPTIONS } from "@/lib/constants";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import BarChart from "@/components/shared/charts/BarChart";
import Dropdown from "@/components/shared/Dropdown";
import Badge from "@/components/shared/Badge";

export default function FeesCollectionOverview() {
  const [timeframe, setTimeframe] = useState("This Month");

  const chartData = feesData.map((d) => ({
    label: d.week,
    value: d.amount,
  }));

  return (
    <Card>
      <div className="p-6">
        <SectionHeader
          title="Fees Collection Overview"
          action={
            <Dropdown
              value={timeframe}
              options={TIMEFRAME_OPTIONS}
              onChange={setTimeframe}
              className="text-sm"
            />
          }
        />

        <div className="mb-4">
          <p className="text-slate-600 text-sm mb-1">Total Collection</p>
          <p className="text-3xl font-bold text-slate-900">₹18,50,000</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="success" icon={<TrendingUp className="w-3 h-3" />}>
              +12%
            </Badge>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-44">
          <BarChart data={chartData} color="#7c3aed" height={176} />
        </div>
      </div>
    </Card>
  );
}
