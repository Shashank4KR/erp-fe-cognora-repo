"use client";

import { useState, useMemo } from "react";
import { Printer, RefreshCw, Settings } from "lucide-react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import CommunicationStatisticsPageHeader from "@/components/dashboard/communication/CommunicationStatisticsPageHeader";
import CommunicationStatisticsSummaryCards from "@/components/dashboard/communication/CommunicationStatisticsSummaryCards";
import CommunicationStatisticsFilters from "@/components/dashboard/communication/CommunicationStatisticsFilters";
import NotificationSummaryCard from "@/components/dashboard/communication/NotificationSummaryCard";
import ByChannelCard from "@/components/dashboard/communication/ByChannelCard";
import ByAudienceCard from "@/components/dashboard/communication/ByAudienceCard";
import DeliveryStatusCard from "@/components/dashboard/communication/DeliveryStatusCard";
import TopCommunicationTypesCard from "@/components/dashboard/communication/TopCommunicationTypesCard";
import CommunicationStatisticsReportDialog from "@/components/dashboard/communication/CommunicationStatisticsReportDialog";
import CommunicationStatisticsExportDialog from "@/components/dashboard/communication/CommunicationStatisticsExportDialog";
import Modal from "@/components/shared/Modal";
import {
  STATS_SUMMARY_CARDS,
  CHANNEL_STATS,
  AUDIENCE_STATS,
  DELIVERY_STATS,
  TOP_COMMUNICATION_TYPES,
  ALL_COMMUNICATION_TYPES,
  DONUT_SEGMENTS,
  NOTIFICATION_REPORT_ROWS,
} from "@/lib/fixtures/communication-statistics-reference-fixture";

export default function CommunicationStatisticsPage() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [viewAllDialogOpen, setViewAllDialogOpen] = useState(false);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const [period, setPeriod] = useState("This Month");
  const [channel, setChannel] = useState("All Channels");
  const [audience, setAudience] = useState("All Audiences");
  const [commType, setCommType] = useState("All Types");
  const [dateRange, setDateRange] = useState("12 May 2025 - 18 May 2025");

  const showToast = (message: string) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const handleExport = () => {
    showToast("Report exported successfully");
  };

  const handleMenuAction = (action: string) => {
    setMenuDialogOpen(false);
    if (action === "Refresh View") {
      showToast("View refreshed");
    } else if (action === "Print Statistics") {
      showToast("Preparing print view...");
    } else if (action === "Communication Settings") {
      showToast("Opening communication settings");
    }
  };

  const handleFilter = () => {
    showToast("Filters applied");
  };

  const handleReset = () => {
    setPeriod("This Month");
    setChannel("All Channels");
    setAudience("All Audiences");
    setCommType("All Types");
    setDateRange("12 May 2025 - 18 May 2025");
    showToast("Filters reset");
  };

  const total = useMemo(() => {
    return CHANNEL_STATS.reduce((sum, item) => sum + item.value, 0);
  }, []);

  const channelTotal = useMemo(() => {
    return CHANNEL_STATS.reduce((sum, item) => sum + item.value, 0);
  }, []);

  const audienceTotal = useMemo(() => {
    return AUDIENCE_STATS.reduce((sum, item) => sum + item.value, 0);
  }, []);

  const deliveryTotal = useMemo(() => {
    return DELIVERY_STATS.reduce((sum, item) => sum + item.value, 0);
  }, []);

  const donutTotal = useMemo(() => {
    return DONUT_SEGMENTS.reduce((sum, item) => sum + item.value, 0);
  }, []);

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <CommunicationStatisticsPageHeader
            onExportReport={() => setExportDialogOpen(true)}
            onMoreOptions={() => setMenuDialogOpen(true)}
          />

          <CommunicationStatisticsSummaryCards cards={STATS_SUMMARY_CARDS} />

          <CommunicationStatisticsFilters
            period={period}
            onPeriodChange={setPeriod}
            channel={channel}
            onChannelChange={setChannel}
            audience={audience}
            onAudienceChange={setAudience}
            commType={commType}
            onCommTypeChange={setCommType}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <NotificationSummaryCard
            period={period}
            segments={DONUT_SEGMENTS}
            total={donutTotal}
            onViewReport={() => setReportDialogOpen(true)}
          />

          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">
              Communication Statistics ({period})
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <ByChannelCard data={CHANNEL_STATS} total={channelTotal} />
              <ByAudienceCard data={AUDIENCE_STATS} total={audienceTotal} />
              <DeliveryStatusCard data={DELIVERY_STATS} total={deliveryTotal} />
              <TopCommunicationTypesCard
                items={TOP_COMMUNICATION_TYPES}
                onViewAll={() => setViewAllDialogOpen(true)}
              />
            </div>
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <CommunicationStatisticsExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={handleExport}
      />

      <CommunicationStatisticsReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        period={period}
        rows={NOTIFICATION_REPORT_ROWS}
      />

      <Modal
        open={viewAllDialogOpen}
        onClose={() => setViewAllDialogOpen(false)}
        maxWidth="max-w-md"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">
            All Communication Types
          </h2>
          <button
            onClick={() => setViewAllDialogOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200">
              <span className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Type
              </span>
              <span className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                Messages Sent
              </span>
            </div>
            {ALL_COMMUNICATION_TYPES.map((item) => (
              <div
                key={item.type}
                className="grid grid-cols-2 border-b border-slate-100 last:border-b-0"
              >
                <span className="px-4 py-2.5 text-sm font-medium text-slate-700">
                  {item.type}
                </span>
                <span className="px-4 py-2.5 text-sm font-semibold text-slate-900 text-right">
                  {item.messages.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end mt-6">
            <button
              type="button"
              onClick={() => setViewAllDialogOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={menuDialogOpen}
        onClose={() => setMenuDialogOpen(false)}
        maxWidth="max-w-sm"
      >
        <div className="p-2">
          <button
            type="button"
            onClick={() => handleMenuAction("Print Statistics")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition text-left"
          >
            <Printer className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Print Statistics
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleMenuAction("Refresh View")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition text-left"
          >
            <RefreshCw className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Refresh View
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleMenuAction("Communication Settings")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition text-left"
          >
            <Settings className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Communication Settings
            </span>
          </button>
        </div>
      </Modal>

      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl">
          {toast.message}
        </div>
      )}
    </MainLayout>
  );
}
