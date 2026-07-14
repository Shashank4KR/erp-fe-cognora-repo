"use client";

import { ReactNode } from "react";

interface WelcomeBannerProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function WelcomeBanner({
  title,
  subtitle,
  action,
}: WelcomeBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </div>
  );
}
