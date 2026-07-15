"use client";

import { useState } from "react";
import AttendanceStatusIcon from "./AttendanceStatusIcon";
import AttendanceRowActions from "./AttendanceRowActions";
import type { ClassSubjectSummary } from "@/types/entities/class-subject-summary";
import type { AttendanceResponse } from "@/types/entities/attendance";

function severity(status: string): number {
  if (status === "ABSENT") return 3;
  if (status === "LATE") return 2;
  return 1;
}

function CircularPercentage({ value }: { value: number }) {
  const size = 36;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = value / 100;
  const dashLength = percentage * circumference;
  const color = value >= 90 ? "#10b981" : "#ef4444";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength} ${circumference}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeLinecap="round"
      />
      <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="700" fill={color}>
        {value}%
      </text>
    </svg>
  );
}

export type AttendanceTableRow = {
  studentId: string;
  rollNo: string;
  name: string;
  initials: string;
  subjectStatuses: Record<string, "present" | "absent" | "late" | null>;
  overall: number;
  presentCount: number;
  absentCount: number;
};

interface AttendanceTableProps {
  rows: AttendanceTableRow[];
  subjects: ClassSubjectSummary[];
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
}

export default function AttendanceTable({ rows, subjects, loading, error, emptyMessage }: AttendanceTableProps) {
  if (error) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 mb-6 overflow-hidden">
        <div className="py-12 text-center text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3 w-16">Roll No.</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3 w-40">Status Summary</th>
                {subjects.map((subject) => (
                  <th key={subject.id} className="px-4 py-3 text-center">{subject.subject_name}</th>
                ))}
                <th className="px-4 py-3 w-20">Overall</th>
                <th className="px-4 py-3 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-3"><div className="h-4 w-8 rounded bg-slate-100" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-32 rounded bg-slate-100" /></td>
                  <td className="px-4 py-3"><div className="h-9 w-24 rounded bg-slate-100" /></td>
                  {subjects.map((subject) => (
                    <td key={subject.id} className="px-4 py-3 text-center"><div className="mx-auto h-5 w-5 rounded-full bg-slate-100" /></td>
                  ))}
                  <td className="px-4 py-3"><div className="h-4 w-10 rounded bg-slate-100" /></td>
                  <td className="px-4 py-3"><div className="h-7 w-20 rounded bg-slate-100 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (subjects.length === 0 && rows.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 mb-6 overflow-hidden">
        <div className="py-12 text-center text-sm text-slate-500">
          Select a class and date to view attendance.
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 mb-6 overflow-hidden">
        <div className="py-12 text-center text-sm text-slate-500">
          {emptyMessage || "No attendance records found for the selected filters."}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 mb-6 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-4 py-3 w-16">Roll No.</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3 w-40">Status Summary</th>
              {subjects.map((subject) => (
                <th key={subject.id} className="px-4 py-3 text-center">{subject.subject_name}</th>
              ))}
              <th className="px-4 py-3 w-20">Overall</th>
              <th className="px-4 py-3 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((student) => (
              <tr key={student.studentId} className="hover:bg-slate-50/50 transition">
                <td className="px-4 py-3 text-sm text-slate-600 font-medium">{student.rollNo}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-[#7c3aed] flex-shrink-0">
                      {student.initials}
                    </div>
                    <span className="text-sm font-medium text-slate-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <CircularPercentage value={student.overall} />
                    <div className="text-xs leading-tight">
                      <p className="text-emerald-600 font-medium">{student.presentCount} Present</p>
                      <p className="text-red-500 font-medium">{student.absentCount} Absent</p>
                    </div>
                  </div>
                </td>
                {subjects.map((subject) => (
                  <td key={subject.id} className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                       <AttendanceStatusIcon status={(student.subjectStatuses[subject.id] ?? null) as "present" | "absent" | "late" | null} />
                    </div>
                  </td>
                ))}
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${student.overall >= 90 ? "text-emerald-600" : "text-red-500"}`}>
                    {student.overall}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <AttendanceRowActions student={student} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
