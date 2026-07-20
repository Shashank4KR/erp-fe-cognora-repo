"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import CommunicationsAnnouncementsPageHeader from "@/components/dashboard/communication/CommunicationsAnnouncementsPageHeader";
import CommunicationSummaryCards from "@/components/dashboard/communication/CommunicationSummaryCards";
import CommunicationActionCards from "@/components/dashboard/communication/CommunicationActionCards";
import RecentConversationsCard from "@/components/dashboard/communication/RecentConversationsCard";
import AnnouncementsCircularsCard from "@/components/dashboard/communication/AnnouncementsCircularsCard";
import CommunicationQuickFilters from "@/components/dashboard/communication/CommunicationQuickFilters";
import CommunicationTemplates from "@/components/dashboard/communication/CommunicationTemplates";
import NewMessageDialog from "@/components/dashboard/communication/NewMessageDialog";
import SendNotificationDialog from "@/components/dashboard/communication/SendNotificationDialog";
import CommunicationActionDialog from "@/components/dashboard/communication/CommunicationActionDialog";
import ConversationPreviewDialog from "@/components/dashboard/communication/ConversationPreviewDialog";
import AnnouncementDetailsDialog from "@/components/dashboard/communication/AnnouncementDetailsDialog";
import TemplateEditorDialog from "@/components/dashboard/communication/TemplateEditorDialog";
import {
  SUMMARY_CARDS,
  QUICK_ACTIONS,
  CONVERSATIONS,
  ANNOUNCEMENTS,
  TEMPLATES,
} from "@/lib/fixtures/communications-announcements-reference-fixture";
import type { Conversation, Announcement, Template } from "@/lib/fixtures/communications-announcements-reference-fixture";

export default function CommunicationsAnnouncementsPage() {
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [sendNotificationOpen, setSendNotificationOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [templateEditorOpen, setTemplateEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const [dateRange, setDateRange] = useState("12 May 2025 - 18 May 2025");
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);

  const showToast = (message: string) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleActionCard = (actionId: string) => {
    const actionTitles: Record<string, string> = {
      "send-message": "Send Message",
      "send-email": "Send Email",
      "send-sms": "Send SMS",
      "send-notification": "Send Notification",
      "create-announcement": "Create Announcement",
      "create-circular": "Create Circular",
    };

    if (actionId === "send-message" || actionId === "send-email" || actionId === "send-sms") {
      setNewMessageOpen(true);
    } else if (actionId === "send-notification") {
      setSendNotificationOpen(true);
    } else {
      setActionDialog({
        open: true,
        title: actionTitles[actionId] || actionId,
        message: `The "${actionTitles[actionId] || actionId}" workflow will be connected to the backend in the integration phase.`,
      });
    }
  };

  const handleNewMessage = () => {
    setNewMessageOpen(true);
  };

  const handleSendNotification = () => {
    setSendNotificationOpen(true);
  };

  const handleMessageSend = () => {
    showToast("Message sent successfully");
  };

  const handleNotificationSend = () => {
    showToast("Notification sent successfully");
  };

  const handleMoreOptions = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Export Communication View, Print Current View, and Communication Settings will be available here.",
    });
  };

  const handleViewConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleViewAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleViewAllConversations = () => {
    setActionDialog({
      open: true,
      title: "All Conversations",
      message: "A full conversation history view will be available here in a future update.",
    });
  };

  const handleViewAllAnnouncements = () => {
    setActionDialog({
      open: true,
      title: "All Announcements",
      message: "A full announcements and circulars view will be available here in a future update.",
    });
  };

  const handleApplyFilters = () => {
    showToast("Filters applied");
  };

  const handleUseTemplate = (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setEditingTemplate(template);
      setTemplateEditorOpen(true);
    }
  };

  const handleEditTemplate = (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setEditingTemplate(template);
      setTemplateEditorOpen(true);
    }
  };

  const handleTemplateSave = () => {
    showToast("Template saved successfully");
    setTemplateEditorOpen(false);
    setEditingTemplate(null);
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <CommunicationsAnnouncementsPageHeader
            onNewMessage={handleNewMessage}
            onSendNotification={handleSendNotification}
            onMoreOptions={handleMoreOptions}
          />

          <CommunicationSummaryCards cards={SUMMARY_CARDS} />

          <CommunicationActionCards items={QUICK_ACTIONS} onAction={handleActionCard} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-1">
              <RecentConversationsCard
                conversations={conversations}
                onViewConversation={handleViewConversation}
                onViewAll={handleViewAllConversations}
              />
            </div>
            <div className="xl:col-span-1">
              <AnnouncementsCircularsCard
                announcements={announcements}
                onViewAnnouncement={handleViewAnnouncement}
                onViewAll={handleViewAllAnnouncements}
              />
            </div>
            <div className="xl:col-span-1 space-y-6">
              <CommunicationQuickFilters
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                onApply={handleApplyFilters}
              />
              <CommunicationTemplates templates={TEMPLATES} onUse={handleUseTemplate} onEdit={handleEditTemplate} />
            </div>
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <NewMessageDialog open={newMessageOpen} onClose={() => setNewMessageOpen(false)} onSend={handleMessageSend} />

      <SendNotificationDialog open={sendNotificationOpen} onClose={() => setSendNotificationOpen(false)} onSend={handleNotificationSend} />

      <CommunicationActionDialog
        open={actionDialog.open}
        onClose={() =>
          setActionDialog({ open: false, title: "", message: "" })
        }
        title={actionDialog.title}
        message={actionDialog.message}
      />

      <ConversationPreviewDialog
        open={!!selectedConversation}
        onClose={() => setSelectedConversation(null)}
        conversation={selectedConversation}
      />

      <AnnouncementDetailsDialog
        open={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        announcement={selectedAnnouncement}
      />

      <TemplateEditorDialog
        open={templateEditorOpen}
        onClose={() => {
          setTemplateEditorOpen(false);
          setEditingTemplate(null);
        }}
        templateName={editingTemplate?.title}
        onSave={handleTemplateSave}
      />
    </MainLayout>
  );
}
