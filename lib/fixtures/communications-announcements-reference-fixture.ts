/**
 * This data exists only for the approved Communications & Announcements UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
}

export interface Conversation {
  id: string;
  initials: string;
  title: string;
  preview: string;
  time: string;
  unread?: number;
  avatarColor?: string;
  groupIcon?: boolean;
}

export interface Announcement {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  description: string;
  date: string;
  author: string;
}

export interface Template {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  channels: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}

export const SUMMARY_CARDS: SummaryCard[] = [
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

export const QUICK_ACTIONS: QuickAction[] = [
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

export const CONVERSATIONS: Conversation[] = [
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

export const ANNOUNCEMENTS: Announcement[] = [
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

export const TEMPLATES: Template[] = [
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
