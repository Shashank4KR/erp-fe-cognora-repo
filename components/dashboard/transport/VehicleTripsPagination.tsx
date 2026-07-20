"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "@/components/shared/Dropdown";

interface VehicleTripsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalItems: number;
  showingStart: number;
  showingEnd: number;
}

export default function VehicleTripsPagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems,
  showingStart,
  showingEnd,
}: VehicleTripsPaginationProps) {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-slate-100">
      <p className="text-xs text-slate-500">
        Showing {showingStart} to {showingEnd} of {totalItems} trips
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {getPages().map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={idx}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                page === currentPage
                  ? "bg-[#7c3aed] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="px-2 text-sm text-slate-400">...</span>
          )
        )}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">Rows per page:</span>
        <div className="w-16">
          <Dropdown
            value={String(rowsPerPage)}
            options={[5, 10, 20].map(String)}
            onChange={(v) => onRowsPerPageChange(Number(v))}
          />
        </div>
      </div>
    </div>
  );
}
