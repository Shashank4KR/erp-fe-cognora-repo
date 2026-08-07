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
import type { StatSummaryCard, ChannelStat, AudienceStat, DeliveryStat, TopCommunicationType, DonutSegment, ReportRow } from "@/lib/fixtures/communication-statistics-reference-fixture";

const STATS_SUMMARY_CARDS: StatSummaryCard[] = [
  {
    title: "Total Communications",
    value: "2,438",
    footer: "This Month",
    icon: "send",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [18, 22, 19, 25, 23, 28, 26, 30, 27, 32],
    sparkColor: "#7c3aed",
  },
  {
    title: "Delivered",
    value: "2,403",
    footer: "98.6% Delivery Rate",
    icon: "check-circle",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26, 23, 28],
    sparkColor: "#10b981",
  },
  {
    title: "Failed",
    value: "35",
    footer: "1.4% Failure Rate",
    icon: "x-circle",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    sparkline: [3, 4, 3, 5, 4, 6, 5, 7, 6, 8],
    sparkColor: "#ec4899",
  },
  {
    title: "Top Channel",
    value: "SMS",
    footer: "1,028 Messages",
    icon: "message-circle",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [20, 22, 21, 24, 23, 25, 24, 26, 25, 27],
    sparkColor: "#3b82f6",
  },
];

const CHANNEL_STATS: ChannelStat[] = [
  { label: "Email", value: 842, percentage: "35.4%", color: "#10b981" },
  { label: "SMS", value: 1028, percentage: "43.1%", color: "#3b82f6" },
  { label: "In-App", value: 568, percentage: "23.8%", color: "#f97316" },
];

const AUDIENCE_STATS: AudienceStat[] = [
  { label: "Students", value: 984, percentage: "40.3%", color: "#7c3aed" },
  { label: "Parents", value: 1056, percentage: "43.3%", color: "#3b82f6" },
  { label: "Staff", value: 398, percentage: "16.4%", color: "#f97316" },
];

const DELIVERY_STATS: DeliveryStat[] = [
  { label: "Delivered", value: 2403, percentage: "98.6%", color: "#10b981" },
  { label: "Failed", value: 35, percentage: "1.4%", color: "#ec4899" },
];

const TOP_COMMUNICATION_TYPES: TopCommunicationType[] = [
  { type: "Fee Reminder", messages: 452 },
  { type: "General Announcement", messages: 318 },
  { type: "Event Notification", messages: 276 },
  { type: "Exam Related", messages: 248 },
  { type: "Attendance Alert", messages: 186 },
];

const ALL_COMMUNICATION_TYPES: TopCommunicationType[] = [
  ...TOP_COMMUNICATION_TYPES,
  { type: "Holiday Notice", messages: 128 },
  { type: "Fee Receipt", messages: 98 },
  { type: "Transport Alert", messages: 72 },
];

const DONUT_SEGMENTS: DonutSegment[] = [
  { label: "Announcements", value: 218, percentage: "38.4%", color: "#3b82f6" },
  { label: "Circulars", value: 156, percentage: "27.5%", color: "#ec4899" },
  { label: "Events", value: 98, percentage: "17.3%", color: "#14b8a6" },
  { label: "Reminders", value: 64, percentage: "11.3%", color: "#f97316" },
  { label: "Others", value: 32, percentage: "5.5%", color: "#7c3aed" },
];

const NOTIFICATION_REPORT_ROWS: ReportRow[] = [
  { category: "Announcements", count: 218, percentage: "38.4%" },
  { category: "Circulars", count: 156, percentage: "27.5%" },
  { category: "Events", count: 98, percentage: "17.3%" },
  { category: "Reminders", count: 64, percentage: "11.3%" },
  { category: "Others", count: 32, percentage: "5.5%" },
];

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
