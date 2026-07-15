"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  ChevronDown,
  RefreshCw,
  Download,
  Printer,
  XCircle,
  CalendarPlus,
  LayoutGrid,
  Copy,
  MoreVertical,
} from "lucide-react";

interface TimetablePageHeaderProps {
  onAddPeriod: () => void;
  onRefresh: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onResetFilters: () => void;
  onPending: (message: string) => void;
}

const PENDING_CLASS = "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-400 cursor-not-allowed";
const ITEM_CLASS =
  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition";

export default function TimetablePageHeader({
  onAddPeriod,
  onRefresh,
  onDownload,
  onPrint,
  onResetFilters,
  onPending,
}: TimetablePageHeaderProps) {
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
    <div className="print:hidden">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Timetable</h1>
      <nav className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-400" aria-label="Breadcrumb">
        <Link href="/dashboard/admin" className="hover:text-[#6d28d9]">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <Link href="/dashboard/admin/academics" className="hover:text-[#6d28d9]">
          Academics
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-[#6d28d9]">Timetable</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        {/* Create Timetable dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => {
              setDropdownOpen((o) => !o);
              setMenuOpen(false);
            }}
            aria-haspopup="menu"
            aria-expanded={dropdownOpen}
            className="flex items-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6d28d9] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <Plus className="h-4 w-4" />
            Create Timetable
            <ChevronDown className={`h-4 w-4 transition ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-slate-200 bg-white py-2 shadow-2xl"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onAddPeriod();
                  setDropdownOpen(false);
                }}
                className={ITEM_CLASS}
              >
                <CalendarPlus className="h-4 w-4 text-[#7c3aed]" />
                Add Timetable Period
              </button>
              <button
                type="button"
                role="menuitem"
                title="Backend integration pending"
                onClick={() => {
                  onPending("Build Class Timetable is pending backend integration.");
                  setDropdownOpen(false);
                }}
                className={PENDING_CLASS}
              >
                <LayoutGrid className="h-4 w-4 text-slate-400" />
                Build Class Timetable
                <span className="ml-auto text-[10px] font-semibold text-slate-400">Pending</span>
              </button>
              <button
                type="button"
                role="menuitem"
                title="Backend integration pending"
                onClick={() => {
                  onPending("Copy Timetable is pending backend integration.");
                  setDropdownOpen(false);
                }}
                className={PENDING_CLASS}
              >
                <Copy className="h-4 w-4 text-slate-400" />
                Copy Timetable
                <span className="ml-auto text-[10px] font-semibold text-slate-400">Pending</span>
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onRefresh();
                  setDropdownOpen(false);
                }}
                className={ITEM_CLASS}
              >
                <RefreshCw className="h-4 w-4 text-slate-500" />
                Refresh Timetable
              </button>
            </div>
          )}
        </div>

        {/* Three-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => {
              setMenuOpen((m) => !m);
              setDropdownOpen(false);
            }}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="More options"
            title="More options"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-2xl"
            >
              <button type="button" role="menuitem" onClick={() => { onRefresh(); setMenuOpen(false); }} className={ITEM_CLASS}>
                <RefreshCw className="h-4 w-4 text-slate-500" />
                Refresh
              </button>
              <button type="button" role="menuitem" onClick={() => { onDownload(); setMenuOpen(false); }} className={ITEM_CLASS}>
                <Download className="h-4 w-4 text-slate-500" />
                Download Timetable
              </button>
              <button type="button" role="menuitem" onClick={() => { onPrint(); setMenuOpen(false); }} className={ITEM_CLASS}>
                <Printer className="h-4 w-4 text-slate-500" />
                Print Timetable
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button type="button" role="menuitem" onClick={() => { onResetFilters(); setMenuOpen(false); }} className={ITEM_CLASS}>
                <XCircle className="h-4 w-4 text-slate-500" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
