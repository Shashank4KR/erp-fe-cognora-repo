"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getMessDashboard } from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import { Loader2, AlertCircle, ArrowLeft, FileText } from "lucide-react";

export default function WardenHostelMessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messData, setMessData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const data = await getMessDashboard(token).catch(() => null);
        setMessData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching mess data:", err);
        setError(err instanceof Error ? err.message : "Failed to load mess data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Mess Management"
        subtitle="View mess collections, expenses, and attendance."
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
            <p className="text-slate-600">Loading mess data...</p>
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

      {!loading && !error && messData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Collections">
            <InfoList
              items={[
                { id: "1", title: "Total Collections", description: "All time", meta: `₹${(messData.total_collections || 0).toLocaleString()}`, iconBg: "bg-green-50", iconColor: "text-green-500" },
                { id: "2", title: "Total Expenses", description: "All time", meta: `₹${(messData.total_expenses || 0).toLocaleString()}`, iconBg: "bg-red-50", iconColor: "text-red-500" },
                { id: "3", title: "Profit / Loss", description: "Net", meta: `₹${((messData.total_collections || 0) - (messData.total_expenses || 0)).toLocaleString()}`, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
              ]}
              showIcon={false}
            />
          </DashboardCard>

          <DashboardCard title="Today's Attendance" className="lg:col-span-2">
            <InfoList
              items={[
                { id: "1", title: "Present Today", description: "Mess attendance", meta: String(messData.today_attendance || 0), iconBg: "bg-green-50", iconColor: "text-green-500" },
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
