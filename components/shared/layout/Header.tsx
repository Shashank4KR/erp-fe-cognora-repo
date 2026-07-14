"use client";

import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Calendar,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_USER } from "@/lib/constants";
import { getInitials } from "@/lib/utils/formatters";
import CalendarPicker from "@/components/shared/Calendar";
import { MENU_ITEMS } from "@/lib/constants";
import { MODULES, QUICK_ACCESS } from "@/lib/modules";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
}

type SearchResult = {
  title: string;
  icon: LucideIcon;
  href: string;
};

const SEARCH_INDEX: SearchResult[] = [
  ...MENU_ITEMS.map((m) => ({
    title: m.label,
    icon: m.icon,
    href: m.href ?? "#",
  })),
  ...MODULES.map((m) => ({ title: m.title, icon: m.icon, href: m.href })),
  ...QUICK_ACCESS.map((q) => ({ title: q.label, icon: q.icon, href: q.href })),
];

export default function DashboardHeader({
  userName,
  userRole,
}: DashboardHeaderProps = {}) {
  const name = userName ?? DEMO_USER.name;
  const role = userRole ?? DEMO_USER.role;
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const searchRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((r) => r.title.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!calendarOpen && !open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCalendarOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [calendarOpen, open]);

  const go = (href: string) => {
    setQuery("");
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) {
      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        go(results[0].href);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[selected].href);
    }
  };

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {/* Search Bar */}
          <div ref={searchRef} className="relative">
            <div
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                open
                  ? "border-purple-400 bg-purple-50 shadow-sm"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                placeholder="Search for modules, students, reports..."
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                className="bg-transparent outline-none text-sm w-64 placeholder-slate-400"
              />
              <span className="text-xs text-slate-400 font-medium">Ctrl /</span>
            </div>

            {open && query.trim() !== "" && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
                {results.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    No matching modules or pages found
                  </div>
                ) : (
                  results.map((r, i) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={`${r.title}-${r.href}-${i}`}
                        onClick={() => go(r.href)}
                        onMouseEnter={() => setSelected(i)}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                          i === selected
                            ? "bg-purple-50 text-[#6d28d9]"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1 truncate">{r.title}</span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Chat */}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition">
            <MessageSquare className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Calendar */}
          <div className="relative flex items-center gap-2" ref={calendarRef}>
            <span className="hidden md:block text-sm font-medium text-slate-600">
              {formattedDate}
            </span>
            <button
              type="button"
              onClick={() => setCalendarOpen((o) => !o)}
              aria-haspopup="dialog"
              aria-expanded={calendarOpen}
              aria-label="Open calendar"
              className="relative p-2 hover:bg-slate-100 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Calendar className="w-5 h-5 text-slate-600" />
            </button>

            {calendarOpen && (
              <div
                role="dialog"
                aria-label="Calendar"
                className="absolute right-0 z-[60] mt-2 w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
              >
                <CalendarPicker
                  selectedDate={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d);
                    setCalendarOpen(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Profile */}
          <button className="flex items-center gap-3 pl-3 pr-2 py-2 hover:bg-slate-100 rounded-lg transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-900">
                {name}
              </p>
              <p className="text-xs text-slate-500">{role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
