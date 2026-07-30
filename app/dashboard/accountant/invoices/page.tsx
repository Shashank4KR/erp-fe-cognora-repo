"use client";

import RoleComingSoon from "@/components/shared/layout/RoleComingSoon";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";

export default function AccountantInvoicesPage() {
  return <RoleComingSoon config={ROLE_CONFIGS.accountant} title="Invoices" />;
}