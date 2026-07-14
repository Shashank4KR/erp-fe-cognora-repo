import {
  Wallet,
  AlertCircle,
  Receipt,
  FileBarChart,
  Users2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { RoleStat, RoleQuickAction, InfoRow } from "./types";

export const accountantStats: RoleStat[] = [
  {
    id: "collected",
    label: "Fees Collected",
    value: "₹24.5L",
    change: "+8% this month",
    icon: Wallet,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: "dues",
    label: "Pending Dues",
    value: "₹6.2L",
    change: "142 students",
    icon: AlertCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    id: "invoices",
    label: "Invoices",
    value: 312,
    change: "28 generated today",
    icon: Receipt,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: "defaulters",
    label: "Defaulters",
    value: 47,
    change: "Needs follow-up",
    icon: Users2,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export const accountantQuickActions: RoleQuickAction[] = [
  { id: "invoice", label: "Generate Invoice", icon: Receipt, href: "/dashboard/accountant/invoices" },
  { id: "payment", label: "Record Payment", icon: Wallet, href: "/dashboard/accountant/payments" },
  { id: "dues", label: "View Dues", icon: AlertCircle, href: "/dashboard/accountant/dues" },
  { id: "export", label: "Export Report", icon: FileBarChart, href: "/dashboard/accountant/reports" },
];

export const recentPayments: InfoRow[] = [
  { id: "1", title: "Aarav Sharma", description: "Term 2 Tuition · ₹10,000", meta: "Today · 09:12 AM", iconBg: "bg-green-50", iconColor: "text-green-500", badge: { label: "Paid", variant: "success" } },
  { id: "2", title: "Riya Patel", description: "Transport Fee · ₹2,000", meta: "Today · 10:40 AM", iconBg: "bg-green-50", iconColor: "text-green-500", badge: { label: "Paid", variant: "success" } },
  { id: "3", title: "Karan Singh", description: "Term 2 Tuition · ₹10,000", meta: "Yesterday · 04:05 PM", iconBg: "bg-green-50", iconColor: "text-green-500", badge: { label: "Paid", variant: "success" } },
  { id: "4", title: "Neha Gupta", description: "Exam Fee · ₹1,500", meta: "Yesterday · 02:20 PM", iconBg: "bg-green-50", iconColor: "text-green-500", badge: { label: "Paid", variant: "success" } },
];

export const invoices: InfoRow[] = [
  { id: "1", title: "INV-2041", description: "Term 2 Tuition · Aarav Sharma", meta: "₹10,000", badge: { label: "Unpaid", variant: "warning" } },
  { id: "2", title: "INV-2042", description: "Transport Fee · Riya Patel", meta: "₹2,000", badge: { label: "Unpaid", variant: "warning" } },
  { id: "3", title: "INV-2043", description: "Term 2 Tuition · Karan Singh", meta: "₹10,000", badge: { label: "Unpaid", variant: "warning" } },
  { id: "4", title: "INV-2044", description: "Exam Fee · Neha Gupta", meta: "₹1,500", badge: { label: "Paid", variant: "success" } },
];

export const defaulters: InfoRow[] = [
  { id: "1", title: "Rohan Mehta", description: "Term 2 Tuition · ₹10,000", meta: "45 days overdue", badge: { label: "Overdue", variant: "error" } },
  { id: "2", title: "Sara Khan", description: "Transport Fee · ₹2,000", meta: "30 days overdue", badge: { label: "Overdue", variant: "error" } },
  { id: "3", title: "Vikram Reddy", description: "Term 1 Balance · ₹4,000", meta: "60 days overdue", badge: { label: "Overdue", variant: "error" } },
  { id: "4", title: "Meera Joshi", description: "Exam Fee · ₹1,500", meta: "20 days overdue", badge: { label: "Overdue", variant: "error" } },
];

export const collectionChart = [
  { label: "Apr", value: 320000 },
  { label: "May", value: 410000 },
  { label: "Jun", value: 380000 },
  { label: "Jul", value: 510000 },
  { label: "Aug", value: 460000 },
  { label: "Sep", value: 620000 },
];

export const collectionSummary: InfoRow[] = [
  { id: "1", title: "Total Collected", description: "This academic year", meta: "₹24.5L", icon: TrendingUp, iconBg: "bg-green-50", iconColor: "text-green-500" },
  { id: "2", title: "Target", description: "Annual fee target", meta: "₹30.7L", icon: FileBarChart, iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  { id: "3", title: "Achievement", description: "vs annual target", meta: "80%", icon: Wallet, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
];
