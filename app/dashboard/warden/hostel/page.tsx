"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import {
  getHostelDashboardStats,
  getHostelFeeSummary,
  getComplaintSummary,
  getLeaveSummary,
  getHostelBlocks,
  getHostelRooms,
  getHostelBeds,
  getHostelAllocations,
} from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import {
  BedDouble,
  AlertTriangle,
  Clock,
  Users,
  Building2,
  Loader2,
  AlertCircle,
  FileText,
  Megaphone,
} from "lucide-react";

interface StatsData {
  total_blocks: number;
  total_rooms: number;
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  active_allocations: number;
  occupancy_percentage: number;
}

export default function WardenHostelPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [beds, setBeds] = useState<any[]>([]);
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

        const [statsData, blocksData, roomsData, bedsData, allocData] =
          await Promise.all([
            getHostelDashboardStats(token).catch(() => null),
            getHostelBlocks(token).catch(() => []),
            getHostelRooms(token).catch(() => []),
            getHostelBeds(token).catch(() => []),
            getHostelAllocations(token).catch(() => []),
          ]);

        setStats(statsData);
        setBlocks(blocksData);
        setRooms(roomsData);
        setBeds(bedsData);
        setAllocations(allocData);
        setError(null);
      } catch (err) {
        console.error("Error fetching warden hostel data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load hostel data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hostelStats = stats
    ? [
        {
          id: "blocks",
          label: "Blocks",
          value: String(stats.total_blocks || 0),
          change: `${stats.total_rooms || 0} rooms`,
          icon: Building2,
          iconBg: "bg-blue-50",
          iconColor: "text-blue-500",
        },
        {
          id: "beds",
          label: "Beds",
          value: String(stats.total_beds || 0),
          change: `${stats.occupied_beds || 0} occupied`,
          icon: BedDouble,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-500",
        },
        {
          id: "allocations",
          label: "Allocations",
          value: String(stats.active_allocations || 0),
          change: `${stats.available_beds || 0} available`,
          icon: Users,
          iconBg: "bg-purple-50",
          iconColor: "text-purple-500",
        },
        {
          id: "occupancy",
          label: "Occupancy",
          value: `${stats.occupancy_percentage || 0}%`,
          change: `${stats.occupied_beds || 0} of ${stats.total_beds || 0} beds`,
          icon: BedDouble,
          iconBg: "bg-amber-50",
          iconColor: "text-amber-500",
          progress: stats.occupancy_percentage || 0,
        },
      ]
    : [];

  const quickActions = [
    { id: "rooms", label: "Manage Rooms", icon: Building2, href: "/dashboard/warden/hostel/rooms" },
    { id: "students", label: "Students", icon: Users, href: "/dashboard/warden/hostel/students" },
    { id: "complaints", label: "Complaints", icon: AlertTriangle, href: "/dashboard/warden/hostel/complaints" },
    { id: "leave", label: "Leave Requests", icon: Clock, href: "/dashboard/warden/hostel/leave" },
    { id: "mess", label: "Mess Menu", icon: FileText, href: "/dashboard/warden/hostel/mess" },
    { id: "maintenance", label: "Maintenance", icon: AlertTriangle, href: "/dashboard/warden/hostel/maintenance" },
    { id: "notices", label: "Notices", icon: Megaphone, href: "/dashboard/warden/hostel/notices" },
  ];

  const recentAllocations = allocations.slice(0, 5).map((a: any) => ({
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
        title="Hostel Management"
        subtitle="Overview of hostel blocks, rooms, and allocations."
      />

      <StatGrid stats={hostelStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={quickActions} />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-slate-600">Loading hostel data...</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DashboardCard title="Recent Allocations">
            <InfoList items={recentAllocations} />
          </DashboardCard>

          <DashboardCard title="Blocks">
            <InfoList
              items={blocks.slice(0, 5).map((b: any) => ({
                id: b.id,
                title: b.block_name,
                description: b.block_type || "",
                meta: `${b.rooms?.length || 0} rooms`,
                iconBg: "bg-blue-50",
                iconColor: "text-blue-500",
              }))}
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
