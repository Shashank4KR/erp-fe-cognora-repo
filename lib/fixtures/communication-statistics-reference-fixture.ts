/**
 * This data exists only for the approved Communication Statistics UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface StatSummaryCard {
  title: string;
  value: string;
  footer: string;
  icon: "send" | "check-circle" | "x-circle" | "message-circle";
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
}

export interface ChannelStat {
  label: string;
  value: number;
  percentage: string;
  color: string;
}

export interface AudienceStat {
  label: string;
  value: number;
  percentage: string;
  color: string;
}

export interface DeliveryStat {
  label: string;
  value: number;
  percentage: string;
  color: string;
}

export interface TopCommunicationType {
  type: string;
  messages: number;
}

export interface DonutSegment {
  label: string;
  value: number;
  percentage: string;
  color: string;
}

export interface ReportRow {
  category: string;
  count: number;
  percentage: string;
}

export const STATS_SUMMARY_CARDS: StatSummaryCard[] = [
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

export const CHANNEL_STATS: ChannelStat[] = [
  { label: "Email", value: 842, percentage: "35.4%", color: "#10b981" },
  { label: "SMS", value: 1028, percentage: "43.1%", color: "#3b82f6" },
  { label: "In-App", value: 568, percentage: "23.8%", color: "#f97316" },
];

export const AUDIENCE_STATS: AudienceStat[] = [
  { label: "Students", value: 984, percentage: "40.3%", color: "#7c3aed" },
  { label: "Parents", value: 1056, percentage: "43.3%", color: "#3b82f6" },
  { label: "Staff", value: 398, percentage: "16.4%", color: "#f97316" },
];

export const DELIVERY_STATS: DeliveryStat[] = [
  { label: "Delivered", value: 2403, percentage: "98.6%", color: "#10b981" },
  { label: "Failed", value: 35, percentage: "1.4%", color: "#ec4899" },
];

export const TOP_COMMUNICATION_TYPES: TopCommunicationType[] = [
  { type: "Fee Reminder", messages: 452 },
  { type: "General Announcement", messages: 318 },
  { type: "Event Notification", messages: 276 },
  { type: "Exam Related", messages: 248 },
  { type: "Attendance Alert", messages: 186 },
];

export const ALL_COMMUNICATION_TYPES: TopCommunicationType[] = [
  ...TOP_COMMUNICATION_TYPES,
  { type: "Holiday Notice", messages: 128 },
  { type: "Fee Receipt", messages: 98 },
  { type: "Transport Alert", messages: 72 },
];

export const DONUT_SEGMENTS: DonutSegment[] = [
  { label: "Announcements", value: 218, percentage: "38.4%", color: "#3b82f6" },
  { label: "Circulars", value: 156, percentage: "27.5%", color: "#ec4899" },
  { label: "Events", value: 98, percentage: "17.3%", color: "#14b8a6" },
  { label: "Reminders", value: 64, percentage: "11.3%", color: "#f97316" },
  { label: "Others", value: 32, percentage: "5.5%", color: "#7c3aed" },
];

export const NOTIFICATION_REPORT_ROWS: ReportRow[] = [
  { category: "Announcements", count: 218, percentage: "38.4%" },
  { category: "Circulars", count: 156, percentage: "27.5%" },
  { category: "Events", count: 98, percentage: "17.3%" },
  { category: "Reminders", count: 64, percentage: "11.3%" },
  { category: "Others", count: 32, percentage: "5.5%" },
];

export const PERIOD_OPTIONS = ["This Week", "This Month", "This Quarter", "This Year"];

export const CHANNEL_OPTIONS = ["All Channels", "Email", "SMS", "In-App"];

export const AUDIENCE_OPTIONS = ["All Audiences", "Students", "Parents", "Staff"];

export const COMMUNICATION_TYPE_OPTIONS = [
  "All Types",
  "Announcement",
  "Circular",
  "Event",
  "Reminder",
  "General Communication",
  "Exam Related",
  "Attendance Alert",
];

export const FILE_FORMAT_OPTIONS = ["PDF", "CSV", "XLSX"];
