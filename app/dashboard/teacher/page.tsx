"use client";

import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getCurrentUserProfile, getCurrentTeacherProfile, getTeacherDashboardSummary, type TeacherDashboardSummary } from "@/lib/services/dashboardService";

export default function TeacherDashboardPage() {
  const [name, setName] = useState(""); const [summary, setSummary] = useState<TeacherDashboardSummary | null>(null);
  useEffect(() => { void Promise.all([getCurrentUserProfile(), getCurrentTeacherProfile()]).then(async ([user, teacher]) => { setName(user.username); setSummary(await getTeacherDashboardSummary(teacher.id)); }).catch(() => { setName(""); setSummary(null); }); }, []);
  const stats = summary ? [{ id: "classes", label: "Assigned Classes", value: summary.assigned_classes, change: "Live count", icon: GraduationCap, iconBg: "bg-violet-50", iconColor: "text-violet-600" }, { id: "subjects", label: "Assigned Subjects", value: summary.assigned_subjects, change: "Live count", icon: BookOpen, iconBg: "bg-amber-50", iconColor: "text-amber-600" }, { id: "students", label: "Students", value: summary.total_students, change: "Live count", icon: Users, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" }] : [];
  return <RoleDashboardLayout config={ROLE_CONFIGS.teacher}><WelcomeBanner title={name ? `Welcome back, ${name}!` : "Teacher dashboard"} subtitle="Your dashboard shows live teaching data." />{stats.length ? <StatGrid stats={stats} columns={3} /> : <DashboardCard title="Teaching data"><p className="text-sm text-slate-500">No teaching data is available.</p></DashboardCard>}</RoleDashboardLayout>;
}
