"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getHostelComplaints, getComplaintSummary } from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import { Loader2, AlertCircle, AlertTriangle, ArrowLeft } from "lucide-react";

export default function WardenHostelComplaintsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
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

        const [complaintsData, summaryData] = await Promise.all([
          getHostelComplaints(token).catch(() => []),
          getComplaintSummary(token).catch(() => null),
        ]);

        setComplaints(complaintsData);
        setSummary(summaryData);
        setError(null);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError(err instanceof Error ? err.message : "Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const complaintItems = complaints.map((c: any) => ({
    id: c.id,
    title: c.category || "Complaint",
    description: c.description || "",
    meta: c.resolution_status || "Open",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    badge: {
      label: c.resolution_status || "Open",
      variant: (c.resolution_status === "OPEN" ? "error" : c.resolution_status === "RESOLVED" ? "success" : "warning") as "error" | "success" | "warning" | "info" | "default",
    },
  }));

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Hostel Complaints"
        subtitle="Review and resolve student complaints."
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
            <p className="text-slate-600">Loading complaints...</p>
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
          title={`Complaints (${complaints.length})`}
          action={
            summary && (
              <span className="text-xs font-semibold text-slate-600">
                {summary.total_open || 0} open · {summary.total_resolved || 0} resolved
              </span>
            )
          }
        >
          <InfoList items={complaintItems} />
        </DashboardCard>
      )}

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
