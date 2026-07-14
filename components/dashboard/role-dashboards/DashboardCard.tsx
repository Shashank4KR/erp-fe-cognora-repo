"use client";

import { ReactNode } from "react";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <SectionHeader title={title} subtitle={subtitle} action={action} />
        {children}
      </div>
    </Card>
  );
}
