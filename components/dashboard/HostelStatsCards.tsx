"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { getHostelDashboardStats, getHostelFeeSummary, getComplaintSummary, getLeaveSummary } from "@/lib/services/hostelService";
import Card from "@/components/shared/Card";
import { BedDouble, Users, Home, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

interface HostelStatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  backgroundColor: string;
  iconColor: string;
}

export default function HostelStatsCards() {
  const [stats, setStats] = useState<HostelStatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const [statsData, feeData, compData, leaveData] = await Promise.all([
          getHostelDashboardStats(token).catch(() => null),
          getHostelFeeSummary(token).catch(() => null),
          getComplaintSummary(token).catch(() => null),
          getLeaveSummary(token).catch(() => null),
        ]);

        const cards: HostelStatCard[] = [
          {
            title: "Total Hostels",
            value: String(statsData?.total_blocks || 0),
            change: "Active blocks",
            icon: <BedDouble className="w-5 h-5" />,
            backgroundColor: "bg-blue-50",
            iconColor: "text-blue-500",
          },
          {
            title: "Total Rooms",
            value: String(statsData?.total_rooms || 0),
            change: "Across all blocks",
            icon: <Home className="w-5 h-5" />,
            backgroundColor: "bg-emerald-50",
            iconColor: "text-emerald-500",
          },
          {
            title: "Occupied Beds",
            value: String(statsData?.occupied_beds || 0),
            change: `${statsData?.occupancy_percentage || 0}% occupancy`,
            icon: <Users className="w-5 h-5" />,
            backgroundColor: "bg-purple-50",
            iconColor: "text-purple-500",
          },
          {
            title: "Available Beds",
            value: String(statsData?.available_beds || 0),
            change: "Vacant beds",
            icon: <CheckCircle2 className="w-5 h-5" />,
            backgroundColor: "bg-green-50",
            iconColor: "text-green-500",
          },
          {
            title: "Hostel Fees",
            value: `₹${(feeData?.total_invoiced || 0).toLocaleString()}`,
            change: `Collected: ₹${(feeData?.total_collected || 0).toLocaleString()}`,
            icon: <Clock className="w-5 h-5" />,
            backgroundColor: "bg-amber-50",
            iconColor: "text-amber-500",
          },
          {
            title: "Open Complaints",
            value: String(compData?.total_open || 0),
            change: `${compData?.total_in_progress || 0} in progress`,
            icon: <AlertTriangle className="w-5 h-5" />,
            backgroundColor: "bg-red-50",
            iconColor: "text-red-500",
          },
          {
            title: "Pending Leave",
            value: String(leaveData?.total_pending || 0),
            change: `${leaveData?.total_approved || 0} approved`,
            icon: <Clock className="w-5 h-5" />,
            backgroundColor: "bg-orange-50",
            iconColor: "text-orange-500",
          },
        ];

        setStats(cards);
      } catch (err) {
        console.error("Error fetching hostel stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="h-4 bg-slate-200 rounded animate-pulse mb-2" />
            <div className="h-8 bg-slate-200 rounded animate-pulse" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((card) => (
        <Card key={card.title} hover>
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">
                {card.title}
              </span>
              <div className={`${card.backgroundColor} p-2 rounded-lg`}>
                {card.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {card.value}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">{card.change}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}