"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getToken, getStoredUser } from "@/lib/auth";
import Card from "@/components/shared/Card";
import { Loader2, AlertCircle, CalendarDays } from "lucide-react";

interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  meta: string;
  iconBg: string;
  iconColor: string;
}

export default function TeacherSchedulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = getToken();
        const user = getStoredUser();

        if (!token || !user) {
          router.replace("/login");
          return;
        }

        const mockSchedule: ScheduleItem[] = [
          { id: "1", title: "Class 10-A", description: "Algebra · Room 201", meta: "08:30 - 09:15", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
          { id: "2", title: "Class 10-B", description: "Geometry · Room 202", meta: "09:20 - 10:05", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
          { id: "3", title: "Free Period", description: "Staff room", meta: "10:20 - 11:05", iconBg: "bg-slate-100", iconColor: "text-slate-500" },
          { id: "4", title: "Class 11-Sci", description: "Calculus · Room 301", meta: "11:10 - 11:55", iconBg: "bg-amber-50", iconColor: "text-amber-500" },
          { id: "5", title: "Class 12-Sci", description: "Calculus · Room 302", meta: "12:30 - 01:15", iconBg: "bg-pink-50", iconColor: "text-pink-500" },
        ];

        setSchedule(mockSchedule);
        setError(null);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError(err instanceof Error ? err.message : "Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [router]);

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.teacher}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarDays className="h-8 w-8 text-purple-600" />
            Schedule
          </h1>
          <p className="text-slate-600 mt-1">View your daily teaching schedule</p>
        </div>

        {loading && (
          <Card className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-slate-600">Loading schedule...</p>
            </div>
          </Card>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </Card>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition p-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays className="h-4 w-4" />
                    <span className="font-semibold">{item.meta}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
}
