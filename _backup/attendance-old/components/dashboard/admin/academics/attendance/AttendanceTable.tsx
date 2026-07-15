"use client";

import { type ReactNode } from "react";
import { Eye, Pencil, History, Check, X, Clock, Minus } from "lucide-react";
import Card from "@/components/shared/Card";
import type { AttendanceStatus } from "@/types/entities/attendance";

export type AttendanceTableRow = {
  studentId: string;
  rollNo: string;
  studentName: string;
  subjects: Record<string, AttendanceStatus | null>;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  overallPercentage: number | null;
};

export type AttendanceSubjectColumn = {
  id: string;
  name: string;
};

interface AttendanceTableProps {
  rows: AttendanceTableRow[];
  subjects: AttendanceSubjectColumn[];
  searchActive?: boolean;
  onView?: (row: AttendanceTableRow) => void;
  onEdit?: (row: AttendanceTableRow) => void;
  onHistory?: (row: AttendanceTableRow) => void;
}

const StatusCell = ({ status }: { status: AttendanceStatus | null }) => {
  if (status === "PRESENT") {
    return (
      <span
        title="Present"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white"
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (status === "ABSENT") {
    return (
      <span
        title="Absent"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white"
      >
        <X className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (status === "LATE") {
    return (
      <span
        title="Late"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-white"
      >
        <Clock className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span title="Attendance not marked" className="inline-flex items-center justify-center text-slate-300">
      <Minus className="h-4 w-4" />
    </span>
  );
};

const overallColor = (percentage: number | null) => {
  if (percentage === null) return "text-slate-400";
  if (percentage >= 90) return "text-green-600";
  return "text-red-600";
};

const actions = (row: AttendanceTableRow, handlers: AttendanceTableProps): ReactNode => (
  <div className="flex items-center justify-end gap-1">
    <button
      onClick={() => handlers.onView?.(row)}
      className="p-2 rounded-lg hover:bg-purple-50 text-slate-600 hover:text-[#6d28d9] transition"
      title="View"
    >
      <Eye className="h-4 w-4" />
    </button>
    <button
      onClick={() => handlers.onEdit?.(row)}
      className="p-2 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"
      title="Edit"
    >
      <Pencil className="h-4 w-4" />
    </button>
    <button
      onClick={() => handlers.onHistory?.(row)}
      className="p-2 rounded-lg hover:bg-pink-50 text-slate-600 hover:text-pink-600 transition"
      title="History"
    >
      <History className="h-4 w-4" />
    </button>
  </div>
);

export default function AttendanceTable({
  rows,
  subjects,
  searchActive,
  onView,
  onEdit,
  onHistory,
}: AttendanceTableProps) {
  const handlers: AttendanceTableProps = { rows, subjects, onView, onEdit, onHistory };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase">
              <th className="px-4 py-3">Roll No</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Status Summary</th>
              {subjects.map((subj) => (
                <th key={subj.id} className="px-4 py-3">{subj.name}</th>
              ))}
              <th className="px-4 py-3">Overall</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4 + subjects.length}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  {searchActive
                    ? "No Students match your search."
                    : "No attendance records to display. Select a Class and Date, then mark attendance."}
                </td>
              </tr>
            ) : (
              rows.map((record) => (
                <tr
                  key={record.studentId}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition"
                >
                  <td className="px-4 py-3 font-medium text-slate-700">{record.rollNo}</td>
                  <td className="px-4 py-3 text-slate-900">{record.studentName}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10">
                        <svg className="w-10 h-10 -rotate-90">
                          <circle cx="20" cy="20" r="16" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                          {record.overallPercentage !== null && (
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              fill="none"
                              stroke={record.overallPercentage >= 90 ? "#10b981" : "#ef4444"}
                              strokeWidth="4"
                              strokeDasharray={`${(record.overallPercentage / 100) * 100.53} 100.53`}
                              strokeLinecap="round"
                            />
                          )}
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
                          {record.overallPercentage !== null ? `${record.overallPercentage}%` : "—"}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-green-600 font-medium">P:{record.presentCount}</span>
                        <span className="text-slate-400 mx-1">|</span>
                        <span className="text-red-600 font-medium">A:{record.absentCount}</span>
                      </div>
                    </div>
                    {record.overallPercentage === null && (
                      <div className="text-[10px] text-slate-400 mt-1">No records</div>
                    )}
                  </td>
                  {subjects.map((subj) => (
                    <td key={subj.id} className="px-4 py-3 text-center">
                      <StatusCell status={record.subjects[subj.id] ?? null} />
                    </td>
                  ))}
                  <td className={`px-4 py-3 font-semibold ${overallColor(record.overallPercentage)}`}>
                    {record.overallPercentage !== null ? `${record.overallPercentage}%` : "—"}
                  </td>
                  <td className="px-4 py-3">{actions(record, handlers)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
