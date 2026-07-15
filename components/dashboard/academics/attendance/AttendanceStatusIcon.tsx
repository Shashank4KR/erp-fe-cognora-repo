"use client";

import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface AttendanceStatusIconProps {
  status: "present" | "absent" | "late" | null;
}

export default function AttendanceStatusIcon({ status }: AttendanceStatusIconProps) {
  if (status === "present") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500">
        <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />
      </span>
    );
  }
  if (status === "absent") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500">
        <XCircle className="h-3 w-3 text-white" strokeWidth={3} />
      </span>
    );
  }
  if (status === "late") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400">
        <Clock className="h-3 w-3 text-white" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100" />
  );
}
