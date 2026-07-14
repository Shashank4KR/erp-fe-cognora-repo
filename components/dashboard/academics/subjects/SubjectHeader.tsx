"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  ChevronDown,
  RefreshCw,
  Download,
  XCircle,
  Users,
  GraduationCap,
} from "lucide-react";

export default function SubjectHeader({
  onAdd,
  onRefresh,
  onExport,
  onResetFilters,
  onAssignClasses,
  onAssignTeachers,
}: {
  onAdd: () => void;
  onRefresh: () => void;
  onExport: () => void;
  onResetFilters: () => void;
  onAssignClasses: () => void;
  onAssignTeachers: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subjects</h1>
          <nav className="mt-1.5 flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
            <Link href="/dashboard/admin" className="hover:text-[#6d28d9] transition-colors">
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/dashboard/admin/academics" className="hover:text-[#6d28d9] transition-colors">
              Academics
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-[#6d28d9]">Subjects</span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setDropdownOpen((o) => !o);
                setMenuOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="flex items-center gap-2 rounded-xl bg-[#6d28d9] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110 active:scale-[0.98] transition shadow-sm shadow-purple-200"
            >
              <Plus className="h-4 w-4" />
              Add Subject
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl" role="menu">
                <button
                  onClick={() => {
                    onAdd();
                    setDropdownOpen(false);
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-purple-50 transition-colors"
                >
                  <Plus className="h-4 w-4 text-[#6d28d9]" aria-hidden="true" />
                  Add New Subject
                </button>
                <button
                  onClick={() => {
                    onAssignClasses();
                    setDropdownOpen(false);
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-purple-50 transition-colors"
                >
                  <Users className="h-4 w-4 text-[#6d28d9]" aria-hidden="true" />
                  Assign Subject to Classes
                </button>
                <button
                  onClick={() => {
                    onAssignTeachers();
                    setDropdownOpen(false);
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-purple-50 transition-colors"
                >
                  <GraduationCap className="h-4 w-4 text-[#6d28d9]" aria-hidden="true" />
                  Assign Teacher to Subject
                </button>
                <div className="my-1.5 border-t border-slate-100" />
                <button
                  onClick={() => {
                    onRefresh();
                    setDropdownOpen(false);
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  Refresh Subjects
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                setMenuOpen((m) => !m);
                setDropdownOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-label="More options"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 active:scale-95 transition"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl" role="menu">
                <button
                  onClick={() => {
                    onRefresh();
                    setMenuOpen(false);
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  Refresh Subjects
                </button>
                <button
                  onClick={() => {
                    onExport();
                    setMenuOpen(false);
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Download className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  Export Current View
                </button>
                <button
                  onClick={() => {
                    onResetFilters();
                    setMenuOpen(false);
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <XCircle className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  Reset Search and Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
