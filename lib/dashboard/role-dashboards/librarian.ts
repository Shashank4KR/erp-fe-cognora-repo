import {
  BookOpen,
  BookMarked,
  BookCheck,
  AlertTriangle,
  History,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";
import type { RoleStat, RoleQuickAction, InfoRow } from "./types";

export const librarianStats: RoleStat[] = [
  {
    id: "total",
    label: "Total Books",
    value: 18420,
    change: "2,140 titles",
    icon: BookOpen,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: "issued",
    label: "Books Issued",
    value: 324,
    change: "Active loans",
    icon: BookMarked,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "returned",
    label: "Books Returned",
    value: 286,
    change: "This month",
    icon: BookCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: "overdue",
    label: "Overdue Books",
    value: 38,
    change: "₹1,900 in fines",
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
];

export const librarianQuickActions: RoleQuickAction[] = [
  { id: "issue", label: "Issue Book", icon: BookMarked, href: "/dashboard/librarian/issue" },
  { id: "return", label: "Return Book", icon: BookCheck, href: "/dashboard/librarian/return" },
  { id: "add", label: "Add Book", icon: BookOpen, href: "/dashboard/librarian/catalog" },
  { id: "overdue", label: "View Overdue", icon: AlertTriangle, href: "/dashboard/librarian/overdue" },
];

export const recentIssues: InfoRow[] = [
  { id: "1", title: "The Alchemist", description: "Aarav Sharma · Class 10-A", meta: "Issued 08 Jun", iconBg: "bg-purple-50", iconColor: "text-purple-500", badge: { label: "Due 22 Jun", variant: "warning" } },
  { id: "2", title: "Wings of Fire", description: "Riya Patel · Class 9-B", meta: "Issued 07 Jun", iconBg: "bg-blue-50", iconColor: "text-blue-500", badge: { label: "Due 21 Jun", variant: "warning" } },
  { id: "3", title: "NCERT Physics", description: "Karan Singh · Class 11-Sci", meta: "Issued 06 Jun", iconBg: "bg-green-50", iconColor: "text-green-500", badge: { label: "Due 20 Jun", variant: "warning" } },
  { id: "4", title: "Harry Potter", description: "Neha Gupta · Class 8-C", meta: "Issued 05 Jun", iconBg: "bg-pink-50", iconColor: "text-pink-500", badge: { label: "Due 19 Jun", variant: "warning" } },
];

export const overdueBooks: InfoRow[] = [
  { id: "1", title: "Atomic Habits", description: "Vikram Reddy · Class 10-B", meta: "12 days late", iconBg: "bg-red-50", iconColor: "text-red-500", badge: { label: "₹60", variant: "error" } },
  { id: "2", title: "Sapiens", description: "Meera Joshi · Class 12-A", meta: "9 days late", iconBg: "bg-red-50", iconColor: "text-red-500", badge: { label: "₹45", variant: "error" } },
  { id: "3", title: "Rich Dad Poor Dad", description: "Rohan Mehta · Class 11-Com", meta: "7 days late", iconBg: "bg-red-50", iconColor: "text-red-500", badge: { label: "₹35", variant: "error" } },
];

export const fineSummary: InfoRow[] = [
  { id: "1", title: "Collected This Month", description: "142 books returned late", meta: "₹1,420", icon: IndianRupee, iconBg: "bg-green-50", iconColor: "text-green-500" },
  { id: "2", title: "Outstanding Fines", description: "38 overdue books", meta: "₹1,900", icon: IndianRupee, iconBg: "bg-red-50", iconColor: "text-red-500" },
  { id: "3", title: "Waived Off", description: "Medical cases", meta: "₹210", icon: IndianRupee, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
];
