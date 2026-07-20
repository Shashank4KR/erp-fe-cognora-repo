"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";
import EmployeeSalaryTable from "./EmployeeSalaryTable";
import SalaryPagination from "./SalaryPagination";
import type { SalaryRow } from "@/lib/fixtures/salary-management-reference-fixture";

const ITEMS_PER_PAGE = 8;

interface EmployeeSalaryOverviewProps {
  rows: SalaryRow[];
  onView: (row: SalaryRow) => void;
  onDownload: (row: SalaryRow) => void;
  onMore: (row: SalaryRow) => void;
  originalTotal?: number;
}

export default function EmployeeSalaryOverview({
  rows,
  onView,
  onDownload,
  onMore,
  originalTotal,
}: EmployeeSalaryOverviewProps) {
  const [activeTab, setActiveTab] = useState("All Employees");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = activeTab === "All Employees"
    ? rows
    : rows.filter((r) => r.employeeType === activeTab);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedRows = filteredRows.slice(start, start + ITEMS_PER_PAGE);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const tabs = ["All Employees", "Teaching Staff", "Non-Teaching Staff"];

  return (
    <Card className="p-5">
      <div className="flex items-center gap-6 border-b border-slate-100 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-3 text-sm font-medium transition relative ${
              activeTab === tab
                ? "text-[#7c3aed]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c3aed] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <EmployeeSalaryTable
        rows={paginatedRows}
        onView={onView}
        onDownload={onDownload}
        onMore={onMore}
      />

      <SalaryPagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={originalTotal ?? filteredRows.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Card>
  );
}
