"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getCurrentUserProfile, getDashboardStats, type DashboardStats } from "@/lib/services/dashboardService";

export default function AccountantDashboardPage() {
  const [name, setName] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  useEffect(() => { void Promise.all([getCurrentUserProfile(), getDashboardStats()]).then(([user, dashboardStats]) => { setName(user.username); setStats(dashboardStats); }).catch(() => { setName(""); setStats(null); }); }, []);
  return <RoleDashboardLayout config={ROLE_CONFIGS.accountant}>
    <WelcomeBanner title={name ? `Welcome back, ${name}!` : "Finance dashboard"} subtitle="Live collection figures are shown below." />
    <DashboardCard title="Collections"><p className="text-sm text-slate-600">{stats ? `Collected ₹${stats.total_fees_collected.toLocaleString()} · Outstanding ₹${stats.outstanding_fees.toLocaleString()}` : "Live finance data is unavailable."}</p></DashboardCard>
  </RoleDashboardLayout>;
}
