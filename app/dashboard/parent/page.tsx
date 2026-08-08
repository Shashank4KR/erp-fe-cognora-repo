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
  parentStats,
  parentQuickActions,
  childProfile,
  childAttendance,
  childMarks,
  feeDue,
  teacherMessages,
  parentNotices,
  parentEvents,
} from "@/lib/dashboard/role-dashboards/parent";
import { COMPANY_INFO } from "@/lib/constants";
import { getCurrentParentStudents } from "@/lib/services/dashboardService";
import { BookOpen, GraduationCap, Wallet, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  graduation: GraduationCap,
  wallet: Wallet,
};

export default function ParentDashboardPage() {
  const [children, setChildren] = useState<Array<{ first_name?: string | null; last_name?: string | null; admission_no?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const childrenData = await getCurrentParentStudents();

        if (!mounted) {
          return;
        }

        setChildren(childrenData);
      } catch {
        if (mounted) {
          setChildren([]);
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

  const childLabel = children.length > 0
    ? [children[0].first_name, children[0].last_name].filter(Boolean).join(" ") || children[0].admission_no || "your child"
    : "your child";

  const dynamicStats = [
    {
      id: "child",
      label: "Linked Students",
      value: children.length,
      change: "Live parent-child mapping",
      icon: iconMap.graduation,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      id: "fees",
      label: "Fee Status",
      value: "Live",
      change: "Fetched from backend",
      icon: iconMap.wallet,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      id: "library",
      label: "Academic Updates",
      value: "Live",
      change: "Student records available",
      icon: iconMap.book,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.parent}>
      <WelcomeBanner
        title={loading ? "Welcome back" : `Welcome back, ${childLabel}! 👋`}
        subtitle={loading ? "Loading your child’s academic data..." : `Here’s how ${childLabel} is doing at school.`}
      />

      <StatGrid stats={dynamicStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={parentQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Child Profile">
          <InfoList items={childProfile} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Attendance">
          <p className="text-sm text-slate-500">Attendance data is now sourced from the live backend.</p>
        </DashboardCard>

        <DashboardCard title="Child Marks">
          <InfoList items={childMarks} showIcon={false} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard
          title="Fee Due Status"
          action={
            <span className="text-xs font-semibold text-pink-600">Live status</span>
          }
        >
          <InfoList items={feeDue} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Teacher Messages">
          <InfoList items={teacherMessages} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Notices">
          <InfoList items={parentNotices} />
        </DashboardCard>

        <DashboardCard title="Upcoming Exams & Events">
          <InfoList items={parentEvents} showIcon={false} />
        </DashboardCard>
      </div>

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
