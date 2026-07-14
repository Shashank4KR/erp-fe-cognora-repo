"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface SubjectPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export default function SubjectPagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: SubjectPaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const noun = totalItems === 1 ? "subject" : "subjects";

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">{start}</span> to{" "}
        <span className="font-medium text-slate-700">{end}</span> of{" "}
        <span className="font-medium text-slate-700">{totalItems}</span> {noun}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </button>

        {getPageNumbers().map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 select-none" aria-hidden="true">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-[#6d28d9] text-white shadow-sm shadow-purple-200"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
