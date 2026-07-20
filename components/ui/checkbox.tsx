"use client";

import * as React from "react";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export default function Checkbox({
  checked = false,
  onCheckedChange,
  indeterminate = false,
  disabled = false,
  ariaLabel,
  className = "",
}: CheckboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={`inline-flex items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 ${
        checked || indeterminate
          ? "bg-[#7c3aed] border-[#7c3aed] text-white"
          : "border-slate-300 bg-white text-transparent hover:border-[#7c3aed]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {indeterminate ? (
          <path d="M3 7h8" />
        ) : (
          <path d="M3 8l2.5 2.5L11 4" />
        )}
      </svg>
    </button>
  );
}
