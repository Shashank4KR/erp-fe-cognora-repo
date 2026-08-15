"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getCurrentParentStudents, getCurrentUserProfile } from "@/lib/services/dashboardService";

export default function ParentDashboardPage() {
  const [name, setName] = useState(""); const [children, setChildren] = useState<Array<{ first_name?: string | null; last_name?: string | null; admission_no?: string }>>([]);
  useEffect(() => { void Promise.all([getCurrentUserProfile(), getCurrentParentStudents()]).then(([user, students]) => { setName(user.username); setChildren(students); }).catch(() => { setName(""); setChildren([]); }); }, []);
  return <RoleDashboardLayout config={ROLE_CONFIGS.parent}><WelcomeBanner title={name ? `Welcome back, ${name}!` : "Parent dashboard"} subtitle="Your linked student information is shown below." />{children.length ? <StatGrid stats={[{ id: "children", label: "Linked Students", value: children.length, change: "Live parent mapping", icon: Users, iconBg: "bg-violet-50", iconColor: "text-violet-600" }]} columns={2} /> : <DashboardCard title="Linked students"><p className="text-sm text-slate-500">No linked student data is available.</p></DashboardCard>}</RoleDashboardLayout>;
}
