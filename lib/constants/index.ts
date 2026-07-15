import {
  LayoutDashboard,
  Users,
  Briefcase,
  BookOpen,
  CheckCircle,
  ClipboardList,
  DollarSign,
  MessageSquare,
  Library,
  BarChart3,
  Settings,
  LayoutGrid,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

export type MenuItemType = {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: MenuItemType[];
};

export const MENU_ITEMS: MenuItemType[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
  { label: "User Modules", icon: LayoutGrid, href: "/dashboard/admin/modules" },
  { label: "Students", icon: Users, href: "/dashboard/admin/students" },
  { label: "Employees", icon: Briefcase, href: "/dashboard/admin/teachers" },
    {
      label: "Academics",
      icon: BookOpen,
      href: "/dashboard/admin/academics",
      children: [
        { label: "Classes / Courses", icon: LayoutGrid, href: "/dashboard/admin/academics/classes" },
        { label: "Subjects", icon: BookOpen, href: "/dashboard/admin/academics/subjects" },
        { label: "Timetable", icon: CalendarClock, href: "/dashboard/admin/academics/timetable" },
        { label: "Attendance", icon: CheckCircle, href: "/dashboard/admin/academics/attendance" },
      ],
    },
  { label: "Examinations", icon: ClipboardList, href: "/dashboard/admin/examinations" },
  { label: "Finance", icon: DollarSign, href: "/dashboard/admin/finance" },
  { label: "Communication", icon: MessageSquare, href: "/dashboard/admin/communication" },
  { label: "Library", icon: Library, href: "/dashboard/admin/library" },
  { label: "Reports", icon: BarChart3, href: "/dashboard/admin/reports" },
  { label: "Settings", icon: Settings, href: "/dashboard/admin/settings" },
];

export const TIMEFRAME_OPTIONS = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
];

export const SESSION_OPTIONS = [
  "This Session",
  "Last Session",
  "2023-24",
  "2022-23",
];

export const COLORS = {
  purple: "#7c3aed",
  green: "#10b981",
  red: "#ef4444",
  amber: "#f59e0b",
  blue: "#3b82f6",
  pink: "#ec4899",
  orange: "#f97316",
  indigo: "#6366f1",
  teal: "#14b8a6",
  gray: "#6b7280",
};

export const SIDEBAR_WIDTH = "280px";

export const COMPANY_INFO = {
  name: "EdTech",
  tagline: "Smart Campus ERP",
  copyright: "© 2025 EdTech Smart Campus ERP. All rights reserved.",
  version: "1.0.0",
};

export const DEMO_USER = {
  name: "John Admin",
  role: "Super Admin",
  initials: "JA",
};
