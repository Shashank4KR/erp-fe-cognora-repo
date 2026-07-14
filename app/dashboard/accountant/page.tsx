"use client";

import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import BarChart from "@/components/shared/charts/BarChart";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import {
  accountantStats,
  accountantQuickActions,
  recentPayments,
  invoices,
  defaulters,
  collectionChart,
  collectionSummary,
} from "@/lib/dashboard/role-dashboards/accountant";
import { COMPANY_INFO } from "@/lib/constants";

export default function AccountantDashboardPage() {
  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.accountant}>
      <WelcomeBanner
        title="Welcome back, Ramesh! 👋"
        subtitle="Fee collection is up 8% this month. 47 defaulters need follow-up."
      />

      <StatGrid stats={accountantStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={accountantQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Fees Collected vs Target"
          className="lg:col-span-2"
        >
          <div className="h-48">
            <BarChart data={collectionChart} color="#7c3aed" height={192} />
          </div>
        </DashboardCard>

        <DashboardCard title="Collection Summary">
          <InfoList items={collectionSummary} showIcon={false} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Recent Payments">
          <InfoList items={recentPayments} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Invoices">
          <InfoList items={invoices} showIcon={false} />
        </DashboardCard>

        <DashboardCard
          title="Defaulters"
          action={
            <span className="text-xs font-semibold text-red-600">
              47 total
            </span>
          }
        >
          <InfoList items={defaulters} showIcon={false} />
        </DashboardCard>
      </div>

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
