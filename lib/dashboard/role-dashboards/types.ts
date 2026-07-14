import type { LucideIcon } from "lucide-react";

export type RoleNavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type RoleConfig = {
  key: string;
  name: string;
  tagline: string;
  basePath: string;
  nav: RoleNavItem[];
  user: {
    name: string;
    role: string;
  };
};

export type RoleStat = {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  progress?: number;
};

export type RoleQuickAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
};

export type InfoRow = {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  time?: string;
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  badge?: {
    label: string;
    variant?: "success" | "error" | "warning" | "info" | "default";
  };
};

export type AttendanceBreakdown = {
  label: string;
  value: number;
  color: string;
};
