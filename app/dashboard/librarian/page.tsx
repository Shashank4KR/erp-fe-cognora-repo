"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getCurrentUserProfile } from "@/lib/services/dashboardService";

export default function LibrarianDashboardPage() {
  const [name, setName] = useState("");
  useEffect(() => { void getCurrentUserProfile().then((user) => setName(user.username)).catch(() => setName("")); }, []);
  return <RoleDashboardLayout config={ROLE_CONFIGS.librarian}>
    <WelcomeBanner title={name ? `Welcome back, ${name}!` : "Library dashboard"} subtitle="Library activity will appear here when live data is available." />
    <DashboardCard title="Library activity"><p className="text-sm text-slate-500">No live library summary endpoint is configured yet.</p></DashboardCard>
  </RoleDashboardLayout>;
}
