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
import {
  OVERVIEW_SUMMARY_CARDS,
  RECENT_HIGHLIGHTS,
  QUICK_NAVIGATION_ITEMS,
  DELIVERY_HEALTH,
} from "@/lib/fixtures/communication-overview-reference-fixture";

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
