"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import Modal from "@/components/shared/Modal";
import { ArrowRight } from "lucide-react";
import type { PreviewUpcomingChange } from "./timetableDisplayTypes";

function ChangeRow({ item }: { item: PreviewUpcomingChange }) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-purple-50 text-[#6d28d9]">
        <span className="text-base font-bold leading-none">{item.day}</span>
        <span className="text-[9px] font-semibold uppercase tracking-wide">{item.month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800">{item.title}</p>
        <p className="text-[11px] text-slate-400">{item.context}</p>
      </div>
    </li>
  );
}

export default function UpcomingChangesCard({
  items,
}: {
  items: PreviewUpcomingChange[];
}) {
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const visible = items.slice(0, 4);

  return (
    <Card className="flex h-full flex-col p-5 print:hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Upcoming Changes</h3>
        <button
          type="button"
          onClick={() => setViewAllOpen(true)}
          disabled={items.length === 0}
          className="flex items-center gap-1 text-xs font-semibold text-[#7c3aed] transition hover:text-[#6d28d9] disabled:opacity-40"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-0.5 text-[11px] text-slate-400">Latest timetable updates</p>
      {items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-8 text-xs font-medium text-slate-400">
          No recent changes.
        </div>
      ) : (
        <ul className="mt-4 flex-1 space-y-4">
          {visible.map((item) => (
            <ChangeRow key={item.id} item={item} />
          ))}
        </ul>
      )}

      <Modal open={viewAllOpen} onClose={() => setViewAllOpen(false)} title="All Recent Changes" maxWidth="max-w-md">
        <ul className="space-y-4">
          {items.map((item) => (
            <ChangeRow key={item.id} item={item} />
          ))}
        </ul>
      </Modal>
    </Card>
  );
}
