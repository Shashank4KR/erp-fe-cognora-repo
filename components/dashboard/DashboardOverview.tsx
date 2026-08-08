"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import DatePicker from "@/components/shared/DatePicker";
import {
  getCurrentUserProfile,
  getDashboardStats,
  type DashboardStats,
} from "@/lib/services/dashboardService";
import type { UserResponse } from "@/types/auth";

export default function DashboardOverview() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [user, setUser] = useState<UserResponse | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [profile, dashboardStats] = await Promise.all([
          getCurrentUserProfile(),
          getDashboardStats(),
        ]);

        if (!mounted) {
          return;
        }

        setUser(profile);
        setStats(dashboardStats);
      } catch {
        if (mounted) {
          setUser(null);
          setStats(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const displayName = user?.username || user?.email || "there";
  const roleLabel = user?.role?.role_name?.toLowerCase() || "admin";
  const subtitle = stats
    ? `${stats.total_students.toLocaleString()} students • ${stats.total_teachers.toLocaleString()} teachers • ${stats.total_classes.toLocaleString()} classes`
    : "Loading live school data from the backend.";

  return (
    <SectionHeader
      title={loading ? "Dashboard" : `Welcome back, ${displayName}`}
      subtitle={
        loading
          ? "Loading live school data..."
          : `Your ${roleLabel} workspace is ready. ${subtitle}`
      }
      action={<DatePicker value={selectedDate} onChange={setSelectedDate} />}
    />
  );
}
