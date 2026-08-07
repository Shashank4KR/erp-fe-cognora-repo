"use client";

import { useState, useEffect } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import {
  getHostelDashboardStats,
  getHostelComplaints,
  getHostelLeaveRequests,
  getHostelVisitors,
  getHostelNotices,
  getHostelFeeSummary,
} from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import {
  BedDouble,
  AlertTriangle,
  Clock,
  UserPlus,
  ClipboardList,
  ScrollText,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function WardenDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [feeSummary, setFeeSummary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const [statsData, compData, leaveData, visitorData, noticeData, feeData] = await Promise.all([
          getHostelDashboardStats(token).catch(() => null),
          getHostelComplaints(token).catch(() => []),
          getHostelLeaveRequests(token).catch(() => []),
          getHostelVisitors(token).catch(() => []),
          getHostelNotices(token).catch(() => []),
          getHostelFeeSummary(token).catch(() => null),
        ]);

        setStats(statsData);
        setComplaints(compData);
        setLeaveRequests(leaveData);
        setVisitors(visitorData);
        setNotices(noticeData);
        setFeeSummary(feeData);
        setError(null);
      } catch (err) {
        console.error("Error fetching warden dashboard data:", err);
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const wardensStats = stats
    ? [
        {
          id: "occupancy",
          label: "Occupancy",
          value: `${stats.occupancy_percentage || 0}%`,
          change: `${stats.occupied_beds || 0} of ${stats.total_beds || 0} beds occupied`,
          icon: BedDouble,
          iconBg: "bg-blue-50",
          iconColor: "text-blue-500",
          progress: stats.occupancy_percentage || 0,
        },
        {
          id: "rooms",
          label: "Total Rooms",
          value: String(stats.total_rooms || 0),
          change: `${stats.total_blocks || 0} blocks`,
          icon: BedDouble,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-500",
        },
        {
          id: "complaints",
          label: "Open Complaints",
          value: String(complaints.filter((c: any) => c.resolution_status === "OPEN").length),
          change: `${complaints.filter((c: any) => c.resolution_status === "IN_PROGRESS").length} in progress`,
          icon: AlertTriangle,
          iconBg: "bg-red-50",
          iconColor: "text-red-500",
        },
        {
          id: "leave",
          label: "Pending Leave",
          value: String(leaveRequests.filter((lr: any) => lr.status === "PENDING").length),
          change: `${leaveRequests.filter((lr: any) => lr.status === "APPROVED").length} approved`,
          icon: Clock,
          iconBg: "bg-amber-50",
          iconColor: "text-amber-500",
        },
      ]
    : [
        { id: "occupancy", label: "Occupancy", value: "Loading...", change: "", icon: BedDouble, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
        { id: "rooms", label: "Total Rooms", value: "Loading...", change: "", icon: BedDouble, iconBg: "bg-emerald-50", iconColor: "text-emerald-50" },
        { id: "complaints", label: "Open Complaints", value: "Loading...", change: "", icon: AlertTriangle, iconBg: "bg-red-50", iconColor: "text-red-500" },
        { id: "leave", label: "Pending Leave", value: "Loading...", change: "", icon: Clock, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
      ];

  const wardensQuickActions = [
    { id: "allocate", label: "Allocate Student", icon: UserPlus, href: "/dashboard/warden/hostel" },
    { id: "complaints", label: "View Complaints", icon: ClipboardList, href: "/dashboard/warden/hostel/complaints" },
    { id: "leave", label: "Review Leave", icon: ScrollText, href: "/dashboard/warden/hostel/leave" },
    { id: "mess", label: "Mess Menu", icon: FileText, href: "/dashboard/warden/hostel/mess" },
  ];

  const todaysOccupancy = stats
    ? [
        { id: "1", title: "Total Beds", description: `${stats.total_beds || 0} beds`, meta: `${stats.occupancy_percentage || 0}% occupied`, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
        { id: "2", title: "Occupied", description: `${stats.occupied_beds || 0} beds`, meta: "Currently occupied", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
        { id: "3", title: "Available", description: `${stats.available_beds || 0} beds`, meta: "Vacant beds", iconBg: "bg-green-50", iconColor: "text-green-500" },
      ]
    : [
        { id: "1", title: "Total Beds", description: "Loading...", meta: "", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
        { id: "2", title: "Occupied", description: "Loading...", meta: "", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
        { id: "3", title: "Available", description: "Loading...", meta: "", iconBg: "bg-green-50", iconColor: "text-green-500" },
      ];

  const pendingComplaints = complaints
    .filter((c: any) => c.resolution_status === "OPEN" || c.resolution_status === "IN_PROGRESS")
    .slice(0, 3)
    .map((c: any) => ({
      id: c.id,
      title: c.category || "Complaint",
      description: c.description || "",
      meta: c.resolution_status || "Open",
      badge: {
        label: c.resolution_status || "Open",
        variant: (c.resolution_status === "OPEN" ? "error" : "warning") as "error" | "warning" | "success" | "info" | "default",
      },
    }));

  const pendingLeaveRequests = leaveRequests
    .filter((lr: any) => lr.status === "PENDING")
    .slice(0, 3)
    .map((lr: any) => ({
      id: lr.id,
      title: lr.reason || "Leave Request",
      description: `${lr.start_date || lr.startDate} - ${lr.end_date || lr.endDate}`,
      meta: "Pending",
      badge: { label: "Pending", variant: "warning" as "error" | "warning" | "success" | "info" | "default" },
    }));

  const recentVisitors = visitors
    .slice(0, 3)
    .map((v: any) => ({
      id: v.id,
      title: v.visitor_name || "Visitor",
      description: `Visiting student · ${v.phone || ""}`,
      meta: v.check_in_time ? new Date(v.check_in_time).toLocaleString() : "",
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    }));

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Welcome back, Warden 👋"
        subtitle="Here's your hostel overview for today."
      />

      <StatGrid stats={wardensStats} columns={4} />

      <div className="mb-8">
        <QuickActions actions={wardensQuickActions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Today's Occupancy">
          <InfoList items={todaysOccupancy} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Pending Complaints">
          <InfoList items={pendingComplaints} showIcon={false} />
        </DashboardCard>

        <DashboardCard title="Leave Requests">
          <InfoList items={pendingLeaveRequests} showIcon={false} />
        </DashboardCard>
      </div>

      <div className="mb-8">
        <DashboardCard title="Recent Visitors">
          <InfoList items={recentVisitors} showIcon={false} />
        </DashboardCard>
      </div>

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
