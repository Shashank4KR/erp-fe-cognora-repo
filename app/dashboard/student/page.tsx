"use client";

import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, Wallet } from "lucide-react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getCurrentStudentProfile, getStudentDashboardSummary, type StudentDashboardSummary } from "@/lib/services/dashboardService";

export default function StudentDashboardPage() {
  const [summary, setSummary] = useState<StudentDashboardSummary | null>(null);
  useEffect(() => { void getCurrentStudentProfile().then((student) => getStudentDashboardSummary(student.id)).then(setSummary).catch(() => setSummary(null)); }, []);
  const stats = summary ? [{ id: "attendance", label: "Attendance", value: `${summary.attendance_percentage}%`, change: `${summary.present}/${summary.total_classes} present`, icon: BookOpen, iconBg: "bg-violet-50", iconColor: "text-violet-600" }, { id: "fees", label: "Fees Due", value: `₹${summary.pending_amount.toLocaleString()}`, change: "Live balance", icon: Wallet, iconBg: "bg-amber-50", iconColor: "text-amber-600" }, { id: "classes", label: "Classes", value: summary.total_classes, change: "Live count", icon: GraduationCap, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" }] : [];
  return <RoleDashboardLayout config={ROLE_CONFIGS.student}><WelcomeBanner title={summary ? `Welcome back, ${summary.student_name}!` : "Student dashboard"} subtitle="Your dashboard shows live academic data." />{stats.length ? <StatGrid stats={stats} columns={3} /> : <DashboardCard title="Academic data"><p className="text-sm text-slate-500">No academic data is available.</p></DashboardCard>}</RoleDashboardLayout>;
}
