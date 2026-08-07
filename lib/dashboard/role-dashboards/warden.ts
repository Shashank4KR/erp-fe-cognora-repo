import {
  BedDouble,
  AlertTriangle,
  Clock,
  CheckCircle2,
  UserPlus,
  FileText,
  ClipboardList,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import type { RoleStat, RoleQuickAction, InfoRow } from "./types";

export const wardensStats: RoleStat[] = [
  {
    id: "occupancy",
    label: "Occupancy",
    value: "78%",
    change: "156 of 200 beds occupied",
    icon: BedDouble,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    progress: 78,
  },
  {
    id: "rooms",
    label: "Total Rooms",
    value: "45",
    change: "3 blocks",
    icon: BedDouble,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    id: "complaints",
    label: "Open Complaints",
    value: "7",
    change: "3 urgent",
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    id: "leave",
    label: "Pending Leave",
    value: "4",
    change: "2 approved this week",
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export const wardensQuickActions: RoleQuickAction[] = [
  { id: "allocate", label: "Allocate Student", icon: UserPlus, href: "/dashboard/warden/hostel" },
  { id: "complaints", label: "View Complaints", icon: ClipboardList, href: "/dashboard/warden/hostel/complaints" },
  { id: "leave", label: "Review Leave", icon: ScrollText, href: "/dashboard/warden/hostel/leave" },
  { id: "mess", label: "Mess Menu", icon: FileText, href: "/dashboard/warden/hostel/mess" },
];

export const todaysOccupancy: InfoRow[] = [
  { id: "1", title: "Block A", description: "Girls Hostel", meta: "92% occupied", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  { id: "2", title: "Block B", description: "Boys Hostel", meta: "85% occupied", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  { id: "3", title: "Block C", description: "Girls Hostel", meta: "78% occupied", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
];

export const pendingComplaints: InfoRow[] = [
  { id: "1", title: "Water Leak", description: "Room 204, Block A", meta: "Urgent", badge: { label: "Urgent", variant: "error" } },
  { id: "2", title: "AC Not Working", description: "Room 112, Block B", meta: "High", badge: { label: "High", variant: "warning" } },
  { id: "3", title: "Broken Lock", description: "Room 301, Block C", meta: "Medium", badge: { label: "Medium", variant: "warning" } },
];

export const pendingLeaveRequests: InfoRow[] = [
  { id: "1", title: "Sick Leave", description: "Rahul Sharma · 1-3 Jul", meta: "Pending", badge: { label: "Pending", variant: "warning" } },
  { id: "2", title: "Family Emergency", description: "Priya Patel · 5-7 Jul", meta: "Pending", badge: { label: "Pending", variant: "warning" } },
  { id: "3", title: "Medical Appointment", description: "Amit Kumar · 8 Jul", meta: "Pending", badge: { label: "Pending", variant: "warning" } },
];

export const recentVisitors: InfoRow[] = [
  { id: "1", title: "Mr. Sharma", description: "Visiting Rahul Sharma · Room 204", meta: "Today, 10:30 AM", iconBg: "bg-green-50", iconColor: "text-green-500" },
  { id: "2", title: "Mrs. Patel", description: "Visiting Priya Patel · Room 112", meta: "Yesterday, 2:00 PM", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  { id: "3", title: "Mr. Kumar", description: "Visiting Amit Kumar · Room 301", meta: "2 days ago", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
];