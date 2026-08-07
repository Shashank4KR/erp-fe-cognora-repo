"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getMaintenanceDashboard } from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import { Loader2, AlertCircle, Wrench } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function WardenHostelMaintenancePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const result = await getMaintenanceDashboard(token).catch(() => null);
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching maintenance data:", err);
        setError(err instanceof Error ? err.message : "Failed to load maintenance data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Maintenance"
        subtitle="Track maintenance requests and work orders."
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
            <p className="text-slate-600">Loading maintenance data...</p>
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

      {!loading && !error && data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Open Requests">
            <InfoList
              items={[
                { id: "1", title: "Open", description: "Pending maintenance", meta: String(data.open_requests || 0), iconBg: "bg-red-50", iconColor: "text-red-500" },
                { id: "2", title: "In Progress", description: "Currently working", meta: String(data.in_progress_requests || 0), iconBg: "bg-amber-50", iconColor: "text-amber-500" },
                { id: "3", title: "Resolved", description: "Completed", meta: String(data.resolved_requests || 0), iconBg: "bg-green-50", iconColor: "text-green-500" },
                { id: "4", title: "Work Orders", description: "Completed", meta: String(data.completed_work_orders || 0), iconBg: "bg-blue-50", iconColor: "text-blue-500" },
              ]}
              showIcon={false}
            />
          </DashboardCard>
        </div>
      )}

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
