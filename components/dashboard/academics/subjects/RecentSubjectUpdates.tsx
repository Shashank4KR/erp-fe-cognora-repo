"use client";

import { useState, useMemo } from "react";
import { Eye } from "lucide-react";
import Card from "@/components/shared/Card";
import Modal from "@/components/shared/Modal";
import type { SubjectResponse } from "@/types/entities/subject";

export default function RecentSubjectUpdates({ subjects }: { subjects: SubjectResponse[] }) {
  const [viewAllOpen, setViewAllOpen] = useState(false);

  const formatDate = (value?: string) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const recent = useMemo(() => {
    return [...subjects]
      .sort((a, b) => {
        const da = a.updated_at ?? a.created_at ?? "";
        const db = b.updated_at ?? b.created_at ?? "";
        return db.localeCompare(da);
      })
      .slice(0, 5);
  }, [subjects]);

  const allRecent = useMemo(() => {
    return [...subjects]
      .sort((a, b) => {
        const da = a.updated_at ?? a.created_at ?? "";
        const db = b.updated_at ?? b.created_at ?? "";
        return db.localeCompare(da);
      });
  }, [subjects]);

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recent Subject Updates</h3>
            <p className="text-xs text-slate-500 mt-0.5">Latest additions and changes</p>
          </div>
          {subjects.length > 0 && (
            <button
              onClick={() => setViewAllOpen(true)}
              className="text-xs font-medium text-[#6d28d9] hover:underline underline-offset-2 flex items-center gap-1"
              aria-label="View all subject updates"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              View All
            </button>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-slate-500">No recent Subject activity is available.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((s) => {
              const date = s.updated_at ?? s.created_at;
              const action = s.updated_at ? "was updated" : "was created";
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-[#6d28d9] flex-shrink-0">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {s.subject_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {s.subject_code} — {action}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0">
                    {formatDate(date)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal open={viewAllOpen} onClose={() => setViewAllOpen(false)} title="All Subject Updates" maxWidth="max-w-lg">
        <div className="max-h-[60vh] overflow-y-auto space-y-2">
          {allRecent.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No Subject activity is available.</p>
          ) : (
            allRecent.map((s) => {
              const date = s.updated_at ?? s.created_at;
              const action = s.updated_at ? "was updated" : "was created";
              return (
                <div key={s.id} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-[#6d28d9] flex-shrink-0">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{s.subject_name}</p>
                    <p className="text-xs text-slate-500">
                      {s.subject_code} — {action}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0">
                    {formatDate(date)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </Modal>
    </Card>
  );
}
