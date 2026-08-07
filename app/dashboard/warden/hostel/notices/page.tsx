"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getHostelNotices, listPublishedHostelNotices } from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import { Loader2, AlertCircle, Megaphone } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function WardenHostelNoticesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const data = await getHostelNotices(token).catch(() => []);
        setNotices(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError(err instanceof Error ? err.message : "Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const noticeItems = notices.map((n: any) => ({
    id: n.id,
    title: n.title,
    description: n.description || "",
    meta: n.publish_date || n.created_at || "",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    badge: {
      label: n.status || "Draft",
      variant: (n.status === "PUBLISHED" ? "success" : "warning") as "success" | "warning" | "error" | "info" | "default",
    },
  }));

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Hostel Notices"
        subtitle="Manage and publish hostel notices."
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
            <p className="text-slate-600">Loading notices...</p>
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
        <DashboardCard title={`Notices (${notices.length})`}>
          <InfoList items={noticeItems} />
        </DashboardCard>
      )}

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
