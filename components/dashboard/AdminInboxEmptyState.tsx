"use client";

import Link from "next/link";
import { Bell, MessageSquare, type LucideIcon } from "lucide-react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import Header from "@/components/shared/layout/Header";

type InboxKind = "notifications" | "messages";

const content: Record<InboxKind, { title: string; description: string; action: string; href: string; icon: LucideIcon }> = {
  notifications: {
    title: "Notifications",
    description: "You have no new notifications.",
    action: "Manage communication settings",
    href: "/dashboard/admin/settings",
    icon: Bell,
  },
  messages: {
    title: "Messages",
    description: "You have no messages to review.",
    action: "Open communications",
    href: "/dashboard/admin/communication/communications-announcements",
    icon: MessageSquare,
  },
};

export default function AdminInboxEmptyState({ kind }: { kind: InboxKind }) {
  const item = content[kind];
  const Icon = item.icon;

  return (
    <MainLayout sidebar={<Sidebar />} header={<Header />}>
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="text-2xl font-bold text-slate-900">{item.title}</h1>
        <div className="mt-6 grid min-h-72 place-items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div>
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-violet-100 text-violet-700"><Icon className="h-6 w-6" /></span>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">All caught up</h2>
            <p className="mt-1 text-sm text-slate-500">{item.description}</p>
            <Link href={item.href} className="mt-5 inline-flex rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">{item.action}</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
