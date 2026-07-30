"use client";

import RoleComingSoon from "@/components/shared/layout/RoleComingSoon";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";

export default function AdminReportsPage() {
  return <RoleComingSoon config={ROLE_CONFIGS.admin} title="Reports" />;
}