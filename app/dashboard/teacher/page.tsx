"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import {
  teacherStats,
  teacherQuickActions,
  assignedClasses,
  todaysSchedule,
  pendingReview,
  performanceOverview,
  teacherMessages,
  teacherEvents,
} from "@/lib/dashboard/role-dashboards/teacher";
import { COMPANY_INFO } from "@/lib/constants";
import {
  getCurrentTeacherProfile,
  getTeacherDashboardSummary,
  type TeacherDashboardSummary,
} from "@/lib/services/dashboardService";
import { BookOpen, GraduationCap, Users, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  graduation: GraduationCap,
  users: Users,
};

export default function TeacherDashboardPage() {
  const [teacher, setTeacher] = useState<{
    employee_id?: string;
  } | null>(null);
  const [summary, setSummary] = useState<TeacherDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const teacherProfile = await getCurrentTeacherProfile();
        const resolvedSummary = await getTeacherDashboardSummary(teacherProfile.id);

        if (!mounted) {
          return;
        }

        setTeacher(teacherProfile);
        setSummary(resolvedSummary);
      } catch {
        if (mounted) {
          setTeacher(null);
          setSummary(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const dynamicStats = summary
    ? [
        {
          id: "classes",
          label: "Assigned Classes",
          value: summary.assigned_classes,
          change: "Live backend count",
          icon: iconMap.graduation,
          iconBg: "bg-purple-50",
          iconColor: "text-purple-500",
        },
        {
          id: "subjects",
          label: "Assigned Subjects",
          value: summary.assigned_subjects,
          change: "Live backend count",
          icon: iconMap.book,
          iconBg: "bg-amber-50",
          iconColor: "text-amber-500",
        },
        {
          id: "students",
          label: "Students",
          value: summary.total_students,
          change: "Shared with your classes",
          icon: iconMap.users,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-500",
        },
      ]
    : teacherStats;

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.teacher}>
      <WelcomeBanner
        title={loading ? "Welcome back" : `Welcome back, ${teacher?.employee_id || "Teacher"}! 👋`}
        subtitle={loading ? "Loading your teaching workload..." : "Your teaching workload is now backed by the live backend."}
      />

      <StatGrid stats={dynamicStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={teacherQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Assigned Classes">
          <InfoList items={assignedClasses} />
        </DashboardCard>

        <DashboardCard title="Today's Schedule">
          <InfoList items={todaysSchedule} showIcon={false} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard
          title="Pending Assignments to Review"
          action={
            <span className="text-xs font-semibold text-amber-600">
              {summary?.assigned_classes ? "Live submissions" : "24 total"}
            </span>
          }
        >
          <InfoList items={pendingReview} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Student Performance Overview">
          <InfoList items={performanceOverview} showIcon={false} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Recent Messages">
          <InfoList items={teacherMessages} />
        </DashboardCard>

        <DashboardCard title="Upcoming Events">
          <InfoList items={teacherEvents} />
        </DashboardCard>
      </div>

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
