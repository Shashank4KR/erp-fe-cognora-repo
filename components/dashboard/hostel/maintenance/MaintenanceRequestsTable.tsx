"use client";

import { Eye } from "lucide-react";
import Card from "@/components/shared/Card";
import type { MaintenanceRequest } from "@/lib/fixtures/maintenance-management-reference-fixture";

interface MaintenanceRequestsTableProps {
  requests: MaintenanceRequest[];
  onView: (request: MaintenanceRequest) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  showingStart: number;
  showingEnd: number;
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-orange-50 text-orange-600",
    Low: "bg-green-50 text-green-600",
    Emergency: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[priority] || "bg-slate-100 text-slate-600"}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Open: "bg-blue-50 text-blue-600",
    "In Progress": "bg-orange-50 text-orange-600",
    Completed: "bg-green-50 text-green-600",
    Overdue: "bg-red-50 text-red-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

export default function MaintenanceRequestsTable({
  requests,
  onView,
  rowsPerPage,
  onRowsPerPageChange,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  showingStart,
  showingEnd,
}: MaintenanceRequestsTableProps) {
  return (
    <Card className="flex flex-col mb-6">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Maintenance Requests</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Request ID</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Requested By</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Block / Room</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Issue Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Priority</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Requested On</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-5 py-3 text-xs font-medium text-[#7c3aed]">{request.id}</td>
                <td className="px-5 py-3 font-medium text-slate-700">{request.requestedBy}</td>
                <td className="px-5 py-3 text-slate-600">{request.blockRoom}</td>
                <td className="px-5 py-3 text-slate-600">{request.issueType}</td>
                <td className="px-5 py-3">
                  <PriorityBadge priority={request.priority} />
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-5 py-3 text-slate-600">
                  {request.requestedDate}<br/>
                  <span className="text-xs text-slate-400">{request.requestedTime}</span>
                </td>
                <td className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() => onView(request)}
                    aria-label={`View ${request.id} details`}
                    className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-1.5 text-purple-600 hover:bg-purple-100 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
        <div className="text-xs text-slate-500">
          Showing {showingStart} to {showingEnd} of {totalItems} requests
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {(() => {
            const pages: (number | "...")[] = [];
            const maxVisible = 5;
            if (totalPages <= maxVisible + 2) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              pages.push(1);
              if (currentPage > 3) pages.push("...");
              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);
              for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
              }
              if (currentPage < totalPages - 2) pages.push("...");
              if (!pages.includes(totalPages)) pages.push(totalPages);
            }
            return pages.map((page) =>
              page === "..." ? (
                <span key="ellipsis" className="px-2 py-1 text-xs text-slate-500">...</span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                    page === currentPage
                      ? "border-[#7c3aed] bg-[#7c3aed] text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ),
            );
          })()}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}
