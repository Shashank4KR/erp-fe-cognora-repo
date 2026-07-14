"use client";

import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import DatePicker from "@/components/shared/DatePicker";

export default function DashboardOverview() {
  const [selectedDate, setSelectedDate] = useState("May 21, 2025");

  return (
    <SectionHeader
      title="Dashboard"
      subtitle="Welcome back, John! Here's what's happening in your school today."
      action={
        <DatePicker value={selectedDate} onChange={setSelectedDate} />
      }
    />
  );
}
