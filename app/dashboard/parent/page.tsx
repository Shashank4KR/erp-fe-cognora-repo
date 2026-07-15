"use client";

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
  childAttendanceBreakdown,
} from "@/lib/dashboard/role-dashboards/parent";
import { COMPANY_INFO } from "@/lib/constants";

export default function ParentDashboardPage() {
  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.parent}>
      <WelcomeBanner
        title="Welcome back, Suresh! 👋"
        subtitle="Here's how Aarav is doing at school."
      />

      <StatGrid stats={parentStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={parentQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Child Profile">
          <InfoList items={childProfile} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Attendance">
          <p className="text-sm text-slate-500">Attendance overview is not available yet.</p>
        </DashboardCard>

        <DashboardCard title="Child Marks">
          <InfoList items={childMarks} showIcon={false} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard
          title="Fee Due Status"
          action={
            <span className="text-xs font-semibold text-pink-600">
              ₹12,000 due
            </span>
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
