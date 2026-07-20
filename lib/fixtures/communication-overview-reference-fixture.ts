/**
 * This data exists only for the approved Communication Overview UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface OverviewSummaryCard {
  title: string;
  value: string;
  footer: string;
  icon: "send" | "check-circle" | "chat" | "megaphone";
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
}

export interface HighlightItem {
  type: "conversation" | "announcement" | "circular";
  icon: "chat" | "megaphone" | "file-text";
  iconBg: string;
  iconColor: string;
  title: string;
  text: string;
  time: string;
}

export interface ActivityDataPoint {
  day: string;
  messagesSent: number;
  delivered: number;
  failed: number;
}

export interface ActivityDataset {
  label: string;
  data: number[];
  color: string;
  fillColor: string;
}

export interface DeliveryHealthData {
  rate: number;
  delivered: number;
  failed: number;
  topChannel: string;
}

export interface QuickNavigationItem {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  href?: string;
  action?: string;
}

export const OVERVIEW_SUMMARY_CARDS: OverviewSummaryCard[] = [
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

export const RECENT_HIGHLIGHTS: HighlightItem[] = [
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

export const ACTIVITY_7_DAYS: ActivityDataPoint[] = [
  { day: "Mon", messagesSent: 180, delivered: 175, failed: 5 },
  { day: "Tue", messagesSent: 210, delivered: 205, failed: 5 },
  { day: "Wed", messagesSent: 195, delivered: 190, failed: 5 },
  { day: "Thu", messagesSent: 240, delivered: 235, failed: 5 },
  { day: "Fri", messagesSent: 220, delivered: 215, failed: 5 },
  { day: "Sat", messagesSent: 100, delivered: 98, failed: 2 },
  { day: "Sun", messagesSent: 100, delivered: 110, failed: 0 },
];

export const ACTIVITY_30_DAYS: ActivityDataPoint[] = [
  { day: "Week 1", messagesSent: 900, delivered: 880, failed: 20 },
  { day: "Week 2", messagesSent: 1050, delivered: 1030, failed: 20 },
  { day: "Week 3", messagesSent: 980, delivered: 960, failed: 20 },
  { day: "Week 4", messagesSent: 1120, delivered: 1100, failed: 20 },
];

export const ACTIVITY_THIS_MONTH: ActivityDataPoint[] = [
  { day: "Week 1", messagesSent: 420, delivered: 410, failed: 10 },
  { day: "Week 2", messagesSent: 380, delivered: 370, failed: 10 },
  { day: "Week 3", messagesSent: 250, delivered: 245, failed: 5 },
  { day: "Week 4", messagesSent: 195, delivered: 190, failed: 5 },
];

export const ACTIVITY_DATASETS: Record<string, ActivityDataset[]> = {
  "Last 7 Days": [
    { label: "Messages Sent", data: [180, 210, 195, 240, 220, 100, 100], color: "#7c3aed", fillColor: "rgba(124,58,237,0.08)" },
    { label: "Delivered", data: [175, 205, 190, 235, 215, 98, 110], color: "#10b981", fillColor: "rgba(16,185,129,0.06)" },
    { label: "Failed", data: [5, 5, 5, 5, 5, 2, 0], color: "#ec4899", fillColor: "rgba(236,72,153,0.04)" },
  ],
  "Last 30 Days": [
    { label: "Messages Sent", data: [900, 1050, 980, 1120], color: "#7c3aed", fillColor: "rgba(124,58,237,0.08)" },
    { label: "Delivered", data: [880, 1030, 960, 1100], color: "#10b981", fillColor: "rgba(16,185,129,0.06)" },
    { label: "Failed", data: [20, 20, 20, 20], color: "#ec4899", fillColor: "rgba(236,72,153,0.04)" },
  ],
  "This Month": [
    { label: "Messages Sent", data: [420, 380, 250, 195], color: "#7c3aed", fillColor: "rgba(124,58,237,0.08)" },
    { label: "Delivered", data: [410, 370, 245, 190], color: "#10b981", fillColor: "rgba(16,185,129,0.06)" },
    { label: "Failed", data: [10, 10, 5, 5], color: "#ec4899", fillColor: "rgba(236,72,153,0.04)" },
  ],
};

export const ACTIVITY_PERIOD_OPTIONS = ["Last 7 Days", "Last 30 Days", "This Month"];

export const DELIVERY_HEALTH: DeliveryHealthData = {
  rate: 98.6,
  delivered: 2403,
  failed: 35,
  topChannel: "SMS",
};

export const QUICK_NAVIGATION_ITEMS: QuickNavigationItem[] = [
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
