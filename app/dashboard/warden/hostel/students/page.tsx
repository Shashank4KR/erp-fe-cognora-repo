"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getHostelAllocations, listHostelStudents } from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import { Loader2, AlertCircle, Users } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function WardenHostelStudentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allocations, setAllocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const data = await getHostelAllocations(token).catch(() => []);
        setAllocations(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching hostel students:", err);
        setError(err instanceof Error ? err.message : "Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const studentItems = allocations.map((a: any) => ({
    id: a.id,
    title: a.student_name || `Student ${a.student_id}`,
    description: `Room ${a.room_no || a.room?.room_no || "N/A"} · Bed ${a.bed_no || a.bed?.bed_no || "N/A"}`,
    meta: a.check_in_date || "",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    badge: { label: a.status || "Active", variant: "success" as const },
  }));

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Hostel Students"
        subtitle="Students currently allocated to hostel rooms."
      />

      <div className="mb-8">
        <QuickActions
          actions={[
            { id: "back", label: "Back to Hostel", icon: ArrowLeft, href: "/dashboard/warden/hostel" },
          ]}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-slate-600">Loading students...</p>
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
          title={`Allocated Students (${allocations.length})`}
        >
          <InfoList items={studentItems} />
        </DashboardCard>
      )}

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
