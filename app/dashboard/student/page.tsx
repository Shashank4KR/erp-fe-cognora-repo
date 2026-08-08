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
  studentStats,
  studentQuickActions,
  todaysTimetable,
  pendingAssignments,
  recentMarks,
  upcomingExams,
  studentNotices,
} from "@/lib/dashboard/role-dashboards/student";
import { COMPANY_INFO } from "@/lib/constants";
import {
  getCurrentStudentProfile,
  getStudentDashboardSummary,
  type StudentDashboardSummary,
} from "@/lib/services/dashboardService";
import {
  BookOpen,
  GraduationCap,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  graduation: GraduationCap,
  wallet: Wallet,
};

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<{
    first_name?: string | null;
    last_name?: string | null;
    admission_no?: string;
  } | null>(null);
  const [summary, setSummary] = useState<StudentDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const studentProfile = await getCurrentStudentProfile();
        const studentId = studentProfile.id;
        const studentSummary = await getStudentDashboardSummary(studentId);

        if (!mounted) {
          return;
        }

        setStudent(studentProfile);
        setSummary(studentSummary);
      } catch {
        if (mounted) {
          setStudent(null);
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

  const displayName = [student?.first_name, student?.last_name]
    .filter(Boolean)
    .join(" ") || student?.admission_no || "Student";

  const dynamicStats = summary
    ? [
        {
          id: "attendance",
          label: "Attendance",
          value: `${summary.attendance_percentage}%`,
          change: `${summary.present}/${summary.total_classes} present`,
          icon: iconMap.book,
          iconBg: "bg-purple-50",
          iconColor: "text-purple-500",
        },
        {
          id: "fees",
          label: "Fees Due",
          value: `₹${summary.pending_amount.toLocaleString()}`,
          change: "Outstanding balance",
          icon: iconMap.wallet,
          iconBg: "bg-amber-50",
          iconColor: "text-amber-500",
        },
        {
          id: "classes",
          label: "Classes Attended",
          value: summary.total_classes,
          change: "Live attendance count",
          icon: iconMap.graduation,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-500",
        },
      ]
    : studentStats;

  const welcomeSubtitle = summary
    ? `${summary.attendance_percentage}% attendance • ₹${summary.pending_amount.toLocaleString()} due`
    : "Here's your academic snapshot for today.";

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.student}>
      <WelcomeBanner
        title={loading ? "Welcome back" : `Welcome back, ${displayName}! 👋`}
        subtitle={loading ? "Loading your live academic data..." : welcomeSubtitle}
      />

      <StatGrid stats={dynamicStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={studentQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Today's Timetable">
          <InfoList items={todaysTimetable} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Attendance">
          <p className="text-sm text-slate-500">Attendance overview is now backed by the live backend.</p>
        </DashboardCard>

        <DashboardCard
          title="Pending Assignments"
          action={
            <span className="text-xs font-semibold text-amber-600">3 open</span>
          }
        >
          <InfoList items={pendingAssignments} showIcon={false} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Recent Marks">
          <InfoList items={recentMarks} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Upcoming Exams">
          <InfoList items={upcomingExams} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Notices">
          <InfoList items={studentNotices} />
        </DashboardCard>
      </div>

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
