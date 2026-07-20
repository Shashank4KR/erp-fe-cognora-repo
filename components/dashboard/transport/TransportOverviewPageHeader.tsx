"use client";

import { ChevronRight, Bus, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface TransportOverviewPageHeaderProps {
  onMoreOptions: () => void;
}

export default function TransportOverviewPageHeader({
  onMoreOptions,
}: TransportOverviewPageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Transport Overview</h1>
        <nav className="flex items-center gap-1.5 mt-1 text-sm" aria-label="Breadcrumb">
          <span className="text-[#7c3aed] font-medium cursor-pointer hover:underline">Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#7c3aed] font-medium cursor-pointer hover:underline">Transport</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-medium">Overview</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/admin/transport/management")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        >
          <Bus className="h-4 w-4" />
          Open Transport Management
        </button>

        <button
          type="button"
          onClick={onMoreOptions}
          aria-label="More options"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition h-9 w-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
