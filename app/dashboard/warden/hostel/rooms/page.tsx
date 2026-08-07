"use client";

import { useEffect, useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import WelcomeBanner from "@/components/dashboard/role-dashboards/WelcomeBanner";
import StatGrid from "@/components/dashboard/role-dashboards/StatGrid";
import QuickActions from "@/components/dashboard/role-dashboards/QuickActions";
import DashboardCard from "@/components/dashboard/role-dashboards/DashboardCard";
import InfoList from "@/components/dashboard/role-dashboards/InfoList";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getHostelRooms, getHostelBlocks, getHostelBeds } from "@/lib/services/hostelService";
import { getToken } from "@/lib/auth";
import { COMPANY_INFO } from "@/lib/constants";
import { Loader2, AlertCircle, Building2, BedDouble } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function WardenHostelRoomsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [beds, setBeds] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const [roomsData, blocksData, bedsData] = await Promise.all([
          getHostelRooms(token).catch(() => []),
          getHostelBlocks(token).catch(() => []),
          getHostelBeds(token).catch(() => []),
        ]);

        setRooms(roomsData);
        setBlocks(blocksData);
        setBeds(bedsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(err instanceof Error ? err.message : "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const blockMap = new Map(blocks.map((b: any) => [b.id, b.block_name]));

  const roomItems = rooms.map((room: any) => {
    const roomBeds = beds.filter((b: any) => b.room_id === room.id);
    const occupied = roomBeds.filter((b: any) => b.status === "OCCUPIED").length;
    return {
      id: room.id,
      title: `Room ${room.room_no || "N/A"}`,
      description: `${room.room_type || "Standard"} · Floor ${room.floor_no || "N/A"}`,
      meta: `${occupied}/${roomBeds.length} occupied`,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      badge: {
        label: blockMap.get(room.block_id) || "Unknown Block",
        variant: "info" as const,
      },
    };
  });

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.warden}>
      <WelcomeBanner
        title="Hostel Rooms"
        subtitle="Manage and view all hostel rooms."
      />

      <StatGrid
        stats={[
          {
            id: "total-rooms",
            label: "Total Rooms",
            value: String(rooms.length),
            change: `${blocks.length} blocks`,
            icon: Building2,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
          },
          {
            id: "total-beds",
            label: "Total Beds",
            value: String(beds.length),
            change: `${beds.filter((b: any) => b.status === "OCCUPIED").length} occupied`,
            icon: BedDouble,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
          },
        ]}
        columns={2}
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
            <p className="text-slate-600">Loading rooms...</p>
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
        <DashboardCard title="All Rooms">
          <InfoList items={roomItems} showIcon={false} />
        </DashboardCard>
      )}

      <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
        <span>{COMPANY_INFO.copyright}</span>
        <span>Version {COMPANY_INFO.version}</span>
      </footer>
    </RoleDashboardLayout>
  );
}
