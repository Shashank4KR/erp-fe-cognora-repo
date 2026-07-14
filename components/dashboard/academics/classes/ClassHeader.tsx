"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Plus,
  ChevronDown,
  RefreshCw,
  Download,
  XCircle,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export default function ClassHeader({
  onAdd,
  onRefresh,
  onExport,
  onResetFilters,
  onAssignSubjects,
  onAssignTeacher,
}: {
  onAdd: () => void;
  onRefresh: () => void;
  onExport: () => void;
  onResetFilters: () => void;
  onAssignSubjects: () => void;
  onAssignTeacher: () => void;
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
    <>
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <Link href="/dashboard/admin" className="hover:text-[#6d28d9]">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/admin/academics" className="hover:text-[#6d28d9]">
          Academics
        </Link>
        <span>/</span>
        <span className="text-slate-900">Classes</span>
      </nav>
      <SectionHeader
        title="Classes / Courses"
        subtitle="Manage academic classes, sections and assignments."
        action={
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setDropdownOpen((o) => !o);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
              >
                <Plus className="h-4 w-4" />
                Add Class
                <ChevronDown className={`h-4 w-4 transition ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
                  <button
                    onClick={() => {
                      onAdd();
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Plus className="h-4 w-4 text-[#6d28d9]" />
                    Add New Class
                  </button>
                  <button
                    onClick={() => {
                      onAssignSubjects();
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <BookOpen className="h-4 w-4 text-[#6d28d9]" />
                    Assign Subjects
                  </button>
                  <button
                    onClick={() => {
                      onAssignTeacher();
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <GraduationCap className="h-4 w-4 text-[#6d28d9]" />
                    Assign Class Teacher
                  </button>
                  <div className="my-1 border-t border-slate-100" />
                  <button
                    onClick={() => {
                      onRefresh();
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <RefreshCw className="h-4 w-4 text-slate-500" />
                    Refresh Classes
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
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 transition"
                title="More options"
              >
                <span className="sr-only">More options</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
                  <button
                    onClick={() => {
                      onRefresh();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <RefreshCw className="h-4 w-4 text-slate-500" />
                    Refresh Classes
                  </button>
                  <button
                    onClick={() => {
                      onExport();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Download className="h-4 w-4 text-slate-500" />
                    Export Current View as CSV
                  </button>
                  <button
                    onClick={() => {
                      onResetFilters();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <XCircle className="h-4 w-4 text-slate-500" />
                    Reset Search and Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        }
      />
    </>
  );
}
