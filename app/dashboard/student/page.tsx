"use client";

import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import AttendanceDonut from "@/components/dashboard/role-dashboards/AttendanceDonut";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import {
  studentStats,
  studentQuickActions,
  todaysTimetable,
  pendingAssignments,
  recentMarks,
  upcomingExams,
  studentNotices,
  studentAttendanceBreakdown,
} from "@/lib/dashboard/role-dashboards/student";
import { COMPANY_INFO } from "@/lib/constants";

export default function StudentDashboardPage() {
  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.student}>
      <WelcomeBanner
        title="Welcome back, Aarav! 👋"
        subtitle="Here's your academic snapshot for today."
      />

      <StatGrid stats={studentStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={studentQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Today's Timetable">
          <InfoList items={todaysTimetable} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Attendance">
          <AttendanceDonut
            percentage={94}
            breakdown={studentAttendanceBreakdown}
          />
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
