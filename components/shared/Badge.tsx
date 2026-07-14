"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "error" | "warning" | "info" | "default";
  icon?: ReactNode;
}

export default function Badge({
  children,
  variant = "default",
  icon,
}: BadgeProps) {
  const variants = {
    success: "bg-green-50 text-green-700",
    error: "bg-red-50 text-red-700",
    warning: "bg-amber-50 text-amber-700",
    info: "bg-blue-50 text-blue-700",
    default: "bg-slate-100 text-slate-700",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {icon}
      {children}
    </span>
  );
}
