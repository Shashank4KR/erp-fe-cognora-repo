"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  value: string;
  options?: string[];
  items?: DropdownItem[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Dropdown({
  label,
  value,
  options = [],
  items,
  placeholder = "Select",
  disabled = false,
  onChange,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const list = items ?? options.map((o) => ({ value: o, label: o }));
  const selectedLabel =
    list.find((o) => o.value === value)?.label ?? placeholder;

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="mb-2 block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {selectedLabel}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-max overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
        >
          {list.length === 0 ? (
            <div className="px-4 py-2 text-sm text-slate-400">No options</div>
          ) : (
            list.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-purple-50 focus:outline-none focus-visible:bg-purple-50 ${
                  option.value === value
                    ? "font-semibold text-purple-700"
                    : "text-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
