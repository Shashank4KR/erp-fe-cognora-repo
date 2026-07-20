"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, Download, MoreVertical } from "lucide-react";
import type { Expense } from "@/lib/fixtures/expenses-management-reference-fixture";

interface ExpenseRowActionsProps {
  expense: Expense;
  onView: (expense: Expense) => void;
  onDownload: (expense: Expense) => void;
  onAction: (expense: Expense, action: string) => void;
}

const MORE_ACTIONS = [
  "Edit Expense",
  "Submit for Approval",
  "Approve",
  "Reject",
  "Duplicate",
  "Delete",
];

export default function ExpenseRowActions({ expense, onView, onDownload, onAction }: ExpenseRowActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as any as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onView(expense)}
        className="p-1.5 rounded-lg bg-purple-50 text-[#7c3aed] hover:bg-purple-100 transition"
        aria-label={`View ${expense.expenseId}`}
        title="View"
      >
        <Eye className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onDownload(expense)}
        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
        aria-label={`Download ${expense.expenseId}`}
        title="Download"
      >
        <Download className="h-3.5 w-3.5" />
      </button>
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
          aria-label={`More options for ${expense.expenseId}`}
          title="More"
        >
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 z-50 mt-1 min-w-[160px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
          >
            {MORE_ACTIONS.map((action) => {
              const isDestructive = action === "Delete" || action === "Reject";
              return (
                <button
                  key={action}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onAction(expense, action);
                    setMenuOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-slate-50 ${
                    isDestructive ? "text-red-600 hover:text-red-700" : "text-slate-700 hover:text-[#7c3aed]"
                  }`}
                >
                  {action}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
