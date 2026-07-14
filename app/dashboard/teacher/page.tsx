"use client";

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

export default function TeacherDashboardPage() {
  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.teacher}>
      <WelcomeBanner
        title="Welcome back, Priya! 👋"
        subtitle="You have 6 periods and 24 assignments to review today."
      />

      <StatGrid stats={teacherStats} columns={4} />

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
              24 total
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
