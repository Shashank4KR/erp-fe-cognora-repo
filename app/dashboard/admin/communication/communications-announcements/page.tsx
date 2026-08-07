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
const SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Messages Sent",
    value: "1,245",
    footer: "This Month",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [18, 22, 19, 25, 23, 28, 26, 30, 27, 32],
    sparkColor: "#7c3aed",
  },
  {
    title: "Emails Sent",
    value: "842",
    footer: "This Month",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26, 23, 28],
    sparkColor: "#10b981",
  },
  {
    title: "SMS Sent",
    value: "1,028",
    footer: "This Month",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [20, 22, 21, 24, 23, 25, 24, 26, 25, 27],
    sparkColor: "#3b82f6",
  },
  {
    title: "Notifications Sent",
    value: "568",
    footer: "This Month",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkline: [5, 7, 6, 8, 9, 10, 8, 12, 11, 13],
    sparkColor: "#f97316",
  },
  {
    title: "Delivery Rate",
    value: "98.6%",
    footer: "This Month",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [10, 12, 11, 14, 13, 16, 15, 18, 17, 20],
    sparkColor: "#10b981",
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "send-message",
    title: "Send Message",
    description: "Send messages to students, parents or staff",
    icon: "send-message",
    iconBg: "bg-purple-50",
  },
  {
    id: "send-email",
    title: "Send Email",
    description: "Compose and send emails",
    icon: "send-email",
    iconBg: "bg-emerald-50",
  },
  {
    id: "send-sms",
    title: "Send SMS",
    description: "Send SMS to any contact",
    icon: "send-sms",
    iconBg: "bg-blue-50",
  },
  {
    id: "send-notification",
    title: "Send Notification",
    description: "Send push notifications",
    icon: "send-notification",
    iconBg: "bg-orange-50",
  },
  {
    id: "create-announcement",
    title: "Create Announcement",
    description: "Publish announcements",
    icon: "create-announcement",
    iconBg: "bg-purple-50",
  },
  {
    id: "create-circular",
    title: "Create Circular",
    description: "Create and share circulars",
    icon: "create-circular",
    iconBg: "bg-pink-50",
  },
];

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    initials: "10A",
    title: "Class 10 - A (Parents Group)",
    preview: "Reminder: PTM meeting on 20 May at 10:00 AM in...",
    time: "10:30 AM",
    unread: 12,
    avatarColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "2",
    initials: "SJ",
    title: "Sarah Johnson (Parent)",
    preview: "Thank you for the update regarding attendance.",
    time: "Yesterday",
    unread: 2,
    avatarColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "3",
    initials: "JS",
    title: "Mr. James Smith (Teacher)",
    preview: "Please review the exam schedule for next week.",
    time: "Yesterday",
    avatarColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "4",
    initials: "8B",
    title: "Class 8 - B (Students Group)",
    preview: "New assignment has been posted in the portal.",
    time: "17 May",
    unread: 8,
    avatarColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "5",
    initials: "AT",
    title: "Admin Team",
    preview: "System maintenance scheduled on Sunday.",
    time: "16 May",
    avatarColor: "bg-purple-100 text-purple-700",
    groupIcon: true,
  },
];

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    icon: "megaphone",
    iconBg: "bg-emerald-50",
    title: "Summer Vacation Notice",
    badge: "Announcement",
    badgeColor: "text-emerald-700",
    badgeBg: "bg-emerald-50",
    description: "School will remain closed for summer vacation from 25 May 2025...",
    date: "18 May 2025",
    author: "Admin",
  },
  {
    id: "2",
    icon: "bell",
    iconBg: "bg-emerald-50",
    title: "PTM Meeting",
    badge: "Announcement",
    badgeColor: "text-emerald-700",
    badgeBg: "bg-emerald-50",
    description: "Parent-Teacher Meeting for classes 1 to 12 on 20 May 2025...",
    date: "16 May 2025",
    author: "Admin",
  },
  {
    id: "3",
    icon: "circular",
    iconBg: "bg-pink-50",
    title: "Fee Payment Reminder",
    badge: "Circular",
    badgeColor: "text-red-600",
    badgeBg: "bg-red-50",
    description: "This is a reminder to pay the pending fees before 30 May 2025...",
    date: "15 May 2025",
    author: "Accounts Dept.",
  },
  {
    id: "4",
    icon: "calendar",
    iconBg: "bg-purple-50",
    title: "Annual Sports Day",
    badge: "Event",
    badgeColor: "text-purple-700",
    badgeBg: "bg-purple-50",
    description: "Annual Sports Day will be held on 5 June 2025 from 9:00 AM...",
    date: "14 May 2025",
    author: "Sports Dept.",
  },
];

const TEMPLATES: Template[] = [
  {
    id: "fee-reminder",
    icon: "bell",
    iconBg: "bg-purple-50",
    title: "Fee Reminder",
    channels: "Email / SMS",
  },
  {
    id: "holiday-notice",
    icon: "holiday",
    iconBg: "bg-blue-50",
    title: "Holiday Notice",
    channels: "Email / SMS",
  },
  {
    id: "exam-schedule",
    icon: "schedule",
    iconBg: "bg-emerald-50",
    title: "Exam Schedule",
    channels: "Email / SMS",
  },
  {
    id: "event-invitation",
    icon: "event",
    iconBg: "bg-pink-50",
    title: "Event Invitation",
    channels: "Email / SMS",
  },
];

import type { Conversation, Announcement, Template, SummaryCard, QuickAction } from "@/lib/fixtures/communications-announcements-reference-fixture";

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
