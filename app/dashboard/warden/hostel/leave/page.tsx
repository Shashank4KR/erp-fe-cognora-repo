"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getHostelLeaveRequests, getLeaveSummary } from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import { Loader2, AlertCircle, Clock, ArrowLeft } from "lucide-react";

export default function WardenHostelLeavePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const [leavesData, summaryData] = await Promise.all([
          getHostelLeaveRequests(token).catch(() => []),
          getLeaveSummary(token).catch(() => null),
        ]);

        setLeaves(leavesData);
        setSummary(summaryData);
        setError(null);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
        setError(err instanceof Error ? err.message : "Failed to load leave requests");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const leaveItems = leaves.map((l: any) => ({
    id: l.id,
    title: l.reason || "Leave Request",
    description: `${l.start_date || l.startDate || ""} - ${l.end_date || l.endDate || ""}`,
    meta: l.approval_status || l.status || "Pending",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    badge: {
      label: l.approval_status || l.status || "Pending",
      variant: (l.approval_status === "APPROVED" ? "success" : l.approval_status === "REJECTED" ? "error" : "warning") as "success" | "error" | "warning" | "info" | "default",
    },
  }));

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Hostel Leave Requests"
        subtitle="Review and manage hostel leave requests."
      />

      <QuickActions
        actions={[
          { id: "back", label: "Back to Hostel", icon: ArrowLeft, href: "/dashboard/warden/hostel" },
        ]}
      />

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-slate-600">Loading leave requests...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="border-red-200 bg-red-50 p-6 rounded-lg mb-6">
          <div className="flex items-center gap-3 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <DashboardCard
          title={`Leave Requests (${leaves.length})`}
          action={
            summary && (
              <span className="text-xs font-semibold text-slate-600">
                {summary.total_pending || 0} pending
              </span>
            )
          }
        >
          <InfoList items={leaveItems} />
        </DashboardCard>
      )}

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
