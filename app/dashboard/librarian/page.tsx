"use client";

import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import {
  librarianStats,
  librarianQuickActions,
  recentIssues,
  overdueBooks,
  fineSummary,
} from "@/lib/dashboard/role-dashboards/librarian";
import { COMPANY_INFO } from "@/lib/constants";

export default function LibrarianDashboardPage() {
  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.librarian}>
      <WelcomeBanner
        title="Welcome back, Anita! 👋"
        subtitle="324 books are on loan and 38 are overdue across the library."
      />

      <StatGrid stats={librarianStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={librarianQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Recent Book Issues">
          <InfoList items={recentIssues} />
        </DashboardCard>

        <DashboardCard
          title="Overdue Books"
          action={
            <span className="text-xs font-semibold text-red-600">
              38 overdue
            </span>
          }
        >
          <InfoList items={overdueBooks} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardCard title="Library Fine Summary">
          <InfoList items={fineSummary} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Quick Stats">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-purple-50 p-4">
              <p className="text-sm font-medium text-slate-600">Total Titles</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">2,140</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-medium text-slate-600">Active Loans</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">324</p>
            </div>
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm font-medium text-slate-600">
                Returned (mo)
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">286</p>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-sm font-medium text-slate-600">Outstanding</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹1,900</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
