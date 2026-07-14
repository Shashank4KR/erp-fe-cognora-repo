"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import { CalendarClock } from "lucide-react";
import { getStoredUser } from "@/lib/auth";

export default function TimetablePage() {
  const [authUser, setAuthUser] = useState<{ name: string; role: string }>({
    name: "",
    role: "",
  });

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setAuthUser({
        name: user.username || user.email || "User",
        role: user.role?.role_name ?? "User",
      });
    }
  }, []);

  return (
    <MainLayout
      sidebar={<Sidebar />}
      header={
        <DashboardHeader userName={authUser.name} userRole={authUser.role} />
      }
    >
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-[1500px] space-y-6">
          <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span>Dashboard</span>
            <span className="text-slate-300">/</span>
            <span>Academics</span>
            <span className="text-slate-300">/</span>
            <span className="text-purple-600">Timetable</span>
          </nav>

          <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <CalendarClock className="h-7 w-7" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Timetable
              </h1>
              <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                Coming Soon
              </span>
              <p className="max-w-md text-sm text-slate-500">
                The Timetable module is being rebuilt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
