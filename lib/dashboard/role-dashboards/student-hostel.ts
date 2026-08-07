import {
  BedDouble,
  Home,
  Wallet,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import type { RoleStat, RoleQuickAction, InfoRow } from "./types";

export const studentHostelStats: RoleStat[] = [
  {
    id: "hostel",
    label: "Hostel",
    value: "Block A",
    change: "Girls Hostel",
    icon: BedDouble,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "room",
    label: "Room",
    value: "204",
    change: "Floor 2",
    icon: Home,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    id: "fees",
    label: "Fee Status",
    value: "₹12,000",
    change: "Due on 30 Jul",
    icon: Wallet,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "leave",
    label: "Leave Status",
    value: "0 pending",
    change: "2 approved this month",
    icon: CheckCircle2,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
];

export const studentHostelQuickActions: RoleQuickAction[] = [
  { id: "room", label: "My Room", icon: Home, href: "/dashboard/student/hostel" },
  { id: "fees", label: "Hostel Fees", icon: Wallet, href: "/dashboard/student/fees" },
  { id: "leave", label: "Apply Leave", icon: FileText, href: "/dashboard/student/hostel/leave" },
  { id: "complaint", label: "Submit Complaint", icon: AlertTriangle, href: "/dashboard/student/hostel/complaints" },
];

export const myRoomDetails: InfoRow[] = [
  { id: "1", title: "Block", description: "Block A (Girls Hostel)", meta: "", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  { id: "2", title: "Room No.", description: "204", meta: "", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  { id: "3", title: "Bed No.", description: "B-12", meta: "", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  { id: "4", title: "Floor", description: "2nd Floor", meta: "", iconBg: "bg-amber-50", iconColor: "text-amber-500" },
  { id: "5", title: "Roommate", description: "Priya Sharma", meta: "", iconBg: "bg-pink-50", iconColor: "text-pink-500" },
];

export const myLeaveRequests: InfoRow[] = [
  { id: "1", title: "Sick Leave", description: "1-3 Jul 2026", meta: "Approved", badge: { label: "Approved", variant: "success" } },
  { id: "2", title: "Family Event", description: "15-17 Aug 2026", meta: "Pending", badge: { label: "Pending", variant: "warning" } },
];

export const myComplaints: InfoRow[] = [
  { id: "1", title: "Water Pressure", description: "Low water pressure in bathroom", meta: "Resolved", badge: { label: "Resolved", variant: "success" } },
  { id: "2", title: "Fan Not Working", description: "Ceiling fan in room is not working", meta: "In Progress", badge: { label: "In Progress", variant: "warning" } },
];

export const hostelNotices: InfoRow[] = [
  { id: "1", title: "Mess Menu Update", description: "New menu effective from 1 Jul", meta: "2 days ago", icon: Megaphone, iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  { id: "2", title: "Maintenance Schedule", description: "Water supply will be shut off on 5 Jul", meta: "3 days ago", icon: Megaphone, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  { id: "3", title: "Visitor Policy", description: "Visitor timings updated to 4-8 PM", meta: "1 week ago", icon: Megaphone, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
];