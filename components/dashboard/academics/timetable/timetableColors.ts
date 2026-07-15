// UI PREVIEW DATA ONLY — Timetable-specific pastel subject color system.
// Colors are stable and deterministic. Unknown subjects fall back to a
// stable hash-based palette so colors never change between renders.

import type { SubjectColorKey } from "./timetableDisplayTypes";

export interface SubjectColorToken {
  bg: string;
  text: string;
  dot: string;
  border: string;
}

const SUBJECT_COLORS: Record<SubjectColorKey, SubjectColorToken> = {
  Mathematics: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "#3b82f6",
    border: "border-blue-200",
  },
  English: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "#22c55e",
    border: "border-green-200",
  },
  Science: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    dot: "#a855f7",
    border: "border-purple-200",
  },
  "Social Science": {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "#eab308",
    border: "border-yellow-200",
  },
  Hindi: {
    bg: "bg-pink-100",
    text: "text-pink-800",
    dot: "#ec4899",
    border: "border-pink-200",
  },
  Computer: {
    bg: "bg-cyan-100",
    text: "text-teal-800",
    dot: "#14b8a6",
    border: "border-cyan-200",
  },
  "Physical Education": {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    dot: "#10b981",
    border: "border-emerald-200",
  },
  "Art & Craft": {
    bg: "bg-orange-100",
    text: "text-orange-800",
    dot: "#f97316",
    border: "border-orange-200",
  },
  Library: {
    bg: "bg-violet-100",
    text: "text-violet-800",
    dot: "#8b5cf6",
    border: "border-violet-200",
  },
  "Value Education": {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    dot: "#6366f1",
    border: "border-indigo-200",
  },
  Others: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "#64748b",
    border: "border-slate-200",
  },
};

const FALLBACK_PALETTE: SubjectColorToken[] = [
  { bg: "bg-rose-100", text: "text-rose-800", dot: "#f43f5e", border: "border-rose-200" },
  { bg: "bg-teal-100", text: "text-teal-800", dot: "#0d9488", border: "border-teal-200" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-800", dot: "#d946ef", border: "border-fuchsia-200" },
  { bg: "bg-lime-100", text: "text-lime-800", dot: "#65a30d", border: "border-lime-200" },
  { bg: "bg-sky-100", text: "text-sky-800", dot: "#0ea5e9", border: "border-sky-200" },
  { bg: "bg-amber-100", text: "text-amber-800", dot: "#d97706", border: "border-amber-200" },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function resolveColorKey(subject: string): SubjectColorKey {
  const key = subject.trim() as SubjectColorKey;
  if (key in SUBJECT_COLORS) return key;
  return "Others";
}

// Returns a stable color token for any subject name.
export function getSubjectColor(subject: string): SubjectColorToken {
  const key = resolveColorKey(subject);
  if (key !== "Others") return SUBJECT_COLORS[key];

  const fallback = FALLBACK_PALETTE[hashString(subject) % FALLBACK_PALETTE.length];
  return fallback;
}

// Returns the explicit palette token when the subject is a known key,
// otherwise a stable hashed fallback. Useful for the legend where only
// represented subjects are shown.
export function getSubjectColorToken(subject: string): SubjectColorToken {
  return getSubjectColor(subject);
}

export const KNOWN_SUBJECT_COLOR_ORDER: SubjectColorKey[] = [
  "Mathematics",
  "English",
  "Science",
  "Social Science",
  "Hindi",
  "Computer",
  "Physical Education",
  "Art & Craft",
  "Library",
  "Value Education",
];
