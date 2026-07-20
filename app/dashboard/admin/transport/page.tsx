"use client";

import { useState } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import TransportOverviewPageHeader from "@/components/dashboard/transport/TransportOverviewPageHeader";
import TransportOverviewSummaryCards from "@/components/dashboard/transport/TransportOverviewSummaryCards";
import TransportGuidelinesCard from "@/components/dashboard/transport/TransportGuidelinesCard";
import TransportSummaryChart from "@/components/dashboard/transport/TransportSummaryChart";
import TransportActivityCard from "@/components/dashboard/transport/TransportActivityCard";
import TransportQuickNavigation from "@/components/dashboard/transport/TransportQuickNavigation";
import TransportOverviewDialogs from "@/components/dashboard/transport/TransportOverviewDialogs";
import {
  OVERVIEW_SUMMARY_CARDS,
  TRANSPORT_DONUT_SEGMENTS,
  TRANSPORT_TOTAL_STUDENTS,
  ACTIVITY_ROWS,
  QUICK_NAVIGATION_ITEMS,
  TRANSPORT_GUIDELINES,
} from "@/lib/fixtures/transport-overview-reference-fixture";

export default function TransportOverviewPage() {
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const showToast = (message: string) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleExport = () => {
    setMoreOpen(false);
    showToast("Overview exported successfully");
  };

  const handlePrint = () => {
    setMoreOpen(false);
    showToast("Print dialog opened");
  };

  const handleSettings = () => {
    setMoreOpen(false);
    showToast("Transport Settings coming soon");
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <TransportOverviewPageHeader onMoreOptions={() => setMoreOpen(true)} />

          <TransportOverviewSummaryCards cards={OVERVIEW_SUMMARY_CARDS} />

          <TransportGuidelinesCard guidelines={TRANSPORT_GUIDELINES} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <TransportSummaryChart segments={TRANSPORT_DONUT_SEGMENTS} total={TRANSPORT_TOTAL_STUDENTS} />
            <TransportActivityCard rows={ACTIVITY_ROWS} />
          </div>

          <TransportQuickNavigation
            items={QUICK_NAVIGATION_ITEMS}
            onTracking={() => setTrackingOpen(true)}
            onSchedule={() => setScheduleOpen(true)}
            onReport={() => setReportOpen(true)}
          />

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <TransportOverviewDialogs
        trackingOpen={trackingOpen}
        onCloseTracking={() => setTrackingOpen(false)}
        scheduleOpen={scheduleOpen}
        onCloseSchedule={() => setScheduleOpen(false)}
        reportOpen={reportOpen}
        onCloseReport={() => setReportOpen(false)}
      />

      {/* More options dialog */}
      {moreOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMoreOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">More Options</h3>
              <button
                onClick={() => setMoreOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-1">
              <button
                type="button"
                onClick={handleExport}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Export Overview
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Print Overview
              </button>
              <button
                type="button"
                onClick={handleSettings}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Transport Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
