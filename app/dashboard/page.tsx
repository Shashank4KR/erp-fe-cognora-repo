"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredRoleId, clearAuth } from "@/lib/auth";

export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const roleId = getStoredRoleId();

    if (!roleId) {
      clearAuth();
      router.replace("/login");
      return;
    }

    const ROLE_DASHBOARD_PATHS: Record<string, string> = {
      "00000000-0000-0000-0000-000000000001": "/dashboard/admin",
      "00000000-0000-0000-0000-000000000002": "/dashboard/teacher",
      "00000000-0000-0000-0000-000000000003": "/dashboard/parent",
      "00000000-0000-0000-0000-000000000004": "/dashboard/student",
      "00000000-0000-0000-0000-000000000005": "/dashboard/accountant",
      "00000000-0000-0000-0000-000000000006": "/dashboard/librarian",
    };

    const target = ROLE_DASHBOARD_PATHS[roleId] ?? "/dashboard/admin";
    router.replace(target);
  }, [router]);

  return null;
}
