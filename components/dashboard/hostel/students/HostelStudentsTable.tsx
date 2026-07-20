"use client";

import { useState, useMemo } from "react";
import Card from "@/components/shared/Card";
import Checkbox from "@/components/ui/checkbox";
import HostelStudentRowActions from "@/components/dashboard/hostel/students/HostelStudentRowActions";
import HostelStudentsPagination from "@/components/dashboard/hostel/students/HostelStudentsPagination";
import type { HostelStudent } from "@/lib/fixtures/hostel-students-reference-fixture";

interface HostelStudentsTableProps {
  rows: HostelStudent[];
  onView: (row: HostelStudent) => void;
  onEdit: (row: HostelStudent) => void;
  onMore: (row: HostelStudent) => void;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: number) => void;
  selectedIds: string[];
  onSelectedIdsChange: (ids: string[]) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-orange-100 text-orange-700",
    "bg-pink-100 text-pink-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function GenderBadge({ gender }: { gender: string }) {
  if (gender === "Male") {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
        Male
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-700">
      Female
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Inactive"
        ? "bg-slate-100 text-slate-600"
        : "bg-orange-50 text-orange-600";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

export default function HostelStudentsTable({
  rows,
  onView,
  onEdit,
  onMore,
  totalItems,
  currentPage,
  totalPages,
  rowsPerPage,
  startIndex,
  endIndex,
  onPageChange,
  onRowsPerPageChange,
  selectedIds,
  onSelectedIdsChange,
}: HostelStudentsTableProps) {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectedIdsChange([]);
    } else {
      onSelectedIdsChange(rows.map((r) => r.id));
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectedIdsChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectedIdsChange([...selectedIds, id]);
    }
  };

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Hostel Students List</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 w-10">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={handleSelectAll}
                  ariaLabel="Select all"
                />
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Photo
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Adm. No.
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Roll No.
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Student Name
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Class / Section
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Room No.
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Block
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Gender
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Date of Birth
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Contact No.
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isSelected = selectedIds.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={`border-b border-slate-50 last:border-0 transition ${
                    isSelected ? "bg-purple-50/30" : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="px-5 py-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleSelectRow(row.id)}
                      ariaLabel={`Select ${row.studentName}`}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarColor(row.studentName)}`}
                    >
                      {row.initials}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-medium text-[#7c3aed]">{row.admissionNo}</td>
                  <td className="px-5 py-3 text-slate-600">{row.rollNo}</td>
                  <td className="px-5 py-3 font-medium text-slate-700">{row.studentName}</td>
                  <td className="px-5 py-3 text-slate-600">{row.classSection}</td>
                  <td className="px-5 py-3 text-slate-600">{row.roomNo}</td>
                  <td className="px-5 py-3 text-slate-600">{row.block}</td>
                  <td className="px-5 py-3">
                    <GenderBadge gender={row.gender} />
                  </td>
                  <td className="px-5 py-3 text-slate-600">{row.dateOfBirth}</td>
                  <td className="px-5 py-3 text-slate-600">{row.contactNo}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-3">
                    <HostelStudentRowActions
                      onView={() => onView(row)}
                      onEdit={() => onEdit(row)}
                      onMore={() => onMore(row)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <HostelStudentsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </Card>
  );
}
