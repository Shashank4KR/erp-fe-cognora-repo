"use client";

import { useState } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import CommunicationOverviewPageHeader from "@/components/dashboard/communication/CommunicationOverviewPageHeader";
import CommunicationOverviewSummaryCards from "@/components/dashboard/communication/CommunicationOverviewSummaryCards";
import CommunicationActivityChart from "@/components/dashboard/communication/CommunicationActivityChart";
import CommunicationRecentHighlights from "@/components/dashboard/communication/CommunicationRecentHighlights";
import CommunicationDeliveryHealth from "@/components/dashboard/communication/CommunicationDeliveryHealth";
import CommunicationQuickNavigation from "@/components/dashboard/communication/CommunicationQuickNavigation";
import CommunicationOverviewDialogs from "@/components/dashboard/communication/CommunicationOverviewDialogs";
import type { OverviewSummaryCard, HighlightItem, DeliveryHealthData, QuickNavigationItem } from "@/lib/fixtures/communication-overview-reference-fixture";

const OVERVIEW_SUMMARY_CARDS: OverviewSummaryCard[] = [
  {
    title: "Messages This Month",
    value: "1,245",
    footer: "Across all channels",
    icon: "send",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [18, 22, 19, 25, 23, 28, 26, 30, 27, 32],
    sparkColor: "#7c3aed",
  },
  {
    title: "Delivery Rate",
    value: "98.6%",
    footer: "2,403 successfully delivered",
    icon: "check-circle",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [10, 12, 11, 14, 13, 16, 15, 18, 17, 20],
    sparkColor: "#10b981",
  },
  {
    title: "Active Conversations",
    value: "24",
    footer: "12 unread conversations",
    icon: "chat",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [8, 10, 9, 11, 10, 12, 11, 13, 12, 14],
    sparkColor: "#3b82f6",
  },
  {
    title: "Published Updates",
    value: "18",
    footer: "Announcements, circulars and events",
    icon: "megaphone",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkline: [3, 5, 4, 6, 5, 7, 6, 8, 7, 9],
    sparkColor: "#f97316",
  },
];

const RECENT_HIGHLIGHTS: HighlightItem[] = [
  {
    type: "conversation",
    icon: "chat",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Class 10-A Parents Group",
    text: "12 unread messages",
    time: "10:30 AM",
  },
  {
    type: "announcement",
    icon: "megaphone",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    title: "Summer Vacation Notice",
    text: "Published to all students and parents",
    time: "18 May 2025",
  },
  {
    type: "circular",
    icon: "file-text",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    title: "Fee Payment Reminder",
    text: "Sent to 154 parents with pending fees",
    time: "15 May 2025",
  },
];

const QUICK_NAVIGATION_ITEMS: QuickNavigationItem[] = [
  {
    title: "Messages & Announcements",
    description: "Manage conversations and published updates",
    icon: "message-square",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    href: "/dashboard/admin/communication/communications-announcements",
  },
  {
    title: "Communication Statistics",
    description: "Review delivery and audience performance",
    icon: "bar-chart",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    href: "/dashboard/admin/communication/statistics",
  },
  {
    title: "Send Notification",
    description: "Send or schedule a notification",
    icon: "bell",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    action: "send-notification",
  },
  {
    title: "Templates",
    description: "Reuse communication templates",
    icon: "file-text",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    action: "templates",
  },
];

const DELIVERY_HEALTH: DeliveryHealthData = {
  rate: 98.6,
  delivered: 2403,
  failed: 35,
  topChannel: "SMS",
};

export default function CommunicationOverviewPage() {
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [createAnnouncementOpen, setCreateAnnouncementOpen] = useState(false);
  const [sendNotificationOpen, setSendNotificationOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const showToast = (message: string) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleSendMessage = () => {
    showToast("Message sent successfully");
  };

  const handleAnnouncementCreated = () => {
    showToast("Announcement published successfully");
  };

  const handleSendNotification = () => {
    showToast("Notification sent successfully");
  };

  const handleUseTemplate = (templateId: string) => {
    showToast("Template opened for editing");
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <CommunicationOverviewPageHeader
            onNewMessage={() => setNewMessageOpen(true)}
            onCreateAnnouncement={() => setCreateAnnouncementOpen(true)}
          />

          <CommunicationOverviewSummaryCards cards={OVERVIEW_SUMMARY_CARDS} />

          <CommunicationActivityChart />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <CommunicationRecentHighlights items={RECENT_HIGHLIGHTS} />
            <CommunicationDeliveryHealth data={DELIVERY_HEALTH} />
          </div>

          <CommunicationQuickNavigation
            items={QUICK_NAVIGATION_ITEMS}
            onSendNotification={() => setSendNotificationOpen(true)}
            onTemplates={() => setTemplatesOpen(true)}
          />

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <CommunicationOverviewDialogs
        newMessageOpen={newMessageOpen}
        onCloseNewMessage={() => setNewMessageOpen(false)}
        onSendMessage={handleSendMessage}
        createAnnouncementOpen={createAnnouncementOpen}
        onCloseCreateAnnouncement={() => setCreateAnnouncementOpen(false)}
        onAnnouncementCreated={handleAnnouncementCreated}
        sendNotificationOpen={sendNotificationOpen}
        onCloseSendNotification={() => setSendNotificationOpen(false)}
        onSendNotification={handleSendNotification}
        templatesOpen={templatesOpen}
        onCloseTemplates={() => setTemplatesOpen(false)}
        onUseTemplate={handleUseTemplate}
      />
    </MainLayout>
  );
}
